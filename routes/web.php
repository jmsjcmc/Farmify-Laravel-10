<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });


Route::get('/', function () {
    if (Auth::check()) {
        // Redirect based on role
        $user = Auth::user();
        if ($user->hasRole('consumer')) {
            return redirect()->route('consumer.ecommerce');
        }

        // fallback for other roles
        return redirect()->route('dashboard');
    }

    return Inertia::render('LandingPage');
})->name('landing');

// Consumer Ecommerce Home
// Route::get('/consumer', function () {
//     return Inertia::render('Consumer/EcommerceHome');
// })->middleware(['auth', 'verified'])->name('consumer.ecommerce');
// Authenticated Ecommerce
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/consumer/ecommerce', fn() => Inertia::render('Consumer/EcommerceHome'))
        ->name('consumer.ecommerce');
});

// Guest Ecommerce (no auth required)
Route::get('/guest/ecommerce', fn() => Inertia::render('Consumer/EcommerceHomeGuest'))
    ->name('guest.ecommerce');

// Other routes (admin, manager) can still use /dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
require __DIR__.'/auth.php';
