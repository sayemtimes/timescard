<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Contact;
use App\Models\Newsletter;

class LandingPageContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample landing page contacts
        $contacts = [
            [
                'name' => 'John Doe',
                'email' => 'john.doe@example.com',
                'subject' => 'Interested in your services',
                'message' => 'Hi, I am interested in learning more about your digital business card services. Could you please provide more information about pricing and features?',
                'status' => 'new',
                'is_landing_page' => true,
                'business_id' => null,
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane.smith@example.com',
                'subject' => 'Partnership Inquiry',
                'message' => 'Hello, I represent a marketing agency and we are interested in partnering with your company. Please let me know if you would be interested in discussing this further.',
                'status' => 'contacted',
                'is_landing_page' => true,
                'business_id' => null,
                'notes' => 'Contacted via email on ' . now()->subDays(2)->format('Y-m-d') . '. Waiting for follow-up meeting.',
            ],
            [
                'name' => 'Mike Johnson',
                'email' => 'mike.johnson@example.com',
                'subject' => 'Technical Support',
                'message' => 'I am having trouble with my digital business card. The QR code is not working properly. Can someone help me with this issue?',
                'status' => 'qualified',
                'is_landing_page' => true,
                'business_id' => null,
                'notes' => 'Technical issue resolved. Customer satisfied with the solution.',
            ],
            [
                'name' => 'Sarah Wilson',
                'email' => 'sarah.wilson@example.com',
                'subject' => 'Bulk Order Inquiry',
                'message' => 'We are a company of 50 employees and we are interested in ordering digital business cards for all our staff. What kind of bulk discounts do you offer?',
                'status' => 'converted',
                'is_landing_page' => true,
                'business_id' => null,
                'notes' => 'Converted to customer. Purchased enterprise plan for 50 users.',
            ],
            [
                'name' => 'David Brown',
                'email' => 'david.brown@example.com',
                'subject' => 'Feature Request',
                'message' => 'I love your service! Is there a way to add social media integration to the business cards? This would be a great feature to have.',
                'status' => 'closed',
                'is_landing_page' => true,
                'business_id' => null,
                'notes' => 'Feature request noted and added to development roadmap. Customer informed about upcoming features.',
            ],
        ];

        foreach ($contacts as $contact) {
            Contact::create($contact);
        }

        // Create sample newsletter subscriptions
        $newsletters = [
            [
                'email' => 'subscriber1@example.com',
                'status' => 'active',
                'subscribed_at' => now()->subDays(30),
            ],
            [
                'email' => 'subscriber2@example.com',
                'status' => 'active',
                'subscribed_at' => now()->subDays(15),
            ],
            [
                'email' => 'subscriber3@example.com',
                'status' => 'active',
                'subscribed_at' => now()->subDays(7),
            ],
            [
                'email' => 'unsubscribed@example.com',
                'status' => 'unsubscribed',
                'subscribed_at' => now()->subDays(60),
                'unsubscribed_at' => now()->subDays(10),
            ],
            [
                'email' => 'newsletter.fan@example.com',
                'status' => 'active',
                'subscribed_at' => now()->subDays(3),
            ],
        ];

        foreach ($newsletters as $newsletter) {
            Newsletter::create($newsletter);
        }
    }
}