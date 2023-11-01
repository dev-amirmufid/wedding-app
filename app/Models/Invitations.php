<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invitations extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'event_id',
        'invitation_id'
    ];

    public function list_invitations():BelongsTo
    {
        return $this->belongsTo(InvitationList::class,'invitation_id')->orderBy('created_at');
    }

    public function list_events():BelongsTo
    {
        return $this->belongsTo(Events::class,'event_id')->orderBy('start');
    }
}
