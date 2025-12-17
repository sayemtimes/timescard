<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Plan;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Migrate existing plans to use the new features structure
        $plans = Plan::all();
        
        foreach ($plans as $plan) {
            if (!$plan->features) {
                $features = [
                    // Map legacy columns to new features structure
                    'custom_domain' => $plan->enable_custdomain === 'on',
                    'custom_subdomain' => $plan->enable_custsubdomain === 'on',
                    'pwa_support' => $plan->pwa_business === 'on',
                    'ai_integration' => $plan->enable_chatgpt === 'on',
                    'password_protection' => false,
                    
                    // Default template sections based on plan type
                    'business_template_sections' => $this->getDefaultSectionsForPlan($plan)
                ];
                
                $plan->update(['features' => $features]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Reset features column to null for all plans
        Plan::query()->update(['features' => null]);
    }
    
    /**
     * Get default template sections based on plan characteristics
     */
    private function getDefaultSectionsForPlan($plan)
    {
        if ($plan->price == 0) {
            // Free plan - basic sections only
            return ['header', 'about', 'contact', 'social'];
        } elseif ($plan->price < 30) {
            // Starter plan - more sections
            return ['header', 'about', 'services', 'contact', 'social', 'business_hours', 'gallery', 'appointments'];
        } else {
            // Pro plan - all sections
            return [];
        }
    }
};