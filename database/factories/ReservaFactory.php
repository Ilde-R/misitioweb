<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Cabana;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReservaFactory extends Factory
{
    public function definition(): array
    {
        $inicio = $this->faker->dateTimeBetween('now', '+1 week');
        $fin = (clone $inicio)->modify('+3 days');

        return [
            'user_id' => User::factory(),
            'cabana_id' => Cabana::factory(),
            'fecha_inicio' => $inicio,
            'fecha_fin' => $fin,
            'total' => $this->faker->randomFloat(2, 500, 3000),
            'estado' => $this->faker->randomElement(['pendiente', 'confirmada', 'cancelada', 'inactiva']),
        ];
    }
}
