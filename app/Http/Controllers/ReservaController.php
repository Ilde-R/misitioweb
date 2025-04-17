<?php

namespace App\Http\Controllers;

use App\Models\Cabana;
use App\Models\Reserva;
use Illuminate\Http\Request;

class ReservaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservas = Reserva::with('cabana')->get();
        return view('admin.reservas.index', compact('reservas'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $cabanas = Cabana::all();
        return view('admin.reservas.create', compact('cabanas/index'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'ubicacion' => 'required|string|max:255',
            'descripcion' => 'nullable|string|max:500',
        ]);

        Cabana::create([
            'nombre' => $request->nombre,
            'ubicacion' => $request->ubicacion,
            'descripcion' => $request->descripcion,
        ]);

        return redirect()->route('cabanas.index')->with('success', 'Cabaña agregada correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
