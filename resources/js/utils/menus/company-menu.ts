import { type NavItem } from '@/types';
import { BookOpen, Contact, Folder, LayoutGrid, ShoppingBag, Users, Tag, FileIcon, Settings, BarChart, Barcode, FileText, Briefcase, CheckSquare, Calendar, CreditCard, Nfc, Ticket, Gift, DollarSign, MessageSquare, CalendarDays, Palette, Image, Mail, Mail as VCard, ChevronDown, Building2, Globe, BarChart3, Link as LinkIcon, Percent, Globe2, Wallet, Package, Shield } from 'lucide-react';
import { hasPermission } from '@/utils/authorization';

declare global {
    interface Window {
        enabledAddons?: any[];
    }
}

export const getCompanyMenuItems = (t: any, permissions: any[], auth: any,referralSettings: any): NavItem[] => {
    const items: NavItem[] = [];
    
    // Dashboard
    if (hasPermission(permissions, 'manage-dashboard')) {
        items.push({
            title: t('Dashboard'),
            href: route('dashboard'),
            icon: LayoutGrid,
            order: 10,
        });
    }
    
    // Analytics
    if (hasPermission(permissions, 'manage-analytics') || hasPermission(permissions, 'view-analytics')) {
        items.push({
            title: t('Analytics'),
            href: route('company.analytics'),
            icon: BarChart3,
            order: 20,
        });
    }

    // Business Directory
    if (hasPermission(permissions, 'manage-business-directory')) {
        items.push({
            title: t('Business Directory'),
            href: route('directory.index'),
            icon: Globe,
            target: '_blank',
            order: 30,
        });
    }

    // Staff section
    const staffChildren = [];
    if (hasPermission(permissions, 'manage-users')) {
        staffChildren.push({
            title: t('Users'),
            href: route('users.index')
        });
    }
    if (hasPermission(permissions, 'manage-roles')) {
        staffChildren.push({
            title: t('Roles'),
            href: route('roles.index')
        });
    }
    if (staffChildren.length > 0) {
        items.push({
            title: t('Staff'),
            icon: Users,
            children: staffChildren,
            order: 40,
        });
    }

    // vCard Builder
    const vCardChildren = [];
    if (hasPermission(permissions, 'create-businesses') || hasPermission(permissions, 'create-vcard-builder')) {
        vCardChildren.push({
            title: t('Create New Business'),
            href: route('vcard-builder.create')
        });
    }
    if ((hasPermission(permissions, 'edit-businesses') || hasPermission(permissions, 'edit-vcard-builder')) && auth.user?.current_business) {
        vCardChildren.push({
            title: t('Edit Business'),
            href: route('vcard-builder.edit', auth.user?.current_business || 1)
        });
    }
    if (hasPermission(permissions, 'manage-businesses') || hasPermission(permissions, 'manage-vcard-builder') || hasPermission(permissions, 'view-businesses')) {
        vCardChildren.push({
            title: t('Businesses'),
            href: route('vcard-builder.index')
        });
    }
    if (vCardChildren.length > 0) {
        items.push({
            title: t('vCard Builder'),
            icon: VCard,
            children: vCardChildren,
            defaultOpen: true,
            badge: (window as any).isDemo ? { label: 'New', variant: 'default' } : undefined,
            order: 50,
        });
    }
    
    // Bio Link
    const bioLinkChildren = [];
    if (hasPermission(permissions, 'create-bio-link-builder')) {
        bioLinkChildren.push({
            title: t('Create New Bio Link'),
            href: route('link-bio-builder.create')
        });
    }
    if (hasPermission(permissions, 'manage-bio-link-builder')) {
        bioLinkChildren.push({
            title: t('Bio Link'),
            href: route('link-bio-builder.index')
        });
    }
    if (bioLinkChildren.length > 0) {
        items.push({
            title: t('Bio Link'),
            icon: LinkIcon,
            children: bioLinkChildren,
            defaultOpen: true,
            badge: (window as any).isDemo ? { label: 'New', variant: 'default' } : undefined,
            order: 60,
        });
    }

    // Contacts
    if (hasPermission(permissions, 'manage-contacts')) {
        items.push({
            title: t('Contacts'),
            href: route('contacts.index'),
            icon: MessageSquare,
            order: 70,
        });
    }

    // Appointments
    if (hasPermission(permissions, 'manage-appointments')) {
        items.push({
            title: t('Appointments'),
            href: route('appointments.index'),
            icon: CalendarDays,
            order: 80,
        });
    }

    // Media Library
    if (hasPermission(permissions, 'manage-media')) {
        items.push({
            title: t('Media Library'),
            href: route('media-library'),
            icon: Image,
            order: 90,
        });
    }
    
    // Calendar
    if (hasPermission(permissions, 'manage-calendar')) {
        items.push({
            title: t('Calendar'),
            href: route('calendar.index'),
            icon: Calendar,
            order: 100,
        });
    }

    // Google Wallet
    if (hasPermission(permissions, 'manage-google-wallet')) {
        items.push({
            title: t('Google Wallet'),
            href: route('google-wallet.index'),
            icon: Wallet,
            order: 110,
        });
    }

    // NFC Cards
    const nfcCardChildren = [];
    if (hasPermission(permissions, 'manage-nfc-cards') || hasPermission(permissions, 'order-nfc-cards')) {
        nfcCardChildren.push({
            title: t('NFC Cards'),
            href: route('nfc-cards.index')
        });
    }
    if (hasPermission(permissions, 'manage-nfc-cards') || hasPermission(permissions, 'order-nfc-cards')) {
        nfcCardChildren.push({
            title: t('My Order Requests'),
            href: route('nfc-cards.order-requests')
        });
    }
    if (nfcCardChildren.length > 0) {
        items.push({
            title: t('NFC Cards'),
            icon: Nfc,
            children: nfcCardChildren,
            defaultOpen: false,
            order: 120,
        });
    }

    // Campaigns
    if (hasPermission(permissions, 'manage-campaigns')) {
        items.push({
            title: t('Campaigns'),
            href: route('campaigns.index'),
            icon: BarChart,
            order: 130,
        });
    }

    // Plans
    const planChildren = [];
    if (hasPermission(permissions, 'manage-plans')) {
        planChildren.push({
            title: t('Plans'),
            href: route('plans.index')
        });
    }
    if (hasPermission(permissions, 'manage-plan-requests')) {
        planChildren.push({
            title: t('My Plan Requests'),
            href: route('plan-requests.index')
        });
    }
    if (hasPermission(permissions, 'manage-plan-orders')) {
        planChildren.push({
            title: t('My Plan Orders'),
            href: route('plan-orders.index')
        });
    }
    if (planChildren.length > 0) {
        items.push({
            title: t('Plans'),
            icon: CreditCard,
            children: planChildren,
            defaultOpen: false,
            order: 140,
        });
    }

        if (hasPermission(permissions, 'manage-referral')) {
            // Check if referral system is enabled from shared props
            // const { referralSettings } = usePage().props as any;
            if (referralSettings?.is_enabled !== false) {
                items.push({
                    title: t('Referral Program'),
                    href: route('referral.index'),
                    icon: Gift,
                });
            }
        }

    // Addons
    if ((window as any).isDemo && hasPermission(permissions, 'manage-addons')) {
        items.push({
            title: t('Addons'),
            href: route('addons.index'),
            icon: Package,
            badge: (window as any).isDemo ? { label: 'Premium', variant: 'default' } : undefined,
            order: 160,
        });
    }

    // Package menus are now loaded automatically in menu.ts

    // Settings
    if (hasPermission(permissions, 'manage-settings')) {
        items.push({
            title: t('Settings'),
            href: route('settings'),
            icon: Settings,
            order: 1000,
        });
    }

    // Sort items by order
    return items.sort((a, b) => (a.order || 999) - (b.order || 999));
};