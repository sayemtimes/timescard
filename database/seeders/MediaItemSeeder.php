<?php

namespace Database\Seeders;

use App\Models\MediaItem;
use App\Models\Business;
use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class MediaItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $businesses = Business::all();
        
        if ($businesses->isEmpty()) {
            $this->command->warn('No businesses found. Please seed businesses first.');
            return;
        }

        $mediaTypes = ['image', 'video', 'document'];
        $imageExtensions = ['jpg', 'png', 'webp'];
        $videoExtensions = ['mp4', 'webm'];
        $documentExtensions = ['pdf', 'docx', 'xlsx', 'pptx'];
        
        // Business-specific media names
        $mediaNamesByType = [
            'restaurant' => [
                'image' => ['Menu Item', 'Restaurant Interior', 'Chef Special', 'Dining Area', 'Food Presentation', 'Signature Dish', 'Dessert Selection', 'Bar Area'],
                'video' => ['Chef Interview', 'Cooking Process', 'Customer Testimonial', 'Restaurant Tour'],
                'document' => ['Menu PDF', 'Catering Options', 'Nutritional Information', 'Allergen Guide']
            ],
            'photography' => [
                'image' => ['Portrait Sample', 'Wedding Photo', 'Nature Photography', 'Urban Landscape', 'Studio Shot', 'Event Coverage', 'Product Photography'],
                'video' => ['Photography Reel', 'Behind the Scenes', 'Client Testimonial', 'Photo Editing Process'],
                'document' => ['Price List', 'Photography Contract', 'Session Information', 'Print Options']
            ],
            'default' => [
                'image' => ['Product Image', 'Team Photo', 'Office Space', 'Service Showcase', 'Client Meeting', 'Company Event', 'Portfolio Item'],
                'video' => ['Promotional Video', 'Service Demo', 'Client Testimonial', 'Company Overview'],
                'document' => ['Price List', 'Service Agreement', 'Company Brochure', 'Product Specifications']
            ]
        ];
        
        // First, add NFC card images to the media library
        $this->seedNfcCardMedia();
        
        // Create media items for each business
        foreach ($businesses as $business) {
            // Only create media for businesses with gallery enabled
            $configSections = $business->config_sections ?? [];
            if (!isset($configSections['gallery']) || !($configSections['gallery']['enabled'] ?? false)) {
                continue;
            }
            
            // Create more media for the main company user's businesses
            $mediaCount = $business->user && $business->user->email === 'company@example.com' ? 
                rand(20, 30) : rand(12, 20);
            
            // Get appropriate media names for this business type
            $businessType = $business->business_type;
            $mediaNames = $mediaNamesByType[$businessType] ?? $mediaNamesByType['default'];
            
            // Distribution: 70% images, 20% videos, 10% documents
            $imageCount = intval($mediaCount * 0.7);
            $videoCount = intval($mediaCount * 0.2);
            $documentCount = $mediaCount - $imageCount - $videoCount;
            
            // Create placeholder media items (without actual files)
            for ($i = 0; $i < $mediaCount; $i++) {
                $mediaType = $faker->randomElement(['image', 'video', 'document']);
                $nameBase = $faker->randomElement($mediaNames[$mediaType]);
                $name = $nameBase . ' ' . ($i + 1);
                
                MediaItem::create([
                    'name' => $name,
                    'description' => ucfirst($mediaType) . ' for business ID ' . $business->id . ': ' . $name,
                ]);
            }
        }

        $this->command->info('Created ' . MediaItem::count() . ' media items successfully!');
    }
    
    /**
     * Seed NFC card images to the media library
     */
    private function seedNfcCardMedia(): void
    {
        $faker = Faker::create();
        $user = User::where('type', 'superadmin')->first() ?? User::first();
        
        if (!$user) {
            $this->command->warn('No users found for NFC card media. Skipping NFC card media seeding.');
            return;
        }
        
        // Get all available images from storage/images and public/images directory
        $imageFiles = [
            // NFC card images
            'storage/images/nfc/nfc-front1.png',
            'storage/images/nfc/nfc-front2.png',
            'storage/images/nfc/nfc-front3.png',
            'storage/images/nfc/nfc-front4.png',
            'storage/images/nfc/nfc-front5.png',
            'storage/images/nfc/nfc-front6.png',
            'storage/images/nfc/nfc-front7.png',
            'storage/images/nfc/nfc-front8.png',
            'storage/images/nfc/nfc-front9.png',
            'storage/images/nfc/nfc-front10.png',
            'storage/images/nfc/nfc-back1.png',
            'storage/images/nfc/nfc-back2.png',
            'storage/images/nfc/nfc-back3.png',
            'storage/images/nfc/nfc-back4.png',
            'storage/images/nfc/nfc-back5.png',
            'storage/images/nfc/nfc-back6.png',
            'storage/images/nfc/nfc-back7.png',
            'storage/images/nfc/nfc-back8.png',
            'storage/images/nfc/nfc-back9.png',
            'storage/images/nfc/nfc-back10.png',
            // Logo images
            'public/images/logos/logo-light.png',
            'public/images/logos/logo-dark.png',
            'public/images/logos/icon-192x192.png',
            'public/images/logos/icon-512x512.png',
            'public/images/logos/icon-144x144.png',
            'public/images/logos/icon-320x320.png',
        ];
        
        $addedCount = 0;
        
        foreach ($imageFiles as $imagePath) {
            if (!file_exists($imagePath)) {
                continue;
            }
            
            try {
                // Create MediaItem
                $mediaItem = MediaItem::create([
                    'name' => basename($imagePath),
                    'description' => 'Default image: ' . basename($imagePath),
                ]);
                
                // Add the file to media collection
                $media = $mediaItem->addMedia($imagePath)
                    ->preservingOriginal()
                    ->toMediaCollection('images');
                
                // Set user_id for the media
                $media->user_id = $user->id;
                $media->save();
                
                $addedCount++;
                
            } catch (\Exception $e) {
                $this->command->warn('Failed to add ' . basename($imagePath) . ': ' . $e->getMessage());
            }
        }
        
        $this->command->info('Added ' . $addedCount . ' default images to media library');
    }
}