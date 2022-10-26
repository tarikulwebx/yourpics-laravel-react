<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'picture_id'
    ];

    // Belongs to User model
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Belongs to Picture model
    public function picture()
    {
        return $this->belongsTo(Picture::class, 'picture_id');
    }
}
