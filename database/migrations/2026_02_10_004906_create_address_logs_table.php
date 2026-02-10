<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('address_logs', function (Blueprint $table) {
            $table->id();

            $table->foreignId('address_id')
            ->constrained()
            ->cascadeOnDelete();

            $table->string('action');
            $table->json('old_values')->nullable();
            $table->json('new_values')->nullable();

            $table->ipAddress('ip_address')->nullable();
            $table->string('user_agent')->nullable();

            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('address_logs');
    }
};
