<?php

namespace Database\Seeders;

use App\Models\Cabana;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CabanaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         Cabana::factory(1)->create();
    }
}
