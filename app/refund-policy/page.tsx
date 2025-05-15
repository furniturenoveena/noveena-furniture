"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  RefreshCw,
  CircleDollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function RefundPolicyPage() {
  const [mounted, setMounted] = useState(false);

  // Set mounted state after component mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-muted/30 py-20 overflow-hidden border-b">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -left-1/4 top-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -right-1/4 bottom-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
              <RefreshCw className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">
                Customer Satisfaction Guaranteed
              </span>
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Refund Policy
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Learn about our return process, refund procedures, and how we
              ensure your satisfaction with every purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-3">
              <div className="sticky top-24 bg-card rounded-xl border p-6 shadow-sm">
                <h3 className="font-playfair text-xl font-bold mb-4">
                  Contents
                </h3>
                <nav className="space-y-1">
                  {[
                    { title: "Introduction", href: "#introduction" },
                    { title: "Return Policy", href: "#return-policy" },
                    { title: "Return Process", href: "#return-process" },
                    { title: "Refund Process", href: "#refund-process" },
                    {
                      title: "Non-Returnable Items",
                      href: "#non-returnable-items",
                    },
                    { title: "Damaged Items", href: "#damaged-items" },
                    { title: "Return Shipping", href: "#return-shipping" },
                    { title: "Contact Us", href: "#contact" },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-center py-2 px-3 rounded-lg text-sm transition-colors hover:bg-muted/50 hover:text-primary"
                    >
                      <ArrowRight className="h-3.5 w-3.5 mr-2 opacity-70" />
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <motion.div
              className="lg:col-span-9 prose prose-slate max-w-none"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.div
                variants={itemVariants}
                id="introduction"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Introduction
                  </h2>
                </div>
                <p>
                  Thank you for shopping at Noveena Furniture. We value your
                  satisfaction and strive to provide you with the best furniture
                  shopping experience possible. We understand that sometimes a
                  product may not meet your expectations or match your
                  requirements. This Refund Policy outlines our procedures for
                  returns, exchanges, and refunds.
                </p>
                <p>
                  Please read this policy carefully to understand your rights
                  and obligations when requesting a return or refund. If you
                  have any questions, our customer service team is always ready
                  to assist you.
                </p>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                id="return-policy"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Return Policy
                  </h2>
                </div>
                <p>
                  At Noveena Furniture, we offer a{" "}
                  <strong>7-day return policy</strong> from the date of
                  delivery. This means you can return your furniture items
                  within 7 days after they have been delivered to you if you are
                  not completely satisfied with your purchase.
                </p>
                <p>To be eligible for a return, your item must be:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>In the same condition that you received it</li>
                  <li>Unused and unassembled</li>
                  <li>In the original packaging</li>
                  <li>Free from any signs of wear, damage, or soiling</li>
                  <li>
                    Accompanied by the original receipt or proof of purchase
                  </li>
                </ul>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                id="return-process"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Return Process
                  </h2>
                </div>
                <p>If you wish to return an item, please follow these steps:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    <strong>Contact Us:</strong> Begin the return process by
                    contacting our customer service team via email at
                    info@noveena.lk or by phone at +94 77 913 4361. Please
                    provide your order number, the items you wish to return, and
                    the reason for the return.
                  </li>
                  <li>
                    <strong>Receive Return Authorization:</strong> Our team will
                    review your request and provide you with a Return
                    Authorization Number (RAN) and return instructions if your
                    return is approved.
                  </li>
                  <li>
                    <strong>Package the Item:</strong> Carefully pack the
                    furniture item in its original packaging along with all
                    included accessories, documentation, and the RAN clearly
                    marked on the outside of the package.
                  </li>
                  <li>
                    <strong>Return Shipping:</strong> For most items, you will
                    be responsible for arranging and paying for the return
                    shipping. For large furniture pieces, we may arrange pickup
                    at an additional cost.
                  </li>
                  <li>
                    <strong>Inspection:</strong> Once we receive your returned
                    item, our team will inspect it to ensure it meets our return
                    conditions.
                  </li>
                  <li>
                    <strong>Refund Processing:</strong> After successful
                    inspection, your refund will be processed as detailed in our
                    Refund Process section below.
                  </li>
                </ol>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                id="refund-process"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <CircleDollarSign className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Refund Process
                  </h2>
                </div>
                <p>
                  Once your return has been received and inspected, we will
                  process your refund according to these guidelines:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Refund Timing:</strong> Refunds will be processed
                    within <strong>2 business days</strong> after your returned
                    item has been received and inspected at our shop.
                  </li>
                  <li>
                    <strong>Refund Method:</strong> Your refund will be issued
                    to the original payment method used for the purchase.
                  </li>
                  <li>
                    <strong>Refund Amount:</strong> The refund will include the
                    full purchase price of the returned item(s). Shipping
                    charges are non-refundable unless the return is due to our
                    error (e.g., you received a damaged or incorrect item).
                  </li>
                  <li>
                    <strong>Processing Time:</strong> Please note that it may
                    take an additional 3-7 business days for the refund to
                    appear in your account, depending on your payment provider's
                    processing times.
                  </li>
                </ul>

                <div className="bg-primary/5 p-6 rounded-xl mt-6 border border-primary/20">
                  <h3 className="text-lg font-semibold font-playfair mb-2">
                    Refund Notification
                  </h3>
                  <p className="mb-0">
                    Once your refund has been processed, we will send you an
                    email notification with the details of your refund. If you
                    haven't received a refund after the expected timeframe,
                    please check your bank account again, then contact your
                    credit card company or bank, as there might be some
                    processing time before the refund is officially posted.
                  </p>
                </div>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                id="non-returnable-items"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Non-Returnable Items
                  </h2>
                </div>
                <p>
                  Certain items cannot be returned or exchanged. These include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Custom-made furniture</strong> that has been
                    manufactured to your specifications.
                  </li>
                  <li>
                    <strong>Clearance items or final sale items</strong> that
                    were marked as non-returnable at the time of purchase.
                  </li>
                  <li>
                    <strong>Furniture that has been assembled</strong> or shows
                    signs of use beyond inspection.
                  </li>
                  <li>
                    <strong>Items with removed tags</strong> or without original
                    packaging.
                  </li>
                  <li>
                    <strong>Mattresses and bedding</strong> that have been
                    unpacked or used due to hygiene reasons.
                  </li>
                </ul>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                id="damaged-items"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Damaged or Defective Items
                  </h2>
                </div>
                <p>
                  If you receive furniture that is damaged or defective, please
                  follow these steps:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Inspect Upon Delivery:</strong> Inspect all
                    furniture items at the time of delivery and note any damage
                    on the delivery receipt.
                  </li>
                  <li>
                    <strong>Document the Damage:</strong> Take clear photographs
                    of the damaged or defective areas.
                  </li>
                  <li>
                    <strong>Report Promptly:</strong> Contact us within 48 hours
                    of delivery to report the damage.
                  </li>
                  <li>
                    <strong>Resolution:</strong> Depending on the nature and
                    extent of the damage, we will offer a repair, replacement,
                    or refund at our discretion.
                  </li>
                </ul>
                <p className="mt-4">
                  For damaged items, we will cover the cost of return shipping
                  and ensure that a replacement is sent to you as quickly as
                  possible, or provide a full refund if preferred.
                </p>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                id="return-shipping"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Return Shipping
                  </h2>
                </div>
                <p>For standard returns:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    You will be responsible for paying the shipping costs for
                    returning your item.
                  </li>
                  <li>
                    Return shipping costs are non-refundable unless the return
                    is due to our error.
                  </li>
                  <li>
                    For large furniture items, we may arrange pickup at an
                    additional cost that will be deducted from your refund
                    amount.
                  </li>
                  <li>
                    We recommend using a trackable shipping service or
                    purchasing shipping insurance for returns, as we cannot
                    guarantee that we will receive your returned item.
                  </li>
                </ul>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                id="contact"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Contact Us
                  </h2>
                </div>
                <p>
                  If you have any questions or concerns regarding our Refund
                  Policy, please contact our customer service team:
                </p>
                <div className="bg-muted/30 p-6 rounded-xl mt-4">
                  <p>
                    <strong>Address:</strong> 337 Kaduwela Rd, Thalangama,
                    Koswatta
                  </p>
                  <p>
                    <strong>Phone:</strong> +94 77 913 4361
                  </p>
                  <p>
                    <strong>Email:</strong> info@noveena.lk
                  </p>
                </div>
              </motion.div>

              <div className="mt-12 border-t border-border pt-8">
                <p className="text-sm text-muted-foreground">
                  Last Updated: May 14, 2025
                </p>
                <div className="flex space-x-4 mt-6">
                  <Link href="/privacy-policy">
                    <Button variant="outline" className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Privacy Policy
                    </Button>
                  </Link>
                  <Link href="/terms-and-conditions">
                    <Button variant="outline" className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Terms & Conditions
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
