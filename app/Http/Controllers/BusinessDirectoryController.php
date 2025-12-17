<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\LandingPageSetting;

use App\Models\BusinessDirectorySetting;
use App\Models\BusinessDirectoryCustomPage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BusinessDirectoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Business::query();
        
        // Filter by user role - companies see only their own, Super Admin sees all
        if (auth()->user() && !auth()->user()->isSuperAdmin()) {
            $query->where('created_by', auth()->id());
        }
        
        // Search filter
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('business_type', 'like', '%' . $request->search . '%');
            });
        }
        
        // Category filter
        if ($request->category && $request->category !== 'all') {
            $query->where('business_type', $request->category);
        }
        
        // Order by view count
        $query->orderByDesc('view_count');
        
        $businesses = $query->paginate(12)->withQueryString();
        
        // Get all business types with counts
        $allBusinessTypes = [
            'freelancer', 'doctor', 'restaurant', 'realestate', 'fitness', 'photography', 'lawfirm', 'cafe',
            'salon', 'construction', 'eventplanner', 'ecommerce', 'travel', 'gym', 'bakery', 'fitness-studio',
            'tech-startup', 'music-artist', 'wedding-planner', 'pet-care', 'digital-marketing', 'automotive',
            'beauty-cosmetics', 'food-delivery', 'home-services', 'personal-trainer', 'consulting', 'graphic-design',
            'yoga-wellness', 'podcast-creator', 'gaming-streamer', 'life-coach', 'veterinarian', 'architect-designer'
        ];
        
        $businessCountsQuery = Business::select('business_type', \DB::raw('count(*) as count'));
        
        // Apply same user role filter for counts
        if (auth()->user() && !auth()->user()->isSuperAdmin()) {
            $businessCountsQuery->where('created_by', auth()->id());
        }
        
        $businessCounts = $businessCountsQuery->groupBy('business_type')
            ->pluck('count', 'business_type');
            
        $categories = collect($allBusinessTypes)->map(function($type) use ($businessCounts) {
            return [
                'value' => $type,
                'label' => ucfirst(str_replace('-', ' ', $type)),
                'count' => $businessCounts[$type] ?? 0
            ];
        })->values();
        
        // Get landing page settings for header/footer
        $settings = LandingPageSetting::getSettings();
        

            
        // Get directory custom pages for navigation
        $directoryCustomPages = BusinessDirectoryCustomPage::active()
            ->ordered()
            ->get(['id', 'title', 'slug']);
            
        // Get directory settings for menu and configuration
        $directorySettings = BusinessDirectorySetting::getSettings();
        
        return Inertia::render('business-directory/index', [
            'businesses' => $businesses,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category']),
            'settings' => $settings,

            'directoryCustomPages' => $directoryCustomPages,
            'directorySettings' => $directorySettings
        ]);
    }
    
    public function show(Business $business)
    {
        // Track visit with business_id
        $visit = \Shetabit\Visitor\Facade\Visitor::visit($business);
        \DB::table('shetabit_visits')->where('id', $visit->id)->update(['business_id' => $business->id]);
        $business->increment('view_count');
        
        return Inertia::render('business-directory/show', [
            'business' => $business
        ]);
    }

}