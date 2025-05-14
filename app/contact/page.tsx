"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Loader2,
  User,
  MessageSquare,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { sendSMS } from "@/lib/notify";

const socialLinks = [
  {
    name: "Instagram",
    icon: "https://res.cloudinary.com/do08c2xq5/image/upload/v1746506300/instagram_lfprdb.png",
    href: "https://www.instagram.com/noveena.furniture",
  },
  {
    name: "Facebook",
    icon: "https://res.cloudinary.com/do08c2xq5/image/upload/v1746506300/facebook_tkpqrx.png",
    href: "https://facebook.com/noveenafurniture",
  },
  {
    name: "TikTok",
    icon: "https://res.cloudinary.com/do08c2xq5/image/upload/v1746506300/tik-tok_vd5e4v.png",
    href: "https://www.tiktok.com/@noveenafurniture",
  },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.message.trim()) errors.message = "Message is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Prepare SMS message with contact form details
      const smsMessage = `Contact Form: ${formData.name} (${
        formData.phone
      }) says: ${formData.message.substring(0, 100)}${
        formData.message.length > 100 ? "..." : ""
      }`;

      // Send SMS notification
      await sendSMS({ message: smsMessage });

      toast({
        title: "Message Sent!",
        description:
          "We've received your message and will get back to you soon.",
        variant: "success",
      });

      setFormSubmitted(true);
    } catch (error) {
      console.error("Failed to send contact form notification:", error);
      toast({
        title: "Error",
        description:
          "There was an issue sending your message. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      message: "",
    });
    setFormSubmitted(false);
    setFormErrors({});
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-12 text-center"
      >
        <Badge className="mb-4 px-3 py-1 text-sm">Get In Touch</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Contact Noveena Furniture
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have questions about our products or services? We're here to help and
          eager to hear from you.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div
            variants={itemVariants}
            className="bg-primary/5 p-6 rounded-lg border border-primary/10"
          >
            <h2 className="text-2xl font-semibold mb-6">How to Reach Us</h2>

            <div className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="flex items-start space-x-4 group"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Visit Our Showroom</h3>
                  <p className="text-muted-foreground">
                    337 Kaduwela Rd, Thalangama Koswatta
                  </p>
                  <a
                    href="https://maps.app.goo.gl/EzF1nU5qdPDaxnjLA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline mt-1 inline-block"
                  >
                    View on Google Maps
                  </a>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-start space-x-4 group"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Call Us</h3>
                  <p className="text-muted-foreground">
                    <a
                      href="tel:+94779134361"
                      className="hover:text-primary transition-colors"
                    >
                      +94 77 913 4361
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our customer support is available during business hours
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-start space-x-4 group"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email Us</h3>
                  <p className="text-muted-foreground">
                    <a
                      href="mailto:noveenafurniture@gmail.com"
                      className="hover:text-primary transition-colors"
                    >
                      noveenafurniture@gmail.com
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    We typically respond within 24 hours
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-start space-x-4 group"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Opening Hours</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 7:00 PM</span>
                    <span>Saturday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                    <span>Sunday:</span>
                    <span>10:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
              <div className="flex space-x-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-background h-10 w-10 rounded-full flex items-center justify-center shadow-sm hover:bg-primary/10 transition-colors"
                    aria-label={social.name}
                  >
                    <span className="sr-only">{social.name}</span>
                    <img
                      src={social.icon}
                      alt={social.name}
                      className="h-8 w-8 object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            variants={itemVariants}
            className="relative h-[350px] rounded-lg overflow-hidden border border-muted"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.859297243933!2d79.93040177475686!3d6.907423093091964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2574e59f5e2c5%3A0xffbb01e9e79542a4!2swww.homestar.lk!5e0!3m2!1sen!2slk!4v1746506676252!5m2!1sen!2slk"
              width="800"
              height="600"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div
            variants={itemVariants}
            className="bg-card border shadow-sm p-6 sm:p-8 rounded-xl"
          >
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-10 text-center"
              >
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold mb-4">
                  Message Sent Successfully!
                </h2>
                <p className="text-muted-foreground max-w-md mb-8">
                  Thank you for contacting us. We've received your inquiry and a
                  member of our team will get back to you shortly.
                </p>
                <Button onClick={resetForm} variant="outline" size="lg">
                  <X className="mr-2 h-4 w-4" />
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <>
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-between mb-6"
                >
                  <h2 className="text-2xl font-bold">Send Us a Message</h2>
                  <Badge variant="outline" className="font-normal">
                    We reply within 24hrs
                  </Badge>
                </motion.div>

                <motion.form
                  variants={itemVariants}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center">
                      <User className="h-3.5 w-3.5 mr-1.5 opacity-70" />
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className={cn(
                        formErrors.name &&
                          "border-destructive focus-visible:ring-destructive"
                      )}
                    />
                    {formErrors.name && (
                      <p className="text-destructive text-xs mt-1">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center">
                      <Phone className="h-3.5 w-3.5 mr-1.5 opacity-70" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+94 XX XXX XXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      className={cn(
                        formErrors.phone &&
                          "border-destructive focus-visible:ring-destructive"
                      )}
                    />
                    {formErrors.phone && (
                      <p className="text-destructive text-xs mt-1">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="flex items-center">
                      <MessageSquare className="h-3.5 w-3.5 mr-1.5 opacity-70" />
                      Your Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your inquiry, questions, or special requirements..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={cn(
                        formErrors.message &&
                          "border-destructive focus-visible:ring-destructive"
                      )}
                    />
                    {formErrors.message && (
                      <p className="text-destructive text-xs mt-1">
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full font-montserrat transition-all duration-300 hover:scale-[1.02] py-3 md:py-0 hover:bg-white hover:text-primary border border-transparent hover:border-primary"
                    disabled={isSubmitting}
                    size="lg"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Message...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="mr-2"
                        >
                          <Send className="h-5 w-5" />
                        </motion.div>
                        Send Message
                      </span>
                    )}
                  </Button>
                </motion.form>
              </>
            )}
          </motion.div>

          {/* FAQ section */}
          <motion.div
            variants={itemVariants}
            className="bg-card border shadow-sm p-6 sm:p-8 rounded-xl"
          >
            <h2 className="text-2xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  question: "What payment methods do you accept?",
                  answer:
                    "We accept cash, credit/debit cards, bank transfers, and select mobile payment options. For larger purchases, we also offer financing options.",
                },
                {
                  question: "Do you offer delivery services?",
                  answer:
                    "Yes, we provide delivery services throughout Sri Lanka. Delivery fees vary based on location and size of the furniture. For most local deliveries, we offer same-day or next-day delivery.",
                },
                {
                  question: "What is your return policy?",
                  answer:
                    "We offer a 14-day return policy for most items. Custom-made and clearance items are non-returnable. Items must be in their original condition and packaging.",
                },
                {
                  question: "Do you offer assembly services?",
                  answer:
                    "Yes, our professional team offers assembly services for all furniture purchased from our store. This service is complimentary for most large items.",
                },
                {
                  question: "Can you help with interior design?",
                  answer:
                    "Absolutely! Our experienced design consultants can help you select the right furniture for your space and provide comprehensive interior design services.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-muted pb-4 last:border-0 last:pb-0"
                >
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
