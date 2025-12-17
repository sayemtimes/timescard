import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { useTranslation } from 'react-i18next';

// Simple encryption function for plan ID
const encryptPlanId = (planId: number): string => {
  const key = 'vCard2025';
  const str = planId.toString();
  let encrypted = '';
  for (let i = 0; i < str.length; i++) {
    encrypted += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(encrypted);
};

interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  yearly_price?: number;
  duration: string;
  features?: string[];
  is_popular?: boolean;
  is_plan_enable: string;
  stats?: {
    businesses?: number;
    users?: number;
    storage?: string;
    templates?: number;
    bio_links?: number;
    bio_links_templates?: number;
    addons?: number;
    addon_names?: string[];
  };
}

interface PlansSectionProps {
  brandColor?: string;
  plans: Plan[];
  settings?: any;
  sectionData?: {
    title?: string;
    subtitle?: string;
    faq_text?: string;
  };
}

function PlansSection({ plans, settings, sectionData, brandColor = '#055353' }: PlansSectionProps) {
  const { t } = useTranslation();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { ref, isVisible } = useScrollAnimation();

  // Filter enabled plans based on billing cycle and duration
  const enabledPlans = plans.filter(plan => {
    if (plan.is_plan_enable !== 'on') return false;
    
    // Filter by duration
    const billingType = billingCycle === 'yearly' ? 'yearly' : 'monthly';
    return plan.duration === billingType || plan.duration === 'both';
  });

  // Default plans if none provided
  const defaultPlans = [
    {
      id: 1,
      name: 'Starter',
      description: 'Perfect for individuals getting started with digital networking',
      price: 0,
      yearly_price: 0,
      duration: 'month',
      features: [
        '1 Digital Business Card',
        'Basic QR Code',
        'Contact Form',
        'Basic Analytics',
        'Email Support'
      ],
      is_popular: false,
      is_plan_enable: 'on',
      stats: {
        businesses: 1,
        users: 1,
        storage: '1GB',
        templates: 10,
        bio_links: 1,
        bio_links_templates: 5,
        addons: 0,
        addon_names: []
      }
    },
    {
      id: 2,
      name: 'Professional',
      description: 'Ideal for professionals and small businesses',
      price: 19,
      yearly_price: 190,
      duration: 'month',
      features: [
        '5 Digital Business Cards',
        'Custom QR Codes',
        'NFC Support',
        'Advanced Analytics',
        'Custom Branding',
        'Priority Support',
        'Lead Capture'
      ],
      is_popular: true,
      is_plan_enable: 'on',
      stats: {
        businesses: 5,
        users: 10,
        storage: '10GB',
        templates: 25,
        bio_links: 5,
        bio_links_templates: 10,
        addons: 2,
        addon_names: ['Email Integration', 'API Access']
      }
    },
    {
      id: 3,
      name: 'Premium',
      description: 'For teams and large organizations',
      price: 49,
      yearly_price: 490,
      duration: 'month',
      features: [
        'Unlimited Digital Cards',
        'Team Management',
        'Custom Domain',
        'White Label Solution',
        'API Access',
        'Dedicated Support',
        'Advanced Integrations',
        'Custom Features'
      ],
      is_popular: false,
      is_plan_enable: 'on',
      stats: {
        businesses: 999,
        users: 999,
        storage: 'Unlimited',
        templates: 34,
        bio_links: 999,
        bio_links_templates: 14,
        addons: 5,
        addon_names: ['Custom Domain', 'White Label', 'Dedicated Support', 'API Access', 'Custom Integration']
      }
    }
  ];

  const displayPlans = enabledPlans.length > 0 ? enabledPlans : defaultPlans;

  const formatCurrency = (amount: string | number) => {
    if (typeof window !== 'undefined' && window.appSettings?.formatCurrency) {
      // Use numeric value if available, otherwise parse the string
      const numericAmount = typeof amount === 'number' ? amount : parseFloat(amount);
      return window.appSettings.formatCurrency(numericAmount, { showSymbol: true });
    }
    // Fallback if appSettings is not available
    return amount;
  };
  
  const getPrice = React.useCallback((plan: Plan) => {
    if (billingCycle === 'yearly' && plan.yearly_price !== undefined) {
      return plan.yearly_price;
    }
    return plan.price;
  }, [billingCycle]);


  return (
    <section id="pricing" className=" bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16  duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white  bg-[#055353] px-6 py-3 rounded-lg">
            {sectionData?.title || t('Choose Your virtual card')}
          </h2>
          <p className="text-lg text-gray-600  mb-8 leading-relaxed font-medium">
            {sectionData?.subtitle || t('Start with our free plan and upgrade as you grow. All plans include our core features with no setup fees or hidden costs.')}
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-6 pr-10 pl-10 py-4 bg-[#055353] inline-block rounded-full">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white font-semibold' : 'text-white'}`}>
              {t("Monthly")}
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
              style={{ backgroundColor: billingCycle === 'yearly' ? brandColor : '#055353' }}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-white font-semibold' : 'text-white'}`}>
              {t("Yearly")}
            </span>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {displayPlans.map((plan, planIndex) => (
            <div 
              key={plan.id} 
              className={`group relative h-full flex flex-col ${
                plan.is_popular 
                  ? 'z-10 scale-[1.02]' 
                  : ''
              }`}
            >
              {/* Card with decorative elements */}
              <div 
                className="absolute inset-0 rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-xl overflow-hidden"
                style={{
                  background: '#ffffff',
                  border: `3px solid ${planIndex === 1 ? '#ff8901' : '#055353'}`
                }}
              >
                {/* Decorative background elements */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-70"
                  style={{ background: 'transparent' }}
                ></div>
                <div 
                  className="absolute bottom-0 left-0 w-24 h-24 rounded-full -ml-12 -mb-12 opacity-50"
                  style={{ background: 'transparent' }}
                ></div>
              </div>
              
                {/* Recommended indicator */}
              {(plan.is_popular || planIndex === 1 || true) && (
                <div className="absolute top-0 left-0 right-0 flex justify-center z-20 w-full">
                  <div 
                    className="text-white px-4 py-2 rounded-t-2xl flex items-center gap-1.5 text-2xl font-bold w-full text-center justify-center"
                    style={{ backgroundColor: planIndex === 1 ? '#ff8901' : '#055353' }}
                  >
                    <Check className="h-5 w-5" />
                    {planIndex === 0 ? 'Starter' : planIndex === 1 ? 'Professional' : 'Premium'}
                  </div>
                </div>
              )}              {/* Content container */}
              <div className="relative z-10 flex flex-col h-full pl-6 pr-6 pt-12 pb-6 rounded-2xl flex-1" style={{
                background: '#ffffff',
                border: `3px solid ${planIndex === 1 ? '#ff8901' : '#055353'}`
              }}>
                {/* Plan header */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span 
                      className="text-4xl font-extrabold text-[#055353]"
                    >
                      {getPrice(plan) === 0 ? formatCurrency(0) : formatCurrency(getPrice(plan))}
                    </span>
                    <span className="text-[#055353] text-base">
                      /{billingCycle === 'yearly' ? 'year' : 'month'}
                    </span>
                  </div>
                  <p className="text-sm text-[#055353] leading-relaxed line-clamp-2 mb-3">
                    {plan.description}
                  </p>

                </div>
                
                {/* Divider with icon */}
                <div className="relative flex items-center ">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <div 
                    className="mx-3 p-1.5 rounded-full"
                    style={{ backgroundColor: '#055353', color: '#fff' }}
                  >
                    <Check className="h-4 w-4" />
                  </div>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                
                {/* Usage limits */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#055353] mb-3">
                    {t("Usage Limits")}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg p-2 text-center" style={{ backgroundColor: planIndex === 1 ? '#ff8901' : '#055353' }}>
                      <div className="text-lg font-bold text-white">{plan.stats?.businesses || 'N/A'}</div>
                      <div className="text-xs text-white/80">{t("Businesses")}</div>
                    </div>
                    <div className="rounded-lg p-2 text-center" style={{ backgroundColor: planIndex === 1 ? '#ff8901' : '#055353' }}>
                      <div className="text-lg font-bold text-white">{plan.stats?.users || 'N/A'}</div>
                      <div className="text-xs text-white/80">{t("Users")}</div>
                    </div>
                    <div className="rounded-lg p-2 text-center" style={{ backgroundColor: planIndex === 1 ? '#ff8901' : '#055353' }}>
                      <div className="text-lg font-bold text-white">{plan.stats?.storage || 'N/A'}</div>
                      <div className="text-xs text-white/80">{t("Storage")}</div>
                    </div>
                    <div className="rounded-lg p-2 text-center" style={{ backgroundColor: planIndex === 1 ? '#ff8901' : '#055353' }}>
                      <div className="text-lg font-bold text-white">{plan.stats?.templates || '34'}</div>
                      <div className="text-xs text-white/80">{t("Templates")}</div>
                    </div>
                    <div className="rounded-lg p-2 text-center" style={{ backgroundColor: planIndex === 1 ? '#ff8901' : '#055353' }}>
                      <div className="text-lg font-bold text-white">{plan.stats?.bio_links || 'N/A'}</div>
                      <div className="text-xs text-white/80">{t("Bio Links")}</div>
                    </div>
                    <div className="rounded-lg p-2 text-center" style={{ backgroundColor: planIndex === 1 ? '#ff8901' : '#055353' }}>
                      <div className="text-lg font-bold text-white">{plan.stats?.bio_links_templates || '14'}</div>
                      <div className="text-xs text-white/80">{t("Bio Templates")}</div>
                    </div>
                  </div>
                  {plan.stats?.addons > 0 && plan.stats?.addon_names && plan.stats.addon_names.length > 0 && (
                    <div className="mt-3">
                      <div className="rounded-lg p-3" style={{ backgroundColor: planIndex === 1 ? '#ff8901' : '#055353' }}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="text-sm font-semibold text-white">
                            {t("Included Addons")} ({plan.stats.addons})
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {plan.stats.addon_names.map((name, index) => (
                            <span key={index} className="inline-block bg-white px-2 py-1 rounded text-xs font-medium text-gray-800">
                              {name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Features */}
                <div className="mb-6 flex-1">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#055353] mb-3">
                    {t("Features")}
                  </h4>
                  <ul className="space-y-2.5">
                    {(plan.features || []).map((feature, index) => {
                      // Handle template sections with count display
                      const displayFeature = feature.startsWith('Template Sections') ? feature : feature;
                      return (
                        <li key={index} className="flex items-center gap-3">
                          <div 
                            className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: '#055353', color: '#fff' }}
                          >
                            <Check className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-sm font-medium text-[#055353]">
                            {displayFeature}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                
                {/* Actions */}
                <div className="absolute bottom-0 left-0 right-0 w-full">
                  <Link
                    href={route('register', { plan: encryptPlanId(plan.id) })}
                    className="block w-full text-center py-3 px-6 rounded-b-2xl font-semibold transition-colors hover:opacity-90 text-white"
                    style={{
                      backgroundColor: planIndex === 1 ? '#ff8901' : '#055353',
                      color: 'white'
                    }}
                  >
                    {plan.price === 0 ? 'Start Free' : 'Get Started'}
                    <ArrowRight className="w-4 h-4 inline-block ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Link */}
        {sectionData?.faq_text && (
          <div className="text-center mt-8 sm:mt-12">
            <p className="text-gray-600">
              {sectionData.faq_text}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default PlansSection;