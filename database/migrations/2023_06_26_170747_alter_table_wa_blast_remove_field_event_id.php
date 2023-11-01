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
        Schema::table('wa_blast_templates', function (Blueprint $table) {
            $table->dropColumn('event_id');
        }); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('wa_blast_templates', function (Blueprint $table) {
            $table->uuid('event_id')->after('id');
        }); 
    }
};
