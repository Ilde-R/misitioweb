<?php

namespace App\Http\Controllers;

use App\Models\Cabana;
use App\Models\Reserva;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtener todas las reservas, incluyendo la información de la cabana y el usuario
        $reservas = Reserva::with('cabana', 'user')->get();

        // Pasar los datos a la vista de Inertia
        return Inertia::render('reservaciones/index', [
            'reservas' => $reservas,  // Aquí le pasas todas las reservas al frontend
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        // Verificar si se pasó el id de la cabaña
        $cabana_id = $request->query('cabana_id');
        $cabana = Cabana::find($cabana_id);

        // Si no existe la cabaña, redirigir al listado de cabañas con un mensaje de error
        if (!$cabana) {
            return redirect()->route('cabanas.seleccionarcabana')
                             ->with('error', 'Cabaña no encontrada');
        }

        // Mostrar la vista de reserva con la cabaña seleccionada
        return view('reservas.create', compact('cabana'));
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
    public function confirmar(Reserva $reserva)
{
    if (!$reserva->cabana->disponible) {
        return back()->with('error', 'La cabaña ya está ocupada.');
    }

    $reserva->estado = 'confirmada';
    $reserva->save();

    $reserva->cabana->update(['disponible' => false]);

    return back()->with('success', 'Reserva confirmada. Cabaña marcada como no disponible.');
}
public function cancelar(Reserva $reserva)
{
    $reserva->estado = 'cancelada';
    $reserva->save();

    $reserva->cabana->update(['disponible' => true]);

    return back()->with('success', 'Reserva cancelada. Cabaña marcada como disponible.');
}

}
