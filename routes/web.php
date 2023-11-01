<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\InvitationListController;
use App\Http\Controllers\QRScanner;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\WaBlastTemplateController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/site/{invitation_id}', [SiteController::class, 'index'])->name('site');

Route::middleware('auth')->group(function () {
    Route::get('/', [DashboardController::class, 'dashboard'])->name('dashboard');

    Route::get('/events', [EventsController::class, 'index'])->name('events');
    Route::get('/events/add', [EventsController::class, 'create'])->name('events.create');
    Route::get('/events/edit/{id}', [EventsController::class, 'edit'])->name('events.edit');

    Route::get('/invitations', [InvitationListController::class, 'index'])->name('invitations');
    Route::get('/invitations/add', [InvitationListController::class, 'create'])->name('invitations.create');
    Route::get('/invitations/edit/{id}', [InvitationListController::class, 'edit'])->name('invitations.edit');


    Route::get('/wa-blast-template', [WaBlastTemplateController::class, 'index'])->name('wa_blast_template');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/qrscanner', [QRScanner::class, 'index'])->name('qrscanner');

});

require __DIR__.'/auth.php';
