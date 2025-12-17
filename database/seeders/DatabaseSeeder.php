<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            // Core system seeders
            PermissionSeeder::class,
            RoleSeeder::class,
            PlanSeeder::class,
            
            // User and business seeders
            UserSeeder::class,
            // BioLinkSeeder::class,
            //CompanySeeder::class,
            //StaffRoleSeeder::class,
            //DefaultBusinessSeeder::class,
            
            // Business-related seeders
            //ContactSeeder::class,
            //AppointmentSeeder::class,
            //MediaItemSeeder::class,
            
            // System configuration seeders
            //CouponSeeder::class,
            //PlanOrderSeeder::class,
            //PlanRequestSeeder::class,
            CurrencySeeder::class,
            //DomainRequestSeeder::class,
            //NfcCardSeeder::class,
            EmailTemplateSeeder::class,
            //ReferralSettingSeeder::class,
            
            // New seeders
            //CampaignSeeder::class,
            //CampaignSettingSeeder::class,
            //NfcCardOrderRequestSeeder::class,
            //ReferralSeeder::class,
            //PayoutRequestSeeder::class,
            //WebhookSeeder::class,
            BusinessDirectorySettingSeeder::class,
            BusinessDirectoryCustomPageSeeder::class,
            LandingPageCustomPageSeeder::class,
        ]);
    }
}