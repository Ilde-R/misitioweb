<?php

namespace App\Http\Controllers;

use App\Models\Cabana;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
{
    $cabanas = Cabana::where('disponible', true)->get();

    return Inertia::render('Dashboard', [
        'cabanas' => $cabanas,
    ]);
}

}
