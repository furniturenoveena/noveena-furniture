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
}

export function PaymentConfirmationModal({
  open,
  onOpenChange,
  onConfirmPayment,
  isSubmitting,
  total,
  advanceAmount,
  productName,
}: PaymentConfirmationModalProps) {
  const { toast } = useToast();
  const [paymentStep, setPaymentStep] = useState<
    "confirmation" | "processing" | "success"
  >("confirmation");

  const handleConfirm = () => {
    setPaymentStep("processing");

    // Simulate PayHere payment processing
    // In a real implementation, this would integrate with the PayHere API
    // https://support.payhere.lk/api-&-mobile-sdk/payhere-checkout
    setTimeout(() => {
      setPaymentStep("success");
      toast({
        title: "Payment Successful",
        description: `Your payment of Rs. ${advanceAmount.toLocaleString()} has been confirmed.`,
      });

      // After payment is successful, wait a bit then close modal and continue with order submission
      setTimeout(() => {
        onConfirmPayment();
      }, 1500);
    }, 2000);
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
                  * This is a temporary simulation as PayHere integration is
                  pending.
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
                className="flex-1  transition-all duration-300 hover:scale-[1.02] py-3 md:py-0 hover:bg-white hover:text-primary border border-transparent hover:border-primary"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Pay
              </Button>
            </>
          )}

          {paymentStep === "processing" && (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
