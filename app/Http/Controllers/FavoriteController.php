<?php

namespace App\Http\Controllers;

use App\Models\Picture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{

    /**
     * Get Favorites
     */
    public function getFavoritesArray()
    {
        $favorites = auth()->user()->favorites()->pluck('picture_id');
        return response()->json($favorites, 200,);
    }


    /**
     * Add to Favorite
     */
    public function addToFavorite($id)
    {
        $picture = Picture::findOrFail($id);

        $user = auth()->user();

        $picture->favorites()->updateOrCreate([
            'user_id' => $user['id']
        ]);

        return response()->json(['message' => 'Added to favorite list'], 200,);
    }


    /**
     * Remove from favorite
     */
    public function removeFromFavorite($id)
    {
        $picture = Picture::findOrFail($id);
        $user = auth()->user();
        $picture->favorites()->where('user_id', '=', $user['id'])->delete();
        return response()->json(['message' => 'Removed from favorite list'], 200,);
    }
}
