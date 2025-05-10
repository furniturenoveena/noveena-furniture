"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  submenu?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
    submenu: [
      {
        title: "All Products",
        href: "/admin/products",
        icon: Package,
      },
      {
        title: "Add New Product",
        href: "/admin/products/new",
        icon: Package,
      },
    ],
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Package,
    submenu: [
      {
        title: "Categories",
        href: "/admin/categories",
        icon: Package,
      },
      {
        title: "Add New Category",
        href: "/admin/categories/new",
        icon: Package,
      },
    ],
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // If not on admin login page, check if user is logged in
  useEffect(() => {
    // This is a placeholder for actual auth logic
    // In a real app, you would check if the user is authenticated
    const isAuthenticated = true; // Mock authentication
    const isLoginPage = pathname === "/admin/login";

    if (!isAuthenticated && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  // Skip layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const toggleSubmenu = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-background px-4">
        <div className="flex w-full justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle Menu</span>
            </Button>
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <span className="text-xl font-bold">Noveena Admin</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
              <LogOut className="mr-2 h-4 w-4" />
              Exit Admin
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar (Desktop) */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 mt-16 hidden w-64 flex-col border-r bg-background md:flex",
            isMobileMenuOpen && "flex"
          )}
        >
          <ScrollArea className="flex-1 py-4">
            <nav className="grid gap-1 px-2">
              {navItems.map((item) => (
                <div key={item.title}>
                  {item.submenu ? (
                    <div className="flex flex-col">
                      <Button
                        variant="ghost"
                        className={cn(
                          "relative flex h-10 w-full justify-between",
                          pathname.startsWith(item.href) &&
                            "bg-muted font-medium"
                        )}
                        onClick={() => toggleSubmenu(item.title)}
                      >
                        <div className="flex items-center">
                          <item.icon className="mr-2 h-5 w-5" />
                          {item.title}
                        </div>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            expandedItems[item.title] && "rotate-180"
                          )}
                        />
                      </Button>

                      {expandedItems[item.title] && (
                        <div className="ml-6 mt-1 grid gap-1">
                          {item.submenu.map((subItem) => (
                            <Button
                              key={subItem.title}
                              variant="ghost"
                              asChild
                              className={cn(
                                "justify-start",
                                pathname === subItem.href &&
                                  "bg-muted font-medium"
                              )}
                            >
                              <Link href={subItem.href}>
                                <subItem.icon className="mr-2 h-4 w-4" />
                                {subItem.title}
                              </Link>
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      asChild
                      className={cn(
                        "justify-start",
                        pathname === item.href && "bg-muted font-medium"
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-5 w-5" />
                        {item.title}
                      </Link>
                    </Button>
                  )}
                </div>
              ))}
            </nav>
          </ScrollArea>
        </aside>

        {/* Content */}
        <main className="flex-1 md:ml-64">
          <div className="container mx-auto p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
