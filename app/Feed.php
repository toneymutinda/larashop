<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Feed extends Model
{
    public function shop()
    {
        return $this->belongsTo('App\Shop');
    }
}
