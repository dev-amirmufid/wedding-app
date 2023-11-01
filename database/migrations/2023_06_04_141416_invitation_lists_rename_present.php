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
        Schema::table('invitation_lists', function (Blueprint $table) {
            $table->tinyInteger('arrived_status')->default(0)->after('present_status');
            $table->dropColumn('present_status');
        }); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invitation_lists', function (Blueprint $table) {
            $table->tinyInteger('present_status')->default(0)->after('arrived_status');
            $table->dropColumn('arrived_status');
        }); 
    }
};
