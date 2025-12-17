import React, { useState } from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import { ArrowLeft, Check, Lock, Smartphone, Wifi } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export default function Checkout() {
  const page = usePage();
  const auth = page.props.auth as any;
  const [selectedPlan, setSelectedPlan] = useState<string>('professional');
  const [paymentMethod, setPaymentMethod] = useState<string>('nagad');
  const [senderNumber, setSenderNumber] = useState<string>('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const plans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic NFC Card',
      price: 5.99,
      description: 'Perfect for getting started',
      features: [
        'Single NFC Card',
        'Contact Information',
        'Social Media Links',
        'Basic Analytics',
        'Email Support'
      ]
    },
    {
      id: 'professional',
      name: 'Professional Pack',
      price: 14.99,
      description: 'Most popular choice',
      features: [
        '5 NFC Cards',
        'Premium Card Design',
        'Advanced Analytics',
        'Priority Support',
        'Custom Branding',
        'Team Management'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Bundle',
      price: 49.99,
      description: 'For large organizations',
      features: [
        'Unlimited NFC Cards',
        'Custom Design Options',
        'Advanced Team Controls',
        'Full Analytics Dashboard',
        'API Access',
        '24/7 Dedicated Support'
      ]
    }
  ];

  const selectedPlanData = plans.find(p => p.id === selectedPlan);
  const brandColor = '#055353';

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Here you would integrate with your payment gateway
    // For now, we'll just show a success message
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Processing ${selectedPlanData?.name} payment...`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
        <Head title="NFC Card Checkout" />
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Plan Selection & Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
                <p className="text-gray-600">Select your preferred NFC card plan</p>
              </div>

              {/* Plan Selection */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Select Your Plan</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {plans.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedPlan === plan.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                        </div>
                        {selectedPlan === plan.id && (
                          <Check size={20} style={{ color: brandColor }} />
                        )}
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        ৳{(plan.price * 120).toFixed(0)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">one-time</div>
                    </button>
                  ))}
                </div>

                {/* Selected Plan Features */}
                {selectedPlanData && (
                  <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Included Features:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedPlanData.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check size={16} style={{ color: brandColor }} />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Billing Information */}
              <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Billing Information</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={auth?.user?.name || ''}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={auth?.user?.email || ''}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      placeholder="Street address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State/Province
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                <p className="text-gray-600 mb-6">Select your preferred mobile payment method and send money as instructed</p>
                
                <div className="space-y-4 mb-8">
                  {[
                    { id: 'nagad', label: 'Nagad', icon: '📱' },
                    { id: 'bkash', label: 'bKash', icon: '💳' },
                    { id: 'rocket', label: 'Rocket', icon: '🚀' }
                  ].map((method) => (
                    <label key={method.id} className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all">
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="ml-4 text-lg">{method.icon}</span>
                      <span className="ml-3 font-semibold text-gray-900">{method.label}</span>
                    </label>
                  ))}
                </div>

                {/* Payment Instructions */}
                {selectedPlanData && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                    <h3 className="font-bold text-gray-900 mb-4">💬 Payment Instructions</h3>
                    
                    {paymentMethod === 'nagad' && (
                      <div className="space-y-3 text-sm">
                        <p className="text-gray-700"><strong>Sender's Account Type:</strong> Any Nagad Account</p>
                        <p className="text-gray-700"><strong>Recipient's Number:</strong> <span className="font-mono bg-white px-2 py-1 rounded">01234567890</span></p>
                        <p className="text-gray-700"><strong>Amount to Send:</strong> <span className="font-bold text-lg text-blue-600">৳{(selectedPlanData.price * 1.1 * 120).toFixed(0)}</span></p>
                        <div className="bg-white p-3 rounded border-l-4 border-blue-500 mt-4">
                          <p className="text-gray-800"><strong>Steps:</strong></p>
                          <ol className="list-decimal list-inside mt-2 space-y-1 text-gray-700">
                            <li>Open Nagad app or dial *167#</li>
                            <li>Select "Send Money"</li>
                            <li>Enter recipient number: 01234567890</li>
                            <li>Enter amount: ৳{(selectedPlanData.price * 1.1 * 120).toFixed(0)}</li>
                            <li>Complete transaction and note your TxID</li>
                            <li>Share TxID with us for verification</li>
                          </ol>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'bkash' && (
                      <div className="space-y-3 text-sm">
                        <p className="text-gray-700"><strong>Sender's Account Type:</strong> Any bKash Account</p>
                        <p className="text-gray-700"><strong>Recipient's Number:</strong> <span className="font-mono bg-white px-2 py-1 rounded">01987654321</span></p>
                        <p className="text-gray-700"><strong>Amount to Send:</strong> <span className="font-bold text-lg text-pink-600">৳{(selectedPlanData.price * 1.1 * 120).toFixed(0)}</span></p>
                        <div className="bg-white p-3 rounded border-l-4 border-pink-500 mt-4">
                          <p className="text-gray-800"><strong>Steps:</strong></p>
                          <ol className="list-decimal list-inside mt-2 space-y-1 text-gray-700">
                            <li>Open bKash app or dial *247#</li>
                            <li>Choose "Send Money"</li>
                            <li>Enter recipient: 01987654321</li>
                            <li>Enter amount: ৳{(selectedPlanData.price * 1.1 * 120).toFixed(0)}</li>
                            <li>Enter your bKash PIN</li>
                            <li>Save your Reference Number and share with us</li>
                          </ol>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'rocket' && (
                      <div className="space-y-3 text-sm">
                        <p className="text-gray-700"><strong>Sender's Account Type:</strong> Any Rocket Account</p>
                        <p className="text-gray-700"><strong>Recipient's Number:</strong> <span className="font-mono bg-white px-2 py-1 rounded">01567890123</span></p>
                        <p className="text-gray-700"><strong>Amount to Send:</strong> <span className="font-bold text-lg text-green-600">৳{(selectedPlanData.price * 1.1 * 120).toFixed(0)}</span></p>
                        <div className="bg-white p-3 rounded border-l-4 border-green-500 mt-4">
                          <p className="text-gray-800"><strong>Steps:</strong></p>
                          <ol className="list-decimal list-inside mt-2 space-y-1 text-gray-700">
                            <li>Open Rocket app or dial *322#</li>
                            <li>Select "Send Money"</li>
                            <li>Enter recipient number: 01567890123</li>
                            <li>Enter amount: ৳{(selectedPlanData.price * 1.1 * 120).toFixed(0)}</li>
                            <li>Confirm and complete the transaction</li>
                            <li>Note your Transaction ID and share with us</li>
                          </ol>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-gray-800"><strong>⚠️ Important:</strong> After sending money, please screenshot the confirmation and send it to support@timescard.local with your TxID or Reference Number for verification.</p>
                    </div>

                    {/* Sender Number & Screenshot Upload */}
                    <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-900">Payment Verification Details</h4>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your {paymentMethod === 'nagad' ? 'Nagad' : paymentMethod === 'bkash' ? 'bKash' : 'Rocket'} Number
                        </label>
                        <input
                          type="tel"
                          value={senderNumber}
                          onChange={(e) => setSenderNumber(e.target.value)}
                          placeholder="01XXXXXXXXX"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">This is the number you sent money FROM</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Payment Confirmation Screenshot
                        </label>
                        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <div className="cursor-pointer">
                            {screenshot ? (
                              <div>
                                <p className="text-sm font-medium text-green-600">✓ {screenshot.name}</p>
                                <p className="text-xs text-gray-500 mt-1">{(screenshot.size / 1024 / 1024).toFixed(2)} MB</p>
                              </div>
                            ) : (
                              <div>
                                <Smartphone size={32} className="mx-auto text-gray-400 mb-2" />
                                <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                                <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Screenshot must show the transaction confirmation with amount and transaction ID</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-6 text-sm text-gray-600">
                  <Lock size={16} />
                  <span>Your transaction will be verified within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <div className="sticky top-8">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>

                  {selectedPlanData && (
                    <>
                      {/* Plan Details */}
                      <div className="mb-6 pb-6 border-b border-gray-200">
                        <div className="flex items-start gap-3 mb-4">
                          <Wifi size={24} style={{ color: brandColor }} />
                          <div>
                            <h4 className="font-semibold text-gray-900">{selectedPlanData.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{selectedPlanData.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            ৳{(selectedPlanData.price * 120).toFixed(0)}
                          </div>
                          <div className="text-xs text-gray-500">one-time payment</div>
                        </div>
                      </div>

                      {/* Pricing Breakdown */}
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium text-gray-900">৳{(selectedPlanData.price * 120).toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tax (10%)</span>
                          <span className="font-medium text-gray-900">৳{(selectedPlanData.price * 0.1 * 120).toFixed(0)}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-3 flex justify-between">
                          <span className="font-semibold text-gray-900">Total</span>
                          <span className="text-2xl font-bold text-gray-900">
                            ৳{(selectedPlanData.price * 1.1 * 120).toFixed(0)}
                          </span>
                        </div>
                      </div>

                      {/* Checkout Button */}
                      <button
                        onClick={handleCheckout}
                        disabled={isProcessing}
                        style={{ backgroundColor: brandColor }}
                        className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                      >
                        {isProcessing ? 'Processing...' : 'Complete Purchase'}
                      </button>

                      {/* Trust Badges */}
                      <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Lock size={14} />
                          <span>SSL Secured</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Check size={14} />
                          <span>30-Day Money Back Guarantee</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Smartphone size={14} />
                          <span>24/7 Customer Support</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* FAQ Section */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Common Questions</h4>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-900 mb-1">Can I upgrade later?</p>
                      <p className="text-gray-600">Yes, you can upgrade your plan anytime.</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">Is there a free trial?</p>
                      <p className="text-gray-600">We offer a 7-day free trial with all features.</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">Can I get a refund?</p>
                      <p className="text-gray-600">30-day money-back guarantee on all plans.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
