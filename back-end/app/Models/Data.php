<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Data extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'attendance', 'message', 'card_id'
    ];

    public function card()
    {
        return $this->belongsTo(Card::class);
    }
}
