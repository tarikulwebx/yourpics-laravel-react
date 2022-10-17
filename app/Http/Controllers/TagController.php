<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function getAllTags()
    {
        $tags = Tag::all();
        return response()->json($tags, 200,);
    }
}
