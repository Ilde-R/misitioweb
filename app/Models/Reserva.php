<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    use HasFactory;

    protected $table = 'reservaciones';
    protected $fillable = [
        'user_id',
        'cabana_id',
        'fecha_inicio',
        'fecha_fin',
        'total',
        'estado',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cabana()
    {
        return $this->belongsTo(Cabana::class);
    }
}
