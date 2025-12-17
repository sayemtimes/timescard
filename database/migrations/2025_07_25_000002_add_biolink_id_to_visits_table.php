<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBiolinkIdToVisitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table(config('visitor.table_name'), function (Blueprint $table) {
            if (!Schema::hasColumns(config('visitor.table_name'), ['biolink_id'])) {
                $table->foreignId('biolink_id')->nullable()->after('business_id')->constrained('bio_links')->onDelete('cascade');
                $table->index('biolink_id');
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table(config('visitor.table_name'), function (Blueprint $table) {
            if (Schema::hasColumns(config('visitor.table_name'), ['biolink_id'])) {
                $table->dropForeign(['biolink_id']);
                $table->dropIndex(['biolink_id']);
                $table->dropColumn('biolink_id');
            }
        });
    }
}