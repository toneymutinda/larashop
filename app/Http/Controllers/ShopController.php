<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Shop;
use App\Feed;
use App\Product;

class ShopController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $shops = Shop::with('products')->get();
        return response()->json([
            'shops' => $shops
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
        $validator = \Validator::make($request->all(), [
            'storename' => 'required',
            'storeurl' => 'required',
            'currency' => 'required'
        ]);

        if($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()]);
        }

        $shop = new Shop;
        $shop->store_name = $request->storename;
        $shop->store_url = $request->storeurl;
        $shop->currency = $request->currency;
        $shop->save();

        return response()->json(['success' => 'Shop added successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $shop = Shop::with(['products', 'feed'])->find($id);

        if(!$shop) {
            return response()->json([
                'errors' => 'Shop does not exist'
            ]);
        }

        return response()->json([
            'shop' => $shop
        ]);

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

    public function createFeed(Request $request, $id)
    {
        $shop = Shop::find($id);

        if(!$shop) {
            return response()->json([
                'errors' => 'Shop does not exist'
            ]);
        }

        // validation
        $validator = \Validator::make($request->all(), [
            'channel' => 'required',
        ]);

        if($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()]);
        }

        if($request->channel !== "google") {
            return response()->json(['errors' => 'The channel must be google']);
        }

        $feed = new Feed;
        $feed->channel = $request->channel;
        $feed->shop_id = $shop->id;
        $feed->save();

        return response()->json(['success' => 'Feed added successfully']);
    }

    public function addProduct(Request $request, $id)
    {
        $shop = Shop::find($id);

        if(!$shop) {
            return response()->json([
                'errors' => 'Shop does not exist'
            ]);
        }

        // validation
        $validator = \Validator::make($request->all(), [
            'name' => 'required',
            'title' => 'required',
            'brand' => 'required',
            'salesprice' => 'required|numeric',
            'description' => 'required',
            'quantity' => 'required|integer'
        ]);

        if($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()]);
        }

        $product = new Product;
        $product->name = $request->name;
        $product->title = $request->title;
        $product->brand = $request->brand;
        $product->sales_price = $request->salesprice;
        $product->description = $request->description;
        $product->quantity = $request->quantity;
        $product->shop_id = $shop->id;
        $product->save();

        return response()->json([
            'success' => 'Product added successfully',
            'product' => $product
        ]);
    }

    public function getProducts($id)
    {
        $shop = Shop::find($id);

        if(!$shop){
            return response()->json([
                'errors' => 'Shop not found'
            ]);
        }

        $products = $shop->products()->get();

        return response()->json([
            'products' => $products
        ]);
    }
}
