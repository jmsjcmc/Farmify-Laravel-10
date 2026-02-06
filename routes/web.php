<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public / Landing
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    if (! Auth::check()) {
        return Inertia::render('LandingPage');
    }

    return match (true) {
        Auth::user()->hasRole('consumer') => redirect()->route('consumer.ecommerce'),
        Auth::user()->hasRole('admin') => redirect()->route('admin.dashboard'),
        Auth::user()->hasRole('farm_owner') => redirect()->route('farm-owner.dashboard'),
        default => redirect()->route('dashboard'),
    };
})->name('landing');

/*
|--------------------------------------------------------------------------
| Guest Routes
|--------------------------------------------------------------------------
*/

Route::get('/guest/ecommerce', fn () =>
    Inertia::render('Consumer/EcommerceHomeGuest')
)->name('guest.ecommerce');
Route::get('/guest/jobs', fn() =>
    Inertia::render('Consumer/JobFinderGuest'))->name('guest.jobs');
/*
|--------------------------------------------------------------------------
| Authenticated Routes (All Users)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn () =>
        Inertia::render('Dashboard')
    )->name('dashboard');

    Route::get('/profile/settings', fn () =>
        Inertia::render('Profile/Setting')
    )->name('profile.settings');

    Route::get('/jobs', fn () =>
        Inertia::render('Consumer/JobFinder')
    )->name('job-find');
});

/*
|--------------------------------------------------------------------------
| Consumer Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified', 'role:consumer'])
    ->prefix('consumer')
    ->name('consumer.')
    ->group(function () {
        Route::get('/ecommerce', fn () =>
            Inertia::render('Consumer/EcommerceHome')
        )->name('ecommerce');

        Route::get('/farm-owner/apply', fn () =>
            Inertia::render('Consumer/FarmOwner/Apply')
        )->name('farm-owner.apply');
    });

/*
|--------------------------------------------------------------------------
| Farm Owner Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified', 'role:farm_owner'])
    ->prefix('farm-owner')
    ->name('farm-owner.')
    ->group(function () {
        Route::get('/dashboard', fn () =>
            Inertia::render('FarmOwner/Dashboard')
        )->name('dashboard');
    });

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])
            ->name('dashboard');

        Route::get('/users', [UserController::class, 'index'])
            ->name('users.index');
    });

/*
|--------------------------------------------------------------------------
| Profile (Controller-based)
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
