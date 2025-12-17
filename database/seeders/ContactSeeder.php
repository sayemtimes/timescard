<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Models\Business;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ContactSeeder extends Seeder
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

        $statuses = ['new', 'contacted', 'qualified', 'converted', 'closed'];
        $messageTemplates = [
            'Inquiry about your services: %s',
            'Request for more information: %s',
            'Pricing question: %s',
            'Availability check: %s',
            'Consultation request: %s',
            'Partnership opportunity: %s',
            'Feedback on services: %s',
            'Job application inquiry: %s',
            'Product question: %s',
            'Service booking: %s',
            'General inquiry: %s',
            'Support request: %s'
        ];
        
        // Create at least 12 contacts for each business
        foreach ($businesses as $business) {
            // Only create contacts for businesses with contact section enabled
            $configSections = $business->config_sections ?? [];
            if (!isset($configSections['contact']) || !($configSections['contact']['enabled'] ?? false)) {
                continue;
            }
            
            // Create more contacts for the main company user's businesses
            $contactCount = $business->user && $business->user->email === 'company@example.com' ? 
                rand(20, 30) : rand(12, 20);
            
            for ($i = 0; $i < $contactCount; $i++) {
                $createdDate = $faker->dateTimeBetween('-6 months', 'now');
                $status = $faker->randomElement($statuses);
                
                // More recent contacts are more likely to be 'new'
                if ($createdDate > new \DateTime('-2 weeks')) {
                    $status = $faker->randomElement(['new', 'new', 'new', 'contacted', 'qualified']);
                }
                
                // Format message with a subject-like prefix
                $messageTemplate = $faker->randomElement($messageTemplates);
                $messageContent = $faker->paragraph(rand(2, 4));
                $message = sprintf($messageTemplate, $messageContent);
                
                Contact::create([
                    'business_id' => $business->id,
                    'name' => $faker->name(),
                    'email' => $faker->email(),
                    'phone' => $faker->phoneNumber(),
                    'message' => $message,
                    'status' => $status,
                    'notes' => $status !== 'new' ? $faker->optional(0.8)->paragraph() : $faker->optional(0.3)->paragraph(),
                    'created_at' => $createdDate,
                    'updated_at' => $status !== 'new' ? $faker->dateTimeBetween($createdDate, 'now') : $createdDate,
                ]);
            }
        }
        
        $this->command->info('Created ' . Contact::count() . ' contacts successfully!');
    }
}