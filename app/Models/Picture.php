<?php

namespace App\Models;

use Carbon\Carbon;
use Cviebrock\EloquentSluggable\Sluggable;
use Cviebrock\EloquentSluggable\SluggableScopeHelpers;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Picture extends Model
{
    use HasFactory, SoftDeletes, Sluggable, SluggableScopeHelpers;

    protected $fillable = [
        "title",
        "slug",
        "image",
        "description",
        "size",
        "dimension",
        "views",
        "downloads",
    ];


    // User relation
    public function user()
    {
        return $this->belongsTo(User::class);
    }


    // Tags relation
    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }


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


    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }

    /**
     * Deleted-at attribute formate
     */
    protected function deletedAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? Carbon::createFromFormat('Y-m-d H:i:s', $value)->format('Y-m-d H:i') : null
        );
    }
}
