<?php

use App\Http\Controllers\CardController;
use App\Http\Controllers\DataController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResource('cards', CardController::class);
// Create cards:       method POST   =>  http://127.0.0.1:8000/api/cards
// Show all cards:     method GET    =>  http://127.0.0.1:8000/api/cards
// Show card by id:    method GET    =>  http://127.0.0.1:8000/api/cards/1
// Update card by id:  method POST   => http://127.0.0.1:8000/api/cards/1?_method=PATCH
// Delete card by id:  method DELETE => http://127.0.0.1:8000/api/cards/1


// Custom routes for handling form data related to cards
Route::get('cards/{card_id}/Data', [CardController::class, 'showData']);
Route::post('cards/{card_id}/Data', [CardController::class, 'storeData']);
Route::put('cards/{card_id}/Data/{form_data_id}', [CardController::class, 'updateData']);

// Additional routes for CRUD operations on Form Data
Route::resource('Data', DataController::class);




// Create data:        method POST   =>  http://127.0.0.1:8000/api/data
// Show all data:      method GET    =>  http://127.0.0.1:8000/api/data
// Show data by id:    method GET    =>  http://127.0.0.1:8000/api/data/1
// Update data by id:  method POST   =>  http://127.0.0.1:8000/api/data/1?_method=PATCH
// Delete data by id:  method DELETE =>  http://127.0.0.1:8000/api/data/1
