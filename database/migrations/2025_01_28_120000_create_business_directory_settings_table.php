<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('business_directory_settings', function (Blueprint $table) {
            $table->id();
            $table->string('title')->default('Business Directory');
            $table->text('description')->nullable();
            $table->json('menu_items')->nullable();
            $table->json('config_sections')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('business_directory_settings');
    }
};