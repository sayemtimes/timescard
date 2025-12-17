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
        Schema::table('contacts', function (Blueprint $table) {
            $table->string('subject')->nullable()->after('email');
            $table->boolean('is_landing_page')->default(false)->after('business_id');
            
            // Make business_id nullable for landing page contacts
            $table->dropForeign(['business_id']);
            $table->unsignedBigInteger('business_id')->nullable()->change();
            $table->foreign('business_id')->references('id')->on('businesses')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->dropColumn(['subject', 'is_landing_page']);
            
            // Restore business_id as not nullable
            $table->dropForeign(['business_id']);
            $table->unsignedBigInteger('business_id')->nullable(false)->change();
            $table->foreign('business_id')->references('id')->on('businesses')->onDelete('cascade');
        });
    }
};