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
        Schema::table('users', function (Blueprint $table) {
            // Add foreign key constraint for plan_id after plans table exists
            $table->foreign('plan_id')->references('id')->on('plans')->nullOnDelete();
            // Add foreign key constraint for current_business after businesses table exists
            $table->foreign('current_business')->references('id')->on('businesses')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['plan_id']);
        });
    }
};