<?php

namespace App\Http\Controllers;

use App\Http\Resources\ApiResource;
use App\Models\Events;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;
use App\Helper\FileUpload;

class EventsController extends Controller
{
    use FileUpload;
    /**
     * Display a listing of the resource.
     */
    public function index() : Response
    {
        return Inertia::render('Events/Events',[
            'meta' => [
                'title' => 'Events List',
                'head' => 'Events'
            ]
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Events $events)
    {
        //
    }

    /**
     * Display the form for creating a new resource.
     */
     public function create() : Response
     {
         return Inertia::render('Events/EventsAdd',[
            'meta' => [
                'title' => 'Add Event',
                'head' => 'Add Event'
            ]
        ]);
     }

    /**
     * Display the form for editing the specified resource.
     */
    public function edit(Events $events,$id)
    {
        return Inertia::render('Events/EventsEdit',[
           'meta' => [
               'title' => 'Edit Event',
               'head' => 'Edit Event'
           ],
           'data' => $events->find($id)
       ]);
    }

    /**
     * Show a listing of the resource.
     */
    public function list(Events $events,Request $request)
    {
        $query = $events->query();
        
        if(isset($request->search) && !empty($request->search)){
            $query->where('event_name','LIKE','%'.$request->search.'%');
        }

        return response(new ApiResource(true,'Event Lists',$query->paginate($request->per_page)),200);
    }

    /**
     * Show the specified resource
     */
    public function get(Events $events,$id)
    {
        $query = $events->find($id);

        return response(new ApiResource(true,'Event',$query),200);
    }
    
    /**
     * Show the specified resource
     */
    public function dashboard(Events $events,$id)
    {
        $totalInvitations = DB::table('invitation_lists')
        ->selectRaw('COUNT(invitation_lists.id) as count')
        ->join('invitations', 'invitations.invitation_id', '=', 'invitation_lists.id')
        ->where('invitations.event_id',$id)
        ->first();

        $waBlastInvitations = DB::table('invitation_lists')
        ->selectRaw('COUNT(invitation_lists.id) as count')
        ->where('invitation_lists.delivered_status',1)
        ->first();
        
        $rsvpInvitations = DB::table('invitation_lists')
        ->selectRaw('COUNT(invitation_lists.id) as count')
        ->join('invitations', 'invitations.invitation_id', '=', 'invitation_lists.id')
        ->where('invitations.event_id',$id)
        ->where('invitation_lists.rsvp_status',1)
        ->first();
        
        $arrivedInvitations = DB::table('invitation_lists')
        ->selectRaw('COUNT(invitation_lists.id) as count')
        ->join('invitations', 'invitations.invitation_id', '=', 'invitation_lists.id')
        ->where('invitations.event_id',$id)
        ->where('invitation_lists.arrived_status',1)
        ->first();

        $guestInvitations = DB::table('invitation_lists')
        ->selectRaw('SUM(invitation_lists.guest_arrived) as count')
        ->join('invitations', 'invitations.invitation_id', '=', 'invitation_lists.id')
        ->where('invitations.event_id',$id)
        ->first();
        
        $souvenirInvitations = DB::table('invitation_lists')
        ->selectRaw('COUNT(invitation_lists.id) as count')
        ->join('invitations', 'invitations.invitation_id', '=', 'invitation_lists.id')
        ->where('invitations.event_id',$id)
        ->where('invitation_lists.souvenir_status',1)
        ->first();
        
        $invitationByLabels = DB::table('invitation_lists')
        ->selectRaw('invitation_lists.labels,COUNT(invitation_lists.id) as count')
        ->join('invitations', 'invitations.invitation_id', '=', 'invitation_lists.id')
        ->where('invitations.event_id',$id)
        ->groupBy('invitation_lists.labels')
        ->distinct()->get();

        
        return response(new ApiResource(true,'Event Dashboard',[
            'totalInvitations' => (int) $totalInvitations->count,
            'waBlastInvitations' => (int) $waBlastInvitations->count,
            'rsvpInvitations' => (int) $rsvpInvitations->count,
            'souvenirInvitations' => (int) $souvenirInvitations->count,
            'arrivedInvitations' => (int) $arrivedInvitations->count,
            'guestInvitations' => (int) $guestInvitations->count,
            'invitationByLabels' => $invitationByLabels
        ]),200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'event_name' => ['string', 'required', 'max:150'],
            'start' => ['required', 'date','after_or_equal:'.date(DATE_ATOM)],
            'end' => ['nullable','date'],
            'quota' => ['numeric', 'required', 'min:1'],
            'quota_guest' => ['numeric', 'required', 'min:1'],
            'desc' => ['string'],
            'address' => ['string', 'required', 'max:800'],
            'short_address' => ['string', 'required', 'max:255'],
            'image' => ['required','image','mimes:jpeg,png,jpg,gif,svg','max:500048'],
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response(new ApiResource(false,'validation',$validator->errors()),442);
        }
        $insert = $request->all();
        if($file = $request->file('image')) {
            $fileData = $this->uploads($file,'images/events/');
            $insert["image"] = $fileData['filePath'];
        }

        $data = Events::create($insert);

        return response(new ApiResource(true,'Event '.$request->event_name.' Berhasil Ditambahkan',$data),201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Events $events, $id)
    {
        $validation_rules = [
            'event_name' => ['string', 'required', 'max:150'],
            'start' => ['required', 'date','after_or_equal:'.date(DATE_ATOM)],
            'end' => ['nullable','date'],
            'quota' => ['numeric', 'required', 'min:1'],
            'quota_guest' => ['numeric', 'required', 'min:1'],
            'desc' => ['string'],
            'address' => ['string', 'required', 'max:800'],
            'short_address' => ['string', 'required', 'max:255'],
            'image' => ['image','mimes:jpeg,png,jpg,gif,svg','max:500048'],
        ];

        if(!$request->file('image')) {
            unset($validation_rules["image"]);
        }
        
        $validator = Validator::make($request->all(), $validation_rules);

        //check if validation fails
        if ($validator->fails()) {
            return response(new ApiResource(false,'validation',$validator->errors()),442);
        }

        $update = $request->all();
        if($file = $request->file('image')) {
            $fileData = $this->uploads($file,'images/events/');
            $update["image"] = $fileData['filePath'];
        } else {
            unset($update["image"]);
        }

        $events->find($id)->update($update);
        return response(new ApiResource(true,'Event '.$request->event_name.' Berhasil Diubah!',$events->find($id),201));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Events $events, $id)
    {
        $x = $events->find($id);
        $x->delete();
        return response(new ApiResource(true,'Event '.$x->event_name.' Berhasil Dihapus!',[],204));
    }
}
