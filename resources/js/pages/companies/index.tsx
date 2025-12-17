// pages/companies/index.tsx
import { useState } from 'react';
import { PageTemplate } from '@/components/page-template';
import { usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { SearchAndFilterBar } from '@/components/ui/search-and-filter-bar';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Filter, Search, Plus, Eye, Edit, Trash2, KeyRound, Lock, Unlock, LayoutGrid, List, ExternalLink, Info, ArrowUpRight, CreditCard, Copy, Check } from 'lucide-react';
import { toast } from '@/components/custom-toast';
import { useInitials } from '@/hooks/use-initials';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@/components/ui/date-picker';
import { CrudFormModal } from '@/components/CrudFormModal';
import { CrudDeleteModal } from '@/components/CrudDeleteModal';
import { UpgradePlanModal } from '@/components/UpgradePlanModal';

export default function Companies() {
  const { t } = useTranslation();
  const { auth, companies, plans, filters: pageFilters = {} } = usePage().props as any;
  const permissions = auth?.permissions || [];
  const getInitials = useInitials();
  
  // State
  const [activeView, setActiveView] = useState(pageFilters.view || 'list');
  const [searchTerm, setSearchTerm] = useState(pageFilters.search || '');
  const [startDate, setStartDate] = useState<Date | undefined>(pageFilters.start_date ? new Date(pageFilters.start_date) : undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(pageFilters.end_date ? new Date(pageFilters.end_date) : undefined);
  const [selectedStatus, setSelectedStatus] = useState(pageFilters.status || 'all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Modal state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [isUpgradePlanModalOpen, setIsUpgradePlanModalOpen] = useState(false);
  const [isBusinessLinkModalOpen, setIsBusinessLinkModalOpen] = useState(false);
  const [currentCompany, setCurrentCompany] = useState<any>(null);
  const [availablePlans, setAvailablePlans] = useState<any[]>([]);
  const [businessLinks, setBusinessLinks] = useState<any[]>([]);
  const [copiedLinkId, setCopiedLinkId] = useState<number | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit' | 'view'>('create');
  
  // Check if any filters are active
  const hasActiveFilters = () => {
    return selectedStatus !== 'all' || searchTerm !== '' || startDate !== undefined || endDate !== undefined;
  };
  
  // Count active filters
  const activeFilterCount = () => {
    return (selectedStatus !== 'all' ? 1 : 0) + 
           (searchTerm ? 1 : 0) + 
           (startDate ? 1 : 0) + 
           (endDate ? 1 : 0);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };
  
  const applyFilters = () => {
    const params: any = { page: 1, view: activeView };
    
    if (searchTerm) {
      params.search = searchTerm;
    }
    
    if (selectedStatus !== 'all') {
      params.status = selectedStatus;
    }
    
    if (startDate) {
      params.start_date = startDate.toISOString().split('T')[0];
    }
    
    if (endDate) {
      params.end_date = endDate.toISOString().split('T')[0];
    }
    
    // Add per_page if it exists
    if (pageFilters.per_page) {
      params.per_page = pageFilters.per_page;
    }
    
    router.get(route('companies.index'), params, { preserveState: true, preserveScroll: true });
  };
  
  const handleStatusFilter = (value: string) => {
    setSelectedStatus(value);
    
    const params: any = { page: 1, view: activeView };
    
    if (searchTerm) {
      params.search = searchTerm;
    }
    
    if (value !== 'all') {
      params.status = value;
    }
    
    if (startDate) {
      params.start_date = startDate.toISOString().split('T')[0];
    }
    
    if (endDate) {
      params.end_date = endDate.toISOString().split('T')[0];
    }
    
    // Add per_page if it exists
    if (pageFilters.per_page) {
      params.per_page = pageFilters.per_page;
    }
    
    router.get(route('companies.index'), params, { preserveState: true, preserveScroll: true });
  };
  
  const handleSort = (field: string) => {
    const direction = pageFilters.sort_field === field && pageFilters.sort_direction === 'asc' ? 'desc' : 'asc';
    
    const params: any = { 
      sort_field: field, 
      sort_direction: direction, 
      page: 1,
      view: activeView 
    };
    
    // Add search and filters
    if (searchTerm) {
      params.search = searchTerm;
    }
    
    if (selectedStatus !== 'all') {
      params.status = selectedStatus;
    }
    
    if (startDate) {
      params.start_date = startDate.toISOString().split('T')[0];
    }
    
    if (endDate) {
      params.end_date = endDate.toISOString().split('T')[0];
    }
    
    // Add per_page if it exists
    if (pageFilters.per_page) {
      params.per_page = pageFilters.per_page;
    }
    
    router.get(route('companies.index'), params, { preserveState: true, preserveScroll: true });
  };
  
  const handleAction = (action: string, company: any) => {
    setCurrentCompany(company);
    
    switch (action) {
      case 'login-as':
        router.get(route("impersonate.start", company.id));
        break;
      case 'company-info':
        setFormMode('view');
        setIsFormModalOpen(true);
        break;
      case 'upgrade-plan':
        handleUpgradePlan(company);
        break;
      case 'business-link':
        handleBusinessLink(company);
        break;
      case 'reset-password':
        setIsResetPasswordModalOpen(true);
        break;
      case 'toggle-status':
        handleToggleStatus(company);
        break;
      case 'edit':
        setFormMode('edit');
        setIsFormModalOpen(true);
        break;
      case 'delete':
        setIsDeleteModalOpen(true);
        break;
      default:
        break;
    }
  };
  
  const handleAddNew = () => {
    setCurrentCompany(null);
    setFormMode('create');
    setIsFormModalOpen(true);
  };
  
  const handleFormSubmit = (formData: any) => {
    if (formMode === 'create') {
      toast.loading(t('Creating company...'));
      
      router.post(route('companies.store'), formData, {
        onSuccess: () => {
          setIsFormModalOpen(false);
          toast.dismiss();
          toast.success(t('Company created successfully'));
        },
        onError: (errors) => {
          toast.dismiss();
          toast.error(`Failed to create company: ${Object.values(errors).join(', ')}`);
        }
      });
    } else if (formMode === 'edit') {
      toast.loading(t('Updating company...'));
      
      router.put(route('companies.update', currentCompany.id), formData, {
        onSuccess: () => {
          setIsFormModalOpen(false);
          toast.dismiss();
          toast.success(t('Company updated successfully'));
        },
        onError: (errors) => {
          toast.dismiss();
          toast.error(`Failed to update company: ${Object.values(errors).join(', ')}`);
        }
      });
    }
  };
  
  const handleDeleteConfirm = () => {
    toast.loading(t('Deleting company...'));
    
    router.delete(route("companies.destroy", currentCompany.id), {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        toast.dismiss();
        toast.success(t('Company deleted successfully'));
      },
      onError: (errors) => {
        toast.dismiss();
        toast.error(`Failed to delete company: ${Object.values(errors).join(', ')}`);
      }
    });
  };
  
  const handleResetPasswordConfirm = (data: { password: string }) => {
    toast.loading(t('Resetting password...'));
    
    router.put(route('companies.reset-password', currentCompany.id), data, {
      onSuccess: () => {
        setIsResetPasswordModalOpen(false);
        toast.dismiss();
        toast.success(t('Password reset successfully'));
      },
      onError: (errors) => {
        toast.dismiss();
        toast.error(`Failed to reset password: ${Object.values(errors).join(', ')}`);
      }
    });
  };
  
  const handleToggleStatus = (company: any) => {
    toast.loading(t('Updating status...'));
    
    router.put(route('companies.toggle-status', company.id), {}, {
      onSuccess: () => {
        toast.dismiss();
        toast.success(t('Status updated successfully'));
      },
      onError: (errors) => {
        toast.dismiss();
        toast.error(`Failed to update status: ${Object.values(errors).join(', ')}`);
      }
    });
  };
  
  const handleResetFilters = () => {
    setSelectedStatus('all');
    setSearchTerm('');
    setStartDate(undefined);
    setEndDate(undefined);
    setShowFilters(false);
    
    router.get(route('companies.index'), { 
      page: 1, 
      per_page: pageFilters.per_page,
      view: activeView 
    }, { preserveState: true, preserveScroll: true });
  };
  
  const handleUpgradePlan = (company: any) => {
    setCurrentCompany(company);
    
    // Fetch available plans (both monthly and yearly)
    toast.loading(t('Loading plans...'));
    fetch(route('companies.plans', company.id))
    .then(res => res.json())
    .then(data => {
        setAvailablePlans(data.plans || []);
        setIsUpgradePlanModalOpen(true);
        toast.dismiss();
      })
      .catch(err => {
        toast.dismiss();
        toast.error(t('Failed to load plans'));
      });
  };
  
  const handleUpgradePlanConfirm = (planId: number, duration: string) => {
    toast.loading(t('Upgrading plan...'));
    
    // Use Inertia router to handle the request
    router.put(route('companies.upgrade-plan', currentCompany.id), { 
      plan_id: planId,
      duration: duration
    }, {
      onSuccess: () => {
        setIsUpgradePlanModalOpen(false);
        toast.dismiss();
        toast.success(t('Plan upgraded successfully'));
        router.reload();
      },
      onError: (errors) => {
        toast.dismiss();
        const errorMessage = typeof errors === 'object' && errors !== null 
          ? Object.values(errors).join(', ') 
          : t('Failed to upgrade plan');
        toast.error(errorMessage);
      }
    });
  };

  const handleBusinessLink = (company: any) => {
    setCurrentCompany(company);
    toast.loading(t('Loading business links...'));
    
    fetch(route('companies.business-links', company.id))
      .then(res => res.json())
      .then(data => {
        setBusinessLinks(data.businesses || []);
        setIsBusinessLinkModalOpen(true);
        toast.dismiss();
      })
      .catch(err => {
        toast.dismiss();
        toast.error(t('Failed to load business links'));
      });
  };

  const handleCopyLink = (text: string) => {
    // Fallback clipboard function for HTTP environments
    const copyToClipboard = (text: string) => {
      if (navigator.clipboard && window.isSecureContext) {
        // Use modern clipboard API for HTTPS
        return navigator.clipboard.writeText(text);
      } else {
        // Fallback for HTTP environments
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise<void>((resolve, reject) => {
          if (document.execCommand('copy')) {
            textArea.remove();
            resolve();
          } else {
            textArea.remove();
            reject(new Error('Copy failed'));
          }
        });
      }
    };
    copyToClipboard(text)
      .then(() => {
        toast.success(t('Link copied to clipboard'));
      })
      .catch(() => {
        toast.error(t('Failed to copy link'));
      });
  };

  // Define page actions
  const pageActions = [
    {
      label: t('Add Company'),
      icon: <Plus className="h-4 w-4 mr-2" />,
      variant: 'default',
      onClick: () => handleAddNew()
    }
  ];

  const breadcrumbs = [
    { title: t('Dashboard'), href: route('dashboard') },
    { title: t('Companies') }
  ];

  // Define table columns for list view
  const columns = [
    { 
      key: 'name', 
      label: t('Name'), 
      sortable: true,
      render: (value: any, row: any) => {
        return (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
              {getInitials(row.name)}
            </div>
            <div>
              <div className="font-medium">{row.name}</div>
              <div className="text-sm text-muted-foreground">{row.email}</div>
            </div>
          </div>
        );
      }
    },
    { 
      key: 'plan_name', 
      label: t('Plan'),
      render: (value: string) => <span className="capitalize">{value}</span>
    },
    { 
      key: 'created_at', 
      label: t('Created At'), 
      sortable: true,
      render: (value: string) => window.appSettings?.formatDateTime ? window.appSettings.formatDateTime(value, false) : new Date(value).toLocaleDateString()
    }
  ];

  return (
    <PageTemplate 
      title={t("Companies Management")} 
      url="/companies"
      actions={pageActions}
      breadcrumbs={breadcrumbs}
      noPadding
    >
      {/* Search and filters section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow mb-4 p-4">
        <SearchAndFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearch={handleSearch}
          filters={[
            {
              name: 'status',
              label: t('Status'),
              type: 'select',
              value: selectedStatus,
              onChange: handleStatusFilter,
              options: [
                { value: 'all', label: t('All Status') },
                { value: 'active', label: t('Active') },
                { value: 'inactive', label: t('Inactive') }
              ]
            },
            {
              name: 'start_date',
              label: t('Start Date'),
              type: 'date',
              value: startDate,
              onChange: (date) => setStartDate(date)
            },
            {
              name: 'end_date',
              label: t('End Date'),
              type: 'date',
              value: endDate,
              onChange: (date) => setEndDate(date)
            }
          ]}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          hasActiveFilters={hasActiveFilters}
          activeFilterCount={activeFilterCount}
          onResetFilters={handleResetFilters}
          onApplyFilters={applyFilters}
          currentPerPage={pageFilters.per_page?.toString() || "10"}
          onPerPageChange={(value) => {
            const params: any = { page: 1, per_page: parseInt(value), view: activeView };
            
            if (searchTerm) {
              params.search = searchTerm;
            }
            
            if (selectedStatus !== 'all') {
              params.status = selectedStatus;
            }
            
            if (startDate) {
              params.start_date = startDate.toISOString().split('T')[0];
            }
            
            if (endDate) {
              params.end_date = endDate.toISOString().split('T')[0];
            }
            
            router.get(route('companies.index'), params, { preserveState: true, preserveScroll: true });
          }}
          showViewToggle={true}
          activeView={activeView}
          onViewChange={(view) => {
            setActiveView(view);
            
            // Update URL and reload with the new view parameter
            const params: any = { view };
            
            // Preserve other existing parameters
            if (searchTerm) params.search = searchTerm;
            if (selectedStatus !== 'all') params.status = selectedStatus;
            if (startDate) params.start_date = startDate.toISOString().split('T')[0];
            if (endDate) params.end_date = endDate.toISOString().split('T')[0];
            if (pageFilters.per_page) params.per_page = pageFilters.per_page;
            if (pageFilters.page) params.page = pageFilters.page;
            
            // Navigate with the updated parameters
            router.get(route('companies.index'), params, { preserveState: true, preserveScroll: true });
          }}
        />
      </div>

      {/* Content section */}
      {activeView === 'list' ? (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                  {columns.map((column) => (
                    <th 
                      key={column.key} 
                      className="px-4 py-3 text-left font-medium text-gray-500"
                      onClick={() => column.sortable && handleSort(column.key)}
                    >
                      <div className="flex items-center">
                        {column.label}
                        {column.sortable && (
                          <span className="ml-1">
                            {pageFilters.sort_field === column.key ? (
                              pageFilters.sort_direction === 'asc' ? '↑' : '↓'
                            ) : ''}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right font-medium text-gray-500">
                    {t("Actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {companies?.data?.map((company: any) => (
                  <tr key={company.id} className="border-b hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800">
                    {columns.map((column) => (
                      <td key={`${company.id}-${column.key}`} className="px-4 py-3">
                        {column.render ? column.render(company[column.key], company) : company[column.key]}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleAction('login-as', company)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <ArrowUpRight className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{t("Login as Company")}</TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleAction('company-info', company)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{t("Company Info")}</TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleAction('upgrade-plan', company)}
                              className="text-amber-500 hover:text-amber-700"
                            >
                              <CreditCard className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{t("Upgrade Plan")}</TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleAction('business-link', company)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{t("Business Link")}</TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleAction('reset-password', company)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <KeyRound className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{t("Reset Password")}</TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleAction('toggle-status', company)}
                              className="text-amber-500 hover:text-amber-700"
                            >
                              {company.status === 'active' ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{company.status === 'active' ? t("Disable Login") : t("Enable Login")}</TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleAction('edit', company)}
                              className="text-amber-500 hover:text-amber-700"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{t("Edit")}</TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleAction('delete', company)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{t("Delete")}</TooltipContent>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {(!companies?.data || companies.data.length === 0) && (
                  <tr>
                    <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                      {t("No companies found")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination section */}
          <Pagination
            from={companies?.from || 0}
            to={companies?.to || 0}
            total={companies?.total || 0}
            links={companies?.links}
            entityName={t("companies")}
            onPageChange={(url) => {
              if (!url) return;
              
              try {
                // Extract page number from the URL
                const urlObj = new URL(url, window.location.origin);
                const page = urlObj.searchParams.get('page');
                
                // Create params object with all current filters and the new page
                const params: any = { page, view: activeView };
                
                // Add other filters
                if (searchTerm) params.search = searchTerm;
                if (selectedStatus !== 'all') params.status = selectedStatus;
                if (startDate) params.start_date = startDate.toISOString().split('T')[0];
                if (endDate) params.end_date = endDate.toISOString().split('T')[0];
                if (pageFilters.per_page) params.per_page = pageFilters.per_page;
                
                // Navigate with all parameters
                router.get(route('companies.index'), params, { preserveState: true });
              } catch (error) {
                console.error('Error parsing pagination URL:', error);
              }
            }}
          />
        </div>
      ) : (
        <div>
          {/* Grid View */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {companies?.data?.map((company: any) => (
              <Card key={company.id} className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow">
                {/* Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-700">
                        {getInitials(company.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{company.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{company.email}</p>
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full mr-2 ${
                            company.status === 'active' ? 'bg-gray-800' : 'bg-gray-400'
                          }`}></div>
                          <span className="text-sm font-medium text-gray-700">
                            {company.status === 'active' ? t('Active') : t('Inactive')}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 z-50" sideOffset={5}>
                        <DropdownMenuItem onClick={() => handleAction('login-as', company)}>
                          <ArrowUpRight className="h-4 w-4 mr-2" />
                          <span>{t("Login as Company")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('company-info', company)}>
                          <Info className="h-4 w-4 mr-2" />
                          <span>{t("Company Info")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('upgrade-plan', company)}>
                          <CreditCard className="h-4 w-4 mr-2" />
                          <span>{t("Upgrade Plan")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('business-link', company)}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          <span>{t("Business Link")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('reset-password', company)}>
                          <KeyRound className="h-4 w-4 mr-2" />
                          <span>{t("Reset Password")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('toggle-status', company)}>
                          {company.status === 'active' ? 
                            <Lock className="h-4 w-4 mr-2" /> : 
                            <Unlock className="h-4 w-4 mr-2" />
                          }
                          <span>{company.status === 'active' ? t("Disable Login") : t("Enable Login")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleAction('edit', company)} className="text-amber-600">
                          <Edit className="h-4 w-4 mr-2" />
                          <span>{t("Edit")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('delete', company)} className="text-rose-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          <span>{t("Delete")}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  {/* Plan info */}
                  <div className="border border-gray-200 rounded-md p-3 mb-4">
                    <div className="flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm font-semibold text-gray-800">{company.plan_name}</span>
                    </div>
                    {company.plan_expiry_date && (
                      <div className="text-xs text-gray-500 text-center mt-1">
                        {t("Expires")}: {window.appSettings?.formatDateTime ? window.appSettings.formatDateTime(company.plan_expiry_date, false) : new Date(company.plan_expiry_date).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-4 border border-gray-200 rounded-md">
                      <div className="text-xl font-bold text-gray-900 mb-1">{company.business_count || 0}</div>
                      <div className="text-xs text-gray-600">{t("Businesses")}</div>
                    </div>
                    
                    <div className="text-center p-4 border border-gray-200 rounded-md">
                      <div className="text-xl font-bold text-gray-900 mb-1">{company.appointments_count || 0}</div>
                      <div className="text-xs text-gray-600">{t("Appointments")}</div>
                    </div>
                  </div>
                
                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('edit', company)}
                      className="flex-1 h-9 text-sm border-gray-300"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {t("Edit")}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('company-info', company)}
                      className="flex-1 h-9 text-sm border-gray-300"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {t("View")}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('delete', company)}
                      className="flex-1 h-9 text-sm text-gray-700 border-gray-300"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {t("Delete")}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            
            {(!companies?.data || companies.data.length === 0) && (
              <div className="col-span-full p-8 text-center text-gray-500 dark:text-gray-400">
                {t("No companies found")}
              </div>
            )}
          </div>
          
          {/* Pagination for grid view */}
          <div className="mt-6 bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
            <Pagination
              from={companies?.from || 0}
              to={companies?.to || 0}
              total={companies?.total || 0}
              links={companies?.links}
              entityName={t("companies")}
              onPageChange={(url) => {
                if (!url) return;
                
                try {
                  // Extract page number from the URL
                  const urlObj = new URL(url, window.location.origin);
                  const page = urlObj.searchParams.get('page');
                  
                  // Create params object with all current filters and the new page
                  const params: any = { page, view: activeView };
                  
                  // Add other filters
                  if (searchTerm) params.search = searchTerm;
                  if (selectedStatus !== 'all') params.status = selectedStatus;
                  if (startDate) params.start_date = startDate.toISOString().split('T')[0];
                  if (endDate) params.end_date = endDate.toISOString().split('T')[0];
                  if (pageFilters.per_page) params.per_page = pageFilters.per_page;
                  
                  // Navigate with all parameters
                  router.get(route('companies.index'), params, { preserveState: true });
                } catch (error) {
                  console.error('Error parsing pagination URL:', error);
                }
              }}
            />
          </div>
        </div>
      )}

      {/* Form Modal */}
      <CrudFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={(data) => {
          // If login_enabled is false, remove password field
          if (data.login_enabled === false) {
            delete data.password;
          }
          // Set status based on login_enabled
          data.status = data.login_enabled ? 'active' : 'inactive';
          
          // Remove login_enabled field as it's not needed in the backend
          delete data.login_enabled;
          handleFormSubmit(data);
        }}
        formConfig={{
          fields: [
            { name: 'name', label: t('Company Name'), type: 'text', required: true },
            { name: 'email', label: t('Email'), type: 'email', required: true },
            { 
              name: 'login_enabled', 
              label: t('Enable Login'),
              placeholder: '', // Empty placeholder to prevent duplicate label
              type: 'switch',
              defaultValue: true,
              conditional: (mode) => mode === 'create'
            },
            { 
              name: 'password', 
              label: t('Password'), 
              type: 'password',
              required: (mode) => mode === 'create',
              conditional: (mode, data) => {
                return mode === 'create' && data?.login_enabled === true;
              }
            }
          ],
          modalSize: 'lg'
        }}
        initialData={{
          ...currentCompany,
          login_enabled: currentCompany?.status === 'active'
        }}
        title={
          formMode === 'create' 
            ? t('Add New Company') 
            : formMode === 'edit' 
              ? t('Edit Company') 
              : t('View Company')
        }
        mode={formMode}
      />

      {/* Delete Modal */}
      <CrudDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={currentCompany?.name || ''}
        entityName="company"
      />

      {/* Reset Password Modal */}
      <CrudFormModal
        isOpen={isResetPasswordModalOpen}
        onClose={() => setIsResetPasswordModalOpen(false)}
        onSubmit={handleResetPasswordConfirm}
        formConfig={{
          fields: [
            { name: 'password', label: t('New Password'), type: 'password', required: true },
            { name: 'password_confirmation', label: t('Confirm Password'), type: 'password', required: true }
          ],
          modalSize: 'sm'
        }}
        initialData={{}}
        title={`Reset Password for ${currentCompany?.name || 'Company'}`}
        mode="edit"
      />
      
      {/* Upgrade Plan Modal */}
      <UpgradePlanModal
        isOpen={isUpgradePlanModalOpen}
        onClose={() => setIsUpgradePlanModalOpen(false)}
        onConfirm={handleUpgradePlanConfirm}
        plans={availablePlans}
        currentPlanId={currentCompany?.plan_id}
        companyName={currentCompany?.name || ''}
      />

      {/* Business Links Modal */}
      <Dialog open={isBusinessLinkModalOpen} onOpenChange={setIsBusinessLinkModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t('Business Links')} - {currentCompany?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {businessLinks.length > 0 ? (
              businessLinks.map((business: any) => (
                <div key={business.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{business.name}</h4>
                    <p className="text-sm text-gray-500 break-all">{business.link}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleCopyLink(business.link);
                      setCopiedLinkId(business.id);
                      setTimeout(() => setCopiedLinkId(null), 2000);
                    }}
                    className="ml-4"
                  >
                    {copiedLinkId === business.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                {t('No businesses found for this company')}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </PageTemplate>
  );
}