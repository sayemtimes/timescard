<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            // Dashboard permissions
            ['name' => 'manage-dashboard', 'module' => 'dashboard', 'label' => 'Manage Dashboard', 'description' => 'Can view dashboard'],
            ['name' => 'manage-analytics', 'module' => 'analytics', 'label' => 'Manage Analytics', 'description' => 'Can view Analytics'],
            ['name' => 'manage-business-directory', 'module' => 'business-directory', 'label' => 'Manage Business Directory', 'description' => 'Can view Business Directory'],

            // User management
            ['name' => 'manage-users', 'module' => 'users', 'label' => 'Manage Users', 'description' => 'Can manage users'],
            ['name' => 'manage-any-users', 'module' => 'users', 'label' => 'Manage All Users', 'description' => 'Manage Any Users'],
            ['name' => 'manage-own-users', 'module' => 'users', 'label' => 'Manage Own Users', 'description' => 'Manage Limited Users that is created by own'],
            ['name' => 'view-users', 'module' => 'users', 'label' => 'Manage Users', 'description' => 'View Users'],
            ['name' => 'create-users', 'module' => 'users', 'label' => 'Create Users', 'description' => 'Can create users'],
            ['name' => 'edit-users', 'module' => 'users', 'label' => 'Edit Users', 'description' => 'Can edit users'],
            ['name' => 'delete-users', 'module' => 'users', 'label' => 'Delete Users', 'description' => 'Can delete users'],
            ['name' => 'reset-password-users', 'module' => 'users', 'label' => 'Reset Password Users', 'description' => 'Can reset password users'],
            ['name' => 'toggle-status-users', 'module' => 'users', 'label' => 'Change Status Users', 'description' => 'Can change status users'],
            
            // Role management
            ['name' => 'manage-roles', 'module' => 'roles', 'label' => 'Manage Roles', 'description' => 'Can manage roles'],
            ['name' => 'manage-any-roles', 'module' => 'roles', 'label' => 'Manage All Roles', 'description' => 'Manage Any Roles'],
            ['name' => 'manage-own-roles', 'module' => 'roles', 'label' => 'Manage Own Roles', 'description' => 'Manage Limited Roles that is created by own'],
            ['name' => 'view-roles', 'module' => 'roles', 'label' => 'View Roles', 'description' => 'View Roles'],
            ['name' => 'create-roles', 'module' => 'roles', 'label' => 'Create Roles', 'description' => 'Can create roles'],
            ['name' => 'edit-roles', 'module' => 'roles', 'label' => 'Edit Roles', 'description' => 'Can edit roles'],
            ['name' => 'delete-roles', 'module' => 'roles', 'label' => 'Delete Roles', 'description' => 'Can delete roles'],
            
            // Permission management
            ['name' => 'manage-permissions', 'module' => 'permissions', 'label' => 'Manage Permissions', 'description' => 'Can manage permissions'],
            ['name' => 'manage-any-permissions', 'module' => 'permissions', 'label' => 'Manage All Permissions', 'description' => 'Manage Any Permissions'],
            ['name' => 'manage-own-permissions', 'module' => 'permissions', 'label' => 'Manage Own Permissions', 'description' => 'Manage Limited Permissions that is created by own'],
            ['name' => 'view-permissions', 'module' => 'permissions', 'label' => 'View Permissions', 'description' => 'View Permissions'],
            ['name' => 'create-permissions', 'module' => 'permissions', 'label' => 'Create Permissions', 'description' => 'Can create permissions'],
            ['name' => 'edit-permissions', 'module' => 'permissions', 'label' => 'Edit Permissions', 'description' => 'Can edit permissions'],
            ['name' => 'delete-permissions', 'module' => 'permissions', 'label' => 'Delete Permissions', 'description' => 'Can delete permissions'],
            
            // Company management
            ['name' => 'manage-companies', 'module' => 'companies', 'label' => 'Manage Companies', 'description' => 'Can manage Companies'],
            ['name' => 'manage-any-companies', 'module' => 'companies', 'label' => 'Manage All Companies', 'description' => 'Manage Any Companies'],
            ['name' => 'manage-own-companies', 'module' => 'companies', 'label' => 'Manage Own Companies', 'description' => 'Manage Limited Companies that is created by own'],
            ['name' => 'view-companies', 'module' => 'companies', 'label' => 'View Companies', 'description' => 'View Companies'],
            ['name' => 'create-companies', 'module' => 'companies', 'label' => 'Create Companies', 'description' => 'Can create Companies'],
            ['name' => 'edit-companies', 'module' => 'companies', 'label' => 'Edit Companies', 'description' => 'Can edit Companies'],
            ['name' => 'delete-companies', 'module' => 'companies', 'label' => 'Delete Companies', 'description' => 'Can delete Companies'],
            ['name' => 'reset-password-companies', 'module' => 'companies', 'label' => 'Reset Password Companies', 'description' => 'Can reset password Companies'],
            ['name' => 'toggle-status-companies', 'module' => 'companies', 'label' => 'Change Status Companies', 'description' => 'Can change status companies'],
            ['name' => 'manage-plans-companies', 'module' => 'companies', 'label' => 'Manage Plan Companies', 'description' => 'Can manage plans companies'],
            ['name' => 'upgrade-plan-companies', 'module' => 'companies', 'label' => 'Upgrade Plan Companies', 'description' => 'Can upgrade plan of companies'],
            
            // Plan management
            ['name' => 'manage-plans', 'module' => 'plans', 'label' => 'Manage Plans', 'description' => 'Can manage subscription plans'],
            ['name' => 'manage-any-plans', 'module' => 'plans', 'label' => 'Manage All Plans', 'description' => 'Manage Any Plans'],
            ['name' => 'manage-own-plans', 'module' => 'plans', 'label' => 'Manage Own Plans', 'description' => 'Manage Limited Plans that is created by own'],
            ['name' => 'view-plans', 'module' => 'plans', 'label' => 'View Plans', 'description' => 'View Plans'],
            ['name' => 'create-plans', 'module' => 'plans', 'label' => 'Create Plans', 'description' => 'Can create subscription plans'],
            ['name' => 'edit-plans', 'module' => 'plans', 'label' => 'Edit Plans', 'description' => 'Can edit subscription plans'],
            ['name' => 'delete-plans', 'module' => 'plans', 'label' => 'Delete Plans', 'description' => 'Can delete subscription plans'],
            ['name' => 'request-plans', 'module' => 'plans', 'label' => 'Request Plans', 'description' => 'Can request subscription plans'],
            ['name' => 'trial-plans', 'module' => 'plans', 'label' => 'Trial Plans', 'description' => 'Can start trial for subscription plans'],
            ['name' => 'subscribe-plans', 'module' => 'plans', 'label' => 'Subscribe Plans', 'description' => 'Can subscribe to subscription plans'],
            
            // NFC Card management
            ['name' => 'manage-nfc-cards', 'module' => 'nfc_cards', 'label' => 'Manage NFC Cards', 'description' => 'Can manage subscription NFC Cards'],
            ['name' => 'manage-any-nfc-cards', 'module' => 'nfc_cards', 'label' => 'Manage All NFC Cards', 'description' => 'Manage Any NFC Cards'],
            ['name' => 'manage-own-nfc-cards', 'module' => 'nfc_cards', 'label' => 'Manage Own NFC Cards', 'description' => 'Manage Limited NFC Cards that is created by own'],
            ['name' => 'view-nfc-cards', 'module' => 'nfc_cards', 'label' => 'View NFC Cards', 'description' => 'View NFC Cards'],
            ['name' => 'create-nfc-cards', 'module' => 'nfc_cards', 'label' => 'Create NFC Cards', 'description' => 'Can create subscription NFC Cards'],
            ['name' => 'edit-nfc-cards', 'module' => 'nfc_cards', 'label' => 'Edit NFC Cards', 'description' => 'Can edit subscription NFC Cards'],
            ['name' => 'delete-nfc-cards', 'module' => 'nfc_cards', 'label' => 'Delete NFC Cards', 'description' => 'Can delete subscription NFC Cards'],
            ['name' => 'order-nfc-cards', 'module' => 'nfc_cards', 'label' => 'Order NFC Cards', 'description' => 'Can create order requests for NFC Cards'],
            ['name' => 'toggle-status-nfc-cards', 'module' => 'nfc_cards', 'label' => 'Change Status NFC Cards', 'description' => 'Can change status NFC Cards'],
            
            // NFC Card Order Requests management
            ['name' => 'create-nfc-card-order-requests', 'module' => 'nfc_card_order_requests', 'label' => 'Create NFC Card Order Requests', 'description' => 'Can create NFC card order requests'],
            ['name' => 'approve-nfc-card-order-requests', 'module' => 'nfc_card_order_requests', 'label' => 'Approve NFC Card Order Requests', 'description' => 'Can approve NFC card order requests'],
            ['name' => 'reject-nfc-card-order-requests', 'module' => 'nfc_card_order_requests', 'label' => 'Reject NFC Card Order Requests', 'description' => 'Can reject NFC card order requests'],
            ['name' => 'delete-nfc-card-order-requests', 'module' => 'nfc_card_order_requests', 'label' => 'Delete NFC Card Order Requests', 'description' => 'Can delete NFC card order requests'],

            // Coupon management
            ['name' => 'manage-coupons', 'module' => 'coupons', 'label' => 'Manage Coupons', 'description' => 'Can manage subscription Coupons'],
            ['name' => 'manage-any-coupons', 'module' => 'coupons', 'label' => 'Manage All Coupons', 'description' => 'Manage Any Coupons'],
            ['name' => 'manage-own-coupons', 'module' => 'coupons', 'label' => 'Manage Own Coupons', 'description' => 'Manage Limited Coupons that is created by own'],
            ['name' => 'view-coupons', 'module' => 'coupons', 'label' => 'View Coupons', 'description' => 'View Coupons'],
            ['name' => 'create-coupons', 'module' => 'coupons', 'label' => 'Create Coupons', 'description' => 'Can create subscription Coupons'],
            ['name' => 'edit-coupons', 'module' => 'coupons', 'label' => 'Edit Coupons', 'description' => 'Can edit subscription Coupons'],
            ['name' => 'delete-coupons', 'module' => 'coupons', 'label' => 'Delete Coupons', 'description' => 'Can delete subscription Coupons'],
            ['name' => 'toggle-status-coupons', 'module' => 'coupons', 'label' => 'Change Status Coupons', 'description' => 'Can change status Coupons'],
            
            // Plan Requests management
            ['name' => 'manage-plan-requests', 'module' => 'plan_requests', 'label' => 'Manage Plan Requests', 'description' => 'Can manage plan requests'],
            ['name' => 'view-plan-requests', 'module' => 'plan_requests', 'label' => 'View Plan Requests', 'description' => 'View Plan Requests'],
            ['name' => 'create-plan-requests', 'module' => 'plan_requests', 'label' => 'Create Plan Requests', 'description' => 'Can create plan requests'],
            ['name' => 'edit-plan-requests', 'module' => 'plan_requests', 'label' => 'Edit Plan Requests', 'description' => 'Can edit plan requests'],
            ['name' => 'delete-plan-requests', 'module' => 'plan_requests', 'label' => 'Delete Plan Requests', 'description' => 'Can delete plan requests'],
            ['name' => 'approve-plan-requests', 'module' => 'plan_requests', 'label' => 'Approve plan requests', 'description' => 'Can approve plan requests'],
            ['name' => 'reject-plan-requests', 'module' => 'plan_requests', 'label' => 'Reject plan requests', 'description' => 'Can reject plplan requests'],

            // Plan Orders management
            ['name' => 'manage-plan-orders', 'module' => 'plan_orders', 'label' => 'Manage Plan Orders', 'description' => 'Can manage plan orders'],
            ['name' => 'view-plan-orders', 'module' => 'plan_orders', 'label' => 'View Plan Orders', 'description' => 'View Plan Orders'],
            ['name' => 'create-plan-orders', 'module' => 'plan_orders', 'label' => 'Create Plan Orders', 'description' => 'Can create plan orders'],
            ['name' => 'edit-plan-orders', 'module' => 'plan_orders', 'label' => 'Edit Plan Orders', 'description' => 'Can edit plan orders'],
            ['name' => 'delete-plan-orders', 'module' => 'plan_orders', 'label' => 'Delete Plan Orders', 'description' => 'Can delete plan orders'],
            ['name' => 'approve-plan-orders', 'module' => 'plan_orders', 'label' => 'Approve Plan Orders', 'description' => 'Can approve plan orders'],
            ['name' => 'reject-plan-orders', 'module' => 'plan_orders', 'label' => 'Reject Plan Orders', 'description' => 'Can reject plan orders'],

            // Domain Requests management
            ['name' => 'manage-domain-requests', 'module' => 'domain_requests', 'label' => 'Manage Domain Requests', 'description' => 'Can manage domain requests'],
            ['name' => 'view-domain-requests', 'module' => 'domain_requests', 'label' => 'View Domain Requests', 'description' => 'View Domain Requests'],
            ['name' => 'create-domain-requests', 'module' => 'domain_requests', 'label' => 'Create Domain Requests', 'description' => 'Can create domain requests'],
            ['name' => 'edit-domain-requests', 'module' => 'domain_requests', 'label' => 'Edit Domain Requests', 'description' => 'Can edit domain requests'],
            ['name' => 'delete-domain-requests', 'module' => 'domain_requests', 'label' => 'Delete Domain Requests', 'description' => 'Can delete domain requests'],
            ['name' => 'approve-domain-requests', 'module' => 'domain_requests', 'label' => 'Approve domain requests', 'description' => 'Can approve domain requests'],
            ['name' => 'reject-domain-requests', 'module' => 'domain_requests', 'label' => 'Reject domain requests', 'description' => 'Can reject domain requests'],

            // Settings
            ['name' => 'manage-settings', 'module' => 'settings', 'label' => 'Manage Settings', 'description' => 'Can manage All settings'],
            ['name' => 'manage-system-settings', 'module' => 'settings', 'label' => 'Manage System Settings', 'description' => 'Can manage system settings'],
            ['name' => 'manage-email-settings', 'module' => 'settings', 'label' => 'Manage Email Settings', 'description' => 'Can manage email settings'],
            ['name' => 'manage-brand-settings', 'module' => 'settings', 'label' => 'Manage Brand Settings', 'description' => 'Can manage brand settings'],
            ['name' => 'manage-company-settings', 'module' => 'settings', 'label' => 'Manage Company Settings', 'description' => 'Can manage Company settings'],
            ['name' => 'manage-storage-settings', 'module' => 'settings', 'label' => 'Manage Storage Settings', 'description' => 'Can manage storage settings'],
            ['name' => 'manage-payment-settings', 'module' => 'settings', 'label' => 'Manage Payment Settings', 'description' => 'Can manage payment settings'],
            ['name' => 'manage-currency-settings', 'module' => 'settings', 'label' => 'Manage Currency Settings', 'description' => 'Can manage currency settings'],
            ['name' => 'manage-recaptcha-settings', 'module' => 'settings', 'label' => 'Manage ReCaptch Settings', 'description' => 'Can manage recaptcha settings'],
            ['name' => 'manage-chatgpt-settings', 'module' => 'settings', 'label' => 'Manage ChatGpt Settings', 'description' => 'Can manage chatgpt settings'],
            ['name' => 'manage-cookie-settings', 'module' => 'settings', 'label' => 'Manage Cookie(GDPR) Settings', 'description' => 'Can manage cookie settings'],
            ['name' => 'manage-seo-settings', 'module' => 'settings', 'label' => 'Manage Seo Settings', 'description' => 'Can manage seo settings'],
            ['name' => 'manage-cache-settings', 'module' => 'settings', 'label' => 'Manage Cache Settings', 'description' => 'Can manage cache settings'],
            ['name' => 'manage-account-settings', 'module' => 'settings', 'label' => 'Manage Account Settings', 'description' => 'Can manage account settings'],
            
            // Campaign management
            ['name' => 'manage-campaigns', 'module' => 'campaigns', 'label' => 'Manage Campaigns', 'description' => 'Can manage campaigns'],
            ['name' => 'manage-any-campaigns', 'module' => 'campaigns', 'label' => 'Manage All campaigns', 'description' => 'Manage Any campaigns'],
            ['name' => 'manage-own-campaigns', 'module' => 'campaigns', 'label' => 'Manage Own campaigns', 'description' => 'Manage Limited campaigns that is created by own'],
            ['name' => 'view-campaigns', 'module' => 'campaigns', 'label' => 'View Campaigns', 'description' => 'View Campaigns'],
            ['name' => 'create-campaigns', 'module' => 'campaigns', 'label' => 'Create Campaigns', 'description' => 'Can create campaigns'],
            ['name' => 'edit-campaigns', 'module' => 'campaigns', 'label' => 'Edit Campaigns', 'description' => 'Can edit campaigns'],
            ['name' => 'delete-campaigns', 'module' => 'campaigns', 'label' => 'Delete Campaigns', 'description' => 'Can delete campaigns'],
            ['name' => 'manage-settings-campaigns', 'module' => 'campaigns', 'label' => 'Manage Campaigns Settings', 'description' => 'Can manage campaigns settings'],
            ['name' => 'toggle-status-campaigns', 'module' => 'campaigns', 'label' => 'Change Status Campaigns', 'description' => 'Can change status campaigns'],
            ['name' => 'analytics-campaigns', 'module' => 'campaigns', 'label' => 'Analytics Campaigns', 'description' => 'Can manage analytics campaigns'],
            
            // Currency management
            ['name' => 'manage-currencies', 'module' => 'currencies', 'label' => 'Manage Currencies', 'description' => 'Can manage currencies'],
            ['name' => 'manage-any-currencies', 'module' => 'currencies', 'label' => 'Manage All currencies', 'description' => 'Manage Any currencies'],
            ['name' => 'manage-own-currencies', 'module' => 'currencies', 'label' => 'Manage Own currencies', 'description' => 'Manage Limited currencies that is created by own'],
            ['name' => 'view-currencies', 'module' => 'currencies', 'label' => 'View Currencies', 'description' => 'View Currencies'],
            ['name' => 'create-currencies', 'module' => 'currencies', 'label' => 'Create Currencies', 'description' => 'Can create currencies'],
            ['name' => 'edit-currencies', 'module' => 'currencies', 'label' => 'Edit Currencies', 'description' => 'Can edit currencies'],
            ['name' => 'delete-currencies', 'module' => 'currencies', 'label' => 'Delete Currencies', 'description' => 'Can delete currencies'],
            
            // Contact management
            ['name' => 'manage-contacts', 'module' => 'contacts', 'label' => 'Manage Contacts', 'description' => 'Can manage contacts'],
            ['name' => 'manage-any-contacts', 'module' => 'contacts', 'label' => 'Manage All contacts', 'description' => 'Manage Any contacts'],
            ['name' => 'manage-own-contacts', 'module' => 'contacts', 'label' => 'Manage Own contacts', 'description' => 'Manage Limited contacts that is created by own'],
            ['name' => 'view-contacts', 'module' => 'contacts', 'label' => 'View Contacts', 'description' => 'View Contacts'],
            ['name' => 'create-contacts', 'module' => 'contacts', 'label' => 'Create Contacts', 'description' => 'Can create contacts'],
            ['name' => 'edit-contacts', 'module' => 'contacts', 'label' => 'Edit Contacts', 'description' => 'Can edit contacts'],
            ['name' => 'reply-contacts', 'module' => 'contacts', 'label' => 'Reply Contacts', 'description' => 'Can reply to contacts'],
            ['name' => 'delete-contacts', 'module' => 'contacts', 'label' => 'Delete Contacts', 'description' => 'Can delete contacts'],
            
            // Appointment management
            ['name' => 'manage-appointments', 'module' => 'appointments', 'label' => 'Manage Appointments', 'description' => 'Can manage appointments'],
            ['name' => 'manage-any-appointments', 'module' => 'appointments', 'label' => 'Manage All Appointments', 'description' => 'Manage Any appointments'],
            ['name' => 'manage-own-appointments', 'module' => 'appointments', 'label' => 'Manage Own Appointments', 'description' => 'Manage Limited appointments that is created by own'],
            ['name' => 'create-appointments', 'module' => 'appointments', 'label' => 'Create Appointments', 'description' => 'Can create Appointments'],
            ['name' => 'edit-appointments', 'module' => 'appointments', 'label' => 'Edit Appointments', 'description' => 'Can edit Appointments'],
            ['name' => 'reply-appointments', 'module' => 'appointments', 'label' => 'Reply Appointments', 'description' => 'Can reply to Appointments'],
            ['name' => 'delete-appointments', 'module' => 'appointments', 'label' => 'Delete Appointments', 'description' => 'Can delete Appointments'],
            ['name' => 'view-appointments', 'module' => 'appointments', 'label' => 'View Appointments', 'description' => 'View Appointments'],
            
            // Calendar management
            ['name' => 'manage-calendar', 'module' => 'calendar', 'label' => 'Manage Calendar', 'description' => 'Can manage calendar'],
            ['name' => 'view-calendar', 'module' => 'calendar', 'label' => 'View Calendar', 'description' => 'View Calendar'],
            
            // Referral management
            ['name' => 'manage-referral', 'module' => 'referral', 'label' => 'Manage Referral', 'description' => 'Can manage referral program'],
            ['name' => 'manage-users-referral', 'module' => 'referral', 'label' => 'Manage User Referral', 'description' => 'Can manage user referral program'],
            ['name' => 'manage-setting-referral', 'module' => 'referral', 'label' => 'Manage Referral Setting', 'description' => 'Can manage Referral Setting'],
            ['name' => 'manage-payout-referral', 'module' => 'referral', 'label' => 'Manage Referral Payout', 'description' => 'Can manage Referral Payout program'],
            ['name' => 'approve-payout-referral', 'module' => 'referral', 'label' => 'Manage Referral', 'description' => 'Can approve payout request'],
            ['name' => 'reject-payout-referral', 'module' => 'referral', 'label' => 'Manage Referral', 'description' => 'Can approve payout request'],

            // Language management
            ['name' => 'manage-language', 'module' => 'language', 'label' => 'Manage Language', 'description' => 'Can manage language'],
            ['name' => 'edit-language', 'module' => 'language', 'label' => 'Edit Language', 'description' => 'Edit Language'],
            ['name' => 'view-language', 'module' => 'language', 'label' => 'View Language', 'description' => 'View Language'],

            // Media management
            ['name' => 'manage-media', 'module' => 'media', 'label' => 'Manage Media', 'description' => 'Can manage media'],
            ['name' => 'manage-any-media', 'module' => 'media', 'label' => 'Manage All Media', 'description' => 'Manage Any media'],
            ['name' => 'manage-own-media', 'module' => 'media', 'label' => 'Manage Own Media', 'description' => 'Manage Limited media that is created by own'],
            ['name' => 'create-media', 'module' => 'media', 'label' => 'Create media', 'description' => 'Create media'],
            ['name' => 'edit-media', 'module' => 'media', 'label' => 'Edit media', 'description' => 'Edit media'],
            ['name' => 'delete-media', 'module' => 'media', 'label' => 'Delete media', 'description' => 'Delete media'],
            ['name' => 'view-media', 'module' => 'media', 'label' => 'View media', 'description' => 'View media'],
            ['name' => 'download-media', 'module' => 'media', 'label' => 'Download media', 'description' => 'Download media'],
            
            // Webhook management
            ['name' => 'manage-webhook-settings', 'module' => 'settings', 'label' => 'Manage Webhook Settings', 'description' => 'Can manage webhook settings'],
            // Landing Page management
            ['name' => 'manage-landing-page', 'module' => 'landing_page', 'label' => 'Manage Landing Page', 'description' => 'Can manage landing page'],
            ['name' => 'view-landing-page', 'module' => 'landing_page', 'label' => 'View Landing Page', 'description' => 'View landing page'],
            ['name' => 'edit-landing-page', 'module' => 'landing_page', 'label' => 'Edit Landing Page', 'description' => 'Edit landing page'],
            
            // VCard Builder management
            ['name' => 'manage-vcard-builder', 'module' => 'vcard_builder', 'label' => 'Manage VCard Builder', 'description' => 'Can manage vcard builder'],
            ['name' => 'view-vcard-builder', 'module' => 'vcard_builder', 'label' => 'View VCard Builder', 'description' => 'View vcard builder'],
            ['name' => 'create-vcard-builder', 'module' => 'vcard_builder', 'label' => 'Create VCard', 'description' => 'Create vcard'],
            ['name' => 'edit-vcard-builder', 'module' => 'vcard_builder', 'label' => 'Edit VCard', 'description' => 'Edit vcard'],
            ['name' => 'delete-vcard-builder', 'module' => 'vcard_builder', 'label' => 'Delete VCard', 'description' => 'Delete vcard'],
            ['name' => 'duplicate-vcard-builder', 'module' => 'vcard_builder', 'label' => 'Duplicate VCard', 'description' => 'Duplicate vcard'],
            ['name' => 'share-vcard-builder', 'module' => 'vcard_builder', 'label' => 'Share VCard', 'description' => 'Share vcard'],
            ['name' => 'analytics-vcard-builder', 'module' => 'vcard_builder', 'label' => 'VCard Analytics', 'description' => 'View vcard analytics'],
            ['name' => 'settings-vcard-builder', 'module' => 'vcard_builder', 'label' => 'VCard Settings', 'description' => 'Manage vcard settings'],
            ['name' => 'calendar-vcard-builder', 'module' => 'vcard_builder', 'label' => 'VCard Calendar', 'description' => 'Manage vcard calendar'],
            ['name' => 'contacts-vcard-builder', 'module' => 'vcard_builder', 'label' => 'VCard Contacts', 'description' => 'Manage vcard contacts'],

            // Bio Link Builder management
            ['name' => 'manage-bio-link-builder', 'module' => 'bio_link_builder', 'label' => 'Manage Bio Link', 'description' => 'Can manage Bio Link'],
            ['name' => 'view-bio-link-builder', 'module' => 'bio_link_builder', 'label' => 'View Bio Link Builder', 'description' => 'View Bio Link builder'],
            ['name' => 'create-bio-link-builder', 'module' => 'bio_link_builder', 'label' => 'Create Bio Link', 'description' => 'Create Bio Link'],
            ['name' => 'edit-bio-link-builder', 'module' => 'bio_link_builder', 'label' => 'Edit Bio Link', 'description' => 'Edit Bio Link'],
            ['name' => 'delete-bio-link-builder', 'module' => 'bio_link_builder', 'label' => 'Delete Bio Link', 'description' => 'Delete Bio Link'],
            ['name' => 'analytics-bio-link-builder', 'module' => 'bio_link_builder', 'label' => 'Bio Link Analytics', 'description' => 'View Bio Link analytics'],
            ['name' => 'share-bio-link-builder', 'module' => 'bio_link_builder', 'label' => 'Share Bio Link', 'description' => 'Share Bio Link'],
            
            // Addon management
            ['name' => 'manage-addons', 'module' => 'addons', 'label' => 'Manage Addons', 'description' => 'Can manage addons'],
            // Google Wallet management
            ['name' => 'manage-google-wallet', 'module' => 'google_wallet', 'label' => 'Manage Google Wallet', 'description' => 'Can manage Google Wallet integration'],
            ['name' => 'view-google-wallet', 'module' => 'google_wallet', 'label' => 'View Google Wallet', 'description' => 'View Google Wallet passes'],
            ['name' => 'create-google-wallet', 'module' => 'google_wallet', 'label' => 'Create Google Wallet Pass', 'description' => 'Create Google Wallet passes'],
            ['name' => 'manage-google-wallet-settings', 'module' => 'settings', 'label' => 'Manage Google Wallet Settings', 'description' => 'Can manage Google Wallet settings'],
            
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(
                ['name' => $permission['name'], 'guard_name' => 'web'],
                [
                    'module' => $permission['module'],
                    'label' => $permission['label'],
                    'description' => $permission['description'],
                ]
            );
        }
    }
}