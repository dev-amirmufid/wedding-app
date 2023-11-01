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
            $table->tinyInteger('souvenir_status')->default(0)->after('arrived_status');
            $table->dropColumn('guest_rsvp');
        }); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invitation_lists', function (Blueprint $table) {
            $table->tinyInteger('guest_rsvp')->default(0)->after('guest_max');
            $table->dropColumn('souvenir_status');
        }); 
    }
};
