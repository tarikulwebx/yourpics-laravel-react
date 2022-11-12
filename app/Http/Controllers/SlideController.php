<?php

namespace App\Http\Controllers;

use App\Models\Slide;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SlideController extends Controller
{
    /**
     * get slides
     */
    public function getAllSlides()
    {
        $slides = Slide::orderBy("id", "desc")->get();
        return response()->json($slides, 200,);
    }

    /**
     * get slide by id
     */
    public function getSlideById($id)
    {
        $slide = Slide::findOrFail($id);
        return response()->json($slide, 200,);
    }


    /**
     * Store
     */
    public function storeNewSlide(Request $request)
    {
        $request->validate([
            'title' => "required|string",
            'description' => "required|string",
            'image' => "required|image|mimes:png,jpg,gif",
            "button_1_text" => "nullable|required_with:button_1_link",
            "button_1_link" => "nullable|url|required_with:button_1_text",
            "button_2_text" => "nullable|required_with:button_2_link",
            "button_2_link" => "nullable|url|required_with:button_2_text",
        ]);

        if ($request->hasFile("image")) {
            $image = $request->image;

            $picture_name_with_extension = $image->getClientOriginalName();
            $original_name = pathinfo($picture_name_with_extension, PATHINFO_FILENAME);
            $extension = pathinfo($picture_name_with_extension, PATHINFO_EXTENSION);

            $image_name  = time() . '_' . Str::lower(str_replace(' ', '-', $original_name)) . '.' . $extension;

            Storage::putFileAs('', $image, $image_name);

            $inputs = $request->all();
            $inputs["image"] = $image_name;

            Slide::create($inputs);


            return response()->json("Created successfully", 200,);
        }

        return response()->json("Failed.", 200,);
    }

    /**
     * update
     */
    public function updateSlide(Request $request, $id)
    {

        $request->validate([
            'title' => "required|string",
            'description' => "required|string",
            'image' => "nullable|image|mimes:png,jpg,gif",
            "button_1_text" => "nullable|required_with:button_1_link",
            "button_1_link" => "nullable|url|required_with:button_1_text",
            "button_2_text" => "nullable|required_with:button_2_link",
            "button_2_link" => "nullable|url|required_with:button_2_text",
        ]);

        $inputs = $request->all();

        $slide = Slide::findOrFail($id);

        if ($request->hasFile("image")) {
            $image = $request->image;

            $picture_name_with_extension = $image->getClientOriginalName();
            $original_name = pathinfo($picture_name_with_extension, PATHINFO_FILENAME);
            $extension = pathinfo($picture_name_with_extension, PATHINFO_EXTENSION);

            $image_name  = time() . '_' . Str::lower(str_replace(' ', '-', $original_name)) . '.' . $extension;

            Storage::putFileAs('', $image, $image_name);

            $inputs = $request->all();
            $inputs["image"] = $image_name;

            // delete old image if exists
            $old_image_url = $slide->image;
            $old_exploded_array = explode('/', $old_image_url);
            $old_image_name_only = $old_exploded_array[sizeof($old_exploded_array) - 1];
            if (Storage::exists($old_image_name_only)) {
                Storage::delete($old_image_name_only);
            }
        }

        $slide->update($inputs);


        return response()->json("Updated successfully.", 200,);
    }

    /**
     * delete
     */
    public function deleteSlide($id)
    {
        $slide = Slide::findOrFail($id);
        // Image Deletion
        $image_url = $slide->image;
        $exploded_array = explode('/', $image_url);
        $image_name_only = $exploded_array[sizeof($exploded_array) - 1];
        if (Storage::exists($image_name_only)) {
            Storage::delete($image_name_only);
        }

        $slide->delete();

        return response()->json("Deleted successfully.", 200,);
    }
}
