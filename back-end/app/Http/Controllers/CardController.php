<?php

namespace App\Http\Controllers;

use App\Models\Card;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use App\Models\Data;

class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Card::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $card = new Card();
        $request->validate([
            'title' => 'required|string',
            'image' => 'required|image',
            'audio' => 'nullable|file',
            'location' => 'nullable|string',
        ]);
        $card->title = $request->title;
        $card->location = $request->location;
        if ($request->hasFile('audio')) {
            $file = $request->file('audio');
            $filename = date('YmdHis') . '.' . $file->getClientOriginalExtension();
            $path = 'audios';
            $file->move($path, $filename);
            $card->audio = url('/') . '/audios/' . $filename;
        }
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = date('YmdHis') . '.' . $file->getClientOriginalExtension();
            $path = 'images';
            $file->move($path, $filename);
            $card->image = url('/') . '/images/' . $filename;
        }
        $card->save();

        return response()->json([
            'status' => 'success',
            'message' => "Card created successfully",
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Card::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Card $card)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $card = Card::findOrFail($id);
        $request->validate([
            'image' => 'nullable|image',
            'audio' => 'nullable|file',
            'location' => 'nullable|string',
        ]);

        // Update the fields that are present in the request
        $card->fill($request->only(['image', 'audio', 'location']));

        // Update the image if it exists in the request
        if ($request->hasFile('image')) {
            $oldpath = public_path() . '/images/' . substr($card->image, strrpos($card->image, '/') + 1);

            if (File::exists($oldpath)) {
                File::delete($oldpath);
            }
            $file = $request->file('image');
            $filename = date('YmdHis') . '.' . $file->getClientOriginalExtension();
            $card->image = url('/') . '/images/' . $filename;
            $path = 'images';
            $file->move($path, $filename);
        }

        // Update the audio if it exists in the request
        if ($request->hasFile('audio')) {
            $oldaudio = public_path() . '/audios/' . substr($card->audio, strrpos($card->audio, '/') + 1);

            if (File::exists($oldaudio)) {
                File::delete($oldaudio);
            }
            $file = $request->file('audio');
            $filename = date('YmdHis') . '.' . $file->getClientOriginalExtension();
            $card->audio = url('/') . '/audios/' . $filename;
            $path = 'audios';
            $file->move($path, $filename);
        }

        $card->save();

        return response()->json([
            'status' => 'success',
            'message' => "Card edited successfully",
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $card = Card::findOrFail($id);

        // Delete associated data
        $card->data()->delete();

        // Delete associated files
        $imagepath = public_path() . '/images/' . substr($card->image, strrpos($card->image, '/') + 1);
        $audiopath = public_path() . '/audios/' . substr($card->audio, strrpos($card->audio, '/') + 1);

        if (File::exists($imagepath)) {
            File::delete($imagepath);
        }

        if (File::exists($audiopath)) {
            File::delete($audiopath);
        }

        // Delete the card
        $card->delete();

        return response()->json([
            'status' => 'success',
            'message' => "The card with id: " . $id . " was deleted successfully.",
        ], 200);
    }


    // Existing methods for CRUD operations on Cards

    /**
     * Show the form data for a specific card.
     */
    public function showData($card_id)
    {
        $card = Card::findOrFail($card_id);
        $Data = $card->Data;
        return response()->json([
            'status' => 'success',
            'card_title' => $card->title,
            'form_data' => $Data
        ]);
    }

    /**
     * Store form data for a specific card.
     */
    public function storeData(Request $request, $card_id)
    {
        $card = Card::findOrFail($card_id);
        $Data = new Data();
        $Data->fill($request->all());
        $card->Data()->save($Data);

        return response()->json([
            'status' => 'success',
            'message' => "Form data created successfully",
        ], 201);
    }

    /**
     * Update form data for a specific card.
     */
    public function updateData(Request $request, $card_id, $form_data_id)
    {
        $card = Card::findOrFail($card_id);
        $Data = $card->Data()->findOrFail($form_data_id);
        $Data->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => "Form data updated successfully",
            'form_data' => $Data
        ], 200);
    }
}
