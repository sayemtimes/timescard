import React from 'react';
import { Link } from '@inertiajs/react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FooterProps {
  brandColor?: string;
  settings: {
    company_name: string;
    contact_email: string;
    contact_phone: string;
    contact_address: string;
  };
  sectionData?: {
    description?: string;
    newsletter_title?: string;
    newsletter_subtitle?: string;
    links?: any;
    social_links?: Array<{
      name: string;
      icon: string;
      href: string;
    }>;
    section_titles?: {
      product: string;
      company: string;
      support: string;
      legal: string;
    };
  };
}

export default function Footer({ settings, sectionData = {}, brandColor = '#3b82f6' }: FooterProps) {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = sectionData.links || {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Templates', href: '#' },
      { name: 'Integrations', href: '#' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Contact', href: '#contact' }
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'Status', href: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'GDPR', href: '#' }
    ]
  };

  const iconMap: Record<string, any> = {
    Facebook,
    Twitter,
    Linkedin,
    Instagram
  };
  
  const socialLinks = sectionData.social_links || [
    { name: 'Facebook', icon: 'Facebook', href: '#' },
    { name: 'Twitter', icon: 'Twitter', href: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', href: '#' },
    { name: 'Instagram', icon: 'Instagram', href: '#' }
  ];

  return (
    <footer className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16">
          <div className="grid lg:grid-cols-6 gap-8 sm:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2" style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#ff8901', padding: '12px 15px', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Times NFC Card
              </div>
              <div style={{ backgroundColor: '#055353', padding: '15px', borderRadius: '0px' }}>
              <Link href="/" className="text-2xl font-bold footer-heading mb-6 block hover:text-white transition-colors bg-white p-2 rounded-lg text-[#055353]">
                {settings.company_name}
              </Link>
              <p className="footer-text mb-8 leading-relaxed bg-white p-2 rounded-lg text-[#055353]">
                {sectionData.description || t('Transforming professional networking with innovative digital business cards. Connect, share, and grow your network effortlessly.')}
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 bg-white p-1 rounded-lg text-[#055353]" />
                  <span className="footer-text text-sm bg-white p-2 rounded-lg text-[#055353]">{settings.contact_email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 bg-white p-1 rounded-lg text-[#055353]" />
                  <span className="footer-text text-sm bg-white p-2 rounded-lg text-[#055353]">{settings.contact_phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 bg-white p-1 rounded-lg text-[#055353]" />
                  <span className="footer-text text-sm bg-white p-2 rounded-lg text-[#055353]">{settings.contact_address}</span>
                </div>
              </div>
              </div>
            </div>

            {/* Product Links */}
            <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#ff8901', padding: '12px 15px', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Product
              </div>
              <div style={{ backgroundColor: '#055353', padding: '15px', borderRadius: '0px' }}>
              <h3 className="footer-heading font-semibold mb-4" style={{display: 'none'}}>{sectionData.section_titles?.product || 'Product'}</h3>
              <ul className="space-y-3">
                {(footerLinks.product || []).map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="footer-link transition-colors text-sm bg-white p-2 rounded-lg text-[#055353] block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              </div>
            </div>

            {/* Company Links */}
            <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#ff8901', padding: '12px 15px', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Company
              </div>
              <div style={{ backgroundColor: '#055353', padding: '15px', borderRadius: '0px' }}>
              <h3 className="footer-heading font-semibold mb-4" style={{display: 'none'}}>{sectionData.section_titles?.company || 'Company'}</h3>
              <ul className="space-y-3">
                {(footerLinks.company || []).map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="footer-link transition-colors text-sm bg-white p-2 rounded-lg text-[#055353] block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              </div>
            </div>

            {/* Support Links */}
            <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#ff8901', padding: '12px 15px', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Support
              </div>
              <div style={{ backgroundColor: '#055353', padding: '15px', borderRadius: '0px' }}>
              <h3 className="footer-heading font-semibold mb-4" style={{display: 'none'}}>{sectionData.section_titles?.support || 'Support'}</h3>
              <ul className="space-y-3">
                {(footerLinks.support || []).map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="footer-link transition-colors text-sm bg-white p-2 rounded-lg text-[#055353] block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              </div>
            </div>

            {/* Legal Links */}
            <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#ff8901', padding: '12px 15px', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Legal
              </div>
              <div style={{ backgroundColor: '#055353', padding: '15px', borderRadius: '0px' }}>
              <h3 className="footer-heading font-semibold mb-4" style={{display: 'none'}}>{sectionData.section_titles?.legal || t('Legal')}</h3>
              <ul className="space-y-3">
                {(footerLinks.legal || []).map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="footer-link transition-colors text-sm bg-white p-2 rounded-lg text-[#055353] block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        {(sectionData.newsletter_title || sectionData.newsletter_subtitle) && (
          <div className="border-t footer-border py-8 sm:py-12">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-xl font-bold footer-heading mb-4">
                {sectionData.newsletter_title || t('Stay Updated with Our Latest Features')}
              </h3>
              <p className="footer-text mb-6">
                {sectionData.newsletter_subtitle || t('Join our newsletter for product updates and networking tips')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={t('Enter your email')}
                  className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg text-[#055353] placeholder-[#055353] focus:ring-2 focus:ring-[#ff8901] focus:border-[#ff8901] disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button className="text-white px-6 py-3 rounded-lg transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[120px]" style={{ backgroundColor: brandColor }}>
                  {t('Subscribe')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Footer */}
        <div className="border-t footer-border py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            {/* Copyright */}
            <div className="footer-text text-sm">
              © {currentYear} {settings.company_name}. {t("All rights reserved.")}
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-4">
                <span className="footer-text text-sm">{t('Follow us:')}</span>
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const IconComponent = iconMap[social.icon] || Facebook;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-[#ff8901] transition-colors"
                        aria-label={social.name}
                      >
                        <IconComponent className="w-4 h-4 text-[#055353]" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}