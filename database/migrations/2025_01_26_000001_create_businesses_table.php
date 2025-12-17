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
        Schema::create('businesses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->string('business_type'); // theme type
            $table->json('config_sections'); // config section array
            $table->enum('domain_type', ['slug', 'subdomain', 'domain']);
            $table->string('custom_domain')->nullable();
            $table->string('url_prefix')->default('v');
            $table->string('password')->nullable();
            $table->boolean('password_enabled')->default(false);
            $table->integer('view_count')->default(0);
            $table->unsignedBigInteger('created_by');
            $table->timestamps();

            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->index(['created_by', 'business_type']);
            $table->unique(['slug', 'url_prefix'], 'businesses_slug_url_prefix_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('businesses');
    }
};