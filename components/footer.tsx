"use client"; // Add this directive to make it a client component

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function Footer() {
  const pathname = usePathname();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Don't render footer for admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="relative bg-gradient-to-b from-muted/30 to-muted/50 pt-20 border-t overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-24 -top-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute right-1/4 bottom-12 w-32 h-32 bg-primary/5 rounded-full blur-xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="absolute right-4 -top-10 bg-primary text-primary-foreground 
              rounded-full flex items-center justify-center w-10 h-10 shadow-lg
              transition-all duration-300 hover:scale-[1.02] 
              hover:bg-white hover:text-primary border border-transparent hover:border-primary"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/30">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Noveena Furniture Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="font-playfair text-xl font-bold text-primary">
                  NOVEENA
                </h2>
                <p className="text-xs uppercase tracking-widest font-montserrat text-muted-foreground">
                  Luxury Furniture
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Premium furniture store offering imported used and brand new
              pieces for discerning customers. Crafting comfort and elegance for
              your space since 2010.
            </p>

            <div className="flex space-x-4">
              {[
                {
                  icon: <Facebook className="h-5 w-5" />,
                  label: "Facebook",
                  href: "https://facebook.com",
                },
                {
                  icon: <Instagram className="h-5 w-5" />,
                  label: "Instagram",
                  href: "https://instagram.com",
                },
                {
                  icon: <Twitter className="h-5 w-5" />,
                  label: "Twitter",
                  href: "https://twitter.com",
                },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background hover:bg-primary/10 border border-border transition-colors 
                          duration-200 h-10 w-10 rounded-full flex items-center justify-center group"
                >
                  <span className="group-hover:text-primary">
                    {social.icon}
                  </span>
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-playfair text-xl font-bold mb-5 relative inline-block">
              Quick Links
              <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-primary/30"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Imported Used", href: "/category/imported-used" },
                { name: "Brand New", href: "/category/brand-new" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 
                              flex items-center group"
                  >
                    <span className="h-1 w-0 bg-primary mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="font-playfair text-xl font-bold mb-5 relative inline-block">
              Contact Us
              <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-primary/30"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <span className="bg-background p-2 rounded-full mr-3 border border-border group-hover:border-primary/50 transition-colors duration-200">
                  <MapPin className="h-4 w-4 text-primary/80" />
                </span>
                <span className="text-muted-foreground mt-1 text-sm">
                  337 Kaduwela Rd, <br />
                  Thalangama, Koswatta
                </span>
              </li>
              <li className="flex items-center group">
                <span className="bg-background p-2 rounded-full mr-3 border border-border group-hover:border-primary/50 transition-colors duration-200">
                  <Phone className="h-4 w-4 text-primary/80" />
                </span>
                <Link
                  href="tel:+94779134361"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                >
                  +94 77 913 4361
                </Link>
              </li>
              <li className="flex items-center group">
                <span className="bg-background p-2 rounded-full mr-3 border border-border group-hover:border-primary/50 transition-colors duration-200">
                  <Mail className="h-4 w-4 text-primary/80" />
                </span>
                <Link
                  href="mailto:info@noveena.lk"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                >
                  info@noveena.lk
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="font-playfair text-xl font-bold mb-5 relative inline-block">
              Newsletter
              <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-primary/30"></span>
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Subscribe to our newsletter for the latest updates and exclusive
              offers.
            </p>
            <div className="relative">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-background pr-12 border-primary/20 focus-visible:ring-primary/50"
              />
              <Button
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-md"
                aria-label="Subscribe to newsletter"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              By subscribing you agree to our{" "}
              <Link href="#" className="underline hover:text-primary">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border/50 mt-12 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Noveena Furniture. All rights
              reserved.
              <span className="hidden md:inline md:ml-2">
                Crafting Comfort Since 2010.
              </span>
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 md:mt-0 justify-center">
              {[
                { name: "Privacy Policy", href: "#" },
                { name: "Terms of Service", href: "#" },
                { name: "Shipping Policy", href: "#" },
                { name: "Returns & Warranty", href: "#" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm text-muted-foreground hover:text-primary transition-colors relative group",
                    "after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-primary",
                    "after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground font-light tracking-wider">
              <span className="font-semibold">NOVEENA FURNITURE</span> - Premium
              Quality • Exceptional Comfort • Timeless Designs
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
