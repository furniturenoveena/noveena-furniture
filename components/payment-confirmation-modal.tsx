"use client";

import { useState } from "react";
import { Check, Loader2, CreditCard } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PaymentConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmPayment: () => void;
  isSubmitting: boolean;
  total: number;
  advanceAmount: number;
  productName: string;
  orderData: {
    firstName: string;
    lastName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    province: string;
    productId: string;
    productName: string;
    productPrice: number;
    quantity: number;
    colorValue?: string;
    colorName?: string;
    productImage?: string;
    productCategory?: string;
  };
}

export function PaymentConfirmationModal({
  open,
  onOpenChange,
  onConfirmPayment,
  isSubmitting,
  total,
  advanceAmount,
  productName,
  orderData,
}: PaymentConfirmationModalProps) {
  const { toast } = useToast();
  const [paymentStep, setPaymentStep] = useState<
    "confirmation" | "processing" | "success"
  >("confirmation");

  const handleConfirm = async () => {
    try {
      setPaymentStep("processing");

      // First create the order in the database
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...orderData,
          total,
          paymentMethod: "PAYHERE",
          amountPaid: 0, // Will be updated after successful payment
          paymentDate: null, // Will be updated after successful payment
        }),
      });

      const orderResult = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderResult.error || "Failed to create order");
      }

      // Initialize PayHere payment with the order ID
      const response = await fetch("/api/payhere", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderResult.orderId, // Use the actual order ID from database
          amount: advanceAmount,
          firstName: orderData.firstName,
          lastName: orderData.lastName,
          email: "", // You might want to add email field to your form
          phone: orderData.phone,
          address: `${orderData.addressLine1}${orderData.addressLine2 ? `, ${orderData.addressLine2}` : ""}`,
          city: orderData.city,
          items: `${orderData.productName} (${orderData.quantity}x)`,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to initialize payment");
      }

      // Create a form and submit it to PayHere
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.checkoutUrl;

      // Add form fields
      Object.entries(data.formData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      });

      // Add form to document and submit
      document.body.appendChild(form);
      form.submit();
    } catch (error: any) {
      console.error("Payment initialization error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
      setPaymentStep("confirmation");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {paymentStep === "confirmation" && "Confirm Payment"}
            {paymentStep === "processing" && "Processing Payment"}
            {paymentStep === "success" && "Payment Successful"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {paymentStep === "confirmation" &&
              "Please confirm your payment details below."}
            {paymentStep === "processing" &&
              "Please wait while we process your payment..."}
            {paymentStep === "success" &&
              "Your payment has been processed successfully!"}
          </DialogDescription>
        </DialogHeader>

        {paymentStep === "confirmation" && (
          <div className="space-y-4 py-4">
            <Card className="p-4 bg-muted/30">
              <h3 className="font-medium mb-2">{productName}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Total Amount:</p>
                  <p className="font-medium">Rs. {total.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Advance Payment:</p>
                  <p className="font-medium">
                    Rs. {advanceAmount.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                <p>
                  * You will be redirected to the PayHere payment gateway to
                  complete your payment.
                </p>
                <p>
                  * Your order will be confirmed once the payment is successful.
                </p>
              </div>
            </Card>
          </div>
        )}

        {paymentStep === "processing" && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-sm text-muted-foreground">
              Processing your payment...
            </p>
          </div>
        )}

        {paymentStep === "success" && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600 dark:text-green-500" />
            </div>
            <p className="text-sm text-muted-foreground">
              Your advance payment of Rs. {advanceAmount.toLocaleString()} has
              been confirmed.
            </p>
          </div>
        )}

        <DialogFooter className="flex items-center">
          {paymentStep === "confirmation" && (
            <>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                className="flex-1 transition-all duration-300 hover:scale-[1.02] py-3 md:py-0 hover:bg-white hover:text-primary border border-transparent hover:border-primary"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Pay
              </Button>
            </>
          )}

          {paymentStep === "processing" && (
            <Button disabled className="w-full">
              Processing...
            </Button>
          )}

          {paymentStep === "success" && (
            <Button disabled className="w-full opacity-50">
              <Check className="mr-2 h-4 w-4" />
              Payment Confirmed
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
