<?php

use App\Http\Controllers\CabanaController;
use App\Models\Cabana;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Pantalla Principal
Route::get('/', function () {
    $cabanas = Cabana::where('disponible', true)->get();

    return Inertia::render('dashboard', [
        'cabanas' => $cabanas,
    ]);
})->name('home');

//Route::middleware(['auth'])->group(function () {
    Route::get('/cabanas', [CabanaController::class, 'index'])->name('cabanas.index');
    Route::get('/cabanas/create', [CabanaController::class, 'create'])->name('cabanas.create');
    Route::post('/cabanas', [CabanaController::class, 'store'])->name('cabanas.store');
//});







require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
