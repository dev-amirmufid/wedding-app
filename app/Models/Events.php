<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Events extends Model
{
    use HasFactory, HasUuids;
    protected $fillable = ['id','event_name','start','end','desc','address','short_address','quota','quota_guest','image'];

    public function waBlastTemplates():HasMany
    {
        return $this->hasMany(WaBlastTemplate::class,'event_id');
    }

    public function invitations():HasMany
    {
        return $this->hasMany(Invitations::class,'event_id');
    }

    // your custom attribute 
    public function getEventDatesAttribute()
    {
        $start = Carbon::createFromFormat('Y-m-d H:i:s', $this->start);
        $end = $this->end ? Carbon::createFromFormat('Y-m-d H:i:s', $this->end) : null;

        if(empty($end)){
            return $start->isoFormat('dddd, D MMMM Y');
        } else if($start->format('Ymd') === $end->format('Ymd')){
            return $start->isoFormat('dddd, D MMMM Y');
        } else {
            return $start->isoFormat('dddd, D MMMM Y') .' s/d '. $end->isoFormat('dddd, D MMMM Y');
        }
    }

    // your custom attribute 
    public function getEventHoursAttribute()
    {
        $start = Carbon::createFromFormat('Y-m-d H:i:s', $this->start);
        $end = $this->end ? Carbon::createFromFormat('Y-m-d H:i:s', $this->end) : null;

        if(empty($end)){
            return $start->format('h:i A') .' s/d '. 'Selesai';
        } else if($start->format('Ymd') === $end->format('Ymd')){
            return $start->format('h:i A') .' s/d '. $end->format('h:i A');
        } else {
            return $start->isoFormat('dddd, D MMMM Y') .' '. $start->format('h:i A') .' s/d '. $end->isoFormat('dddd, D MMMM Y') .' '.$end->format('h:i A');
        }
    }

    // your custom attribute 
    public function getEventFullDatesAttribute()
    {
        $start = Carbon::createFromFormat('Y-m-d H:i:s', $this->start);
        $end = $this->end ? Carbon::createFromFormat('Y-m-d H:i:s', $this->end) : null;

        if(empty($end)){
            return $start->isoFormat('dddd, D MMMM Y') .' '. $start->format('h:i A') .' s/d '. 'Selesai';
        } else if($start->format('Ymd') === $end->format('Ymd')){
            return $start->isoFormat('dddd, D MMMM Y') .' '. $start->format('h:i A') .' s/d '. $end->format('h:i A');
        } else {
            return $start->isoFormat('dddd, D MMMM Y') .' '. $start->format('h:i A') .' s/d '. $end->isoFormat('dddd, D MMMM Y') .' '.$end->format('h:i A');
        }
    }


}
