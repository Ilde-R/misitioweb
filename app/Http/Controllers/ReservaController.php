<?php

namespace App\Http\Controllers;

use App\Models\Cabana;
use App\Models\Reserva;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservas = Reserva::with('cabana', 'user')->get();

        
        return Inertia::render('reservaciones/index', [
            'reservas' => $reservas,  
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */

public function create(Request $request)
{
    // Obtener cabañas disponibles
    $cabanas = Cabana::where('disponible', true)->get(['id', 'nombre', 'direccion', 'capacidad', 'precio_noche', 'disponible', 'imagen']);

    // Obtener usuarios
    $usuarios = User::all(['id', 'name']);

    // Verificar si hay cabañas disponibles
    if ($cabanas->isEmpty()) {
        return redirect()->route('reservas.index')->with('error', 'No hay cabañas disponibles.');
    }

    // Retornar vista con datos
    return Inertia::render('reservaciones/create', [
        'cabanas' => $cabanas,
        'usuarios' => $usuarios,
    ]);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos del formulario
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id', // Usuario que realiza la reserva
            'cabana_id' => 'required|exists:cabanas,id', // Cabaña reservada
            'fecha_inicio' => 'required|date|after_or_equal:today',
            'fecha_fin' => 'required|date|after:fecha_inicio', // Fecha de fin
            'total' => 'nullable|numeric|min:0', // Monto total (puede ser opcional porque lo calcularemos)
            'estado' => 'required|in:pendiente,confirmada,cancelada', // Estado de la reserva
            'metodo_pago' => 'nullable|string|max:255', // Método de pago
            'notas' => 'nullable|string|max:1000', // Notas adicionales
            'numero_personas' => 'required|integer|min:1', // Número de personas
        ]);
    
        // Calcular el total
        $cabana = Cabana::findOrFail($validated['cabana_id']);
        $fechaInicio = new \DateTime($validated['fecha_inicio']);
        $fechaFin = new \DateTime($validated['fecha_fin']);
        $dias = $fechaInicio->diff($fechaFin)->days; // Diferencia en días
        $total = $dias * $cabana->precio_noche;
    
        // Crear la reserva con el total calculado
        Reserva::create([
            'user_id' => $validated['user_id'],
            'cabana_id' => $validated['cabana_id'],
            'fecha_inicio' => $validated['fecha_inicio'],
            'fecha_fin' => $validated['fecha_fin'],
            'total' => $total, // Usar el total calculado
            'estado' => $validated['estado'],
            'metodo_pago' => $validated['metodo_pago'] ?? null,
            'notas' => $validated['notas'] ?? null,
            'numero_personas' => $validated['numero_personas'],
        ]);
    
        // Redirigir con un mensaje de éxito
        return redirect()->route('reservas.index')->with('success', 'Reserva creada correctamente.');
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
        $usuarios = User::all(['id', 'name']);
        $cabanas = Cabana::all(['id', 'nombre']);
        return Inertia::render('reservaciones/edit', [
            'usuarios' => $usuarios,
            'cabanas' => $cabanas,
            'reserva' => Reserva::find($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */


public function update(Request $request, string $id)
{
    // Validar los datos enviados desde el formulario
    $validated = $request->validate([
        'user_id' => 'required|exists:users,id', // Usuario válido
        'cabana_id' => 'required|exists:cabanas,id', // Cabaña válida
        'fecha_inicio' => 'required|date|after_or_equal:today', // Fecha de inicio válida
        'fecha_fin' => 'required|date|after:fecha_inicio', // Fecha de fin válida
        'total' => 'required|numeric|min:0', // Total debe ser un número positivo
        'estado' => 'required|in:pendiente,confirmada,cancelada', // Estado válido
        'metodo_pago' => 'nullable|string|max:255', // Método de pago opcional
        'notas' => 'nullable|string|max:1000', // Notas opcionales
        'numero_personas' => 'required|integer|min:1', // Número de personas debe ser al menos 1
    ]);

    // Buscar la reserva por ID
    $reserva = Reserva::findOrFail($id);

    // Actualizar los datos de la reserva
    $reserva->update([
        'user_id' => $validated['user_id'],
        'cabana_id' => $validated['cabana_id'],
        'fecha_inicio' => $validated['fecha_inicio'],
        'fecha_fin' => $validated['fecha_fin'],
        'total' => $validated['total'],
        'estado' => $validated['estado'],
        'metodo_pago' => $validated['metodo_pago'] ?? null,
        'notas' => $validated['notas'] ?? null,
        'numero_personas' => $validated['numero_personas'],
    ]);

    // Cambiar el estado de la cabaña automáticamente
    $cabana = Cabana::findOrFail($validated['cabana_id']);
    if ($validated['estado'] === 'confirmada') {
        $cabana->update(['disponible' => false]); // Marcar como no disponible
    } elseif ($validated['estado'] === 'cancelada') {
        $cabana->update(['disponible' => true]); // Marcar como disponible
    }

    // Redirigir con un mensaje de éxito
    return redirect()->route('reservas.index')->with('success', 'Reserva actualizada correctamente.');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reserva $reserva)
    {
        $reserva->delete();
        return redirect()->route('reservas.index')->with('success', 'Reserva eliminada correctamente.');
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
public function archivar($id)
{
    $reservacion = Reserva::findOrFail($id);

    $reservacion->estado = 'inactiva'; 
    $reservacion->save();

    $cabana = $reservacion->cabana;
    if ($cabana) {
        $cabana->disponible = true; // Marcar la cabaña como disponible
        $cabana->save();
    }

    return redirect()->back()->with('success', 'Reserva archivada correctamente y  cabaña disponible.');
}

}
