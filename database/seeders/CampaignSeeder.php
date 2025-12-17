<?php

namespace Database\Seeders;

use App\Models\Campaign;
use App\Models\User;
use App\Models\Business;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class CampaignSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('type', 'company')->take(3)->get();
        $businesses = Business::take(5)->get();

        if ($users->isEmpty() || $businesses->isEmpty()) {
            $this->command->warn('No users or businesses found. Please seed users and businesses first.');
            return;
        }

        $campaigns = [
            [
                'user_id' => $users->first()->id,
                'business_id' => $businesses->first()->id,
                'name' => 'Summer Sale Campaign',
                'description' => 'Promote summer products and services',
                'start_date' => Carbon::now()->addDays(5),
                'end_date' => Carbon::now()->addDays(35),
                'total_days' => 30,
                'total_amount' => 450.00,
                'payment_method' => 'stripe',
                'status' => 'active',
                'is_active' => true,
                'campaign_data' => ['target_audience' => 'young adults', 'budget_allocation' => 'social_media']
            ],
            [
                'user_id' => $users->skip(1)->first()->id,
                'business_id' => $businesses->skip(1)->first()->id,
                'name' => 'Holiday Special',
                'description' => 'Holiday season promotional campaign',
                'start_date' => Carbon::now()->addDays(10),
                'end_date' => Carbon::now()->addDays(25),
                'total_days' => 15,
                'total_amount' => 225.00,
                'payment_method' => 'paypal',
                'status' => 'pending',
                'is_active' => true,
                'campaign_data' => ['target_audience' => 'families', 'budget_allocation' => 'email_marketing']
            ],
            [
                'user_id' => $users->last()->id,
                'business_id' => $businesses->skip(2)->first()->id,
                'name' => 'New Product Launch',
                'description' => 'Launch campaign for new product line',
                'start_date' => Carbon::now()->subDays(10),
                'end_date' => Carbon::now()->addDays(20),
                'total_days' => 30,
                'total_amount' => 600.00,
                'payment_method' => 'razorpay',
                'status' => 'active',
                'is_active' => true,
                'campaign_data' => ['target_audience' => 'professionals', 'budget_allocation' => 'google_ads']
            ]
        ];

        foreach ($campaigns as $campaignData) {
            Campaign::create($campaignData);
        }

        $this->command->info('Campaigns seeded successfully!');
    }
}