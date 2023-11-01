<?php

use App\Http\Controllers\EventsController;
use App\Http\Controllers\GuestMessageController;
use App\Http\Controllers\InvitationListController;
use App\Http\Controllers\WaBlastTemplateController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::middleware('auth:sanctum')->group(function () {
    Route::post('/events/stpre', [EventsController::class, 'store'])->name('events.store');
    Route::post('/events/update/{id}', [EventsController::class, 'update'])->name('events.update');
    Route::get('/events/dashboard/{id}', [EventsController::class, 'dashboard'])->name('events.dashboard');
    Route::get('/events', [EventsController::class, 'list'])->name('events.list');
    Route::get('/events/{id}', [EventsController::class, 'get'])->name('events.get');
    Route::delete('/events/{id}', [EventsController::class, 'destroy'])->name('events.destroy');

    Route::get('/invitations', [InvitationListController::class, 'list'])->name('invitations.list')->middleware('throttle:100,1');;
    Route::get('/invitations/{id}', [InvitationListController::class, 'get'])->name('invitations.get');
    Route::post('/invitations', [InvitationListController::class, 'store'])->name('invitations.store');
    Route::put('/invitations/update-rsvp/{id}', [InvitationListController::class, 'update_rsvp_status'])->name('invitations.update_rsvp_status');
    Route::put('/invitations/update-delivered/{id}', [InvitationListController::class, 'update_delivered_status'])->name('invitations.update_delivered_status')->middleware('throttle:100,1');;
    Route::put('/invitations/{id}', [InvitationListController::class, 'update'])->name('invitations.update');
    Route::delete('/invitations/{id}', [InvitationListController::class, 'destroy'])->name('invitations.destroy');
    
    Route::get('/wa-blast-template/{event_id}', [WaBlastTemplateController::class, 'list_by_event'])->name('wa_blast_template.list_by_event');
    Route::post('/wa-blast-template', [WaBlastTemplateController::class, 'store'])->name('wa_blast_template.store');
    Route::put('/wa-blast-template/{id}', [WaBlastTemplateController::class, 'update'])->name('wa_blast_template.update');
    Route::delete('/wa-blast-template/{id}', [WaBlastTemplateController::class, 'destroy'])->name('wa_blast_template.destroy');

    Route::get('/guest-message', [GuestMessageController::class, 'list'])->name('guest_message.list');
    Route::post('/guest-message', [GuestMessageController::class, 'store'])->name('guest_message.store');
// });
