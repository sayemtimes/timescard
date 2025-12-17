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
        Schema::create('addons', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('slug')->nullable();
            $table->string('version')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('category')->default('general');
            $table->boolean('is_enabled')->default(false);
            $table->string('package_name')->nullable();
            $table->float('monthly_price',30, 2)->default(0);
            $table->float('yearly_price',30, 2)->default(0);
            $table->json('config')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addons');
    }
};
