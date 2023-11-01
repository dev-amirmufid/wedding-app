<?php

namespace App\Http\Controllers;

use App\Models\Events;
use App\Models\InvitationList;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function dashboard(Request $request): Response
    {
        $events = Events::all();
        $invitationCount = InvitationList::count();
        return Inertia::render('Dashboard/Dashboard', [
            'events' => $events,
            'invitationCount' => $invitationCount
        ]);
    }

}
