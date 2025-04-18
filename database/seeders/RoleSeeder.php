<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rolAdmin = Role::create(["name"=>"Admin"]);
        $rolLector = Role::create(["name"=>"Lector"]);

        $permission1 = Permission::create(['name' => 'index']);

        $permission1->syncRoles([$rolAdmin]);

    }
}
