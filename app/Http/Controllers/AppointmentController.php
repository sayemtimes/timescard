<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Business;
use App\Services\GoogleCalendarService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $authUser = auth()->user();
        
        $query = Appointment::with('business')
            ->orderBy($request->get('sort_field', 'appointment_date'), $request->get('sort_direction', 'desc'));

        // Apply appointment filtering based on user type and permissions
        if ($authUser->type === 'company') {
            $staffIds = User::where('created_by', $authUser->id)->pluck('id')->toArray();
            $staffIds = array_merge([$authUser->id], $staffIds);
            $query->whereHas('business', function ($businessQuery) use ($staffIds) {
                $businessQuery->whereIn('created_by', $staffIds);
            });
            $businesses = Business::whereIn('created_by', $staffIds)->orderBy('name')->get(['id', 'name']);
        } else {
            // Staff users can only see appointments for businesses created by their company
            if ($authUser->can('manage-appointments') || $authUser->can('view-appointments')) {
                $query->whereHas('business', function ($businessQuery) use ($authUser) {
                    $businessQuery->where('created_by', $authUser->id);
                });
                //$companyUser = User::find($authUser->created_by);
                $businesses = $authUser ? $authUser->businesses()->orderBy('name')->get(['id', 'name']) : collect();
            } else {
                $query->whereRaw('1 = 0');
                $businesses = collect();
            }
        }
        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhereHas('business', function ($businessQuery) use ($search) {
                      $businessQuery->where('name', 'like', "%{$search}%");
                  });
            });
        }

        // Business filter
        if ($request->filled('business')) {
            $query->where('business_id', $request->get('business'));
        }

        // Status filter
        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }

        $appointments = $query->paginate($request->get('per_page', 10));

        return Inertia::render('appointments/index', [
            'appointments' => $appointments,
            'businesses' => $businesses,
            'filters' => $request->only(['search', 'business', 'status', 'sort_field', 'sort_direction', 'per_page'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'business_id' => 'required|exists:businesses,id',
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|phone:AUTO|regex:/^\+\d{4,20}$/',
            'appointment_date' => 'required|date',
            'appointment_time' => 'required|date_format:H:i',
            'message' => 'nullable|string',
            'status' => 'required|in:scheduled,confirmed,completed,cancelled,no_show',
            'notes' => 'nullable|string',
        ],
[
            'phone.phone' => __('Please enter a valid phone number with country code  (e.g. +1 5551234567).'),
            'phone.regex' => __('Phone number must start with "+" followed by country code (e.g. +1 5551234567).'),
        ]);
        
        // Verify user has access to the business
        $authUser = auth()->user();
        $business = Business::find($validated['business_id']);
        
        if (!$business) {
            return redirect()->back()->with('error', __('Business not found.'));
        }
        
        // Check for existing appointment at the same time (only active appointments block the slot)
        $existingAppointment = Appointment::where('business_id', $validated['business_id'])
            ->where('appointment_date', $validated['appointment_date'])
            ->whereRaw('TIME_FORMAT(appointment_time, "%H:%i") = ?', [$validated['appointment_time']])
            ->whereIn('status', ['scheduled', 'confirmed']) // Only active appointments block time slots
            ->first();
        if ($existingAppointment) {
            return redirect()->back()->withErrors(['appointment_time' => __('An appointment is already scheduled at this time for this business.')]);
        }
        
        // $hasAccess = false;
        // if ($authUser->type === 'company') {
        //     $hasAccess = $business->created_by === $authUser->id;
        // } else {
        //     // Staff users can only create appointments for businesses created by their company
        //     if ($authUser->can('manage-appointments') || $authUser->can('create-appointments')) {
        //         $hasAccess = $business->created_by === $authUser->created_by;
        //     }
        // }
        
        // if (!$hasAccess) {
        //     return redirect()->back()->with('error', __('You do not have permission to create appointments for this business.'));
        // }

        $appointment = Appointment::create($validated);

        // Sync with Google Calendar
        $googleCalendar = new GoogleCalendarService();
        $calendarEvent = $googleCalendar->createEvent($appointment);
        if ($calendarEvent) {
            $appointment->update(['google_event_id' => $calendarEvent->id]);
        }

        // Trigger email notification
        event(new \App\Events\AppointmentCreated($appointment));

        // Check for email errors
        if (session()->has('email_error')) {
            return redirect()->back()->with('warning', __('Appointment created successfully, but email notification failed: :error', ['error' => session('email_error')]));
        }

        return redirect()->back()->with('success', __('Appointment created successfully.'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Appointment $appointment)
    {
        // Verify user has access to the appointment's business
        $authUser = auth()->user();
        $business = $appointment->business;
        
        if (!$business) {
            return redirect()->back()->with('error', __('Business not found.'));
        }
        
        // $hasAccess = false;
        // if ($authUser->type === 'company') {
        //     $hasAccess = $business->created_by === $authUser->id;
        // } else {
        //     // Staff users can only update appointments for businesses created by their company
        //     if ($authUser->can('manage-appointments') || $authUser->can('edit-appointments')) {
        //         $hasAccess = $business->created_by === $authUser->created_by;
        //     }
        // }
        
        // if (!$hasAccess) {
        //     return redirect()->back()->with('error', __('You do not have permission to update this appointment.'));
        // }
        
        $validated = $request->validate([
            'business_id' => 'required|exists:businesses,id',
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|phone:AUTO|regex:/^\+\d{4,20}$/',
            'appointment_date' => 'required|date',
            'appointment_time' => 'required|date_format:H:i',
            'message' => 'nullable|string',
            'status' => 'required|in:scheduled,confirmed,completed,cancelled,no_show',
            'notes' => 'nullable|string',
        ],
[
            'phone.phone' => __('Please enter a valid phone number with country code  (e.g. +1 5551234567).'),
            'phone.regex' => __('Phone number must start with "+" followed by country code (e.g. +1 5551234567).'),
        ]);
        
        // Check for existing appointment at the same time (excluding current appointment, only active appointments block the slot)
        $existingAppointment = Appointment::where('business_id', $validated['business_id'])
            ->where('appointment_date', $validated['appointment_date'])
            ->whereRaw('TIME_FORMAT(appointment_time, "%H:%i") = ?', [$validated['appointment_time']])
            ->whereIn('status', ['scheduled', 'confirmed']) // Only active appointments block time slots
            ->where('id', '!=', $appointment->id)
            ->first();
            
        if ($existingAppointment) {
            return redirect()->back()->withErrors(['appointment_time' => __('An appointment is already scheduled at this time for this business.')]);
        }
        
        // Also verify the new business_id if it's being changed
        if ($validated['business_id'] != $appointment->business_id) {
            $newBusiness = Business::find($validated['business_id']);
            if (!$newBusiness) {
                return redirect()->back()->with('error', __('New business not found.'));
            }
            
            // $hasAccessToNewBusiness = false;
            // if ($authUser->type === 'company') {
            //     $hasAccessToNewBusiness = $newBusiness->created_by === $authUser->id;
            // } else {
            //     if ($authUser->can('manage-appointments') || $authUser->can('edit-appointments')) {
            //         $hasAccessToNewBusiness = $newBusiness->created_by === $authUser->created_by;
            //     }
            // }
            
            // if (!$hasAccessToNewBusiness) {
            //     return redirect()->back()->with('error', __('You do not have permission to move this appointment to the selected business.'));
            // }
        }

        $appointment->update($validated);

        // Update Google Calendar event
        if ($appointment->google_event_id) {
            $googleCalendar = new GoogleCalendarService();
            $googleCalendar->updateEvent($appointment->google_event_id, $appointment);
        }

        return redirect()->back()->with('success', 'Appointment updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appointment $appointment)
    {
        // Verify user has access to the appointment's business
        // $authUser = auth()->user();
        $business = $appointment->business;
        
        if (!$business) {
            return redirect()->back()->with('error', __('Business not found.'));
        }
        
        // $hasAccess = false;
        // if ($authUser->type === 'company') {
        //     $hasAccess = $business->created_by === $authUser->id;
        // } else {
        //     // Staff users can only delete appointments for businesses created by their company
        //     if ($authUser->can('manage-appointments') || $authUser->can('delete-appointments')) {
        //         $hasAccess = $business->created_by === $authUser->created_by;
        //     }
        // }
        
        // if (!$hasAccess) {
        //     return redirect()->back()->with('error', __('You do not have permission to delete this appointment.'));
        // }
        
        // Delete from Google Calendar
        if ($appointment->google_event_id) {
            $googleCalendar = new GoogleCalendarService();
            $googleCalendar->deleteEvent($appointment->google_event_id);
        }

        $appointment->delete();

        return redirect()->back()->with('success', __('Appointment deleted successfully.'));
    }
    
    /**
     * Reply to an appointment.
     */
    public function reply(Request $request, Appointment $appointment)
    {
        // Verify user has access to the appointment's business
        // $authUser = auth()->user();
        $business = $appointment->business;
        
        if (!$business) {
            return redirect()->back()->with('error', __('Business not found.'));
        }
        
        // $hasAccess = false;
        // if ($authUser->type === 'company') {
        //     $hasAccess = $business->created_by === $authUser->id;
        // } else {
        //     // Staff users can only reply to appointments for businesses created by their company
        //     if ($authUser->can('manage-appointments') || $authUser->can('reply-appointments')) {
        //         $hasAccess = $business->created_by === $authUser->created_by;
        //     }
        // }
        
        // if (!$hasAccess) {
        //     return redirect()->back()->with('error', __('You do not have permission to reply to this appointment.'));
        // }
        
        $validated = $request->validate([
            'notes' => 'required|string',
            'status' => 'required|in:scheduled,confirmed,completed,cancelled,no_show',
        ]);

        $appointment->update($validated);
        
        // If the appointment has an email, you could send a notification here
        if (isset($appointment->email)) {
            // Send email notification logic could be added here
        }

        return redirect()->back()->with('success', __('Reply sent successfully.'));
    }

    /**
     * Display calendar view with appointments.
     */
    public function calendar(Request $request)
    {
        // Get date range from request or default to current month
        $startDate = $request->get('start_date', now()->startOfMonth()->format('Y-m-d'));
        $endDate = $request->get('end_date', now()->endOfMonth()->format('Y-m-d'));
        
        // Use smaller buffer for better performance (2 weeks instead of 1 month)
        $startBuffer = date('Y-m-d', strtotime('-14 days', strtotime($startDate)));
        $endBuffer = date('Y-m-d', strtotime('+14 days', strtotime($endDate)));
        
        // Calculate stats directly in the database for better performance
        $statsQuery = Appointment::selectRaw('
            COUNT(*) as total,
            SUM(CASE WHEN status = "scheduled" THEN 1 ELSE 0 END) as scheduled,
            SUM(CASE WHEN status = "confirmed" THEN 1 ELSE 0 END) as confirmed,
            SUM(CASE WHEN status = "completed" THEN 1 ELSE 0 END) as completed
        ')
        ->whereBetween('appointment_date', [$startDate, $endDate]);
        
        // Apply business filter to stats if provided
        if ($request->filled('business_id') && $request->get('business_id') !== 'all') {
            $statsQuery->where('business_id', $request->get('business_id'));
        }
        
        // Get stats from database
        $stats = $statsQuery->first()->toArray();
        
        // Query appointments within the date range with specific fields only
        $query = Appointment::select([
            'id', 'name', 'email', 'phone', 'appointment_date', 'appointment_time', 
            'message', 'status', 'business_id', 'notes'
        ])
        ->with(['business:id,name']) // Only select needed fields from business
        ->whereBetween('appointment_date', [$startBuffer, $endBuffer])
        ->orderBy('appointment_date', 'asc');
            
        // Apply business filtering based on user type and permissions
        $authUser = auth()->user();
        if ($authUser->type === 'company') {
            $staffIds = User::where('created_by', $authUser->id)->pluck('id')->toArray();
            $staffIds = array_merge([$authUser->id], $staffIds);
            $accessibleBusinessIds = Business::whereIn('created_by', $staffIds)->pluck('id');
            $businesses = $authUser->businesses()->orderBy('name')->get(['id', 'name']);
        } else {
            // Staff users can only see appointments for businesses created by their company
            if ($authUser->can('manage-appointments') || $authUser->can('view-appointments') || $authUser->can('manage-calendar') || $authUser->can('view-calendar')) {
                $accessibleBusinessIds = Business::where('created_by', $authUser->id)->pluck('id');
                $companyUser = User::find($authUser->created_by);
                $businesses = $companyUser ? $companyUser->businesses()->orderBy('name')->get(['id', 'name']) : collect();
            } else {
                $accessibleBusinessIds = collect([]);
                $businesses = collect();
            }
        }
        
        // Filter appointments by accessible businesses
        if ($accessibleBusinessIds->isEmpty()) {
            $query->whereRaw('1 = 0'); // No accessible businesses
        } else {
            $query->whereIn('business_id', $accessibleBusinessIds);
            
            // Apply specific business filter if provided and accessible
            if ($request->filled('business_id') && $request->get('business_id') !== 'all') {
                $requestedBusinessId = $request->get('business_id');
                if ($accessibleBusinessIds->contains($requestedBusinessId)) {
                    $query->where('business_id', $requestedBusinessId);
                } else {
                    // User trying to access unauthorized business
                    $query->whereRaw('1 = 0');
                }
            }
        }
        
        // Get appointments with pagination for better performance
        $appointments = $query->limit(500)->get()->map(function ($appointment) {
            return [
                'id' => $appointment->id,
                'title' => $appointment->name,
                'date' => $appointment->appointment_date->format('Y-m-d'),
                'time' => $appointment->appointment_time ? $appointment->appointment_time->format('H:i') : null,
                'email' => $appointment->email,
                'phone' => $appointment->phone,
                'message' => $appointment->message,
                'status' => $appointment->status,
                'business' => $appointment->business ? $appointment->business->name : null,
                'notes' => $appointment->notes,
            ];
        });

        return Inertia::render('calendar/index', [
            'appointments' => $appointments,
            'businesses' => $businesses,
            'stats' => $stats,
            'dateRange' => [
                'start' => $startDate,
                'end' => $endDate
            ]
        ]);
    }
}