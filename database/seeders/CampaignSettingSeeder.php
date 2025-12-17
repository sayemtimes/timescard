<?php

namespace Database\Seeders;

use App\Models\CampaignSetting;
use Illuminate\Database\Seeder;

class CampaignSettingSeeder extends Seeder
{
    public function run(): void
    {
        // Create default campaign settings if not exists
        if (!CampaignSetting::exists()) {
            CampaignSetting::create([
                'pricing_tiers' => [
                    [
                        'min_days' => 1,
                        'max_days' => 7,
                        'per_day_price' => 20.00
                    ],
                    [
                        'min_days' => 8,
                        'max_days' => 30,
                        'per_day_price' => 15.00
                    ],
                    [
                        'min_days' => 31,
                        'max_days' => 90,
                        'per_day_price' => 12.00
                    ],
                    [
                        'min_days' => 91,
                        'max_days' => 365,
                        'per_day_price' => 10.00
                    ]
                ]
            ]);

            $this->command->info('Campaign settings seeded successfully!');
        } else {
            $this->command->info('Campaign settings already exist.');
        }
    }
}