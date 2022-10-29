<?php

namespace App\Http\Controllers;

use App\Models\Picture;
use App\Models\User;
use Illuminate\Http\Request;

class UploaderController extends Controller
{
    /**
     * get uploader by slug
     */
    public function getUploaderBySlug($slug)
    {
        $uploader = User::findBySlugOrFail($slug);
        return response()->json($uploader, 200,);
    }

    /**
     * get pictures by uploader slug
     */
    public function getPicturesByUploaderSlug($slug)
    {
        $pictures = User::findBySlugOrFail($slug)->pictures()->with('user')->latest()->paginate(12);
        return response()->json($pictures, 200,);
    }
}
