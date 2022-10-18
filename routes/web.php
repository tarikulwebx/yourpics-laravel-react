<?php

use App\Http\Controllers\PictureController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');


// Tag routes
Route::get('/getAllTags', [TagController::class, 'getAllTags']);


// Picture routes
Route::get('/getPictureBySlug/{slug}', [PictureController::class, 'getPictureBySlug']);

Route::middleware(['auth'])->group(function () {
    Route::post('/pictureStore', [PictureController::class, 'store']);
    Route::get('/getUploadedPictures', [PictureController::class, 'getUploadedPictures']);
    Route::post('/pictureUpdate/{id}', [PictureController::class, 'update']);
});


// Get logged-in user info
Route::get('getUser', [UserController::class, "get_user"]);


// Profile 
Route::middleware(['auth'])->group(function () {
    Route::post('profile/update', [ProfileController::class, 'updateProfile']);
});


// SPA Route
Route::get("{any}", function () {
    return view("index");
})->where("any", ".*");
