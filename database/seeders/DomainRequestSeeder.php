<?php

namespace Database\Seeders;

use App\Models\DomainRequest;
use App\Models\User;
use App\Models\Business;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class DomainRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $users = User::where('type', 'company')->get();
        
        if ($users->isEmpty()) {
            $this->command->warn('No company users found. Please run UserSeeder first.');
            return;
        }

        $statuses = ['pending', 'approved', 'rejected'];
        $domainTypes = ['subdomain', 'domain'];
        
        // Create at least 12 domain requests
        foreach ($users as $user) {
            $businesses = Business::where('created_by', $user->id)->get();
            
            if ($businesses->isEmpty()) {
                continue;
            }
            
            // Create 1-3 domain requests per user
            $requestCount = rand(1, 3);
            
            for ($i = 0; $i < $requestCount; $i++) {
                $business = $businesses->random();
                $domainType = $faker->randomElement($domainTypes);
                $domain = $domainType === 'subdomain' 
                    ? strtolower($faker->userName) . '.vCard.com'
                    : strtolower($faker->domainName);
                
                DomainRequest::create([
                    'user_id' => $user->id,
                    'business_id' => $business->id,
                    'domain' => $domain,
                    'status' => $faker->randomElement($statuses),
                    'created_at' => $faker->dateTimeBetween('-6 months', 'now'),
                    'updated_at' => now(),
                ]);
            }
        }

        $this->command->info('Domain requests seeded successfully!');
    }
}