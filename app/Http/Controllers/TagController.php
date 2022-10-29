<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function getAllTags()
    {
        $tags = Tag::withCount('pictures')->orderBy('name')->get();
        return response()->json($tags, 200,);
    }


    /**
     * get tag by slug
     */
    public function getTagBySlug($slug)
    {
        $tag = Tag::findBySlugOrFail($slug);
        return response()->json($tag, 200,);
    }


    /**
     * Get pictures of tag
     */
    public function getPicturesByTagSlug($slug)
    {
        $pictures = Tag::findBySlugOrFail($slug)->pictures()->with('user')->latest()->paginate(12);
        return response()->json($pictures, 200,);
    }
}
