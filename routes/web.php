<?php

use App\Http\Controllers\FavoriteController;
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
Route::get("/allPictures", [PictureController::class, 'allPictures']);
Route::get("/picturesBySearch/{searchKey}", [PictureController::class, 'picturesBySearch']);

Route::get('/getPictureBySlug/{slug}', [PictureController::class, 'getPictureBySlug']);
Route::get('/getPictureById/{id}', [PictureController::class, 'getPictureById']);
Route::get("/download/{slug}", [PictureController::class, 'download']);

// Favorite routes
Route::get("/getFavoritesCount/{id}", [FavoriteController::class, 'getFavoritesCount']);

// Auth
Route::middleware(['auth'])->group(function () {
    Route::post('/pictureStore', [PictureController::class, 'store']);
    Route::get('/getUploadedPictures', [PictureController::class, 'getUploadedPictures']);
    Route::post('/pictureUpdate/{id}', [PictureController::class, 'update']);
    Route::delete('/moveToTrash/{id}', [PictureController::class, 'moveToTrash']);
    Route::get('/getTrashedPictures', [PictureController::class, 'getTrashedPictures']);
    Route::get('/restoreTrashedPicture/{id}', [PictureController::class, 'restoreTrashedPicture']);
    Route::delete('/deletePermanently/{id}', [PictureController::class, 'deletePermanently']);

    // favorite routes
    Route::get('/addToFavorite/{id}', [FavoriteController::class, 'addToFavorite']);
    Route::get('/getFavoritesArray', [FavoriteController::class, 'getFavoritesArray']);
    Route::get('/getFavorites', [FavoriteController::class, 'getFavorites']);
    Route::get('/removeFromFavorite/{id}', [FavoriteController::class, 'removeFromFavorite']);
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
