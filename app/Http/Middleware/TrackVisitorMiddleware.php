<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Shetabit\Visitor\Facade\Visitor;
use App\Models\Business;

class TrackVisitorMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        
        // Only track GET requests to avoid tracking form submissions
        if ($request->isMethod('GET')) {
            $this->trackVisit($request);
        }
        
        return $response;
    }
    
    private function trackVisit(Request $request)
    {
        try {
            // Extract business info from route
            $business = $this->getBusinessFromRoute($request);
            
            if ($business) {
                // Track visit with business context
                Visitor::visit($business);
                
                // Increment view count
                $business->increment('view_count');
            }
        } catch (\Exception $e) {
            // Silently fail to avoid breaking the request
            \Log::error('Visitor tracking failed: ' . $e->getMessage());
        }
    }
    
    private function getBusinessFromRoute(Request $request)
    {
        $routeName = $request->route()->getName();
        $host = $request->getHost();
        
        // Handle vCard routes
        if (in_array($routeName, ['public.vcard.show', 'public.vcard.show.direct'])) {
            $slug = $request->route('slug');
            $prefix = $request->route('prefix', 'v');
            
            return Business::where('slug', $slug)
                ->where('url_prefix', $prefix)
                ->first();
        }
        
        // Handle landing page with subdomain/custom domain
        if ($routeName === 'home') {
            // Check subdomain
            $hostParts = explode('.', $host);
            if (count($hostParts) > 2) {
                $subdomain = $hostParts[0];
                $business = Business::where('slug', $subdomain)
                    ->where('domain_type', 'subdomain')
                    ->first();
                if ($business) return $business;
            }
            
            // Check custom domain
            return Business::where('custom_domain', $host)
                ->where('domain_type', 'domain')
                ->first();
        }
        
        // Handle directory routes
        if ($routeName === 'directory.show') {
            return $request->route('business');
        }
        
        return null;
    }
}