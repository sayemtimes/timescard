import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useLayout } from '@/contexts/LayoutContext';
import { useSidebarSettings } from '@/contexts/SidebarContext';
import { useBrand } from '@/contexts/BrandContext';
import { type NavItem } from '@/types';
import { Link, usePage, router } from '@inertiajs/react';
import { ChevronDown, Building2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import AppLogo from './app-logo';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { toast } from '@/components/custom-toast';
import { getMenuItems } from '@/utils/menu';

// Global menu cache outside component
let globalMenuCache: { items: NavItem[], hash: string } | null = null;

// Function to clear menu cache
export const clearGlobalMenuCache = () => {
    globalMenuCache = null;
};

// Function to update enabled addons and refresh sidebar
export const updateEnabledAddons = (newEnabledAddons: any[]) => {
    // Update the page props with new enabled addons
    if (window.page && window.page.props && window.page.props.auth) {
        window.page.props.auth.enabledAddons = newEnabledAddons;
    }
    
    // Clear cache to force reload
    clearGlobalMenuCache();
    
    // Trigger a custom event to force sidebar re-render
    window.dispatchEvent(new CustomEvent('sidebar-refresh'));
};

// Listen for addon status changes
if (typeof window !== 'undefined') {
    window.addEventListener('addon-status-changed', () => {
        clearGlobalMenuCache();
    });
}

export const AppSidebar = React.memo(() => {
    const { t, i18n } = useTranslation();
    const { auth, referralSettings } = usePage().props as any;
    const userRole = auth.user?.type || auth.user?.role;
    const permissions = auth?.permissions || [];
    const businesses = auth.user?.businesses || [];
    const currentBusiness = businesses.find((b: any) => b.id === auth.user?.current_business) || businesses[0];
    
    // Get current direction
    const isRtl = document.documentElement.dir === 'rtl';
    
    const handleBusinessSwitch = (businessId: number) => {
        router.post(route('switch-business'), { business_id: businessId }, {
            onSuccess: (page) => {
            const successMessage = page.props.flash?.success;
            const errorMessage = page.props.flash?.error;
    
            if (successMessage) {
                toast.success(successMessage);
            } else if (errorMessage) {
                toast.error(errorMessage);
            }
            },
            onError: (errors) => {
                // Check if there's an error message from the backend
                if (errors.error) {
                    // Display the error using toast notification
                    const errorMessage = errors.error;
                    toast.error(errorMessage);
                }
            }
        });
    };

    const [mainNavItems, setMainNavItems] = useState<NavItem[]>(() => {
        // Initialize with cached items if available
        return globalMenuCache?.items || [];
    });
    
    useEffect(() => {        
        const loadMenuItems = async () => {
            // Create stable hash of dependencies
            const depsHash = JSON.stringify({
                userRole,
                permissions: [...permissions].sort(),
                enabledAddons: (auth?.enabledAddons || []).map(a => a.name).sort(),
                language: i18n.language
            });
                        
            // Only load if dependencies actually changed
            if (!globalMenuCache || depsHash !== globalMenuCache.hash) {
                const items = await getMenuItems(userRole, t, permissions, auth, referralSettings);
                              
                // Update global cache
                globalMenuCache = { items, hash: depsHash };
                setMainNavItems(items);
            } else {
                setMainNavItems(globalMenuCache.items);
            }
        };
        
        loadMenuItems();
        
        // Listen for sidebar refresh events
        const handleSidebarRefresh = () => {
            loadMenuItems();
        };
        
        window.addEventListener('sidebar-refresh', handleSidebarRefresh);
        
        return () => {
            window.removeEventListener('sidebar-refresh', handleSidebarRefresh);
        };
    }, [userRole, JSON.stringify(permissions), JSON.stringify(auth?.enabledAddons), i18n.language]);

    const { position, effectivePosition } = useLayout();
    const { variant, collapsible, style } = useSidebarSettings();
    const { logoLight, logoDark, favicon, updateBrandSettings } = useBrand();
    const [sidebarStyle, setSidebarStyle] = useState({});

    useEffect(() => {

        // Apply styles based on sidebar style
        if (style === 'colored') {
            setSidebarStyle({ backgroundColor: 'var(--primary)', color: 'white' });
        } else if (style === 'gradient') {
            setSidebarStyle({
                background: 'linear-gradient(to bottom, var(--primary), color-mix(in srgb, var(--primary), transparent 20%))',
                color: 'white'
            });
        } else {
            setSidebarStyle({});
        }
    }, [style]);

    const filteredNavItems = mainNavItems;
    
    // Get the first available menu item's href for logo link
    const getFirstAvailableHref = () => {
        if (filteredNavItems.length === 0) return route('dashboard');
        
        const firstItem = filteredNavItems[0];
        if (firstItem.href) {
            return firstItem.href;
        } else if (firstItem.children && firstItem.children.length > 0) {
            return firstItem.children[0].href || route('dashboard');
        }
        return route('dashboard');
    };
    
    return (
        <Sidebar
            side={effectivePosition}
            collapsible={collapsible}
            variant={variant}
            className={style !== 'plain' ? 'sidebar-custom-style' : ''}
        >
            <SidebarHeader className={style !== 'plain' ? 'sidebar-styled' : ''} style={sidebarStyle}>
                <div className="flex justify-center items-center p-2">
                    <Link href={getFirstAvailableHref()} prefetch className="flex items-center justify-center">
                        {/* Logo for expanded sidebar */}
                        <div className="h-12 group-data-[collapsible=icon]:hidden flex items-center">
                            {(() => {
                                const isDark = document.documentElement.classList.contains('dark');
                                const currentLogo = isDark ? logoLight : logoDark;
                                const displayUrl = currentLogo ? (
                                    currentLogo.startsWith('http') ? currentLogo : 
                                    currentLogo.startsWith('/storage/') ? `${window.appSettings.baseUrl}${currentLogo}` :
                                    currentLogo.startsWith('/') ? `${window.appSettings.baseUrl}${currentLogo}` : currentLogo
                                ) : '';
                                
                                return displayUrl ? (
                                    <img
                                        key={`${currentLogo}-${Date.now()}`}
                                        src={displayUrl}
                                        alt="Logo"
                                        className="h-10 w-auto max-w-[180px] transition-all duration-200"
                                        onError={() => updateBrandSettings({ [isDark ? 'logoLight' : 'logoDark']: '' })}
                                    />
                                ) : (
                                    <div className="h-12 text-inherit font-semibold flex items-center text-lg tracking-tight">
                                        WorkDo
                                    </div>
                                );
                            })()} 
                        </div>

                        {/* Icon for collapsed sidebar */}
                        <div className="h-8 w-8 hidden group-data-[collapsible=icon]:block">
                            {(() => {
                                const displayFavicon = favicon ? (
                                    favicon.startsWith('http') ? favicon : 
                                    favicon.startsWith('/storage/') ? `${window.appSettings.baseUrl}${favicon}` :
                                    favicon.startsWith('/') ? `${window.appSettings.baseUrl}${favicon}` : favicon
                                ) : '';
                                
                                return displayFavicon ? (
                                    <img
                                        key={`${favicon}-${Date.now()}`}
                                        src={displayFavicon}
                                        alt="Icon"
                                        className="h-8 w-8 transition-all duration-200"
                                        onError={() => updateBrandSettings({ favicon: '' })}
                                    />
                                ) : (
                                    <div className="h-8 w-8 bg-primary text-white rounded flex items-center justify-center font-bold shadow-sm">
                                        W
                                    </div>
                                );
                            })()} 
                        </div>
                    </Link>
                </div>
                
                {/* Business Switcher - Only show for company users */}
                {userRole !== 'superadmin' && businesses.length > 0 && (
                    <div className="px-2 pb-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button 
                                    variant="ghost" 
                                    className="w-full justify-between h-8 px-2 text-xs group-data-[collapsible=icon]:hidden"
                                    style={{ color: style !== 'plain' ? 'inherit' : undefined }}
                                >
                                    <div className="flex items-center gap-2 min-w-0">
                                        <Building2 className="h-3 w-3 flex-shrink-0" />
                                        <span className="truncate">{currentBusiness?.name || t('Select Business')}</span>
                                    </div>
                                    <ChevronDown className="h-4 w-4 flex-shrink-0" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-56 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                                <div className="p-2">
                                    <input 
                                        type="text" 
                                        placeholder="Search business..." 
                                        className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                                        onChange={(e) => {
                                            const searchElement = e.target.parentElement?.nextElementSibling;
                                            if (searchElement) {
                                                const items = searchElement.querySelectorAll('[data-business-name]');
                                                const searchTerm = e.target.value.toLowerCase();
                                                
                                                items.forEach((item: any) => {
                                                    const businessName = item.getAttribute('data-business-name').toLowerCase();
                                                    item.style.display = businessName.includes(searchTerm) ? 'flex' : 'none';
                                                });
                                            }
                                        }}
                                    />
                                </div>
                                <div>
                                    {businesses.length > 0 ? (
                                        businesses.map((business: any) => (
                                            <DropdownMenuItem 
                                                key={business.id}
                                                onClick={() => handleBusinessSwitch(business.id)}
                                                className={business.id === auth.user?.current_business ? 'bg-accent' : ''}
                                                data-business-name={business.name}
                                            >
                                                <Building2 className="h-4 w-4 mr-2" />
                                                <span className="truncate">{business.name}</span>
                                                {business.id === auth.user?.current_business && (
                                                    <span className="ml-auto text-xs text-muted-foreground">Current</span>
                                                )}
                                            </DropdownMenuItem>
                                        ))
                                    ) : (
                                        <DropdownMenuItem disabled>
                                            <span className="text-muted-foreground">No businesses found</span>
                                        </DropdownMenuItem>
                                    )}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}
            </SidebarHeader>

            <SidebarContent>
                <div style={sidebarStyle} className={`${style !== 'plain' ? 'sidebar-styled' : ''}`}>
                    <NavMain items={filteredNavItems} position={effectivePosition} />
                </div>
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" position={position} /> */}
                {/* Profile menu moved to header */}
            </SidebarFooter>
        </Sidebar>
    );
});

AppSidebar.displayName = 'AppSidebar';