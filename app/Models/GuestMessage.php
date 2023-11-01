<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GuestMessage extends Model
{
    use HasFactory, HasUuids;
    protected $fillable = [
        'id',
        'invitation_id',
        'message'
    ];
    protected $dates = [
        'created_at',
        'updated_at'
    ];

    public function invitation():BelongsTo
    {
        return $this->belongsTo(InvitationList::class,'invitation_id');
    }
}
