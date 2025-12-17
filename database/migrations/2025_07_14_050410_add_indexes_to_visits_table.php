<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIndexesToVisitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable(config('visitor.table_name', 'shetabit_visits'))) {
            Schema::table(config('visitor.table_name', 'shetabit_visits'), function (Blueprint $table) {
                // Add indexes to improve query performance
                if (!Schema::hasIndex(config('visitor.table_name', 'shetabit_visits'), 'shetabit_visits_business_id_index')) {
                    $table->index('business_id');
                }
                
                if (!Schema::hasIndex(config('visitor.table_name', 'shetabit_visits'), 'shetabit_visits_created_at_index')) {
                    $table->index('created_at');
                }
                
                if (!Schema::hasIndex(config('visitor.table_name', 'shetabit_visits'), 'shetabit_visits_business_id_created_at_index')) {
                    $table->index(['business_id', 'created_at']);
                }
                
                if (!Schema::hasIndex(config('visitor.table_name', 'shetabit_visits'), 'shetabit_visits_ip_index')) {
                    $table->index('ip');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table(config('visitor.table_name', 'shetabit_visits'), function (Blueprint $table) {
            $table->dropIndex(['business_id']);
            $table->dropIndex(['created_at']);
            $table->dropIndex(['business_id', 'created_at']);
            $table->dropIndex(['ip']);
        });
    }
}