<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WaBlastTemplate extends Model
{
    use HasFactory, HasUuids;
    protected $fillable = [
        'id',
        'template_name',
        'title',
        'message'
    ];
    
    public function event()
    {
        return $this->belongsTo('Event');
    }
}
