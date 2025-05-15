"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, FileText, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
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
              <Shield className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">
                Your Privacy Matters
              </span>
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Learn how we collect, use, and protect your personal information
              when you visit or make a purchase on our website.
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
                    {
                      title: "Information We Collect",
                      href: "#information-collected",
                    },
                    {
                      title: "Use of Information",
                      href: "#use-of-information",
                    },
                    {
                      title: "Information Sharing",
                      href: "#information-sharing",
                    },
                    { title: "Data Security", href: "#data-security" },
                    { title: "Cookies", href: "#cookies" },
                    { title: "Changes to Policy", href: "#changes" },
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
                  At Noveena Furniture, we are committed to protecting the
                  privacy and security of our customers' personal information.
                  This Privacy Policy outlines how we collect, use, and
                  safeguard your information when you visit our website or make
                  a purchase from us. By using our website, you consent to the
                  practices described in this policy.
                </p>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                id="information-collected"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Information We Collect
                  </h2>
                </div>
                <p>
                  When you visit our website, we may collect certain information
                  about you, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Personal identification information</strong> (such
                    as your name, email address, and phone number) provided
                    voluntarily by you during the registration or checkout
                    process.
                  </li>
                  <li>
                    <strong>Payment and billing information</strong> necessary
                    to process your orders, including credit card details, which
                    are securely handled by trusted third-party payment
                    processors.
                  </li>
                  <li>
                    <strong>Shipping and delivery information</strong> required
                    to fulfill your purchase and deliver your furniture items.
                  </li>
                  <li>
                    <strong>Browsing information</strong>, such as your IP
                    address, browser type, and device information, collected
                    automatically using cookies and similar technologies.
                  </li>
                  <li>
                    <strong>Purchase history</strong> and preferences to improve
                    your shopping experience and provide better service.
                  </li>
                </ul>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                id="use-of-information"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Use of Information
                  </h2>
                </div>
                <p>
                  We may use the collected information for the following
                  purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    To process and fulfill your furniture orders, including
                    shipping and delivery.
                  </li>
                  <li>
                    To communicate with you regarding your purchases, provide
                    customer support, and respond to inquiries or requests.
                  </li>
                  <li>
                    To personalize your shopping experience and present relevant
                    furniture recommendations and promotions.
                  </li>
                  <li>
                    To improve our website, products, and services based on your
                    feedback and browsing patterns.
                  </li>
                  <li>
                    To send periodic emails about new furniture collections,
                    special offers, or other information we think you may find
                    interesting.
                  </li>
                  <li>
                    To detect and prevent fraud, unauthorized activities, and
                    abuse of our website.
                  </li>
                </ul>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                id="information-sharing"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Information Sharing
                  </h2>
                </div>
                <p>
                  We respect your privacy and do not sell, trade, or otherwise
                  transfer your personal information to third parties without
                  your consent, except in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Trusted service providers:</strong> We may share
                    your information with third-party service providers who
                    assist us in operating our website, processing payments, and
                    delivering furniture products. These providers are
                    contractually obligated to handle your data securely and
                    confidentially.
                  </li>
                  <li>
                    <strong>Delivery partners:</strong> We share necessary
                    information with our shipping and delivery partners to
                    ensure successful delivery of your furniture orders.
                  </li>
                  <li>
                    <strong>Legal requirements:</strong> We may disclose your
                    information if required to do so by law or in response to
                    valid legal requests or orders.
                  </li>
                </ul>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                id="data-security"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <Lock className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Data Security
                  </h2>
                </div>
                <p>
                  We implement industry-standard security measures to protect
                  your personal information from unauthorized access,
                  alteration, disclosure, or destruction. These measures
                  include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Secure Socket Layer (SSL) encryption for all transactions
                  </li>
                  <li>Regular security assessments and updates</li>
                  <li>Limited employee access to personal information</li>
                  <li>Secure storage and handling of customer data</li>
                </ul>
                <p className="mt-4">
                  However, please be aware that no method of transmission over
                  the internet or electronic storage is 100% secure, and we
                  cannot guarantee absolute security.
                </p>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                id="cookies"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Cookies and Tracking Technologies
                  </h2>
                </div>
                <p>
                  We use cookies and similar technologies to enhance your
                  browsing experience on our furniture website, analyze website
                  traffic, and gather information about your preferences and
                  interactions. These technologies help us:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Remember your preferences and settings</li>
                  <li>Understand how you navigate through our website</li>
                  <li>
                    Improve our furniture offerings based on your interests
                  </li>
                  <li>Provide personalized furniture recommendations</li>
                </ul>
                <p className="mt-4">
                  You have the option to disable cookies through your browser
                  settings, but this may limit certain features and
                  functionality of our website.
                </p>
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                id="changes"
                className="mb-10"
              >
                <div className="inline-flex items-center mb-2">
                  <FileText className="h-5 w-5 text-primary mr-2" />
                  <h2 className="font-playfair text-2xl font-bold">
                    Changes to the Privacy Policy
                  </h2>
                </div>
                <p>
                  We reserve the right to update or modify this Privacy Policy
                  at any time. Any changes will be posted on this page with a
                  revised "last updated" date. We encourage you to review this
                  Privacy Policy periodically to stay informed about how we
                  collect, use, and protect your information.
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
                  Privacy Policy or the handling of your personal information,
                  please contact us:
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
                  <Link href="/terms-and-conditions">
                    <Button variant="outline" className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Terms & Conditions
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
