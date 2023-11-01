<?php

namespace App\Http\Controllers;

use App\Models\InvitationList;
use Carbon\Carbon;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class SiteController extends Controller
{
    /**
     * Display the website .
     */
    public function index(InvitationList $invitations, $id)
    {
        $married_date = '2023-07-08 09:00:00';
        $inv = $invitations->with(['events','events.list_events'])->find($id);
        $qrcode = QrCode::size(512)
        ->errorCorrection('M')
        ->generate($inv->id);

        return view('website', [
            'invitation' => $inv,
            'events' => $inv->events->sortBy('list_events.start')->all(),
            'married_date' => $married_date,
            'date' => Carbon::createFromFormat('Y-m-d H:i:s', $married_date)->isoFormat('dddd, D MMMM Y'),
            'qrcode' => $qrcode
        ]);
    }

}
