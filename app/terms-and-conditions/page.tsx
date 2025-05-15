"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Scale, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function TermsAndConditionsPage() {
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
              <Scale className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">
                Our Agreement
              </span>
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Terms and Conditions
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Please read these terms and conditions carefully before using our
              website or making a purchase.
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
                    { title: "Use of Website", href: "#use-of-website" },
                    {
                      title: "Product Information",
                      href: "#product-information",
                    },
                    {
                      title: "Orders & Payments",
                      href: "#orders-and-payments",
                    },
                    {
                      title: "Shipping & Delivery",
                      href: "#shipping-and-delivery",
                    },
                    {
                      title: "Returns & Refunds",
                      href: "#returns-and-refunds",
                    },
                    {
                      title: "Intellectual Property",
                      href: "#intellectual-property",
                    },
                    {
                      title: "Limitation of Liability",
                      href: "#limitation-of-liability",
                    },
                    { title: "Amendments", href: "#amendments" },
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
                  Welcome to Noveena Furniture. These Terms and Conditions
                  govern your use of our website (www.noveena.lk) and the
                  purchase and sale of furniture products from our platform. By
                  accessing and using our website, you agree to comply with
                  these terms. Please read them carefully before proceeding with
                  any transactions.
                </p>
                <p>
                  These terms constitute a legally binding agreement between
                  you, the user, and Noveena Furniture. If you do not agree with
                  any part of these terms, please refrain from using our website
                  or making purchases from us.
                </p>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                id="use-of-website"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Use of the Website
                  </h2>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    You must be at least 18 years old to use our website or make
                    furniture purchases.
                  </li>
                  <li>
                    You are responsible for maintaining the confidentiality of
                    your account information, including your username and
                    password.
                  </li>
                  <li>
                    You agree to provide accurate and current information during
                    the registration and checkout process.
                  </li>
                  <li>
                    You may not use our website for any unlawful or unauthorized
                    purposes, including but not limited to violating any
                    applicable local, state, national, or international laws.
                  </li>
                  <li>
                    We reserve the right to refuse service, terminate accounts,
                    or cancel orders at our discretion if we suspect any
                    violation of these terms.
                  </li>
                </ul>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                id="product-information"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Product Information and Pricing
                  </h2>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    We strive to provide accurate furniture product
                    descriptions, images, dimensions, materials, and pricing
                    information. However, we do not guarantee the absolute
                    accuracy or completeness of such information.
                  </li>
                  <li>
                    Slight variations in color, grain patterns, and texture may
                    occur in actual furniture products compared to images
                    displayed on our website due to lighting conditions, screen
                    settings, and natural variations in materials like wood and
                    leather.
                  </li>
                  <li>
                    Prices are subject to change without notice. Any promotions
                    or discounts are valid for a limited time and may be subject
                    to additional terms and conditions.
                  </li>
                  <li>
                    In the case of a pricing error or discrepancy, we reserve
                    the right to correct the price and inform you before
                    processing your order. You will have the option to cancel
                    your order if you do not wish to proceed with the corrected
                    price.
                  </li>
                </ul>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                id="orders-and-payments"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Orders and Payments
                  </h2>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    By placing an order on our website, you are making an offer
                    to purchase the selected furniture products.
                  </li>
                  <li>
                    We reserve the right to refuse or cancel any order for any
                    reason, including but not limited to product availability,
                    errors in pricing or product information, or suspected
                    fraudulent activity.
                  </li>
                  <li>
                    You agree to provide valid and up-to-date payment
                    information and authorize us to charge the total order
                    amount, including applicable taxes and shipping fees, to
                    your chosen payment method.
                  </li>
                  <li>
                    We accept various payment methods, including credit/debit
                    cards and bank transfers. All payments are processed
                    securely by trusted third-party payment processors.
                  </li>
                  <li>
                    For certain furniture items, especially custom-made or
                    imported pieces, we may require a deposit or full payment in
                    advance.
                  </li>
                </ul>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                id="shipping-and-delivery"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Shipping and Delivery
                  </h2>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    We will make reasonable efforts to ensure timely shipping
                    and delivery of your furniture orders.
                  </li>
                  <li>
                    Shipping and delivery times provided are estimates and may
                    vary based on your location, product availability, and other
                    factors. For imported furniture items, delivery times may be
                    longer.
                  </li>
                  <li>
                    You or your representative must be present at the delivery
                    address to inspect and accept the furniture items upon
                    delivery.
                  </li>
                  <li>
                    If your furniture items appear damaged upon delivery, please
                    note this on the delivery receipt and contact us
                    immediately.
                  </li>
                  <li>
                    Delivery charges are calculated based on location, size, and
                    weight of the furniture items, and will be clearly displayed
                    during the checkout process.
                  </li>
                </ul>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                id="returns-and-refunds"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Returns and Refunds
                  </h2>
                </div>
                <p>
                  Our Returns and Refund Policy governs the process and
                  conditions for returning furniture products and seeking
                  refunds. Key points include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    You may return furniture items within 7 days after delivery
                    if you are not satisfied with your purchase.
                  </li>
                  <li>
                    Returned items must be in original condition, unused, and
                    with all original packaging and documentation.
                  </li>
                  <li>
                    Some items, such as custom-made furniture or clearance
                    items, may not be eligible for return unless they are
                    defective.
                  </li>
                  <li>
                    Please refer to our detailed{" "}
                    <Link
                      href="/refund-policy"
                      className="text-primary hover:underline"
                    >
                      Refund Policy
                    </Link>{" "}
                    for complete information.
                  </li>
                </ul>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                id="intellectual-property"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Intellectual Property
                  </h2>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    All content and materials on our website, including but not
                    limited to furniture images, logos, text, graphics, and
                    design, are protected by intellectual property rights and
                    are the property of Noveena Furniture or its licensors.
                  </li>
                  <li>
                    You may not use, reproduce, distribute, or modify any
                    content from our website without our prior written consent.
                  </li>
                  <li>
                    Any unauthorized use of our intellectual property may result
                    in legal action.
                  </li>
                </ul>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                id="limitation-of-liability"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Limitation of Liability
                  </h2>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    In no event shall Noveena Furniture, its directors,
                    employees, or affiliates be liable for any direct, indirect,
                    incidental, special, or consequential damages arising out of
                    or in connection with your use of our website or the
                    purchase and use of our furniture products.
                  </li>
                  <li>
                    Our total liability for any claim arising from or related to
                    our products or services shall not exceed the total amount
                    paid by you for the purchase giving rise to such claim.
                  </li>
                  <li>
                    We make no warranties or representations, express or
                    implied, regarding the durability, fitness for purpose, or
                    suitability of the furniture products offered on our website
                    beyond those provided in the product descriptions.
                  </li>
                  <li>
                    These limitations of liability do not affect your statutory
                    rights as a consumer.
                  </li>
                </ul>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                id="amendments"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Amendments and Termination
                  </h2>
                </div>
                <p>
                  We reserve the right to modify, update, or terminate these
                  Terms and Conditions at any time without prior notice. Any
                  changes will be effective immediately upon posting on this
                  page. It is your responsibility to review these terms
                  periodically for any changes. Your continued use of our
                  website after any modifications indicates your acceptance of
                  the revised terms.
                </p>
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
                  If you have any questions, concerns, or requests regarding our
                  Terms and Conditions, please contact us:
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
                  <Link href="/refund-policy">
                    <Button variant="outline" className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Refund Policy
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
