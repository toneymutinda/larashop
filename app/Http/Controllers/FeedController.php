<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Feed;
use Illuminate\Support\Facades\Response;
use App\Product;

class FeedController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $feeds = Feed::with(['shop', 'shop.products'])->get();

        return response()->json([
            'feeds' => $feeds
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $feed = Feed::find($id);

        if(!$feed){
            return response()->json([
                'errors' => 'Feed not found'
            ]);
        }

        // download csv here
        $shop = $feed->shop()->first();
        $products = $shop->products()->get();

        $headers = [
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',   
            'Content-type' => 'text/csv',   
            'Content-Disposition' => 'attachment; filename=feed.csv', 
            'Expires' => '0',   
            'Pragma' => 'public'
        ];

        $mycolumns = [];

        $product_columns = Product::all(['name', 'title', 'brand', 'sales_price', 'description', 'quantity', 'created_at'])->toArray();

        array_unshift($product_columns, array_keys($product_columns[0]));
        $columns = array_values($product_columns[0]);
        array_push($mycolumns, $columns);

        $callback = function() use ($mycolumns) 
        {
            $file = fopen('php://output', 'w');
            fputcsv($file, $mycolumns[0]);
            fclose($file);            
        };

        return response()->streamDownload($callback, 200, $headers);
    
        //return Response::stream($callback, 200, $headers);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
