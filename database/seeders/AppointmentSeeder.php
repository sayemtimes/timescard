<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Business;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class AppointmentSeeder extends Seeder
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

        $statuses = ['scheduled', 'confirmed', 'completed', 'cancelled', 'no_show'];
        $services = [
            'doctor' => ['Consultation', 'Check-up', 'Follow-up', 'Specialist Appointment', 'Vaccination'],
            'restaurant' => ['Reservation', 'Private Dining', 'Catering Inquiry', 'Event Booking'],
            'salon' => ['Haircut', 'Coloring', 'Manicure', 'Pedicure', 'Facial', 'Massage'],
            'fitness' => ['Personal Training', 'Fitness Assessment', 'Nutrition Consultation', 'Group Class'],
            'lawfirm' => ['Initial Consultation', 'Case Review', 'Document Preparation', 'Legal Advice'],
            'default' => ['Consultation', 'Meeting', 'Service Appointment', 'Follow-up', 'Assessment']
        ];
        
        // Create at least 12 appointments for each business
        foreach ($businesses as $business) {
            // Only create appointments for businesses with appointments enabled
            $configSections = $business->config_sections ?? [];
            if (!isset($configSections['appointments']) || !($configSections['appointments']['enabled'] ?? false)) {
                continue;
            }
            
            // Create more appointments for the main company user's businesses
            $appointmentCount = $business->user && $business->user->email === 'company@example.com' ? 
                rand(20, 30) : rand(12, 20);
            
            // Get appropriate service types for this business
            $businessType = $business->business_type;
            $serviceTypes = $services[$businessType] ?? $services['default'];
            
            // Create past, current, and future appointments
            for ($i = 0; $i < $appointmentCount; $i++) {
                // Distribute appointments: 30% past, 10% today, 60% future
                $timeframe = $faker->randomElement(['past', 'past', 'past', 'today', 'future', 'future', 'future', 'future', 'future', 'future']);
                
                switch ($timeframe) {
                    case 'past':
                        $appointmentDate = $faker->dateTimeBetween('-3 months', 'yesterday');
                        $status = $faker->randomElement(['completed', 'completed', 'completed', 'cancelled', 'no_show']);
                        break;
                    case 'today':
                        $appointmentDate = new \DateTime();
                        $status = $faker->randomElement(['scheduled', 'confirmed']);
                        break;
                    case 'future':
                    default:
                        $appointmentDate = $faker->dateTimeBetween('tomorrow', '+2 months');
                        $status = $faker->randomElement(['scheduled', 'scheduled', 'confirmed', 'confirmed', 'cancelled']);
                        break;
                }
                
                // Create appointment times during business hours (9am-5pm)
                $hour = $faker->numberBetween(9, 17);
                $minute = $faker->randomElement([0, 15, 30, 45]);
                $appointmentTime = sprintf('%02d:%02d:00', $hour, $minute);
                
                // Include service type in the message
                $serviceType = $faker->randomElement($serviceTypes);
                $message = "Service requested: {$serviceType}\n\n";
                $message .= $faker->optional(0.7)->paragraph() ?: "I would like to book this appointment.";
                
                // Create the appointment
                $createdAt = $faker->dateTimeBetween('-3 months', min($appointmentDate, new \DateTime('now')));
                $updatedAt = $status !== 'scheduled' ? 
                    $faker->dateTimeBetween($createdAt, new \DateTime('now')) : 
                    $createdAt;
                
                Appointment::create([
                    'business_id' => $business->id,
                    'name' => $faker->name(),
                    'email' => $faker->email(),
                    'phone' => $faker->phoneNumber(),
                    'appointment_date' => $appointmentDate->format('Y-m-d'),
                    'appointment_time' => $appointmentTime,
                    'message' => $message,
                    'status' => $status,
                    'notes' => $status !== 'scheduled' ? $faker->optional(0.6)->paragraph() : $faker->optional(0.2)->paragraph(),
                    'created_at' => $createdAt,
                    'updated_at' => $updatedAt,
                ]);
            }
        }
        
        $this->command->info('Created ' . Appointment::count() . ' appointments successfully!');
    }
}