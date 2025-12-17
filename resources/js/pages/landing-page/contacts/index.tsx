import { useState } from 'react';
import { PageTemplate } from '@/components/page-template';
import { usePage, router } from '@inertiajs/react';
import { Pagination } from '@/components/ui/pagination';
import { SearchAndFilterBar } from '@/components/ui/search-and-filter-bar';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';
import { CrudTable } from '@/components/CrudTable';
import { CrudFormModal } from '@/components/CrudFormModal';
import { CrudDeleteModal } from '@/components/CrudDeleteModal';
import { ContactReplyModal } from '@/components/ContactReplyModal';
import { toast } from '@/components/custom-toast';
import { useTranslation } from 'react-i18next';

export default function ContactsIndex() {
  const { t } = useTranslation();
  const { auth, contacts, filters: pageFilters = {} } = usePage().props as any;
  const permissions = auth?.permissions || [];
  
  // State
  const [searchTerm, setSearchTerm] = useState(pageFilters.search || '');
  const [selectedStatus, setSelectedStatus] = useState(pageFilters.status || 'all');
  const [showFilters, setShowFilters] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };
  
  const applyFilters = () => {
    const params: any = { page: 1 };
    
    if (searchTerm) {
      params.search = searchTerm;
    }
    
    if (selectedStatus !== 'all') {
      params.status = selectedStatus;
    }
    
    if (pageFilters.per_page) {
      params.per_page = pageFilters.per_page;
    }
    
    router.get(route('landing-page.contacts.index'), params, { preserveState: true, preserveScroll: true });
  };
  
  const handleStatusFilter = (value: string) => {
    setSelectedStatus(value);
    
    const params: any = { page: 1 };
    
    if (searchTerm) {
      params.search = searchTerm;
    }
    
    if (value !== 'all') {
      params.status = value;
    }
    
    if (pageFilters.per_page) {
      params.per_page = pageFilters.per_page;
    }
    
    router.get(route('landing-page.contacts.index'), params, { preserveState: true, preserveScroll: true });
  };
  
  const handleAction = (action: string, item: any) => {
    setCurrentItem(item);
    
    switch (action) {
      case 'reply':
        if (!item.email) {
          toast.error('Contact has no email address');
          return;
        }
        setIsReplyModalOpen(true);
        break;
      case 'delete':
        setIsDeleteModalOpen(true);
        break;
      default:
        break;
    }
  };
  
  const handleReplySubmit = (replyData: any) => {
    toast.loading('Sending reply...');
    
    router.post(route('landing-page.contacts.reply', currentItem.id), replyData, {
      onSuccess: () => {
        setIsReplyModalOpen(false);
        setCurrentItem(null);
        toast.dismiss();
        toast.success('Reply sent successfully');
      },
      onError: (errors) => {
        toast.dismiss();
        toast.error(`Failed to send reply: ${Object.values(errors).join(', ')}`);
      }
    });
  };

  const handleReplyModalClose = () => {
    setIsReplyModalOpen(false);
    setCurrentItem(null);
  };
  
  const handleDeleteConfirm = () => {
    toast.loading(t('Deleting contact...'));
    
    router.delete(route('landing-page.contacts.destroy', currentItem.id), {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        toast.dismiss();
        toast.success(t('Contact deleted successfully'));
      },
      onError: (errors) => {
        toast.dismiss();
        toast.error(`Failed to delete contact: ${Object.values(errors).join(', ')}`);
      }
    });
  };
  
  const handleAddNew = () => {
    setCurrentItem(null);
    setFormMode('create');
    setIsFormModalOpen(true);
  };
  
  const handleFormSubmit = (formData: any) => {
    toast.loading(t('Creating contact...'));
    
    router.post(route('landing-page.contacts.store'), formData, {
      onSuccess: () => {
        setIsFormModalOpen(false);
        toast.dismiss();
        toast.success(t('Contact created successfully'));
      },
      onError: (errors) => {
        toast.dismiss();
        toast.error(`Failed to create contact: ${Object.values(errors).join(', ')}`);
      }
    });
  };
  
  const handleResetFilters = () => {
    setSelectedStatus('all');
    setSearchTerm('');
    setShowFilters(false);
    
    router.get(route('landing-page.contacts.index'), { 
      page: 1, 
      per_page: pageFilters.per_page 
    }, { preserveState: true, preserveScroll: true });
  };

  // Define page actions
  const pageActions = [{
    label: 'Create Contact',
    icon: <Plus className="h-4 w-4 mr-2" />,
    variant: 'default',
    onClick: () => handleAddNew()
  }];

  const breadcrumbs = [
    { title: t('Dashboard'), href: route('dashboard') },
    { title: t('Landing Page'), href: route('landing-page.settings') },
    { title: t('Contacts') }
  ];

  // Define table columns
  const columns = [
    { 
      key: 'name', 
      label: t('Name'), 
      sortable: true
    },
    { 
      key: 'email', 
      label: t('Email'), 
      sortable: true
    },
    { 
      key: 'subject', 
      label: t('Subject'),
      render: (value: string) => value || 'N/A'
    },
    { 
      key: 'message', 
      label: t('Message'),
      render: (value: string) => {
        if (!value) return 'N/A';
        return value.length > 50 ? `${value.substring(0, 50)}...` : value;
      }
    },
    { 
      key: 'status', 
      label: t('Status'), 
      sortable: true,
      render: (value: string) => {
        const statusColors = {
          'new': 'bg-blue-100 text-blue-800',
          'contacted': 'bg-yellow-100 text-yellow-800',
          'qualified': 'bg-purple-100 text-purple-800',
          'converted': 'bg-green-100 text-green-800',
          'closed': 'bg-gray-100 text-gray-800'
        };
        
        return (
          <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10 ${statusColors[value as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      }
    },
    { 
      key: 'created_at', 
      label: t('Date'), 
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString()
    }
  ];

  // Define table actions
  const actions = [
    { 
      label: t('Reply'), 
      icon: 'MessageSquare', 
      action: 'reply', 
      className: 'text-blue-500'
    },
    { 
      label: t('Delete'), 
      icon: 'Trash2', 
      action: 'delete', 
      className: 'text-red-500'
    }
  ];

  return (
    <PageTemplate 
      title={t("Landing Page Contacts")} 
      breadcrumbs={breadcrumbs}
      actions={pageActions}
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
                { value: 'all', label: t('All Statuses') },
                { value: 'new', label: t('New') },
                { value: 'contacted', label: t('Contacted') },
                { value: 'qualified', label: t('Qualified') },
                { value: 'converted', label: t('Converted') },
                { value: 'closed', label: t('Closed') }
              ]
            }
          ]}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          hasActiveFilters={() => selectedStatus !== 'all' || searchTerm !== ''}
          activeFilterCount={() => (selectedStatus !== 'all' ? 1 : 0) + (searchTerm ? 1 : 0)}
          onResetFilters={handleResetFilters}
          onApplyFilters={applyFilters}
          currentPerPage={pageFilters.per_page?.toString() || "10"}
          onPerPageChange={(value) => {
            const params: any = { page: 1, per_page: parseInt(value) };
            
            if (searchTerm) {
              params.search = searchTerm;
            }
            
            if (selectedStatus !== 'all') {
              params.status = selectedStatus;
            }
            
            router.get(route('landing-page.contacts.index'), params, { preserveState: true, preserveScroll: true });
          }}
        />
      </div>

      {/* Content section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
        <CrudTable
          columns={columns}
          actions={actions}
          data={contacts?.data || []}
          from={contacts?.from || 1}
          onAction={handleAction}
          permissions={permissions}
          entityPermissions={{
            view: 'manage-landing-page',
            create: 'manage-landing-page',
            edit: 'manage-landing-page',
            delete: 'manage-landing-page'
          }}
        />

        {/* Pagination section */}
        <Pagination
          from={contacts?.from || 0}
          to={contacts?.to || 0}
          total={contacts?.total || 0}
          links={contacts?.links}
          entityName={t("contacts")}
          onPageChange={(url) => router.get(url)}
        />
      </div>

      {/* Form Modal */}
      <CrudFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        formConfig={{
          fields: [
            { name: 'name', label: 'Name', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'subject', label: 'Subject', type: 'text' },
            { name: 'message', label: 'Message', type: 'textarea', required: true },
            { 
              name: 'status', 
              label: 'Status', 
              type: 'select', 
              required: true,
              options: [
                { value: 'new', label: 'New' },
                { value: 'contacted', label: 'Contacted' },
                { value: 'qualified', label: 'Qualified' },
                { value: 'converted', label: 'Converted' },
                { value: 'closed', label: 'Closed' }
              ]
            }
          ],
          modalSize: 'lg'
        }}
        initialData={currentItem}
        title={t('Create Contact')}
        mode={formMode}
      />

      {/* Reply Modal */}
      <ContactReplyModal
        isOpen={isReplyModalOpen}
        onClose={handleReplyModalClose}
        onSubmit={handleReplySubmit}
        contact={currentItem}
      />

      {/* Delete Modal */}
      <CrudDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={currentItem?.name || ''}
        entityName="contact"
      />
    </PageTemplate>
  );
}