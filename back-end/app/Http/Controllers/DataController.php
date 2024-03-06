<?php

namespace App\Http\Controllers;

use App\Models\Data;
use Illuminate\Http\Request;

class DataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $Data = Data::all();
        return view('Data.index', compact('Data'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('Data.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Data::create($request->all());
        return redirect()->route('Data.index')->with('success', 'Form data created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Data $Data)
    {
        return view('Data.show', compact('Data'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Data $Data)
    {
        return view('Data.edit', compact('Data'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Data $Data)
    {
        $Data->update($request->all());
        return redirect()->route('Data.index')->with('success', 'Form data updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Data $Data)
    {
        $Data->delete();
        return redirect()->route('Data.index')->with('success', 'Form data deleted successfully');
    }
}
