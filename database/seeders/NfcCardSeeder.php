<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\NfcCard;
use App\Models\User;

class NfcCardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first user to assign as creator
        $user = User::first();
        
        if (!$user) {
            $this->command->warn('No users found. Please create a user first.');
            return;
        }

        // Define NFC card data with front and back images
        $nfcCards = [
            ['name' => 'Premium Business Card', 'price' => 29.99, 'quantity' => 100, 'front_image' => 'images/nfc/nfc-front1.png', 'back_image' => 'images/nfc/nfc-back1.png', 'is_enabled' => true, 'created_by' => $user->id],
            ['name' => 'Standard NFC Card', 'price' => 19.99, 'quantity' => 250, 'front_image' => 'images/nfc/nfc-front2.png', 'back_image' => 'images/nfc/nfc-back2.png', 'is_enabled' => true, 'created_by' => $user->id],
            ['name' => 'Basic Contact Card', 'price' => 9.99, 'quantity' => 500, 'front_image' => 'images/nfc/nfc-front3.png', 'back_image' => 'images/nfc/nfc-back3.png', 'is_enabled' => true, 'created_by' => $user->id],
            ['name' => 'Executive Card', 'price' => 49.99, 'quantity' => 50, 'front_image' => 'images/nfc/nfc-front4.png', 'back_image' => 'images/nfc/nfc-back4.png', 'is_enabled' => false, 'created_by' => $user->id],
            ['name' => 'Student Discount Card', 'price' => 14.99, 'quantity' => 200, 'front_image' => 'images/nfc/nfc-front5.png', 'back_image' => 'images/nfc/nfc-back5.png', 'is_enabled' => true, 'created_by' => $user->id],
            ['name' => 'Corporate Elite Card', 'price' => 79.99, 'quantity' => 25, 'front_image' => 'images/nfc/nfc-front6.png', 'back_image' => 'images/nfc/nfc-back6.png', 'is_enabled' => true, 'created_by' => $user->id],
            ['name' => 'Startup Special Card', 'price' => 24.99, 'quantity' => 150, 'front_image' => 'images/nfc/nfc-front7.png', 'back_image' => 'images/nfc/nfc-back7.png', 'is_enabled' => true, 'created_by' => $user->id],
            ['name' => 'Professional Card', 'price' => 34.99, 'quantity' => 75, 'front_image' => 'images/nfc/nfc-front8.png', 'back_image' => 'images/nfc/nfc-back8.png', 'is_enabled' => true, 'created_by' => $user->id],
            ['name' => 'Budget Card', 'price' => 7.99, 'quantity' => 1000, 'front_image' => 'images/nfc/nfc-front9.png', 'back_image' => 'images/nfc/nfc-back9.png', 'is_enabled' => true, 'created_by' => $user->id],
            ['name' => 'Luxury Gold Card', 'price' => 99.99, 'quantity' => 10, 'front_image' => 'images/nfc/nfc-front10.png', 'back_image' => 'images/nfc/nfc-back10.png', 'is_enabled' => false, 'created_by' => $user->id],
            ['name' => 'Team Pack Card', 'price' => 39.99, 'quantity' => 300, 'front_image' => 'images/nfc/nfc-front1.png', 'back_image' => 'images/nfc/nfc-back1.png', 'is_enabled' => true, 'created_by' => $user->id],
            ['name' => 'Event Special Card', 'price' => 17.99, 'quantity' => 500, 'front_image' => 'images/nfc/nfc-front2.png', 'back_image' => 'images/nfc/nfc-back2.png', 'is_enabled' => true, 'created_by' => $user->id],
            ['name' => 'Conference Card', 'price' => 22.99, 'quantity' => 200, 'front_image' => 'images/nfc/nfc-front3.png', 'back_image' => 'images/nfc/nfc-back3.png', 'is_enabled' => true, 'created_by' => $user->id],
            ['name' => 'Networking Card', 'price' => 27.99, 'quantity' => 180, 'front_image' => 'images/nfc/nfc-front4.png', 'back_image' => 'images/nfc/nfc-back4.png', 'is_enabled' => true, 'created_by' => $user->id],
            ['name' => 'Digital Business Card', 'price' => 12.99, 'quantity' => 400, 'front_image' => 'images/nfc/nfc-front5.png', 'back_image' => 'images/nfc/nfc-back5.png', 'is_enabled' => true, 'created_by' => $user->id],
            ['name' => 'Smart Contact Card', 'price' => 18.99, 'quantity' => 350, 'front_image' => 'images/nfc/nfc-front6.png', 'back_image' => 'images/nfc/nfc-back6.png', 'is_enabled' => true, 'created_by' => $user->id],
            ['name' => 'Quick Share Card', 'price' => 15.99, 'quantity' => 600, 'front_image' => 'images/nfc/nfc-front7.png', 'back_image' => 'images/nfc/nfc-back7.png', 'is_enabled' => true, 'created_by' => $user->id],
            ['name' => 'Pro Connect Card', 'price' => 44.99, 'quantity' => 80, 'front_image' => 'images/nfc/nfc-front8.png', 'back_image' => 'images/nfc/nfc-back8.png', 'is_enabled' => false, 'created_by' => $user->id],
            ['name' => 'Social Media Card', 'price' => 21.99, 'quantity' => 250, 'front_image' => 'images/nfc/nfc-front9.png', 'back_image' => 'images/nfc/nfc-back9.png', 'is_enabled' => true, 'created_by' => $user->id],
            ['name' => 'Portfolio Card', 'price' => 32.99, 'quantity' => 120, 'front_image' => 'images/nfc/nfc-front10.png', 'back_image' => 'images/nfc/nfc-back10.png', 'is_enabled' => true, 'created_by' => $user->id],
            ['name' => 'Creative Card', 'price' => 26.99, 'quantity' => 160, 'front_image' => 'images/nfc/nfc-front1.png', 'back_image' => 'images/nfc/nfc-back1.png', 'is_enabled' => true, 'created_by' => $user->id],
            ['name' => 'Minimalist Card', 'price' => 13.99, 'quantity' => 450, 'front_image' => 'images/nfc/nfc-front2.png', 'back_image' => 'images/nfc/nfc-back2.png', 'is_enabled' => true, 'created_by' => $user->id],
            ['name' => 'Tech Card', 'price' => 35.99, 'quantity' => 90, 'front_image' => 'images/nfc/nfc-front3.png', 'back_image' => 'images/nfc/nfc-back3.png', 'is_enabled' => true, 'created_by' => $user->id],
            ['name' => 'Designer Card', 'price' => 41.99, 'quantity' => 65, 'front_image' => 'images/nfc/nfc-front4.png', 'back_image' => 'images/nfc/nfc-back4.png', 'is_enabled' => true, 'created_by' => $user->id],
            ['name' => 'Freelancer Card', 'price' => 16.99, 'quantity' => 380, 'front_image' => 'images/nfc/nfc-front5.png', 'back_image' => 'images/nfc/nfc-back5.png', 'is_enabled' => true, 'created_by' => $user->id],
        ];

        foreach ($nfcCards as $cardData) {
            NfcCard::create($cardData);
        }

        $this->command->info('NFC Cards seeded successfully with front and back images!');
    }
}
