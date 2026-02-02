<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        $roles = ['consumer', 'laborer', 'farm_manager', 'farm_owner', 'administrator'];

        User::factory(50)->create()->each(function ($user) use ($roles) {
            $role = Role::inRandomOrder()->first();
            $user->assignRole($role->name);
        });
    }
}
