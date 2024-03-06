<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'image',
        'audio',
        'location',
    ];

    public function Data()
    {
        return $this->hasMany(Data::class);
    }
}
