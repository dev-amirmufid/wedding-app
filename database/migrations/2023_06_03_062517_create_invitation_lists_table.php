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

        Schema::create('invitation_lists', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nickname',100);
            $table->string('fullname',150);
            $table->string('whatsapp',20);
            $table->tinyInteger('guest_max')->default(1);
            $table->string('labels')->nullable();;
            $table->tinyInteger('delivered_status')->default(0);
            $table->tinyInteger('rsvp_status')->default(0);
            $table->tinyInteger('present_status')->default(0);
            $table->dateTime('arrived_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitation_lists');
    }
};
