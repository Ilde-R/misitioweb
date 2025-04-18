<?php

namespace Database\Seeders;

use App\Models\Reserva;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //User::factory(10)->create();
        Reserva::factory(10)->create();

        $this ->call(RoleSeeder::class);

        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => '12345678',
        ])->assignRole('Admin');
        User::create([
            'name' => 'Lector',
            'email' => 'lector@lector.com',
            'password' => '12345678',
        ])->assignRole('Lector');


        $this->call(CabanaSeeder::class);
    }
}
