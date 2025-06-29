"use client";

import { useState, useEffect, FormEvent } from "react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  MenuIcon,
  ShoppingBag,
  X,
  Home,
  ChevronDown,
  ChevronRight,
  Search,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Define interfaces based on Prisma schema
interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  type: "IMPORTED_USED" | "BRAND_NEW";
}

interface CategoryLink {
  name: string;
  href: string;
  description: string;
  subcategories: {
    name: string;
    href: string;
    icon: string;
  }[];
}

// Placeholder for initial load
const categoryLinks = [
  {
    name: "Imported Used",
    href: "/category/imported-used",
    description:
      "Timeless pieces with character and history, carefully restored to perfection",
    subcategories: [],
  },
  {
    name: "Brand New",
    href: "/category/brand-new",
    description:
      "Contemporary designs crafted with premium materials and expert craftsmanship",
    subcategories: [],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [searchQuery, setSearchQuery] = useState("");

  // Add state for dynamic categories
  const [dynamicCategories, setDynamicCategories] = useState<CategoryLink[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  // Function to assign icon based on category name
  const getCategoryIcon = (name: string): string => {
    const lowerName = name.toLowerCase();

    if (lowerName.includes("dining") || lowerName.includes("table"))
      return "🍽️";
    if (lowerName.includes("bed") || lowerName.includes("mattress"))
      return "🛏️";
    if (
      lowerName.includes("living") ||
      lowerName.includes("sofa") ||
      lowerName.includes("couch")
    )
      return "🛋️";
    if (
      lowerName.includes("office") ||
      lowerName.includes("desk") ||
      lowerName.includes("work")
    )
      return "💼";
    if (lowerName.includes("chair") || lowerName.includes("stool")) return "🪑";
    if (
      lowerName.includes("storage") ||
      lowerName.includes("cabinet") ||
      lowerName.includes("shelf")
    )
      return "📚";
    if (lowerName.includes("kitchen") || lowerName.includes("cookware"))
      return "🍳";
    if (lowerName.includes("bath") || lowerName.includes("bathroom"))
      return "🚿";
    if (
      lowerName.includes("outdoor") ||
      lowerName.includes("garden") ||
      lowerName.includes("patio")
    )
      return "🌿";
    if (lowerName.includes("light") || lowerName.includes("lamp")) return "💡";
    if (lowerName.includes("decor") || lowerName.includes("art")) return "🖼️";
    if (lowerName.includes("kids") || lowerName.includes("child")) return "👶";

    // Default furniture icon
    return "🪑";
  };

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/categories");
        const data = await response.json();

        if (data.success) {
          // Filter to only show IMPORTED_USED categories
          const importedUsedCategories = data.data.filter(
            (category: Category) => category.type === "IMPORTED_USED"
          );

          // Format for navbar use
          if (importedUsedCategories.length > 0) {
            const formattedCategories: CategoryLink[] = [
              {
                name: "Imported Used",
                href: "/category/imported-used",
                description:
                  "Timeless pieces with character and history, carefully restored to perfection",
                subcategories: importedUsedCategories.map(
                  (category: Category) => ({
                    name: category.name,
                    href: `/category/imported-used?category=${category.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`,
                    icon: getCategoryIcon(category.name),
                  })
                ),
              },
            ];
            console.log("Formatted Categories:", formattedCategories);
            setDynamicCategories(formattedCategories);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pre-fill search query from URL if coming back to a page with search
  useEffect(() => {
    const query = searchParams?.get("search") || "";
    setSearchQuery(query);
  }, [searchParams]);

  // Don't render navbar for admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryHover = (category: string) => {
    if (!isMobile) {
      setOpenCategory(category);
    }
  };

  const handleCategoryClick = (category: string) => {
    if (isMobile) {
      setOpenCategory(openCategory === category ? null : category);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSearch = (e?: FormEvent) => {
    if (e) e.preventDefault();

    if (searchQuery.trim()) {
      router.push(
        `/category/all?search=${encodeURIComponent(searchQuery.trim())}`
      );
      setShowSearch(false);
      setIsOpen(false);
    }
  };

  // Use dynamic categories if they're loaded, otherwise use placeholder
  const displayCategories =
    dynamicCategories.length > 0 ? dynamicCategories : [categoryLinks[0]]; // Only show Imported Used placeholder

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-2"
          : "bg-background/50 backdrop-blur-sm py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20 group-hover:border-primary/80 transition-all duration-500">
              <Image
                src="https://res.cloudinary.com/do08c2xq5/image/upload/v1747288693/493565611_680880901320361_2273471322479004360_n_bk6pmy.jpg"
                alt="Noveena Furniture Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-italiana tracking-wider text-primary">
                NOVEENA
              </span>
              <span className="text-xs uppercase tracking-widest -mt-1 font-montserrat">
                Luxury Furniture
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors relative group"
            >
              <span
                className={cn(
                  "transition-colors duration-300",
                  "text-foreground group-hover:text-primary"
                )}
              >
                Home
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {displayCategories.map((category, index) => (
              <div
                key={category.name}
                className="relative group"
                onMouseEnter={() => handleCategoryHover(category.name)}
                onMouseLeave={() => setOpenCategory(null)}
              >
                <button
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors relative group",
                    "text-foreground hover:text-primary"
                  )}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <span>{category.name}</span>
                  <ChevronDown className="ml-1 h-4 w-4 opacity-70 transition-transform duration-300 group-hover:rotate-180" />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>

                {openCategory === category.name && (
                  <div className="absolute left-0 mt-2 w-[500px] rounded-xl shadow-lg bg-background border overflow-hidden">
                    <div
                      className={cn(
                        "p-6",
                        category.subcategories.length > 0
                          ? "grid grid-cols-2 gap-6"
                          : ""
                      )}
                    >
                      <div>
                        <h3 className="font-playfair text-lg font-semibold mb-2">
                          {category.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {category.description}
                        </p>
                        <Link
                          href={category.href}
                          className="text-primary text-sm font-medium hover:underline"
                        >
                          View All {category.name} →
                        </Link>
                      </div>

                      {category.subcategories.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                            Categories
                          </h4>
                          {category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory.name}
                              href={subcategory.href}
                              className="flex items-center py-1 text-sm hover:text-primary transition-colors"
                            >
                              <span className="mr-2">{subcategory.icon}</span>
                              {subcategory.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="bg-muted/30 p-4">
                      <p className="text-xs text-muted-foreground">
                        Discover our premium collection of{" "}
                        {category.name.toLowerCase()} furniture, handpicked for
                        quality and style.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Brand New as a simple link without dropdown */}
            <Link
              href="/category/brand-new"
              className="text-sm font-medium hover:text-primary transition-colors relative group"
            >
              <span
                className={cn(
                  "transition-colors duration-300",
                  "text-foreground group-hover:text-primary"
                )}
              >
                Brand New
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              href="/about"
              className="text-sm font-medium hover:text-primary transition-colors relative group"
            >
              <span
                className={cn(
                  "transition-colors duration-300",
                  "text-foreground group-hover:text-primary"
                )}
              >
                About
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              href="/contact"
              className="text-sm font-medium hover:text-primary transition-colors relative group"
            >
              <span
                className={cn(
                  "transition-colors duration-300",
                  "text-foreground group-hover:text-primary"
                )}
              >
                Contact
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right Side buttons */}
          <div className="flex items-center space-x-2">
            <AnimatePresence>
              {showSearch && (
                <motion.form
                  onSubmit={handleSearch}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "200px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative hidden md:block"
                >
                  <Input
                    placeholder="Search products..."
                    className="pr-8"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <X
                    className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
                    onClick={toggleSearch}
                  />
                </motion.form>
              )}
            </AnimatePresence>

            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={toggleSearch}
            >
              <Search className="h-5 w-5 transition-colors text-foreground" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Ensure ThemeToggle icon is always visible with consistent color */}
            <div
              style={{
                // Force proper contrast for the icon regardless of scroll position
                padding: !scrolled ? "2px" : "0",
              }}
            >
              <ThemeToggle />
            </div>

            <Button
              variant="outline"
              size="icon"
              className="hidden md:flex relative group"
              asChild
            >
              <Link href="/contact">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Contact for Purchase</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={handleToggleMenu}
            >
              <MenuIcon className="h-6 w-6 transition-colors text-foreground" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-t"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center mb-4">
                <form onSubmit={handleSearch} className="relative w-full">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-9 pr-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleToggleMenu}
                  className="ml-2"
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close Menu</span>
                </Button>
              </div>

              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="flex items-center py-2 px-3 rounded-md hover:bg-muted transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Home className="mr-2 h-5 w-5" />
                  Home
                </Link>

                {displayCategories.map((category) => (
                  <div key={category.name} className="space-y-1">
                    <button
                      className="flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-muted transition-colors"
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      <span>{category.name}</span>
                      {openCategory === category.name ? (
                        <ChevronDown className="h-5 w-5" />
                      ) : (
                        <ChevronRight className="h-5 w-5" />
                      )}
                    </button>

                    {openCategory === category.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-5 space-y-1"
                      >
                        <div className="p-3 mb-2 bg-muted/30 rounded-md">
                          <p className="text-sm text-muted-foreground">
                            {category.description}
                          </p>
                        </div>

                        <Link
                          href={category.href}
                          className="flex items-center py-2 px-3 rounded-md hover:bg-muted transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          All {category.name}
                        </Link>

                        {category.subcategories.length > 0 &&
                          category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory.name}
                              href={subcategory.href}
                              className="flex items-center py-2 px-3 rounded-md hover:bg-muted transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="mr-2">{subcategory.icon}</span>
                              {subcategory.name}
                            </Link>
                          ))}
                      </motion.div>
                    )}
                  </div>
                ))}

                {/* Brand New simple link for mobile */}
                <Link
                  href="/category/brand-new"
                  className="flex items-center py-2 px-3 rounded-md hover:bg-muted transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Brand New
                </Link>

                <Link
                  href="/about"
                  className="flex items-center py-2 px-3 rounded-md hover:bg-muted transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  className="flex items-center py-2 px-3 rounded-md hover:bg-muted transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>

                <div className="mt-4 pt-4 border-t border-border/40">
                  <div className="space-y-4">
                    <div className="bg-muted/40 p-4 rounded-lg">
                      <h4 className="text-sm font-semibold mb-3 flex items-center">
                        <ShoppingBag className="mr-2 h-4 w-4 text-primary" />
                        Shopping Cart
                      </h4>
                      <div className="text-center py-3">
                        <p className="text-muted-foreground text-sm">
                          Your cart is empty
                        </p>
                        <Button
                          variant="link"
                          size="sm"
                          asChild
                          className="mt-1 p-0"
                        >
                          <Link
                            href="/category/imported-used"
                            onClick={() => setIsOpen(false)}
                          >
                            Browse Products
                          </Link>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold">Get in Touch</h4>
                      <div className="grid gap-2">
                        <a
                          href="tel:+94779134361"
                          className="flex items-center text-sm hover:text-primary transition-colors"
                        >
                          <Phone className="h-4 w-4 mr-2 text-primary/70" />
                          <span>+94 77 913 4361</span>
                        </a>
                        <a
                          href="tel:+94112741427"
                          className="flex items-center text-sm hover:text-primary transition-colors"
                        >
                          <Phone className="h-4 w-4 mr-2 text-primary/70" />
                          <span>+94 112 741 427</span>
                        </a>
                        <a
                          href="mailto:noveenafurniture@gmail.com"
                          className="flex items-center text-sm hover:text-primary transition-colors"
                        >
                          <Mail className="h-4 w-4 mr-2 text-primary/70" />
                          <span>noveenafurniture@gmail.com</span>
                        </a>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-primary/70 flex-shrink-0" />
                          <span>337, Kaduwela Rd, Thalangama, Koswatta.</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold">Follow Us</h4>
                      <div className="flex space-x-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-full"
                        >
                          <Instagram className="h-4 w-4" />
                          <span className="sr-only">Instagram</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-full"
                        >
                          <Facebook className="h-4 w-4" />
                          <span className="sr-only">Facebook</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-full"
                        >
                          <Twitter className="h-4 w-4" />
                          <span className="sr-only">Twitter</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button
                      asChild
                      variant="default"
                      className="w-full hover:bg-white hover:text-primary border border-transparent hover:border-primary"
                    >
                      <Link href="/contact" onClick={() => setIsOpen(false)}>
                        <Phone className="mr-2 h-4 w-4" />
                        Contact for Purchase
                      </Link>
                    </Button>

                    <Button asChild variant="outline" className="w-full">
                      <Link href="/about" onClick={() => setIsOpen(false)}>
                        Learn About Noveena
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
