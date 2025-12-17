import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { PageTemplate } from '@/components/page-template';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Eye, Users, Globe, Smartphone, Clock, TrendingUp, MapPin, Monitor, Calendar, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { router } from '@inertiajs/react';
import { fetchSectionData, fetchRealtimeData } from './analytics-api';

interface VisitorAnalytics {
  overview: {
    totalVisitors: number;
    todayVisitors: number;
    onlineVisitors: number;
    totalPageViews: number;
    avgSessionDuration: number;
    bounceRate: number;
  };
  trends: {
    daily: Array<{ date: string; visitors: number; pageViews: number }>;
    weekly: Array<{ week: string; visitors: number; pageViews: number }>;
    monthly: Array<{ month: string; visitors: number; pageViews: number }>;
  };
  geographic: Array<{ country: string; visitors: number; percentage: number }>;
  devices: Array<{ device: string; visitors: number; percentage: number }>;
  browsers: Array<{ browser: string; visitors: number; percentage: number }>;
  referrers: Array<{ source: string; visitors: number; percentage: number }>;
  popularPages: Array<{ url: string; views: number; title: string }>;
  realtime: {
    currentVisitors: number;
    activePages: Array<{ url: string; visitors: number }>;
  };
}

interface AnalyticsData {
  visitor: VisitorAnalytics;
  business: {
    totalContacts: number;
    totalAppointments: number;
    conversionRate: number;
  };
}

