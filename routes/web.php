<?php

use App\Http\Controllers\CabanaController;
use App\Http\Controllers\ReservaController;
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

//Cabañas
Route::get('/cabanas', [CabanaController::class, 'index'])
    ->middleware(['auth', 'verified', 'can:index']) 
    ->name('cabanas.index');
Route::get('/cabanas/create', [CabanaController::class, 'create'])->name('cabanas.create');
Route::post('/cabanas', [CabanaController::class, 'store'])->name('cabanas.store');

//Reservas
Route::get('/reservas', [ReservaController::class, 'index'])
    ->middleware(['auth','verified'])
    ->name('reservas.index');
    Route::get('/cabanas/seleccionarcabana', [CabanaController::class, 'index'])->name('cabanas.seleccionarcabana');









require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
