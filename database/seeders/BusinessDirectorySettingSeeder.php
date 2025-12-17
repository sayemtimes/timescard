<?php

namespace Database\Seeders;

use App\Models\BusinessDirectorySetting;
use Illuminate\Database\Seeder;

class BusinessDirectorySettingSeeder extends Seeder
{
    public function run(): void
    {
        // Create default directory settings if not exists
        if (!BusinessDirectorySetting::exists()) {
            BusinessDirectorySetting::create([
                'title' => 'Business Directory',
                'description' => 'Discover amazing businesses and connect with professionals',
                'config_sections' => [
                    'theme' => [
                        'primary_color' => '#3b82f6',
                        'secondary_color' => '#8b5cf6',
                        'accent_color' => '#10b981'
                    ],

                    'hero' => [
                        'trust_badge' => 'Trusted by 10,000+ Businesses',
                        'main_title' => 'Discover Amazing Businesses',
                        'subtitle' => 'Connect with professionals, explore services, and grow your network in our comprehensive business directory',
                        'features' => [
                            ['icon' => 'verified', 'text' => 'Verified Businesses'],
                            ['icon' => 'location', 'text' => 'Local & Global'],
                            ['icon' => 'contact', 'text' => 'Instant Contact']
                        ]
                    ],
                    'footer' => [
                        'description' => 'Transforming professional networking with innovative digital business cards. Connect, share, and grow your network effortlessly.',
                        'newsletter_title' => 'Stay Updated with Our Latest Features',
                        'newsletter_subtitle' => 'Join our newsletter for product updates and networking tips',
                        'links' => [
                            'product' => [
                                ['name' => 'Features', 'href' => '#features'],
                                ['name' => 'Pricing', 'href' => '#pricing'],
                            ],
                            'company' => [
                                ['name' => 'About Us', 'href' => '#about'],
                                ['name' => 'Careers', 'href' => '#'],
                            ],
                            'support' => [
                                ['name' => 'Help Center', 'href' => '#'],
                                ['name' => 'Documentation', 'href' => '#'],
                            ],
                            'legal' => [
                                ['name' => 'Privacy Policy', 'href' => '#'],
                                ['name' => 'Terms of Service', 'href' => '#'],
                            ]
                        ],
                        'social_links' => [
                            ['name' => 'Facebook', 'icon' => 'Facebook', 'href' => '#'],
                            ['name' => 'Twitter', 'icon' => 'Twitter', 'href' => '#']
                        ],
                        'section_titles' => [
                            'product' => 'Product',
                            'company' => 'Company',
                            'support' => 'Support',
                            'legal' => 'Legal'
                        ]
                    ],
                    'section_order' => ['hero', 'search', 'categories', 'businesses'],
                    'section_visibility' => [
                        'hero' => true,
                        'search' => true,
                        'categories' => true,
                        'businesses' => true,
                        'filters' => true,
                    ]
                ]
            ]);

            $this->command->info('Business directory settings seeded successfully!');
        } else {
            $this->command->info('Business directory settings already exist.');
        }
    }
}