<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function getAllTags()
    {
        $tags = Tag::withCount('pictures')->orderBy('name')->withCount('pictures')->get();
        return response()->json($tags, 200,);
    }


    /**
     * get tags have pictures
     */
    public function getTagsHavePictures()
    {
        $tags = Tag::withCount('pictures')->has('pictures')->orderBy('name')->withCount('pictures')->get();
        return response()->json($tags, 200,);
    }

    /**
     * get popular tags
     */
    public function getPopularTags()
    {
        $tags = Tag::withCount('pictures')->orderBy('pictures_count', 'desc')->take(5)->get();
        return response()->json($tags, 200,);
    }

    /**
     * get tags with pagination
     */
    public function getTagsWithPagination()
    {
        $tags = Tag::withCount('pictures')->orderBy('name')->withCount('pictures')->paginate(5);
        return response()->json($tags, 200,);
    }

    /**
     * get tags by search
     */
    public function getTagsBySearch($searchText)
    {
        $tags = Tag::withCount('pictures')->where(function ($query) use ($searchText) {
            $query->where('name', 'LIKE', '%' . $searchText . '%');
        })->orderBy('name')->withCount('pictures')->paginate(5);
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


    /**
     * store tag
     */
    public function storeTag(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $inputs = $request->all();

        Tag::create([
            "name" => $inputs['name'],
        ]);

        return response()->json($inputs, 200,);
    }

    /**
     * delete tag
     */
    public function deleteTag($id)
    {
        $tag = Tag::findOrFail($id);
        $tag->delete();

        return
            response()->json("Deleted successfully", 200,);
    }


    /**
     * update tag
     */
    public function updateTag(Request $request, $id)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $inputs = $request->all();

        $tag = Tag::findOrFail($id);
        $tag->update([
            "name" => $inputs["name"]
        ]);

        return
            response()->json(["message" => "Updated successfully", "tag_name" => $inputs["name"]], 200,);
    }
}
