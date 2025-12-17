<?php

namespace Database\Seeders;

use App\Models\BioLink;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BioLinkSeeder extends Seeder
{
    /**
     * Available themes
     */
    private $themes = [
        'personal',
        'business', 
        'portfolio',
        'social',
        'minimal',
        'tech',
        'nature',
        'fashion',
        'gaming',
        'health',
        'travel',
        'food',
        'ecommerce',
        'blogger'
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get company@example.com user
        $companyUser = User::where('email', 'company@example.com')->first();
        
        if ($companyUser) {
            // Create 14 bio links for company@example.com (one for each theme)
            foreach ($this->themes as $index => $theme) {
                BioLink::create([
                    'created_by' => $companyUser->id,
                    'name' => ucfirst($theme) . ' Bio Link',
                    'slug' => $theme . '-demo-' . $companyUser->id,
                    'link_type' => $theme,
                    'url_prefix' => 'bio',
                    'password_enabled' => false,
                    'config' => $this->getThemeConfig($theme, $companyUser->name, $companyUser->email),
                    'is_active' => true,
                ]);
            }
        }

        // Get other company users and create random bio links for them
        $otherCompanyUsers = User::where('type', 'company')
            ->where('email', '!=', 'company@example.com')
            ->get();

        foreach ($otherCompanyUsers as $user) {
            // Create 4-5 random theme bio links for each user
            $linkCount = rand(4, 5);
            $selectedThemes = collect($this->themes)->random($linkCount);
            
            foreach ($selectedThemes as $index => $theme) {
                BioLink::create([
                    'created_by' => $user->id,
                    'name' => ucfirst($theme) . ' Link',
                    'slug' => $theme . '-' . $user->id . '-' . ($index + 1),
                    'link_type' => $theme,
                    'url_prefix' => 'bio',
                    'password_enabled' => rand(0, 10) > 8, // 20% chance of password protection
                    'password' => rand(0, 10) > 8 ? 'demo123' : null,
                    'config' => $this->getThemeConfig($theme, $user->name, $user->email),
                    'is_active' => rand(0, 10) > 1, // 90% chance of being active
                ]);
            }
        }
    }

    /**
     * Generate theme-specific configuration
     */
    private function getThemeConfig($theme, $userName, $userEmail)
    {
        $sampleLinks = [
            ['text' => 'Website', 'url' => 'https://example.com', 'description' => 'Visit my website'],
            ['text' => 'Portfolio', 'url' => 'https://portfolio.example.com', 'description' => 'Check out my work'],
            ['text' => 'Blog', 'url' => 'https://blog.example.com', 'description' => 'Read my latest posts'],
            ['text' => 'Contact', 'url' => 'mailto:' . $userEmail, 'description' => 'Get in touch'],
        ];

        $socialLinks = [
            ['platform' => 'twitter', 'url' => 'https://twitter.com/example'],
            ['platform' => 'instagram', 'url' => 'https://instagram.com/example'],
            ['platform' => 'linkedin', 'url' => 'https://linkedin.com/in/example'],
            ['platform' => 'github', 'url' => 'https://github.com/example'],
        ];

        return [
            'header' => [
                'name' => $userName,
                'tagline' => $this->getThemeTagline($theme),
                'description' => $this->getThemeDescription($theme),
                'email' => $userEmail,
                'phone' => '+1 (555) 123-4567',
                'profile_image' => null,
            ],
            'links' => collect($sampleLinks)->random(rand(2, 4))->values()->toArray(),
            'social' => [
                'display' => true,
                'items' => collect($socialLinks)->random(rand(2, 3))->values()->toArray(),
            ],
            'copyright' => [
                'enabled' => true,
                'text' => '© ' . date('Y') . ' ' . $userName . '. All rights reserved.',
            ],
        ];
    }

    /**
     * Get theme-specific tagline
     */
    private function getThemeTagline($theme)
    {
        $taglines = [
            'personal' => 'Living life to the fullest',
            'business' => 'Professional excellence delivered',
            'portfolio' => 'Creative solutions & innovative designs',
            'social' => 'Connecting people & ideas',
            'minimal' => 'Less is more',
            'tech' => 'Building the future with code',
            'nature' => 'In harmony with nature',
            'fashion' => 'Style is a way to say who you are',
            'gaming' => 'Level up your game',
            'health' => 'Wellness is a journey, not a destination',
            'travel' => 'Exploring the world one adventure at a time',
            'food' => 'Good food, good mood',
            'ecommerce' => 'Quality products, exceptional service',
            'blogger' => 'Sharing stories that matter',
        ];

        return $taglines[$theme] ?? 'Welcome to my bio link';
    }

    /**
     * Get theme-specific description
     */
    private function getThemeDescription($theme)
    {
        $descriptions = [
            'personal' => 'Welcome to my personal space where I share my passions, interests, and connect with amazing people.',
            'business' => 'Dedicated professional committed to delivering exceptional results and building lasting partnerships.',
            'portfolio' => 'Showcasing creative work and innovative solutions across various projects and collaborations.',
            'social' => 'Building communities and fostering meaningful connections through shared experiences and ideas.',
            'minimal' => 'Focused on simplicity and clarity in everything I do.',
            'tech' => 'Passionate developer creating innovative solutions and pushing the boundaries of technology.',
            'nature' => 'Advocate for environmental conservation and sustainable living practices.',
            'fashion' => 'Fashion enthusiast sharing style inspiration and trends from around the world.',
            'gaming' => 'Gaming content creator and esports enthusiast sharing the latest in gaming culture.',
            'health' => 'Certified wellness coach helping others achieve their health and fitness goals.',
            'travel' => 'Travel blogger documenting adventures and sharing travel tips from around the globe.',
            'food' => 'Culinary enthusiast sharing recipes, restaurant reviews, and food photography.',
            'ecommerce' => 'Curating quality products and providing exceptional customer experiences.',
            'blogger' => 'Content creator sharing insights, stories, and perspectives on various topics.',
        ];

        return $descriptions[$theme] ?? 'Discover more about me and my work.';
    }
}