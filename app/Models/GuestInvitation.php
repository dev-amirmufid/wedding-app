<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuestInvitation extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    public $incrementing = false;
}
