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
            'ubicacion' => 'required|string|max:255',
            'capacidad' => 'required|integer',
            'precio_noche' => 'required|numeric',
            'disponible' => 'required|boolean',
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        // Crear la nueva cabaña
        $cabana = new Cabana();
        $cabana->nombre = $validated['nombre'];
        $cabana->ubicacion = $validated['ubicacion'];
        $cabana->capacidad = $validated['capacidad'];
        $cabana->precio_noche = $validated['precio_noche'];
        $cabana->disponible = $validated['disponible'];

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
    public function home()
{
    $cabanas = Cabana::where('disponible', true)->get();

    return Inertia::render('Home', [
        'cabanas' => $cabanas,
    ]);
    
}


}
