<?php

namespace App\Http\Controllers;

use App\Models\Cabana;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
{
     $cabanas = Cabana::where('disponible', true)->get();
    return Inertia::render('dashboard', [
        'cabanas' => $cabanas,
    ]);
}
}
