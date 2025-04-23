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
            'direccion' => $this->faker->streetAddress(),
            'ciudad' => $this->faker->city(),
            'estado' => $this->faker->state(),
            'pais' => $this->faker->country(),
            'capacidad' => $this->faker->numberBetween(2, 10),
            'precio_noche' => $this->faker->randomFloat(2, 500, 5000),
            'disponible' => $this->faker->boolean(),
            'imagen' => $this->faker->imageUrl(640, 480, 'nature', true, 'Cabaña'),
            'descripcion' => $this->faker->paragraph(),
            'servicios' => json_encode($this->faker->randomElements(['Wi-Fi', 'Piscina', 'Aire acondicionado', 'Cocina'], 2)),
            'politicas' => $this->faker->sentence(),
        ];
    }
}
