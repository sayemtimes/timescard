<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create super admin role
        $superAdminRole = Role::firstOrCreate(
            ['name' => 'superadmin', 'guard_name' => 'web'],
            [
                'label' => 'Super Admin',
                'description' => 'Super Admin has full access to all features',
            ]
        );

        // Create admin role
        $adminRole = Role::firstOrCreate(
            ['name' => 'company', 'guard_name' => 'web'],
            [
                'label' => 'Company',
                'description' => 'Company has access to manage buissness',
            ]
        );

        // Get all permissions
        $permissions = Permission::all();

        // Assign all permissions to super admin
        $superAdminRole->syncPermissions($permissions);

        // Assign specific permissions to company role
        $adminPermissions = Permission::whereIn('name', [
            'manage-dashboard',
            'view-dashboard',
            'manage-users',
            'create-users',
            'edit-users',
            'delete-users',
            'view-users',
            'reset-password-users',
            'toggle-status-users',
            'manage-roles',
            'create-roles',
            'edit-roles',
            'delete-roles',
            'view-roles',
            'view-permissions',
            'manage-contacts',
            'view-contacts',
            'create-contacts',
            'edit-contacts',
            'reply-contacts',
            'delete-contacts',
            'manage-campaigns',
            'view-campaigns',
            'create-campaigns',
            'edit-campaigns',
            'delete-campaigns',
            'analytics-campaigns',
            'manage-nfc-cards',
            'view-nfc-cards',
            'create-nfc-cards',
            'edit-nfc-cards',
            'delete-nfc-cards',
            'order-nfc-cards',
            'toggle-status-nfc-cards',
            'create-nfc-card-order-requests',
            'manage-plans',
            'view-plans',
            'request-plans',
            'trial-plans',
            'subscribe-plans',
            'manage-system-settings',
            'manage-email-settings',
            'manage-brand-settings',
            'manage-webhook-settings',
            'manage-settings',
            'manage-media',
            'manage-own-media',
            'create-media',
            'edit-media',
            'delete-media',
            'view-media',
            'download-media',
            'manage-calendar',
            'view-calendar',
            'manage-appointments',
            'manage-own-appointments',
            'create-appointments',
            'edit-appointments',
            'reply-appointments',
            'delete-appointments',
            'view-appointments',
            'manage-own-contacts',
            'manage-own-campaigns',
            'manage-own-businesses',
            'manage-businesses',
            'view-businesses',
            'create-businesses',
            'edit-businesses',
            'delete-businesses',
            'manage-language',
            'edit-language',
            'view-language',
            'manage-referral',
            'manage-vcard-builder',
            'view-vcard-builder',
            'create-vcard-builder',
            'edit-vcard-builder',
            'delete-vcard-builder',
            'duplicate-vcard-builder',
            'share-vcard-builder',
            'analytics-vcard-builder',
            'settings-vcard-builder',
            'calendar-vcard-builder',
            'contacts-vcard-builder',
            'view-landing-page',
            'manage-analytics',
            'manage-business-directory',
            'manage-users-referral',
            'delete-nfc-card-order-requests',
            'manage-plan-requests',
            'manage-plan-orders',
            'delete-plan-requests',
            'manage-bio-link-builder',
            'view-bio-link-builder',
            'create-bio-link-builder',
            'edit-bio-link-builder',
            'delete-bio-link-builder',
            'duplicate-bio-link-builder',
            'manage-google-wallet',
            'create-google-wallet'
        ])->get();

        $adminRole->syncPermissions($adminPermissions);
    }
}