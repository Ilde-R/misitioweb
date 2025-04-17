<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cabana extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'ubicacion',
        'capacidad',
        'precio_noche',
        'disponible',
        'imagen',
    ];

    /**
     * Relación: Una cabaña puede tener muchas reservas.
     */
    public function reservas()
    {
        return $this->hasMany(Reserva::class);
    }

    
}
