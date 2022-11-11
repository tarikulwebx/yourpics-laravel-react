<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * Get pages
     */
    public function getAllPages()
    {
        $pages = Page::all();
        return response()->json($pages, 200,);
    }

    /**
     * get page by id
     */
    public function getPageById($id)
    {
        $page = Page::findOrFail($id);
        return response()->json($page, 200,);
    }

    /**
     * get page by slug
     */
    public function getPageBySlug($slug)
    {
        $page = Page::findBySlugOrFail($slug);
        return response()->json($page, 200,);
    }

    /**
     * Store
     */
    public function storeNewPage(Request $request)
    {
        $request->validate([
            "title" => "required|string",
            "body" => "nullable",
        ]);

        $inputs = $request->all();

        Page::create($inputs);

        return response()->json("Page created successfully.", 200,);
    }

    /**
     * update page
     */
    public function updatePage(Request $request, $id)
    {

        $request->validate([
            "title" => "required|string",
            "body" => "nullable",
        ]);

        $page = Page::findOrFail($id);
        $page->update([
            "title" => $request->title,
            "body" => $request->body,
        ]);
        return response()->json("Updated successfully.", 200,);
    }

    /**
     * delete
     */
    public function deletePage($id)
    {
        $page = Page::findOrFail($id);
        $page->delete();

        return response()->json("Deleted successfully.", 200,);
    }
}
