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

    // has many favorites
    public function favorites()
    {
        return $this->hasMany(Favorite::class, 'picture_id', 'id');
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
     * Created_at attribute formate
     */
    public function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Carbon::parse($value)->diffForHumans()
        );
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
