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
        Schema::table('domain_requests', function (Blueprint $table) {
            $table->foreignId('biolink_id')->nullable()->constrained('bio_links')->onDelete('cascade')->after('business_id');
            $table->foreignId('business_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('domain_requests', function (Blueprint $table) {
            $table->dropForeign(['biolink_id']);
            $table->dropColumn('biolink_id');
            $table->foreignId('business_id')->nullable(false)->change();
        });
    }
};
