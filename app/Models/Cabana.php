<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cabana extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'direccion',
        'ciudad',
        'estado',
        'pais',
        'capacidad',
        'precio_noche',
        'disponible',
        'imagen',
        'descripcion',
        'servicios',
        'politicas',
    ];

    /**
     * Relación: Una cabaña puede tener muchas reservas.
     */
    public function reservas()
    {
        return $this->hasMany(Reserva::class);
    }

    
}
