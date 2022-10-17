<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    public function updateProfile(Request $request)
    {
        $request->validate([
            "first_name" => ["required", "string", "max:255"],
            "last_name" => ["required", "string", "max:255"],
            "bio" => ["nullable"],
            "picture" => ["nullable", "mimes:png,jpg"]
        ]);

        $inputs = $request->all();


        if ($request->hasFile('picture')) {
            $picture = $request->picture;

            $picture_name_with_extension = $picture->getClientOriginalName();
            $original_name = pathinfo($picture_name_with_extension, PATHINFO_FILENAME);
            $extension = pathinfo($picture_name_with_extension, PATHINFO_EXTENSION);

            $modified_name  = time() . '_' . Str::lower(str_replace(' ', '-', $original_name)) . '.' . $extension;

            // Old Picture Deletion
            $old_picture_url = $request->user()->picture;
            $exploded_array = explode('/', $old_picture_url);
            $old_picture_name = $exploded_array[sizeof($exploded_array) - 1];

            if (Storage::exists($old_picture_name)) {
                Storage::delete($old_picture_name);
            }

            // New Picture
            $inputs['picture'] = $modified_name;
            Storage::putFileAs('', $picture, $modified_name, []);
        }

        $request->user()->update($inputs);

        return response()->json();
    }
}
