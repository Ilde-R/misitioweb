<?php

namespace App\Http\Controllers;

use App\Models\Cabana;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CabanaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {    
        $cabanas = Cabana::all(); 

        return Inertia::render('cabanas/index', [
            'cabanas' => $cabanas, 
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('cabanas/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validación de los datos del formulario
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'direccion' => 'required|string|max:255',
            'ciudad' => 'required|string|max:255',
            'estado' => 'required|string|max:255',
            'pais' => 'required|string|max:255',
            'capacidad' => 'required|integer|min:1',
            'precio_noche' => 'required|numeric|min:0',
            'disponible' => 'required|boolean',
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'descripcion' => 'nullable|string',
            'servicios' => 'nullable|array',
            'servicios.*' => 'string|max:255',
            'politicas' => 'nullable|string|max:1000',
        ]);

        // Crear la nueva cabaña
        $cabana = new Cabana();
        $cabana->nombre = $validated['nombre'];
        $cabana->direccion = $validated['direccion'];
        $cabana->ciudad = $validated['ciudad'];
        $cabana->estado = $validated['estado'];
        $cabana->pais = $validated['pais'];
        $cabana->capacidad = $validated['capacidad'];
        $cabana->precio_noche = $validated['precio_noche'];
        $cabana->disponible = $validated['disponible'];
        $cabana->descripcion = $validated['descripcion'] ?? null;
        $cabana->servicios = $validated['servicios'] ? json_encode($validated['servicios']) : null;
        $cabana->politicas = $validated['politicas'] ?? null;

        // Si se ha subido una imagen, guardarla
        if ($request->hasFile('imagen')) {
            $cabana->imagen = $request->file('imagen')->store('images', 'public');
        }

        // Guardar la cabaña en la base de datos
        $cabana->save();

        // Redirigir a la lista de cabañas o a donde desees
        return redirect()->route('cabanas.index');
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

    /**
     * Display available cabins on the home page.
     */
    public function home()
    {
        $cabanas = Cabana::where('disponible', true)->get();

        return Inertia::render('Home', [
            'cabanas' => $cabanas,
        ]);
    }


    public function seleccionar()
    {
    // Obtener solo las cabañas disponibles
    $cabanas = Cabana::where('disponible', true)->get(['id', 'nombre']);

    // Renderizar el formulario con las cabañas disponibles
    return Inertia::render('reservaciones/create', [
        'cabanas' => $cabanas,
    ]);
}
}