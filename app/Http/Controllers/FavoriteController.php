<?php

namespace App\Http\Controllers;

use App\Models\Picture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{

    /**
     * Get Favorites Array
     */
    public function getFavoritesArray()
    {
        $favorites = auth()->user()->favorites()->pluck('picture_id');
        return response()->json($favorites, 200,);
    }

    /**
     * Get Favorites
     */
    public function getFavorites()
    {
        $favorites = auth()->user()->favorites()->pluck('picture_id');
        $pictures = Picture::with('user')->whereHas('favorites', function ($query) use ($favorites) {
            $query->whereIn('favorites.picture_id', $favorites);
        })->get();
        return response()->json($pictures, 200,);
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


    /**
     * get favorites count
     */
    public function getFavoritesCount($id)
    {
        $picture = Picture::findOrFail($id);
        $favorite_count = $picture->favorites()->count();
        return response()->json($favorite_count, 200,);
    }
}
