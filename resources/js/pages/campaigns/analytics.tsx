import React from 'react';
import { PageTemplate } from '@/components/page-template';
import { usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from 'react-i18next';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Target, 
  Users, 
  Building2,
  Clock,
  Activity,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  TrendingDown
} from 'lucide-react';

export default function CampaignAnalytics() {
  const { t } = useTranslation();
  const { campaign, metrics, businessStats, monthlyTrends, statusDistribution, isAdmin } = usePage().props as any;

  const breadcrumbs = [
    { title: t('Dashboard'), href: route('dashboard') },
    { title: t('Campaigns'), href: route('campaigns.index') },
    { title: t('Analytics') }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-amber-50 text-amber-700 border-amber-200',
      active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      completed: 'bg-blue-50 text-blue-700 border-blue-200',
      cancelled: 'bg-red-50 text-red-700 border-red-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <PageTemplate 
      title={`${t('Campaign Analytics')}: ${campaign.name}`}
      url={`/campaigns/${campaign.id}/analytics`}
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-8">
        {/* Campaign Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{campaign.name}</h1>
              <p className="text-gray-600 text-lg">{campaign.description || t('No description provided')}</p>
            </div>
            <Badge className={`${getStatusColor(campaign.status)} px-4 py-2 text-sm font-medium border`}>
              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Users className="h-6 w-6 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">{t('Company')}</p>
              <p className="font-semibold text-gray-900">{campaign.user?.name}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Building2 className="h-6 w-6 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">{t('Business')}</p>
              <p className="font-semibold text-gray-900">{campaign.business?.name}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Target className="h-6 w-6 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">{t('Category')}</p>
              <p className="font-semibold text-gray-900">{campaign.category?.name}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Calendar className="h-6 w-6 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">{t('Duration')}</p>
              <p className="font-semibold text-gray-900">{campaign.total_days} {t('days')}</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">{t('Total Revenue')}</CardTitle>
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {(window?.appSettings?.currencySettings?.currencySymbol || "$")}{metrics.total_revenue}
              </div>
              <p className="text-sm text-gray-600">
              {(window?.appSettings?.currencySettings?.currencySymbol || "$")}{Number(metrics.cost_per_day).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {t("per day")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">{t('Progress')}</CardTitle>
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-3">
                {metrics.progress_percentage}%
              </div>
              <Progress value={metrics.progress_percentage} className="h-2" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">{t('Days Remaining')}</CardTitle>
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {metrics.days_remaining}
              </div>
              <p className="text-sm text-gray-600">{t('Until completion')}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">{t('ROI Estimate')}</CardTitle>
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {metrics.roi_estimate.roi_percentage}%
              </div>
              <p className="text-sm text-gray-600">
                 {(window?.appSettings?.currencySettings?.currencySymbol || "$")}{metrics.roi_estimate.estimated_return} {t('expected')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Calendar className="h-5 w-5 mr-2 text-gray-600" />
              {t('Campaign Timeline')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <p className="font-semibold text-blue-900">{t('Start Date')}</p>
                  <p className="text-blue-700">{formatDate(campaign.start_date)}</p>
                </div>
                <div className="text-blue-600">
                  <ArrowUpRight className="h-6 w-6" />
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${metrics.progress_percentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div>
                  <p className="font-semibold text-emerald-900">{t('End Date')}</p>
                  <p className="text-emerald-700">{formatDate(campaign.end_date)}</p>
                </div>
                <div className="text-emerald-600">
                  <Target className="h-6 w-6" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <BarChart3 className="h-5 w-5 mr-2 text-gray-600" />
                {t('Category Performance')}
              </CardTitle>
              <CardDescription>
                {t('Compared to other campaigns in')} {campaign.category?.name}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Building2 className="h-5 w-5 mr-2 text-gray-600" />
                {t('Business Performance')}
              </CardTitle>
              <CardDescription>
                {t('Performance for')} {campaign.business?.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">{t('Total Campaigns')}</span>
                <span className="font-semibold">{businessStats?.total_campaigns || 0}</span>
              </div>
              <div className="flex justify-between items-center py-2 bg-emerald-50 px-3 rounded">
                <span className="text-emerald-700 font-medium">{t('Total Revenue')}</span>
                <span className="font-bold text-emerald-900">{(window?.appSettings?.currencySettings?.currencySymbol || "$")}{(businessStats?.total_revenue || 0)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">{t('Current Campaign')}</span>
                <span className="font-semibold text-blue-600">{(window?.appSettings?.currencySettings?.currencySymbol || "$")}{(campaign.total_amount)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">{t('Contribution')}</span>
                <span className="font-semibold">
                  {businessStats?.total_revenue ? 
                    Math.round((campaign.total_amount / businessStats.total_revenue) * 100) : 0}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Analytics */}
        {isAdmin && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <TrendingUp className="h-5 w-5 mr-2 text-gray-600" />
                  {t('Monthly Trends')}
                </CardTitle>
                <CardDescription>{t('Campaign activity over the last 6 months')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {monthlyTrends?.map((trend: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div>
                        <p className="font-medium text-gray-900">{trend.month}</p>
                        <p className="text-sm text-gray-600">{trend.count} {t('campaigns')}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-emerald-600">{`${window?.appSettings?.currencySettings?.currencySymbol || "$"}${Number(trend?.revenue ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <PieChart className="h-5 w-5 mr-2 text-gray-600" />
                  {t('Status Distribution')}
                </CardTitle>
                <CardDescription>{t('Campaign status breakdown')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {statusDistribution?.map((status: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <Badge className={`${getStatusColor(status.status)} border`}>
                          {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{status.count}</p>
                        <p className="text-sm text-gray-600">{t('campaigns')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Campaign Details */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">{t('Campaign Details')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t('Payment Method')}</p>
                  <p className="font-semibold text-gray-900 capitalize">
                    {campaign.payment_method.replace('_', ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t('Created Date')}</p>
                  <p className="font-semibold text-gray-900">{formatDate(campaign.created_at)}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t('Last Updated')}</p>
                  <p className="font-semibold text-gray-900">{formatDate(campaign.updated_at)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t('Campaign ID')}</p>
                  <p className="font-semibold text-gray-900">#{campaign.id}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t('Status')}</p>
                  <Badge className={`${getStatusColor(campaign.status)} border`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t('Active')}</p>
                  <Badge className={campaign.is_active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-700 border-gray-200'}>
                    {campaign.is_active ? t('Yes') : t('No')}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
}