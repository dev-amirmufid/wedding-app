<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InvitationList extends Model
{
    use HasFactory, HasUuids;
    protected $fillable = [
        'id',
        'greeting',
        'fullname',
        'whatsapp',
        'guest_max',
        'guest_arrived',
        'labels',
        'delivered_status',
        'rsvp_status',
        'arrived_status',
        'souvenir_status',
        'inv_type',
        'arrived_at'
    ];

    public function events():HasMany
    {
        return $this->hasMany(Invitations::class,'invitation_id');
    }
}
