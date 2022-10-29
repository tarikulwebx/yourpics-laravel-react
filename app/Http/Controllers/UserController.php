<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    // Get User Data
    public function get_user()
    {
        $user = Auth::user();
        $user['favorites'] = auth()->user()->favorites()->pluck("picture_id");

        return response()->json($user);
    }
}
