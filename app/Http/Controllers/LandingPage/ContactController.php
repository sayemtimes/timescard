<?php

namespace App\Http\Controllers\LandingPage;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $query = Contact::landingPage()
            ->orderBy($request->get('sort_field', 'created_at'), $request->get('sort_direction', 'desc'));

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $perPage = $request->get('per_page', 15);
        $contacts = $query->paginate($perPage)->withQueryString();

        return Inertia::render('landing-page/contacts/index', [
            'contacts' => $contacts,
            'filters' => $request->only(['search', 'status', 'sort_field', 'sort_direction', 'per_page']),
            'stats' => [
                'total' => Contact::landingPage()->count(),
                'new' => Contact::landingPage()->where('status', 'new')->count(),
                'contacted' => Contact::landingPage()->where('status', 'contacted')->count(),
                'qualified' => Contact::landingPage()->where('status', 'qualified')->count(),
                'converted' => Contact::landingPage()->where('status', 'converted')->count(),
                'closed' => Contact::landingPage()->where('status', 'closed')->count(),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string'
        ]);

        Contact::create([
            'name' => $request->name,
            'email' => $request->email,
            'subject' => $request->subject,
            'message' => $request->message,
            'is_landing_page' => true,
            'status' => 'new'
        ]);

        return back()->with('success', __('Contact created successfully!'));
    }

    public function show(Contact $contact)
    {
        // Ensure this is a landing page contact
        if (!$contact->is_landing_page) {
            abort(404);
        }

        return Inertia::render('landing-page/contacts/show', [
            'contact' => $contact
        ]);
    }

    public function update(Request $request, Contact $contact)
    {
        // Ensure this is a landing page contact
        if (!$contact->is_landing_page) {
            abort(404);
        }

        $request->validate([
            'status' => 'required|in:new,contacted,qualified,converted,closed',
            'notes' => 'nullable|string'
        ]);

        $contact->update($request->only(['status', 'notes']));

        return back()->with('success', __('Contact updated successfully!'));
    }

    public function destroy(Contact $contact)
    {
        // Ensure this is a landing page contact
        if (!$contact->is_landing_page) {
            abort(404);
        }

        $contact->delete();

        return back()->with('success', __('Contact deleted successfully!'));
    }

    public function reply(Request $request, Contact $contact)
    {
        // Ensure this is a landing page contact
        if (!$contact->is_landing_page) {
            abort(404);
        }

        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
            'status' => 'required|in:new,contacted,qualified,converted,closed',
        ]);

        // Update contact status
        $contact->update(['status' => $validated['status']]);

        // Here you would typically send the email
        // For now, we'll just simulate it
        
        return back()->with('success', __('Reply sent successfully!'));
    }
}