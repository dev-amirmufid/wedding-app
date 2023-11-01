<?php

namespace App\Http\Controllers;

use App\Http\Resources\ApiResource;
use App\Models\WaBlastTemplate;
use App\Models\Events;
use App\Models\InvitationList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class WaBlastTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $events = Events::all();
        $waTemplates = WaBlastTemplate::all();
        $invitations_count = InvitationList::count();
        
        $delivered = DB::table('invitation_lists')
        ->selectRaw('COUNT(invitation_lists.id) as count')
        ->where('invitation_lists.delivered_status',1)
        ->first();
        
        $total = DB::table('invitation_lists')
        ->selectRaw('COUNT(invitation_lists.id) as count')
        ->first();
        

        return Inertia::render('WaBlastTemplate/WaBlastTemplate', [
            'events' => $events,
            'waTemplates' => $waTemplates,
            'waDeliveredCount' => [
                'delivered' => $delivered->count,
                'total' => $total->count
            ]
        ]);
    }

    public function waBlastInvitations() {
        $delivered = DB::table('invitation_lists')
        ->selectRaw('COUNT(invitation_lists.id) as count')
        ->where('invitation_lists.delivered_status',1)
        ->first();
        
        $total = DB::table('invitation_lists')
        ->selectRaw('COUNT(invitation_lists.id) as count')
        ->first();
        
        return response(new ApiResource(true,'waBlastInvitations',[
            'delivered' => $delivered->count,
            'total' => $total->count
        ]),200);
    }

    /**
     * Show a listing of the resource.
     */
    public function list_by_event(WaBlastTemplate $wbt,$event_id)
    {
        $query = $wbt->where('event_id',$event_id);
        return response(new ApiResource(true,'Event Lists',$query->get()),200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WaBlastTemplate $wbt, $id)
    {
        $validator = Validator::make($request->all(), [
            'template_name' => ['string', 'required','max:100'],
            'title' => ['string', 'required','max:100'],
            'message' => ['string','required']
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response(new ApiResource(false,'validation',$validator->errors()),442);
        }
        $wbt->find($id)->update($request->all());
        return response(new ApiResource(true,'Wa Blast Template '.$request->template_name.' Berhasil Diubah!',$wbt->find($id),201));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WaBlastTemplate $wbt,$id)
    {
        $x = $wbt->find($id);
        $x->delete();
        return response(new ApiResource(true,'Wa Blast Template '.$x->template_name.' Berhasil Dihapus!',[],204));
    }
}
