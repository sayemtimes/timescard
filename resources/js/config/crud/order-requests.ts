import { CrudConfig } from '@/types/crud';
import { columnRenderers } from '@/utils/columnRenderers';
import { t } from '@/utils/i18n';

export const orderRequestsConfig: CrudConfig = {
  entity: {
    name: 'orderRequests',
    endpoint: route('nfc-cards.order-requests'),
    permissions: {
      view: 'view-nfc-card-order-requests',
      create: 'create-nfc-card-order-requests',
      edit: 'edit-nfc-card-order-requests',
      delete: 'delete-nfc-card-order-requests'
    }
  },
  modalSize: '4xl',
  description: t('Manage NFC card order requests from users'),
  table: {
    columns: [
      { key: 'user.name', label: t('User Name'), sortable: true, condition: () => window.auth?.user?.type === 'superadmin' },
      { key: 'business.name', label: t('Business Name'), sortable: true },
      { key: 'nfc_card.name', label: t('NFC Card'), sortable: true },
      { key: 'quantity', label: t('Quantity'), sortable: true },
      { 
        key: 'original_price', 
        label: t('Unit Price'), 
        render: (value) => value ? (window.appSettings?.formatCurrency(value) || `$${parseFloat(value).toFixed(2)}`) : '-'
      },
      { 
        key: 'total_price', 
        label: t('Total Price'), 
        render: (value) => value ? (window.appSettings?.formatCurrency(value) || `$${parseFloat(value).toFixed(2)}`) : '-'
      },
      { 
        key: 'status', 
        label: t('Status'), 
        render: columnRenderers.status()
      },
      { 
        key: 'created_at', 
        label: t('Requested At'), 
        sortable: true, 
        render: (value) => `${window.appSettings.formatDateTime(value, false)}` 
      }
    ],
    actions: [
      { 
        label: t('Approve'), 
        icon: 'Check', 
        action: 'approve', 
        className: 'text-green-600',
        condition: (item: any) => item.status === 'pending' && window.auth?.user?.type === 'superadmin'
      },
      { 
        label: t('Reject'), 
        icon: 'X', 
        action: 'reject', 
        className: 'text-red-600',
        condition: (item: any) => item.status === 'pending' && window.auth?.user?.type === 'superadmin'
      },
      { 
        label: t('Delete'), 
        icon: 'Trash2', 
        action: 'delete', 
        className: 'text-red-500',
        condition: (item: any) => item.status === 'pending'
      }
    ]
  },
  search: {
    enabled: true,
    placeholder: t('Search order requests...'),
    fields: ['user.name', 'business.name', 'nfc_card.name']
  },
  filters: [
    {
      key: 'status',
      label: t('Status'),
      type: 'select',
      options: [
        { value: 'all', label: t('All Status') },
        { value: 'pending', label: t('Pending') },
        { value: 'approved', label: t('Approved') },
        { value: 'rejected', label: t('Rejected') }
      ]
    }
  ],
  form: {
    fields: []
  }
};