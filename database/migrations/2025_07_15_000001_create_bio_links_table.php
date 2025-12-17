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
        Schema::create('bio_links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('created_by')->constrained('users')->nullable()->onDelete('cascade');
            $table->string('name')->nullable();
            $table->string('slug')->unique();
            $table->string('link_type')->nullable()->default('personal'); // personal, business, portfolio, social
            $table->string('custom_domain')->nullable();
            $table->string('url_prefix')->nullable()->default('bio');
            $table->string('password')->nullable();
            $table->boolean('password_enabled')->default(false);
            $table->json('config')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            // Add indexes for better performance
            $table->index('created_by');
            $table->index('slug');
            $table->index('custom_domain');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bio_links');
    }
};