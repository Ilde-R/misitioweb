<?php

use App\Http\Controllers\CabanaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReservaController;
use App\Models\Cabana;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Pantalla Principal
Route::get('/', DashboardController::class)->name('home'); 

//Cabañas
Route::middleware(['auth', 'verified'])->prefix('cabanas')->name('cabanas.')->group(function () {
    Route::get('/', [CabanaController::class, 'index'])->middleware('can:cabana.index')->name('index');
    Route::get('/create', [CabanaController::class, 'create'])->middleware('can:cabana.create')->name('create');
    
    //Cambios a la BDD
    Route::post('/', [CabanaController::class, 'store'])->middleware('can:cabana.store')->name('store');
});

//Reservas
Route::middleware(['auth', 'verified'])->prefix('reservas')->name('reservas.')->group(function () {
    Route::get('/', [ReservaController::class, 'index'])->middleware('can:reserva.index')->name('index');
    Route::get('/create', [ReservaController::class, 'create'])->middleware('can:reserva.create')->name('create');
    Route::get('/{reserva}/edit', [ReservaController::class, 'edit'])->middleware('can:reserva.edit')->name('edit');
    
    //Cambios a la BDD
    Route::post('/', [ReservaController::class, 'store'])->middleware('can:reserva.store')->name('store');
    Route::put('/{reserva}', [ReservaController::class, 'update'])->middleware('can:reserva.edit')->name('update');
    Route::delete('/{reserva}', [ReservaController::class, 'destroy'])->middleware('can:reserva.destroy')->name('destroy');
    Route::put('/{reserva}/archivar', [ReservaController::class, 'archivar'])->middleware('can:reserva.archivar')->name('archivar');
});











require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
