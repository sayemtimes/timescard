import { useForm, router, usePage } from '@inertiajs/react';
import { Mail, Lock } from 'lucide-react';
import { FormEventHandler, useState, useEffect } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import AuthLayout from '@/layouts/auth-layout';
import AuthButton from '@/components/auth/auth-button';
import Recaptcha, { isRecaptchaVerified, getRecaptchaResponse, executeRecaptcha } from '@/components/recaptcha';
import { useBrand } from '@/contexts/BrandContext';
import { THEME_COLORS } from '@/hooks/use-appearance';
import { Button } from '@/components/ui/button';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
    recaptcha_token?: string;
};

interface Business {
    id: number;
    name: string;
    slug: string;
    business_type: string;
}

interface BioLink {
    id: number;
    name: string;
    slug: string;
    link_type: string;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    demoBusinesses?: Business[];
    demoBioLinks?: BioLink[];
}

export default function Login({ status, canResetPassword, demoBusinesses = [], demoBioLinks = [] }: LoginProps) {
    const { t } = useTranslation();
    const [recaptchaToken, setRecaptchaToken] = useState<string>('');
    const { themeColor, customColor } = useBrand();
    const { settings = {} } = usePage().props as any;
    const recaptchaEnabled = settings.recaptchaEnabled === 'true' || settings.recaptchaEnabled === true || settings.recaptchaEnabled === 1 || settings.recaptchaEnabled === '1';
    const recaptchaVersion = settings.recaptchaVersion || 'v2';
    const primaryColor = themeColor === 'custom' ? customColor : THEME_COLORS[themeColor as keyof typeof THEME_COLORS];
    const [isDemo, setIsDemo] = useState<boolean>(false);
    // Always show business buttons by default
    const [showBusinessButtons, setShowBusinessButtons] = useState<boolean>(true);
    
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });
    
    useEffect(() => {
        // Check if demo mode is enabled
        const isDemoMode = (window as any).isDemo === true;
        setIsDemo(isDemoMode);
        
        // Set default credentials if in demo mode
        if (isDemoMode) {
            setData({
                email: 'company@example.com',
                password: 'password',
                remember: false
            });
        }
    }, []);

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        
        if (recaptchaEnabled) {
            try {
                const token = await executeRecaptcha();
                if (!token) {
                    alert(t('Please complete the reCAPTCHA verification'));
                    return;
                }
                const formData = { ...data, recaptcha_token: token };
                post(route('login'), formData, {
                    onFinish: () => reset('password'),
                });
                return;
            } catch {
                alert(t('reCAPTCHA verification failed. Please try again.'));
                return;
            }
        }
        
        const formData = { ...data, recaptcha_token: recaptchaToken };
        post(route('login'), formData, {
            onFinish: () => reset('password'),
        });
    };
    
    // No longer needed as we're using router.post directly in the button handlers
    
    const openBusinessInNewTab = (businessId: number, slug: string, e: React.MouseEvent) => {
        // Prevent the default form submission
        e.preventDefault();
        e.stopPropagation();
        
        // Use the same URL structure as in vcard-builder/index.tsx
        const url = route('public.vcard.show.direct', slug);
        window.open(url, '_blank');
    };

    return (
        <AuthLayout
            title={t("Log in to your account")}
            description={t("Enter your credentials to access your account")}
            status={status}
        >
            <form className="space-y-5" onSubmit={submit}>
                <div className="space-y-4">
                    <div className="relative">
                        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium mb-1 block">{t("Email address")}</Label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                                className="pl-10 w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg transition-all duration-200"
                                style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                            />
                        </div>
                        <InputError message={errors.email} />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-medium">{t("Password")}</Label>
                            {canResetPassword && (
                                <TextLink 
                                    href={route('password.request')} 
                                    className="text-sm transition-colors duration-200" 
                                    style={{ color: primaryColor }}
                                    tabIndex={5}
                                >
                                    {t("Forgot password?")}
                                </TextLink>
                            )}
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                className="pl-10 w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg transition-all duration-200"
                                style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                            />
                        </div>
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                            className="border-gray-300 rounded"
                            style={{ '--tw-ring-color': primaryColor, color: primaryColor } as React.CSSProperties}
                        />
                        <Label htmlFor="remember" className="ml-2 text-gray-600 dark:text-gray-400">{t("Remember me")}</Label>
                    </div>
                </div>

                {recaptchaEnabled && (
                    <Recaptcha 
                        onVerify={setRecaptchaToken}
                        onExpired={() => setRecaptchaToken('')}
                        onError={() => setRecaptchaToken('')}
                    />
                )}

                <AuthButton 
                    tabIndex={4} 
                    processing={processing}
                >
                    {t("Log in")}
                </AuthButton>
                
                {isDemo && (
                    <div className="mt-6">
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-5">
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 text-center">{t('Demo Quick Access')}</h3>
                            
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Button 
                                        type="button" 
                                        onClick={async () => {
                                            if (recaptchaEnabled) {
                                                try {
                                                    const token = await executeRecaptcha();
                                                    if (!token) {
                                                        alert(t('Please complete the reCAPTCHA verification'));
                                                        return;
                                                    }
                                                    router.post(route('login'), {
                                                        email: 'superadmin@example.com',
                                                        password: 'password',
                                                        remember: false,
                                                        recaptcha_token: token
                                                    });
                                                } catch {
                                                    alert(t('reCAPTCHA verification failed. Please try again.'));
                                                }
                                            } else {
                                                router.post(route('login'), {
                                                    email: 'superadmin@example.com',
                                                    password: 'password',
                                                    remember: false,
                                                    recaptcha_token: recaptchaToken
                                                });
                                            }
                                        }}
                                        className="shadow-sm text-white px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 w-full sm:w-auto"
                                        style={{ backgroundColor: primaryColor }}
                                    >
                                       {t(' Login as Super Admin')}
                                    </Button>
                                    <Button 
                                        type="button" 
                                        onClick={async () => {
                                            if (recaptchaEnabled) {
                                                try {
                                                    const token = await executeRecaptcha();
                                                    if (!token) {
                                                        alert(t('Please complete the reCAPTCHA verification'));
                                                        return;
                                                    }
                                                    router.post(route('login'), {
                                                        email: 'company@example.com',
                                                        password: 'password',
                                                        remember: false,
                                                        recaptcha_token: token
                                                    });
                                                } catch {
                                                    alert(t('reCAPTCHA verification failed. Please try again.'));
                                                }
                                            } else {
                                                router.post(route('login'), {
                                                    email: 'company@example.com',
                                                    password: 'password',
                                                    remember: false,
                                                    recaptcha_token: recaptchaToken
                                                });
                                            }
                                        }}
                                        className="bg-emerald-600 hover:bg-emerald-700 shadow-sm text-white px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 w-full sm:w-auto"
                                    >
                                        {t('Login as Company')}
                                    </Button>
                                </div>
                                
                                {
                                    <div className="mt-3">
                                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 text-center">{t('Business Cards')}</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {(demoBusinesses && demoBusinesses.length > 0 ? demoBusinesses : [
                                                { id: 1, name: "Restaurant", slug: "restaurant-demo", business_type: "restaurant" },
                                                { id: 2, name: "Portfolio", slug: "portfolio-demo", business_type: "personal" },
                                                { id: 3, name: "Agency", slug: "agency-demo", business_type: "professional" },
                                                { id: 4, name: "E-commerce", slug: "ecommerce-demo", business_type: "retail" },
                                                { id: 5, name: "Fitness", slug: "fitness-demo", business_type: "service" },
                                                { id: 6, name: "Medical", slug: "medical-demo", business_type: "professional" },
                                                { id: 7, name: "Education", slug: "education-demo", business_type: "service" },
                                                { id: 8, name: "Travel", slug: "travel-demo", business_type: "service" },
                                                { id: 9, name: "Real Estate", slug: "realestate-demo", business_type: "professional" },
                                                { id: 10, name: "Photography", slug: "photography-demo", business_type: "personal" }
                                            ]).map((business) => (
                                                <Button 
                                                    key={business.id}
                                                    onClick={(e) => openBusinessInNewTab(business.id, business.slug, e)}
                                                    className="text-xs sm:text-sm py-1 px-1 transition-all duration-200 truncate"
                                                    style={{ backgroundColor: primaryColor + '15', color: primaryColor }}
                                                >
                                                    {business.business_type
                                                        .split('_')
                                                        .join(' ')
                                                        .replace(/\b\w/g, char => char.toUpperCase())}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                }

                                {
                                    <div className="mt-3">
                                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 text-center">{t('Bio Links')}</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {(demoBioLinks && demoBioLinks.length > 0 ? demoBioLinks : []).map((bioLinks) => (
                                                <Button 
                                                    key={bioLinks.id}
                                                    onClick={(e) => openBusinessInNewTab(bioLinks.id, bioLinks.slug, e)}
                                                    className="text-xs sm:text-sm py-1 px-1 transition-all duration-200 truncate"
                                                    style={{ backgroundColor: primaryColor + '15', color: primaryColor }}
                                                >
                                                    {bioLinks.link_type
                                                        .split('_')
                                                        .join(' ')
                                                        .replace(/\b\w/g, char => char.toUpperCase())}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                )}

                {(settings.registrationEnabled === 'true' || settings.registrationEnabled === true || settings.registrationEnabled === '1' || settings.registrationEnabled === 1) && (
                    <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                        {t("Don't have an account?")}{' '}
                        <TextLink 
                            href={route('register')} 
                            className="font-medium transition-colors duration-200" 
                            style={{ color: primaryColor }}
                            tabIndex={6}
                        >
                            {t("Sign up")}
                        </TextLink>
                    </div>
                )}
            </form>
        </AuthLayout>
    );
}