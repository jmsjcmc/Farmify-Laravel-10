<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    //
    public function index()
    {
        $this->authorize('accessAdmin');
        return Inertia::render('Admin/Dashboard');
    }
}
