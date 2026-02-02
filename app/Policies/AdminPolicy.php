<?php

namespace App\Policies;

use App\Models\User;

class AdminPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function accessAdmin(User $user): bool
    {
        return $user->can('access_admin_dashboard');
    }
}
