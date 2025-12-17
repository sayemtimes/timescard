<?php

namespace App\Http\Controllers;

use App\Models\BusinessDirectorySetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BusinessDirectorySettingsController extends Controller
{

    public function index()
    {
        $settings = BusinessDirectorySetting::getSettings();
        
        return Inertia::render('business-directory/settings', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'menu_items' => 'nullable|array',
            'config_sections' => 'nullable|array'
        ]);

        $settings = BusinessDirectorySetting::getSettings();
        
        $settings->update([
            'title' => $request->title,
            'description' => $request->description,
            'menu_items' => $request->menu_items,
            'config_sections' => $request->config_sections
        ]);

        return redirect()->back()->with('success', 'Directory settings updated successfully');
    }
}