<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    protected $fillable = ['store_name', 'store_url', 'currency'];

    // public function user()
    // {
    //     return $this->belongsTo('App\User');
    // }

    public function products()
    {
        return $this->hasMany('App\Product');
    }

    public function feed()
    {
        return $this->hasOne('App\Feed');
    }
}
