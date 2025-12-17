import React from 'react';
import { Wifi, Zap, Shield, TrendingUp, ArrowRight, Check, X } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface NFCCardSectionProps {
  brandColor?: string;
}

export default function NFCCardSection({ brandColor = '#055353' }: NFCCardSectionProps) {
  const features = [
    {
      icon: Wifi,
      title: 'One Tap Connection',
      description: 'Simply tap your NFC card to any smartphone to share your contact details instantly.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'No app installation required. Works with any NFC-enabled device automatically.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your data is protected with industry-standard encryption technology.'
    },
    {
      icon: TrendingUp,
      title: 'Track Engagement',
      description: 'Monitor how many times your NFC card has been scanned and get detailed analytics.'
    }
  ];

  const allFeatures = [
    'Full Custom Design NFC Card',
    'Unlimited Contact/Custom Fields',
    'Unlimited Social Media Links',
    '4 Gallery Images',
    'YouTube Videos',
    'Custom Card URL',
    '1 Theme Support (Total 8 Available)',
    'QR Code',
    'Product & Service Section',
    'Portfolio Section',
    'Testimonials Section',
    'Enquiry Form',
    'Custom CSS/Custom JS',
    'Custom Sections'
  ];

  const pricingPlans = [
    {
      name: 'Silver',
      price: '$5.99',
      priceInTaka: '৳719',
      description: 'Basic plan for small businesses just getting started.',
      popular: true,
      limits: {
        cards: '1',
        users: '2',
        storage: '1 GB',
        templates: '34',
        bioLinks: '1',
        bioTemplates: '14'
      },
      features: {
        'Full Custom Design NFC Card': true,
        'Unlimited Contact/Custom Fields': true,
        'Unlimited Social Media Links': false,
        '4 Gallery Images': false,
        'YouTube Videos': false,
        'Custom Card URL': true,
        '1 Theme Support (Total 8 Available)': false,
        'QR Code': true,
        'Product & Service Section': false,
        'Portfolio Section': false,
        'Testimonials Section': false,
        'Enquiry Form': false,
        'Custom CSS/Custom JS': false,
        'Custom Sections': false
      },
      borderColor: '#055353'
    },
    {
      name: 'Gold',
      price: '$14.99',
      priceInTaka: '৳1,799',
      description: 'Perfect for small businesses looking to grow',
      popular: true,
      limits: {
        cards: '5',
        users: '10',
        storage: '5 GB',
        templates: '34',
        bioLinks: '3',
        bioTemplates: '14'
      },
      features: {
        'Full Custom Design NFC Card': true,
        'Unlimited Contact/Custom Fields': true,
        'Unlimited Social Media Links': true,
        '4 Gallery Images': true,
        'YouTube Videos': false,
        'Custom Card URL': true,
        '1 Theme Support (Total 8 Available)': false,
        'QR Code': true,
        'Product & Service Section': true,
        'Portfolio Section': false,
        'Testimonials Section': false,
        'Enquiry Form': false,
        'Custom CSS/Custom JS': false,
        'Custom Sections': false
      },
      borderColor: '#ff8901'
    },
    {
      name: 'Premium',
      price: '$49.99',
      priceInTaka: '৳5,999',
      description: 'Advanced features for growing teams',
      popular: false,
      limits: {
        cards: 'Unlimited',
        users: 'Unlimited',
        storage: '100 GB',
        templates: '34',
        bioLinks: 'Unlimited',
        bioTemplates: '14'
      },
      features: {
        'Full Custom Design NFC Card': true,
        'Unlimited Contact/Custom Fields': true,
        'Unlimited Social Media Links': true,
        '4 Gallery Images': true,
        'YouTube Videos': true,
        'Custom Card URL': true,
        '1 Theme Support (Total 8 Available)': true,
        'QR Code': true,
        'Product & Service Section': true,
        'Portfolio Section': true,
        'Testimonials Section': true,
        'Enquiry Form': true,
        'Custom CSS/Custom JS': true,
        'Custom Sections': true
      },
      borderColor: '#055353'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      


        {/* Pricing Plans */}
        <div className="mb-16">
          <div className="w-full text-center py-2 px-2 rounded-lg" style={{ backgroundColor: '#055353' }}>
            <h3 className="text-3xl font-bold text-gray-900 mb-0 text-white">Choose Your physical NFC Card</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 delay-300 opacity-100 translate-y-0 mt-12">
            {pricingPlans.map((plan, index) => (
              <div key={index} className="group relative h-full flex flex-col">
                {/* Background with decorative circles */}
                <div 
                  className="absolute inset-0 rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-xl overflow-hidden"
                  style={{ 
                    background: 'rgb(255, 255, 255)', 
                    border: `3px solid ${plan.borderColor}`
                  }}
                >
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-70"
                    style={{ background: 'transparent' }}
                  />
                  <div 
                    className="absolute bottom-0 left-0 w-24 h-24 rounded-full -ml-12 -mb-12 opacity-50"
                    style={{ background: 'transparent' }}
                  />
                </div>

                {/* Recommended Badge */}
                <div className="absolute top-0 left-0 right-0 flex justify-center z-20 w-full">
                  <div 
                    className="text-white px-4 py-2 rounded-t-2xl flex items-center gap-1.5 text-2xl font-bold w-full text-center justify-center"
                    style={{ backgroundColor: plan.borderColor }}
                  >
                    <Check size={20} />
                    {plan.name}
                  </div>
                </div>


                {/* Card Content */}
                <div 
                  className="relative z-10 flex flex-col h-full pl-6 pr-6 pt-12 pb-6 rounded-2xl flex-1"
                  style={{ 
                    background: 'rgb(255, 255, 255)', 
                    border: `3px solid ${plan.borderColor}`
                  }}
                >
                  {/* Plan Name and Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-extrabold text-[#055353]">{plan.priceInTaka}</span>
                      <span className="text-[#055353] text-base">/month</span>
                    </div>
                    {plan.originalPrice && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-500 line-through">{plan.originalPrice}</span>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: '#ff8901', color: 'white' }}>
                          Save ৳249
                        </span>
                      </div>
                    )}
                    <p className="text-sm text-[#055353] leading-relaxed line-clamp-2 mb-3">
                      {plan.description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="relative flex items-center">
                    <div className="flex-grow border-t border-gray-300" />
                    <div 
                      className="mx-3 p-1.5 rounded-full"
                      style={{ 
                        backgroundColor: '#055353', 
                        color: 'rgb(255, 255, 255)'
                      }}
                    >
                      <Check size={16} />
                    </div>
                    <div className="flex-grow border-t border-gray-300" />
                  </div>

                  {/* Features List */}
                  <div className="mb-6 flex-1">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[#055353] mb-3">
                      Features
                    </h4>
                    <ul className="space-y-2.5">
                      {Object.entries(plan.features).map(([feature, included], idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div 
                            className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ 
                              backgroundColor: included ? '#055353' : '#e5e7eb', 
                              color: included ? 'rgb(255, 255, 255)' : '#9ca3af'
                            }}
                          >
                            {included ? <Check size={14} /> : <X size={14} />}
                          </div>
                          <span className={`text-sm font-medium ${included ? 'text-[#055353]' : 'text-gray-400'}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="absolute bottom-0 left-0 right-0 w-full">
                    <Link
                      href="/checkout"
                      className="block w-full text-center py-3 px-6 rounded-b-2xl font-semibold transition-colors hover:opacity-90 text-white"
                      style={{ 
                        backgroundColor: plan.borderColor, 
                        color: 'white'
                      }}
                    >
                      Choose Plan
                      <ArrowRight size={16} className="inline-block ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      
      </div>
    </section>
  );
}
