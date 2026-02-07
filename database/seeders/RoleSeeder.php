<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
          app()[PermissionRegistrar::class]->forgetCachedPermissions();
        Permission::firstOrCreate(['name' => 'manage_farm', 'guard_name' => 'web']);
        Permission::firstOrCreate(['name' => 'assign_labor', 'guard_name' => 'web']);
        Permission::firstOrCreate(['name' => 'access_admin_dashboard', 'guard_name' => 'web']);

        Role::firstOrCreate(['name' => 'consumer', 'guard_name' => 'web']);
        Role::firstOrCreate(['name' => 'laborer', 'guard_name' => 'web']);
        Role::firstOrCreate(['name' => 'farm_manager', 'guard_name' => 'web']);
        Role::firstOrCreate(['name' => 'farm_owner', 'guard_name' => 'web']);
        Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);

        Role::findByName('farm_owner')->syncPermissions([
            'manage_farm',
            'assign_labor'
        ]);
        Role::findByName('admin')->syncPermissions([
            'access_admin_dashboard'
        ]);
    }
}
