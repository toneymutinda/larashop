<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::resource('shop', 'ShopController');
Route::post('shop/{id}/product', 'ShopController@addProduct');
Route::get('shop/{id}/products', 'ShopController@getProducts');
Route::post('shop/{id}/feed', 'ShopController@createFeed');
Route::resource('feeds', 'FeedController');
