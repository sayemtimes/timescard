<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class DefaultBusinessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        
        // All 34 business types from the application
        $businessTypes = [
            'freelancer', 'doctor', 'restaurant', 'realestate', 'fitness',
            'photography', 'lawfirm', 'cafe', 'salon', 'construction',
            'eventplanner', 'ecommerce', 'travel', 'gym', 'bakery',
            'fitness-studio', 'tech-startup', 'music-artist', 'wedding-planner', 'pet-care',
            'digital-marketing', 'automotive', 'beauty-cosmetics', 'food-delivery', 'home-services',
            'personal-trainer', 'consulting', 'graphic-design', 'yoga-wellness', 'podcast-creator',
            'gaming-streamer', 'life-coach', 'veterinarian', 'architect-designer'
        ];
        
        // Business type labels for better naming
        $businessTypeLabels = [
            'freelancer' => 'Freelancer', 
            'doctor' => 'Medical Clinic',
            'restaurant' => 'Restaurant',
            'realestate' => 'Real Estate Agency',
            'fitness' => 'Fitness Center',
            'photography' => 'Photography Studio',
            'lawfirm' => 'Law Firm',
            'cafe' => 'Cafe',
            'salon' => 'Beauty Salon',
            'construction' => 'Construction Company',
            'eventplanner' => 'Event Planning',
            'ecommerce' => 'Online Store',
            'travel' => 'Travel Agency',
            'gym' => 'Fitness Gym',
            'bakery' => 'Bakery Shop',
            'fitness-studio' => 'Fitness Studio',
            'tech-startup' => 'Tech Startup',
            'music-artist' => 'Music Studio',
            'wedding-planner' => 'Wedding Planning',
            'pet-care' => 'Pet Care Center',
            'digital-marketing' => 'Digital Marketing Agency',
            'automotive' => 'Auto Service',
            'beauty-cosmetics' => 'Beauty & Cosmetics',
            'food-delivery' => 'Food Delivery',
            'home-services' => 'Home Services',
            'personal-trainer' => 'Personal Training',
            'consulting' => 'Consulting Firm',
            'graphic-design' => 'Design Studio',
            'yoga-wellness' => 'Yoga Studio',
            'podcast-creator' => 'Podcast Studio',
            'gaming-streamer' => 'Gaming Channel',
            'life-coach' => 'Life Coaching',
            'veterinarian' => 'Veterinary Clinic',
            'architect-designer' => 'Architecture Firm'
        ];
        
        // Create businesses for each company user
        $users = User::where('type', 'company')->get();
        
        foreach ($users as $user) {
            $userBusinesses = [];
            
            // Create one business of each type for the first user (for demo purposes)
            if ($user->email === 'company@example.com') {
                foreach ($businessTypes as $businessType) {
                    $businessName = $businessTypeLabels[$businessType] . ' Demo';
                    
                    // Create business with all sections enabled
                    $business = Business::create([
                        'name' => $businessName,
                        'business_type' => $businessType,
                        'config_sections' => [
                            'contact' => ['enabled' => true],
                            'about' => ['enabled' => true],
                            'services' => ['enabled' => true],
                            'gallery' => ['enabled' => true],
                            'testimonials' => ['enabled' => true],
                            'appointments' => ['enabled' => true],
                            'products' => ['enabled' => in_array($businessType, ['ecommerce', 'bakery', 'restaurant', 'cafe']) ? true : false],
                            'portfolio' => ['enabled' => in_array($businessType, ['photography', 'graphic-design', 'architect-designer']) ? true : false],
                            'team' => ['enabled' => !in_array($businessType, ['freelancer', 'personal-trainer', 'life-coach']) ? true : false],
                            'pricing' => ['enabled' => true],
                            'faq' => ['enabled' => true],
                            'blog' => ['enabled' => $faker->boolean(50)],
                        ],
                        'created_by' => $user->id,
                        'url_prefix' => 'v',
                        'password_enabled' => false,
                        'view_count' => $faker->numberBetween(50, 5000),
                        'created_at' => $faker->dateTimeBetween('-6 months', 'now'),
                    ]);
                    
                    $userBusinesses[] = $business->id;
                }
            } else {
                // For other users, create 2-5 random businesses
                $businessCount = rand(2, 5);
                $selectedTypes = $faker->randomElements($businessTypes, $businessCount);
                
                foreach ($selectedTypes as $businessType) {
                    $businessName = $faker->company() . ' ' . $businessTypeLabels[$businessType];
                    
                    // Create business with some sections enabled
                    $business = Business::create([
                        'name' => $businessName,
                        'business_type' => $businessType,
                        'config_sections' => [
                            'contact' => ['enabled' => true],
                            'about' => ['enabled' => true],
                            'services' => ['enabled' => $faker->boolean(70)],
                            'gallery' => ['enabled' => $faker->boolean(60)],
                            'testimonials' => ['enabled' => $faker->boolean(50)],
                            'appointments' => ['enabled' => $faker->boolean(40)],
                            'products' => ['enabled' => in_array($businessType, ['ecommerce', 'bakery', 'restaurant', 'cafe']) ? $faker->boolean(80) : false],
                            'portfolio' => ['enabled' => in_array($businessType, ['photography', 'graphic-design', 'architect-designer']) ? $faker->boolean(80) : false],
                            'team' => ['enabled' => !in_array($businessType, ['freelancer', 'personal-trainer', 'life-coach']) ? $faker->boolean(60) : false],
                            'pricing' => ['enabled' => $faker->boolean(50)],
                            'faq' => ['enabled' => $faker->boolean(40)],
                            'blog' => ['enabled' => $faker->boolean(30)],
                        ],
                        'created_by' => $user->id,
                        'url_prefix' => 'v',
                        'password_enabled' => $faker->boolean(20),
                        'view_count' => $faker->numberBetween(0, 1000),
                        'created_at' => $faker->dateTimeBetween('-1 year', 'now'),
                    ]);
                    
                    $userBusinesses[] = $business->id;
                }
            }
            
            // Set current business if user doesn't have one
            if (!empty($userBusinesses) && !$user->current_business) {
                $user->current_business = $userBusinesses[0];
                $user->save();
            }
        }
        
        $this->command->info('Created ' . Business::count() . ' businesses successfully!');
    }
}