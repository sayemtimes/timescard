<?php

namespace Database\Seeders;

use App\Models\NfcCardOrderRequest;
use App\Models\User;
use App\Models\NfcCard;
use App\Models\Business;
use Illuminate\Database\Seeder;

class NfcCardOrderRequestSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('type', 'company')->take(3)->get();
        $nfcCards = NfcCard::take(5)->get();
        $businesses = Business::take(3)->get();

        if ($users->isEmpty() || $nfcCards->isEmpty()) {
            $this->command->warn('No users or NFC cards found. Please seed users and NFC cards first.');
            return;
        }

        $orderRequests = [
            [
                'user_id' => $users->first()->id,
                'nfc_card_id' => $nfcCards->first()->id,
                'quantity' => 50,
                'original_price' => $nfcCards->first()->price,
                'total_price' => $nfcCards->first()->price * 50,
                'logo' => 'logos/company1-logo.png',
                'shipping_address' => '123 Business St, City, State 12345',
                'business_id' => $businesses->first()->id ?? null,
                'status' => 'pending'
            ],
            [
                'user_id' => $users->skip(1)->first()->id,
                'nfc_card_id' => $nfcCards->skip(1)->first()->id,
                'quantity' => 25,
                'original_price' => $nfcCards->skip(1)->first()->price,
                'total_price' => $nfcCards->skip(1)->first()->price * 25,
                'logo' => 'logos/company2-logo.png',
                'shipping_address' => '456 Commerce Ave, Town, State 67890',
                'business_id' => $businesses->skip(1)->first()->id ?? null,
                'status' => 'approved'
            ],
            [
                'user_id' => $users->last()->id,
                'nfc_card_id' => $nfcCards->skip(2)->first()->id,
                'quantity' => 100,
                'original_price' => $nfcCards->skip(2)->first()->price,
                'total_price' => $nfcCards->skip(2)->first()->price * 100,
                'logo' => 'logos/company3-logo.png',
                'shipping_address' => '789 Enterprise Blvd, Village, State 54321',
                'business_id' => $businesses->last()->id ?? null,
                'status' => 'rejected'
            ]
        ];

        foreach ($orderRequests as $requestData) {
            NfcCardOrderRequest::create($requestData);
        }

        $this->command->info('NFC card order requests seeded successfully!');
    }
}