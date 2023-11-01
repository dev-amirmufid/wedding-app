<?php

namespace App\Http\Controllers;

use App\Models\GuestMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ApiResource;

class GuestMessageController extends Controller
{

    public function list()
    {
        $data = GuestMessage::with('invitation')->orderBy('created_at', 'desc')->get();

        return response(new ApiResource(true,'Get Messages',$data),200);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'invitation_id' => ['required'],
            'message' => ['string', 'required','max:255'],
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response(new ApiResource(false,'validation',$validator->errors()),442);
        }

        $data = GuestMessage::create([
            'invitation_id' => $request->invitation_id,
            'message' => $request->message
        ]);

        return response(new ApiResource(true,'Message Berhasil Ditambahkan',$data),201);
    }
}
