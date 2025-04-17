<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    public function cabana()
{
    return $this->belongsTo(Cabana::class);
}

public function user()
{
    return $this->belongsTo(User::class);
}

}
