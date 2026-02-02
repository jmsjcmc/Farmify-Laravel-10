<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index()
{
    return Inertia::render('Admin/Dashboard', [
        'stats' => [
            'users' => User::count(),
            'orders' => 0, // placeholder
            'revenue' => 0, // placeholder
        ],
    ]);
}
}
