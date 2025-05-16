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
       $roles = ['Admin', 'Lector'];

       foreach ($roles as $role){
        Role::firstOrCreate(['name' => $role]);
    }
    

       $permissions = [
        //Permisos Cabana       
        'cabana.index',
        'cabana.create',
        'cabana.store',
        //Permisos Reserva
        'reserva.index',
        'reserva.create',
        'reserva.store',    
        'reserva.edit',
        'reserva.update',
        'reserva.destroy',
        'reserva.archivar',
       ];

       foreach ($permissions as $permission){
            Permission::firstOrCreate(['name' => $permission]);
       }

       //Pemisos Admin
       $adminRole = Role::where('name', 'Admin')->first();
       if($adminRole){
            $adminRole->syncPermissions($permissions);
       }
       //Permisos Lector
       $lectorRole = Role::where('name', 'Lector')->first();
        if ($lectorRole) {
            $lectorRole->syncPermissions([
                'cabana.index',
                'reserva.index',
            ]);
        }
    }
}
