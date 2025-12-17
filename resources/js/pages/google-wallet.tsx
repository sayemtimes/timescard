import { useState } from 'react';
import { PageTemplate } from '@/components/page-template';
import { usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';
import { SearchAndFilterBar } from '@/components/ui/search-and-filter-bar';
import { Wallet, Plus, Settings } from 'lucide-react';
import { toast } from '@/components/custom-toast';
import { useTranslation } from 'react-i18next';

export default function GoogleWallet() {
  const { t } = useTranslation();
  const { auth, businesses, businessTypes, hasGoogleWalletSettings, filters: pageFilters = {} } = usePage().props as any;
  const [loadingBusinesses, setLoadingBusinesses] = useState<Set<number>>(new Set());
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState(pageFilters.search || '');
  const [selectedBusinessType, setSelectedBusinessType] = useState(pageFilters.business_type || 'all');
  const [showFilters, setShowFilters] = useState(false);

  // Check if any filters are active
  const hasActiveFilters = () => {
    return selectedBusinessType !== 'all' || searchTerm !== '';
  };
  
  // Count active filters
  const activeFilterCount = () => {
    return (selectedBusinessType !== 'all' ? 1 : 0) + (searchTerm ? 1 : 0);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };
  
  const applyFilters = () => {
    const params: any = { page: 1 };
    
    if (searchTerm) {
      params.search = searchTerm;
    }
    
    if (selectedBusinessType !== 'all') {
      params.business_type = selectedBusinessType;
    }
    
    if (pageFilters.per_page) {
      params.per_page = pageFilters.per_page;
    }
    
    router.get(route('google-wallet.index'), params, { preserveState: true, preserveScroll: true });
  };
  
  const handleBusinessTypeFilter = (value: string) => {
    setSelectedBusinessType(value);
    
    const params: any = { page: 1 };
    
    if (searchTerm) {
      params.search = searchTerm;
    }
    
    if (value !== 'all') {
      params.business_type = value;
    }
    
    if (pageFilters.per_page) {
      params.per_page = pageFilters.per_page;
    }
    
    router.get(route('google-wallet.index'), params, { preserveState: true, preserveScroll: true });
  };
  
  const handleResetFilters = () => {
    setSelectedBusinessType('all');
    setSearchTerm('');
    setShowFilters(false);
    
    router.get(route('google-wallet.index'), { 
      page: 1, 
      per_page: pageFilters.per_page 
    }, { preserveState: true, preserveScroll: true });
  };

  const handleAddToWallet = async (businessId: number) => {
    setLoadingBusinesses(prev => new Set(prev).add(businessId));
    
    try {
      const response = await fetch(route('google-wallet.add', businessId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Open Google Wallet add URL
        window.open(data.addUrl, '_blank');
        toast.success(t('Redirecting to Google Wallet...'));
      } else {
        toast.error(data.message || t('Failed to generate wallet pass'));
      }
    } catch (error) {
      toast.error(t('An error occurred while generating wallet pass'));
    } finally {
      setLoadingBusinesses(prev => {
        const newSet = new Set(prev);
        newSet.delete(businessId);
        return newSet;
      });
    }
  };

  const breadcrumbs = [
    { title: t('Dashboard'), href: route('dashboard') },
    { title: t('Google Wallet') }
  ];

  return (
    <PageTemplate 
      title={t("Google Wallet")} 
      url="/google-wallet"
      breadcrumbs={breadcrumbs}
      noPadding
    >
      {!hasGoogleWalletSettings ? (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
          <div className="text-center py-8">
            <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              {t('Google Wallet Not Configured')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {t('Google Wallet settings need to be configured before you can add businesses to wallet.')}
            </p>
            <Button 
              onClick={() => router.get(route('settings'))}
              className="inline-flex items-center"
            >
              <Settings className="h-4 w-4 mr-2" />
              {t('Go to Settings')}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Search and filters section */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
            <SearchAndFilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onSearch={handleSearch}
              filters={[
                {
                  name: 'business_type',
                  label: t('Business Type'),
                  type: 'select',
                  value: selectedBusinessType,
                  onChange: handleBusinessTypeFilter,
                  options: [
                    { value: 'all', label: t('All Types') },
                    ...(businessTypes || []).map((type: string) => ({
                      value: type,
                      label: type
                    }))
                  ]
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
                const params: any = { page: 1, per_page: parseInt(value) };
                
                if (searchTerm) {
                  params.search = searchTerm;
                }
                
                if (selectedBusinessType !== 'all') {
                  params.business_type = selectedBusinessType;
                }
                
                router.get(route('google-wallet.index'), params, { preserveState: true, preserveScroll: true });
              }}
            />
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <Wallet className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {t('Your Businesses')}
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('Add your business cards to Google Wallet for easy sharing and access.')}
            </p>

            {businesses && businesses.data && businesses.data.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {businesses.data.map((business: any) => (
                    <Card key={business.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                            {business.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {business.business_type || t('Business Card')}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex justify-between">
                            <span>{t('Created')}:</span>
                            <span>{window.appSettings?.formatDateTime ? window.appSettings.formatDateTime(business.created_at, false) : new Date(business.created_at).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{t('Views')}:</span>
                            <span>{business.view_count || 0}</span>
                          </div>
                        </div>

                        <Button
                          onClick={() => handleAddToWallet(business.id)}
                          disabled={loadingBusinesses.has(business.id)}
                          className="w-full"
                          variant="default"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          {loadingBusinesses.has(business.id) ? t('Adding...') : t('Add to Wallet')}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
                
                {/* Pagination section */}
                <Pagination
                  from={businesses?.from || 0}
                  to={businesses?.to || 0}
                  total={businesses?.total || 0}
                  links={businesses?.links}
                  entityName={t("businesses")}
                  onPageChange={(url) => router.get(url)}
                />
              </>
            ) : (
              <div className="text-center py-8">
                <Wallet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  {t('No Businesses Found')}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {hasActiveFilters() ? t('No businesses match your current filters.') : t('Create your first business card to add it to Google Wallet.')}
                </p>
                {hasActiveFilters() ? (
                  <Button 
                    onClick={handleResetFilters}
                    variant="outline"
                    className="inline-flex items-center"
                  >
                    {t('Clear Filters')}
                  </Button>
                ) : (
                  <Button 
                    onClick={() => router.get(route('vcard-builder.create'))}
                    className="inline-flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t('Create Business Card')}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </PageTemplate>
  );
}