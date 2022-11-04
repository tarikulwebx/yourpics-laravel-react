<?php

namespace App\Models;

use Carbon\Carbon;
use Cviebrock\EloquentSluggable\Sluggable;
use Cviebrock\EloquentSluggable\SluggableScopeHelpers;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory, Sluggable, SluggableScopeHelpers;

    protected $fillable = [
        'name',
        'slug',
    ];

    // Picture relation
    public function pictures()
    {
        return $this->belongsToMany(Picture::class);
    }

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }


    /**
     * Created_at attribute formate
     */
    public function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Carbon::parse($value)->format('M d, Y')
        );
    }
}
