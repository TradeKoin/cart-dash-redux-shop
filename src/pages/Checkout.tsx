
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const stripePromise = loadStripe('pk_test_51234567890abcdef'); // You'll need to replace this with your Stripe publishable key

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, you'd call your backend here to create a Stripe session
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Checkout Demo",
        description: "This is a demo checkout. In a real app, you'd be redirected to Stripe.",
      });
      
      // Simulate opening Stripe checkout
      console.log('Would redirect to Stripe checkout with session URL');
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initialize checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5" />
                <span>Premium Package</span>
              </CardTitle>
              <CardDescription>
                Everything you need to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Access to all premium features</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>24/7 customer support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Lifetime updates</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Premium Package</span>
                  <span className="font-semibold">$29.99</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tax</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <hr />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>$29.99</span>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full mt-6"
                  size="lg"
                >
                  {isLoading ? 'Processing...' : 'Pay with Stripe'}
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  Secure payment powered by Stripe. Your payment information is encrypted and secure.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
