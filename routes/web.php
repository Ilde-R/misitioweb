<?php

use App\Http\Controllers\CabanaController;
use App\Http\Controllers\ReservaController;
use App\Models\Cabana;
use App\Models\User;
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
//Mostrar formulario de reserva
Route::get('/reservas/create', [ReservaController::class, 'create'])->name('cabanas.create');
//Guardar reserva
Route::post('/reservas', [ReservaController::class, 'store'])->name('reservas.store');
// Mostrar el formulario de edición
Route::get('/reservas/{reserva}/edit', [ReservaController::class, 'edit'])
    ->middleware(['auth', 'verified'])
    ->name('reservas.edit');
// Actualizar la reserva
Route::put('/reservas/{reserva}', [ReservaController::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('reservas.update');











require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
