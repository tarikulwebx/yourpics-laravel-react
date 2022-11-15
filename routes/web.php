<?php

use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PictureController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SlideController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UploaderController;
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
Route::get('/getPopularTags', [TagController::class, 'getPopularTags']);
Route::get('/getTagBySlug/{slug}', [TagController::class, 'getTagBySlug']);
Route::get('/getPicturesByTagSlug/{slug}', [TagController::class, 'getPicturesByTagSlug']);
Route::get('/getTagsWithPagination', [TagController::class, 'getTagsWithPagination']);
Route::get('/getTagsBySearch/{searchText}', [TagController::class, 'getTagsBySearch']);

Route::middleware(['auth', 'admin'])->group(function () {
    Route::post('/store-tag', [TagController::class, 'storeTag']);
    Route::delete('/delete-tag/{id}', [TagController::class, 'deleteTag']);
    Route::post('/update-tag/{id}', [TagController::class, 'updateTag']);
});


// Picture routes
Route::get("/allPictures", [PictureController::class, 'allPictures']);
Route::get("/picturesBySearch/{searchKey}", [PictureController::class, 'picturesBySearch']);

Route::get('/getPictureBySlug/{slug}', [PictureController::class, 'getPictureBySlug']);
Route::get('/getPictureById/{id}', [PictureController::class, 'getPictureById']);
Route::get("/download/{slug}", [PictureController::class, 'download']);

// Favorite routes
Route::get("/getFavoritesCount/{id}", [FavoriteController::class, 'getFavoritesCount']);
Route::get("/getFavoritesCountByPictureSlug/{slug}", [FavoriteController::class, 'getFavoritesCountByPictureSlug']);


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


// Uploader routes
Route::get('/getUploaderBySlug/{slug}', [UploaderController::class, 'getUploaderBySlug']);
Route::get('/getPicturesByUploaderSlug/{slug}', [UploaderController::class, 'getPicturesByUploaderSlug']);


// page routes
Route::get('/getPageBySlug/{slug}', [PageController::class, 'getPageBySlug']);
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/getAllPages', [PageController::class, 'getAllPages']);
    Route::post('/storeNewPage', [PageController::class, 'storeNewPage']);
    Route::delete('/deletePage/{id}', [PageController::class, 'deletePage']);
    Route::get('/getPageById/{id}', [PageController::class, 'getPageById']);
    Route::post('/updatePage/{id}', [PageController::class, 'updatePage']);
});


// slide routes
Route::get('/getAllSlides', [SlideController::class, 'getAllSlides']);
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/getSlideById/{id}', [SlideController::class, 'getSlideById']);
    Route::post('/storeNewSlide', [SlideController::class, 'storeNewSlide']);
    Route::post('/updateSlide/{id}', [SlideController::class, 'updateSlide']);
    Route::delete('/deleteSlide/{id}', [SlideController::class, 'deleteSlide']);
});

// SPA Route
Route::get("{any}", function () {
    return view("index");
})->where("any", ".*");
