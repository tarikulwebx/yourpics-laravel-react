<?php

namespace App\Http\Controllers;

use App\Models\Picture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Route;

class PictureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }



    /**
     * All Uploads of User
     */
    public function getUploadedPictures()
    {
        $pictures = auth()->user()->pictures()->with('user')->get();

        return response()->json($pictures, 200);
    }



    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            "title" => "string|required|max:255",
            "image" => "required|image|mimes:png,jpg,gif",
            "description" => "string|nullable|max:800",
            'tags' => 'required|array|min:1'
        ]);

        $selected_tags = $request->tags;
        $selected_tags_int = array_map('intval', $selected_tags);

        if ($request->hasFile('image')) {
            $image = $request->image;

            [$width, $height] = getimagesize($image);
            $dimension = $width . 'x' . $height;
            $size = round(filesize($image) / (1024 * 1024), 2); // File size in MB

            $picture_name_with_extension = $image->getClientOriginalName();
            $original_name = pathinfo($picture_name_with_extension, PATHINFO_FILENAME);
            $extension = pathinfo($picture_name_with_extension, PATHINFO_EXTENSION);

            $image_name  = time() . '_' . Str::lower(str_replace(' ', '-', $original_name)) . '.' . $extension;

            Storage::putFileAs('', $image, $image_name, []);

            $picture = auth()->user()->pictures()->create([
                'title' => $request->title,
                'image' => $image_name,
                'dimension' => $dimension,
                'size'  => $size,
                'description' => $request->description,
            ]);

            $picture->tags()->attach($selected_tags_int);
            return response()->json();
        }

        return response()->json();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Picture  $picture
     * @return \Illuminate\Http\Response
     */
    public function show(Picture $picture)
    {
        //
    }


    /**
     * Get Picture by Slug
     */
    public function getPictureBySlug($slug)
    {
        $picture = Picture::findBySlugOrFail($slug);
        $picture->tags;
        return response()->json($picture, 200,);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Picture  $picture
     * @return \Illuminate\Http\Response
     */
    public function edit(Picture $picture)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Picture  $picture
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            "title" => "required|string|max:255",
            "description" => "nullable|string|max:800",
            'tags' => 'required|array|min:1'
        ]);

        $inputs = $request->all();
        $picture = Picture::findOrFail($id);

        $picture->update([
            "title" => $request->title,
            "description" => $request->description,
        ]);

        $selected_tags = $request->tags;
        $selected_tags_int_arr = array_map('intval', $selected_tags);

        $picture->tags()->sync($selected_tags_int_arr);

        return response()->json("Updated successfully", 200,);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Picture  $picture
     * @return \Illuminate\Http\Response
     */
    public function destroy(Picture $picture)
    {
        //
    }
}
