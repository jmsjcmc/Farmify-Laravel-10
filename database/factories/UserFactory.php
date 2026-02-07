<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected $model = User::class;

    /**
     * Cache the hashed password to avoid re-hashing.
     */
    protected static ?string $password = null;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $firstName = fake()->firstName();
        $lastName = fake()->lastName();

        return [
            'first_name' => $firstName,
            'last_name'  => $lastName,

            // Enterprise-safe username (unique + readable)
            'username' => Str::lower(
                $firstName . '.' . $lastName . fake()->numberBetween(100, 999)
            ),

            'email' => fake()->unique()->safeEmail(),

            'email_verified_at' => now(),

            'password' => static::$password ??= Hash::make('password'),

            'remember_token' => Str::random(10),

            // Explicit timestamp since updated_at is removed
            'created_at' => now(),
        ];
    }

    /**
     * Indicate that the user's email address is unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn () => [
            'email_verified_at' => null,
        ]);
    }
}
