<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Route;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function redirectToLogin(): RedirectResponse
    {
        if (Route::has('login')) {
            return redirect()->route('login');
        }

        abort(404, 'Login route not found');
    }
}