export default function CompanyAnalytics({ analytics }: { analytics: AnalyticsData }) {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState('7d');
  const [realtimeData, setRealtimeData] = useState(analytics.visitor.realtime);
  
  // State for lazy-loaded data
  const [geographicData, setGeographicData] = useState([]);
  const [devicesData, setDevicesData] = useState([]);
  const [browsersData, setBrowsersData] = useState([]);
  const [referrersData, setReferrersData] = useState([]);
  const [popularPagesData, setPopularPagesData] = useState([]);
  
  // Initialize with empty arrays to prevent rendering errors
  useEffect(() => {
    setGeographicData([]);
    setDevicesData([]);
    setBrowsersData([]);
    setReferrersData([]);
    setPopularPagesData([]);
  }, [timeRange]);
  
  // Loading states
  const [loading, setLoading] = useState({
    geographic: true,
    devices: true,
    browsers: true,
    referrers: true,
    popularPages: true
  });
  
  const breadcrumbs = [
    { title: t('Dashboard'), href: route('dashboard') },
    { title: t('Visitor Analytics') }
  ];

  // Real-time data polling with optimized interval
  useEffect(() => {
    let isMounted = true;
    let pollingInterval = 60000; // Increase polling interval to 60 seconds
    
    const getRealtimeData = async () => {
      const data = await fetchRealtimeData();
      if (isMounted && data) {
        setRealtimeData(data);
      }
    };
    
    const interval = setInterval(getRealtimeData, pollingInterval);
    
    // Fetch immediately on component mount
    getRealtimeData();
    
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
  };

  // Memoize static values to prevent unnecessary re-renders
  const COLORS = useMemo(() => ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'], []);
  
  // Memoize chart data based on time range
  const chartData = useMemo(() => {
    let data;
    switch(timeRange) {
      case '1d':
        data = analytics.visitor.trends.daily.filter(item => 
          new Date(item.date).getTime() >= new Date().setHours(0,0,0,0));
        break;
      case '7d':
        data = analytics.visitor.trends.daily;
        break;
      case '30d':
        data = analytics.visitor.trends.weekly;
        break;
      case '90d':
        data = analytics.visitor.trends.monthly;
        break;
      default:
        data = analytics.visitor.trends.daily;
    }
    return data;
  }, [timeRange, analytics.visitor.trends]);
  
  // Load data lazily when component mounts
  useEffect(() => {
    const loadSectionData = async (section) => {
      try {
        const data = await fetchSectionData(section, timeRange);
        
        switch(section) {
          case 'geographic':
            setGeographicData(data);
            break;
          case 'devices':
            setDevicesData(data);
            break;
          case 'browsers':
            setBrowsersData(data);
            break;
          case 'referrers':
            setReferrersData(data);
            break;
          case 'popularPages':
            setPopularPagesData(data);
            break;
        }
        
        setLoading(prev => ({ ...prev, [section]: false }));
      } catch (error) {
        console.error(`Error loading ${section} data:`, error);
        setLoading(prev => ({ ...prev, [section]: false }));
      }
    };
    
    // Reset loading states when time range changes
    setLoading({
      geographic: true,
      devices: true,
      browsers: true,
      referrers: true,
      popularPages: true
    });
    
    // Load data in sequence to avoid overwhelming the server
    const loadAllData = async () => {
      await loadSectionData('geographic');
      await loadSectionData('devices');
      await loadSectionData('browsers');
      await loadSectionData('referrers');
      await loadSectionData('popularPages');
    };
    
    loadAllData();
  }, [timeRange]);

  return (
    <PageTemplate title={t('Analytics & Insights')} url="/analytics" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              {realtimeData.currentVisitors} {t('Online Now')}
            </Badge>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">{t('Today')}</SelectItem>
              <SelectItem value="7d">{t('7 Days')}</SelectItem>
              <SelectItem value="30d">{t('30 Days')}</SelectItem>
              <SelectItem value="90d">{t('90 Days')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('Total Visitors')}</p>
                  <h3 className="mt-2 text-2xl font-bold">{analytics.visitor.overview.totalVisitors.toLocaleString()}</h3>
                </div>
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('Today')}</p>
                  <h3 className="mt-2 text-2xl font-bold">{analytics.visitor.overview.todayVisitors.toLocaleString()}</h3>
                </div>
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('Page Views')}</p>
                  <h3 className="mt-2 text-2xl font-bold">{analytics.visitor.overview.totalPageViews.toLocaleString()}</h3>
                </div>
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('Avg. Session')}</p>
                  <h3 className="mt-2 text-2xl font-bold">{formatDuration(analytics.visitor.overview.avgSessionDuration)}</h3>
                </div>
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('Bounce Rate')}</p>
                  <h3 className="mt-2 text-2xl font-bold">{analytics.visitor.overview.bounceRate}%</h3>
                </div>
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('Contacts')}</p>
                  <h3 className="mt-2 text-2xl font-bold">{analytics.business.totalContacts}</h3>
                </div>
                <MessageSquare className="h-6 w-6 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                {t('Visitor Trends')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey={timeRange === '30d' || timeRange === '90d' ? 'week' : 'date'} 
                    tickFormatter={(value) => timeRange === '30d' || timeRange === '90d' ? value : new Date(value).toLocaleDateString()} 
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => timeRange === '30d' || timeRange === '90d' ? value : new Date(value).toLocaleDateString()} 
                  />
                  <Area type="monotone" dataKey="visitors" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.6} name="Visitors" />
                  <Area type="monotone" dataKey="pageViews" stroke="#16a34a" fill="#22c55e" fillOpacity={0.4} name="Page Views" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {t('Geographic Distribution')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading.geographic ? (
                <div className="flex items-center justify-center h-[300px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : geographicData.length === 0 ? (
                <div className="flex items-center justify-center h-[300px] text-gray-500">
                  {t('No geographic data available')}
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={geographicData.slice(0, 5)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ country, percentage }) => `${country} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="visitors"
                    >
                      {geographicData.slice(0, 5).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Device & Browser Analytics */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                {t('Device Types')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading.devices ? (
                <div className="flex items-center justify-center h-[150px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : devicesData.length === 0 ? (
                <div className="flex items-center justify-center h-[150px] text-gray-500">
                  {t('No device data available')}
                </div>
              ) : (
                <div className="space-y-3">
                  {devicesData.map((device, index) => (
                    <div key={`device-${index}`} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="text-sm font-medium">{device.device}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold">{device.visitors.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground ml-2">({device.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                {t('Browsers')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading.browsers ? (
                <div className="flex items-center justify-center h-[150px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : browsersData.length === 0 ? (
                <div className="flex items-center justify-center h-[150px] text-gray-500">
                  {t('No browser data available')}
                </div>
              ) : (
                <div className="space-y-3">
                  {browsersData.map((browser, index) => (
                    <div key={`browser-${index}`} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="text-sm font-medium">{browser.browser}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold">{browser.visitors.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground ml-2">({browser.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Traffic Sources & Popular Pages */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {t('Traffic Sources')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading.referrers ? (
                <div className="flex items-center justify-center h-[150px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : referrersData.length === 0 ? (
                <div className="flex items-center justify-center h-[150px] text-gray-500">
                  {t('No referrer data available')}
                </div>
              ) : (
                <div className="space-y-3">
                  {referrersData.map((referrer, index) => (
                    <div key={`referrer-${index}`} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                      <span className="text-sm font-medium">{referrer.source}</span>
                      <div className="text-right">
                        <span className="text-sm font-bold">{referrer.visitors.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground ml-2">({referrer.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Eye className="h-4 w-4" />
                {t('Popular Pages')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading.popularPages ? (
                <div className="flex items-center justify-center h-[150px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : popularPagesData.length === 0 ? (
                <div className="flex items-center justify-center h-[150px] text-gray-500">
                  {t('No page view data available')}
                </div>
              ) : (
                <div className="space-y-3">
                  {popularPagesData.map((page, index) => (
                    <div key={`page-${index}`} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{page.title || page.url}</p>
                        <p className="text-xs text-muted-foreground truncate">{page.url}</p>
                      </div>
                      <span className="text-sm font-bold ml-2">{page.views.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Real-time Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              {t('Real-time Activity')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold mb-3">{t('Currently Online')}: {realtimeData.currentVisitors}</h4>
                <div className="space-y-2">
                  {realtimeData.activePages.map((page, index) => (
                    <div key={`active-${index}`} className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="text-xs truncate">{page.url}</span>
                      <Badge variant="secondary">{page.visitors}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="text-sm font-semibold">{t('Conversion Rate')}</h4>
                  <p className="text-2xl font-bold text-green-600">{analytics.business.conversionRate}%</p>
                  <p className="text-xs text-muted-foreground">{t('Visitors to contacts')}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="text-sm font-semibold">{t('Total Appointments')}</h4>
                  <p className="text-2xl font-bold text-blue-600">{analytics.business.totalAppointments}</p>
                  <p className="text-xs text-muted-foreground">{t('Scheduled this period')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>


      </div>
    </PageTemplate>
  );
}