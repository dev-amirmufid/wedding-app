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
            $table->tinyInteger('greeting')->default(0)->after('nickname');
            $table->dropColumn('nickname');
        }); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invitation_lists', function (Blueprint $table) {
            $table->tinyInteger('nickname')->default(0)->after('greeting');
            $table->dropColumn('greeting');
        }); 
    }
};
