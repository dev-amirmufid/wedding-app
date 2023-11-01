<?php

namespace App\Http\Controllers;

use App\Http\Resources\ApiResource;
use App\Models\Events;
use App\Models\InvitationList;
use App\Models\WaBlastTemplate;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;

class InvitationListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : Response
    {
        $events = Events::orderBy('start')->get();
        $waTemplate = WaBlastTemplate::orderBy('created_at')->get();
        return Inertia::render('Invitations/Invitations',[
            'meta' => [
                'title' => 'Invitations List',
                'head' => 'Invitations'
            ],
            'events' => $events,
            'waTemplate' => $waTemplate
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(InvitationList $invitations)
    {
        //
    }

    /**
     * Display the form for creating a new resource.
     */
     public function create() : Response
     {
        $events = DB::table('events')
        ->select('events.*')
        ->selectRaw('SUM(invitation_lists.guest_max) as sum_guest_max')
        ->leftJoin('invitations', 'invitations.event_id', '=', 'events.id')
        ->leftJoin('invitation_lists', 'invitations.invitation_id', '=', 'invitation_lists.id')
        ->groupBy('events.id')
        ->orderBy('events.created_at', 'asc')
        ->get();

         return Inertia::render('Invitations/InvitationsAdd',[
            'meta' => [
                'title' => 'Add Invitation',
                'head' => 'Add Invitation'
            ],
            'events' => $events
        ]);
     }

    /**
     * Display the form for editing the specified resource.
     */
    public function edit(InvitationList $invitations,$id)
    {        
        $events = DB::table('events')
        ->select('events.*')
        ->selectRaw('SUM(invitation_lists.guest_max) as sum_guest_max')
        ->leftJoin('invitations', 'invitations.event_id', '=', 'events.id')
        ->leftJoin('invitation_lists', 'invitations.invitation_id', '=', 'invitation_lists.id')
        ->groupBy('events.id')
        ->orderBy('events.start', 'asc')
        ->get();

        return Inertia::render('Invitations/InvitationsEdit',[
           'meta' => [
               'title' => 'Edit Invitation',
               'head' => 'Edit Invitation'
           ],
           'events' => $events,
           'data' => $invitations->with(['events','events.list_events'])->find($id)
       ]);
    }

    /**
     * Show a listing of the resource.
     */
    public function list(InvitationList $invitations,Request $request)
    {
        $query = $invitations->query();
        
        if(isset($request->filter_event_id) && !empty($request->filter_event_id)){
            $query->whereRelation('events', 'event_id',$request->filter_event_id);
        }

        if(isset($request->search) && !empty($request->search)){
            $query->where('fullname','LIKE','%'.$request->search.'%');
        }
        if(isset($request->filter_delivered_status)){
            $query->where('delivered_status',$request->filter_delivered_status);
        }
        return response(new ApiResource(true,'Invitaions',$query->paginate($request->per_page)),200);
    }

    /**
     * Show the specified resource
     */
    public function get(InvitationList $invitations, $id)
    {
        $query = $invitations->find($id);
        return response(new ApiResource(true,'Invitaions',$query),200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullname' => ['string', 'required','max:150'],
            'greeting' => ['string', 'required','max:100'],
            'guest_max' => ['numeric','required','min:1','max:5'],
            'labels' => ['string','required'],
            'whatsapp' => ['string', 'required', 'max:20'],
            'inv_type' => ['string', 'required']
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response(new ApiResource(false,'validation',$validator->errors()),442);
        }

        $data = InvitationList::create([
            'fullname' => $request->fullname,
            'greeting' => $request->greeting,
            'guest_max' => $request->guest_max,
            'labels' => $request->labels,
            'whatsapp' => $request->whatsapp,
            'inv_type' => $request->inv_type
        ]);

        $invitationsRel = [];

        foreach ($request->event_ids as $event_id){
            array_push($invitationsRel,[
                'event_id' => $event_id,
            ]);
        }
        
        $data->events()->delete();
        $data->events()->createMany($invitationsRel);

        return response(new ApiResource(true,'Invitation '.$request->fullname.' Berhasil Ditambahkan',$data),201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InvitationList $invitations, $id)
    {
        $validator = Validator::make($request->all(), [
            'fullname' => ['string', 'required','max:150'],
            'greeting' => ['string', 'required','max:100'],
            'labels' => ['string','required'],
            'whatsapp' => ['string', 'required', 'max:20'],
            'inv_type' => ['string', 'required']
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response(new ApiResource(false,'validation',$validator->errors()),442);
        }
        $update = $invitations->find($id);
        $update->update($request->all());

        $invitationsRel = [];

        if($request->event_ids){
            foreach ($request->event_ids as $event_id){
                array_push($invitationsRel,[
                    'event_id' => $event_id,
                ]);
            }
            
            $update->events()->delete();
            $update->events()->createMany($invitationsRel);
        }
        return response(new ApiResource(true,'Invitation '.$request->fullname.' Berhasil Diubah!',$update,201));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update_rsvp_status(Request $request, InvitationList $invitations, $id)
    {
        $validator = Validator::make($request->all(), [
            'rsvp_status' => ['numeric', 'required'],
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response(new ApiResource(false,'validation',$validator->errors()),442);
        }
        $update = $invitations->find($id);
        $update->update([
            'rsvp_status' => $request->rsvp_status
        ]);

        return response(new ApiResource(true,'Invitation RSVP update',$update,201));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update_delivered_status(Request $request,InvitationList $invitations, $id)
    {
        $validator = Validator::make($request->all(), [
            'delivered_status' => ['numeric', 'required'],
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response(new ApiResource(false,'validation',$validator->errors()),442);
        }
        $update = $invitations->find($id);
        $update->update([
            'delivered_status' => $request->delivered_status
        ]);

        return response(new ApiResource(true,'Invitation Delivered update',$update,201));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InvitationList $invitations, $id)
    {
        $x = $invitations->findOrFail($id);
        $x->delete();
        return response(new ApiResource(true,'Invitation '.$x->fullname.' Berhasil Dihapus!',[],204));
    }
}
