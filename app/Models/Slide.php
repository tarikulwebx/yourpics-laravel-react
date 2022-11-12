<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Slide extends Model
{
    use HasFactory;

    protected $fillable = [
        "title",
        "description",
        "image",
        "button_1_link",
        "button_1_text",
        "button_2_link",
        "button_2_text",
    ];


    /**
     * Get the image url
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => url("/") . "/storage/" . $value,
        );
    }
}
