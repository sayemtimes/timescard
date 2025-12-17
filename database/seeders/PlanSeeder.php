<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create default plans if they don't exist
        $plans = [ 
            [
                'name' => 'Free',
                'price' => 0,
                'yearly_price' => 0,
                'duration' => 'monthly',
                'description' => 'Basic plan for small businesses just getting started.',
                'business' => 1,
                'bio_links' => 1,
                'max_users' => 2,
                'themes' => ['freelancer', 'doctor', 'restaurant', 'realestate', 'fitness','photography', 'lawfirm', 'cafe', 'salon', 'construction','eventplanner', 'ecommerce', 'travel', 'gym', 'bakery', 'fitness-studio', 'tech-startup', 'music-artist', 'wedding-planner', 'pet-care', 'digital-marketing', 'automotive', 'beauty-cosmetics', 'food-delivery', 'home-services', 'personal-trainer', 'consulting', 'graphic-design', 'yoga-wellness', 'podcast-creator', 'gaming-streamer', 'life-coach', 'veterinarian', 'architect-designer'],
                'bio_links_themes' => ['personal', 'business', 'portfolio', 'social', 'minimal', 'tech', 'nature', 'fashion', 'gaming', 'health', 'travel', 'food', 'ecommerce', 'blogger'],
                'enable_custdomain' => 'off',
                'enable_custsubdomain' => 'on',
                'enable_branding' => 'on',
                'pwa_business' => 'off',
                'enable_chatgpt' => 'off',
                'storage_limit' => 1,
                'features' => [
                    'custom_domain' => false,
                    'custom_subdomain' => true,
                    'pwa_support' => false,
                    'ai_integration' => false,
                    'password_protection' => false,
                    'business_template_sections' => ['header', 'about', 'contact', 'social', 'business_hours', 'services', 'gallery', 'appointments', 'location', 'testimonials', 'contact_form', 'custom_html', 'qr_share', 'language', 'copyright']
                ],
                'is_trial' => null,
                'trial_day' => 0,
                'is_plan_enable' => 'on',
                'is_default' => true,
                'module' => null
            ],
            [
                'name' => 'Starter',
                'price' => 19.99,
                'yearly_price' => 239.88, // actual yearly price
                'duration' => 'both',
                'description' => 'Perfect for small businesses looking to grow their online presence.',
                'business' => 5,
                'bio_links' => 3,
                'max_users' => 10,
                'themes' => ['freelancer', 'doctor', 'restaurant', 'realestate', 'fitness','photography', 'lawfirm', 'cafe', 'salon', 'construction','eventplanner', 'ecommerce', 'travel', 'gym', 'bakery', 'fitness-studio', 'tech-startup', 'music-artist', 'wedding-planner', 'pet-care', 'digital-marketing', 'automotive', 'beauty-cosmetics', 'food-delivery', 'home-services', 'personal-trainer', 'consulting', 'graphic-design', 'yoga-wellness', 'podcast-creator', 'gaming-streamer', 'life-coach', 'veterinarian', 'architect-designer'],
                'bio_links_themes' => ['personal', 'business', 'portfolio', 'social', 'minimal', 'tech', 'nature', 'fashion', 'gaming', 'health', 'travel', 'food', 'ecommerce', 'blogger'],
                'enable_custdomain' => 'on',
                'enable_custsubdomain' => 'on',
                'enable_branding' => 'off',
                'pwa_business' => 'on',
                'enable_chatgpt' => 'off',
                'storage_limit' => 5,
                'features' => [
                    'custom_domain' => true,
                    'custom_subdomain' => true,
                    'pwa_support' => true,
                    'ai_integration' => false,
                    'password_protection' => false,
                    'business_template_sections' => ['header', 'about', 'contact', 'social', 'business_hours', 'services', 'gallery', 'appointments', 'location', 'testimonials', 'contact_form', 'custom_html', 'qr_share', 'language', 'copyright']
                ],
                'is_trial' => 'on',
                'trial_day' => 7,
                'is_plan_enable' => 'on',
                'is_default' => false,
                'module' => null
            ],
            [
                'name' => 'Pro',
                'price' => 49.99,
                'yearly_price' => 599.88, // actual yearly price
                'duration' => 'yearly',
                'description' => 'Ideal for growing businesses with multiple stores and advanced needs.',
                'business' => 20,
                'bio_links' => 10,
                'max_users' => 50,
                'themes' => ['freelancer', 'doctor', 'restaurant', 'realestate', 'fitness','photography', 'lawfirm', 'cafe', 'salon', 'construction','eventplanner', 'ecommerce', 'travel', 'gym', 'bakery', 'fitness-studio', 'tech-startup', 'music-artist', 'wedding-planner', 'pet-care', 'digital-marketing', 'automotive', 'beauty-cosmetics', 'food-delivery', 'home-services', 'personal-trainer', 'consulting', 'graphic-design', 'yoga-wellness', 'podcast-creator', 'gaming-streamer', 'life-coach', 'veterinarian', 'architect-designer'],
                'bio_links_themes' => ['personal', 'business', 'portfolio', 'social', 'minimal', 'tech', 'nature', 'fashion', 'gaming', 'health', 'travel', 'food', 'ecommerce', 'blogger'],
                'enable_custdomain' => 'on',
                'enable_custsubdomain' => 'on',
                'enable_branding' => 'off',
                'pwa_business' => 'on',
                'enable_chatgpt' => 'on',
                'storage_limit' => 50,
                'features' => [
                    'custom_domain' => true,
                    'custom_subdomain' => true,
                    'pwa_support' => true,
                    'ai_integration' => true,
                    'password_protection' => false,
                    'business_template_sections' => ['header', 'about', 'contact', 'social', 'business_hours', 'services', 'gallery', 'appointments', 'location', 'testimonials', 'contact_form', 'custom_html', 'qr_share', 'language', 'copyright']
                ],
                'is_trial' => 'on',
                'trial_day' => 14,
                'is_plan_enable' => 'on',
                'is_default' => false,
                'module' => null
            ]
        ];
        
        foreach ($plans as $planData) {
            // Check if plan with this name already exists
            $existingPlan = Plan::where('name', $planData['name'])->first();
            
            if (!$existingPlan) {
                Plan::create($planData);
            }
        }
    }
}