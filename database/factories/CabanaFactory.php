<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cabana>
 */
class CabanaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
    'nombre' => $this->faker->word(),
    'ubicacion' => $this->faker->address(),
    'capacidad' => $this->faker->numberBetween(2, 10),
    'precio_noche' => $this->faker->randomFloat(2, 500, 5000), 
    'disponible' => $this->faker->boolean(),
    'imagen' => $this->faker->imageUrl(640, 480, 'nature', true, 'jpg'),
];
    }
}
