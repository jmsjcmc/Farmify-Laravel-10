<?php

namespace App\Observers;

use App\Models\User;
use App\Models\UserLog;
use Illuminate\Support\Facades\Request;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        //
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        $changes = $user->getDirty();
        $original = $user->getOriginal();

        UserLog::create([
            'user_id' => $user->id,
            'action' => 'profile_updated',
            'old_values' => array_intersect_key($original, $changes),
            'new_values' => $changes,
            'ip_address' => Request::ip(),
            'user_agent' => Request::userAgent()
        ]);
    }
    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        //
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}
