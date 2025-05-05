"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2, User, AtSign, MessageSquare, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const socialLinks = [
  { name: "Instagram", icon: "/instagram.svg", href: "https://instagram.com/noveenafurniture" },
  { name: "Facebook", icon: "/facebook.svg", href: "https://facebook.com/noveenafurniture" },
  { name: "Twitter", icon: "/twitter.svg", href: "https://twitter.com/noveenafurniture" },
]

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    preferredContact: "email",
    preferredTime: "",
    newsletter: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState("contact")
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const ref = useRef(null)
  const isInView = useInView(ref)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Email is not valid"
    }
    if (!formData.phone.trim()) errors.phone = "Phone number is required"
    if (!formData.subject) errors.subject = "Please select a subject"
    if (!formData.message.trim()) errors.message = "Message is required"
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We've received your message and will get back to you soon.",
        variant: "success",
      })

      setFormSubmitted(true)
      setIsSubmitting(false)
    }, 1500)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      preferredContact: "email",
      preferredTime: "",
      newsletter: false,
    })
    setFormSubmitted(false)
    setFormErrors({})
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-12 text-center"
        style={{ opacity }}
      >
        <Badge className="mb-4 px-3 py-1 text-sm">Get In Touch</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Noveena Furniture</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have questions about our products or services? We're here to help and eager to hear from you.
        </p>
      </motion.div>
      
      <Tabs defaultValue="contact" value={activeTab} onValueChange={setActiveTab} className="mb-12">
        <div className="flex justify-center">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="showroom">Our Showroom</TabsTrigger>
            <TabsTrigger value="faq">FAQs</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="contact" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
              ref={ref}
            >
              <motion.div variants={itemVariants} className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                <h2 className="text-2xl font-semibold mb-6">How to Reach Us</h2>
                
                <div className="space-y-6">
                  <motion.div variants={itemVariants} className="flex items-start space-x-4 group">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Visit Our Showroom</h3>
                      <p className="text-muted-foreground">337 Kaduwela Rd, Thalangama Koswatta</p>
                      <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline mt-1 inline-block">
                        View on Google Maps
                      </a>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex items-start space-x-4 group">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Call Us</h3>
                      <p className="text-muted-foreground">
                        <a href="tel:+94779134361" className="hover:text-primary transition-colors">
                          +94 77 913 4361
                        </a>
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">Our customer support is available during business hours</p>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex items-start space-x-4 group">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email Us</h3>
                      <p className="text-muted-foreground">
                        <a href="mailto:noveenafurniture@gmail.com" className="hover:text-primary transition-colors">
                          noveenafurniture@gmail.com
                        </a>
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">We typically respond within 24 hours</p>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex items-start space-x-4 group">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Opening Hours</h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
                        <span>Monday - Friday:</span><span>9:00 AM - 7:00 PM</span>
                        <span>Saturday:</span><span>9:00 AM - 6:00 PM</span>
                        <span>Sunday:</span><span>10:00 AM - 5:00 PM</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map(social => (
                      <a 
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-background h-10 w-10 rounded-full flex items-center justify-center shadow-sm hover:bg-primary/10 transition-colors"
                        aria-label={social.name}
                      >
                        <span className="sr-only">{social.name}</span>
                        {/* Fallback to text if icons not available */}
                        {social.name.charAt(0)}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              {/* Map Placeholder with improved styling */}
              <motion.div 
                variants={itemVariants}
                className="relative h-[350px] rounded-lg overflow-hidden border border-muted"
              >
                <div className="absolute inset-0 bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Interactive Google Map will be displayed here</p>
                </div>
                {/* Uncomment when adding actual Google Maps integration */}
                {/* <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!...YOUR_MAP_EMBED_URL"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Noveena Furniture Store Location"
                ></iframe> */}
              </motion.div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
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
                  <h2 className="text-2xl font-bold mb-4">Message Sent Successfully!</h2>
                  <p className="text-muted-foreground max-w-md mb-8">
                    Thank you for contacting us. We've received your inquiry and a member of our team will get back to you shortly.
                  </p>
                  <Button onClick={resetForm} variant="outline" size="lg">
                    <X className="mr-2 h-4 w-4" />
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <>
                  <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Send Us a Message</h2>
                    <Badge variant="outline" className="font-normal">
                      We reply within 24hrs
                    </Badge>
                  </motion.div>
                  
                  <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
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
                          className={cn(formErrors.name && "border-destructive focus-visible:ring-destructive")}
                        />
                        {formErrors.name && (
                          <p className="text-destructive text-xs mt-1">{formErrors.name}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center">
                          <AtSign className="h-3.5 w-3.5 mr-1.5 opacity-70" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={cn(formErrors.email && "border-destructive focus-visible:ring-destructive")}
                        />
                        {formErrors.email && (
                          <p className="text-destructive text-xs mt-1">{formErrors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
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
                          className={cn(formErrors.phone && "border-destructive focus-visible:ring-destructive")}
                        />
                        {formErrors.phone && (
                          <p className="text-destructive text-xs mt-1">{formErrors.phone}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="flex items-center">
                          <MessageSquare className="h-3.5 w-3.5 mr-1.5 opacity-70" />
                          Subject
                        </Label>
                        <Select 
                          value={formData.subject} 
                          onValueChange={(value) => handleSelectChange("subject", value)}
                        >
                          <SelectTrigger className={cn(formErrors.subject && "border-destructive focus-visible:ring-destructive")}>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="product">Product Information</SelectItem>
                            <SelectItem value="purchase">Purchase Assistance</SelectItem>
                            <SelectItem value="delivery">Delivery Information</SelectItem>
                            <SelectItem value="customization">Custom Furniture Inquiry</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {formErrors.subject && (
                          <p className="text-destructive text-xs mt-1">{formErrors.subject}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center">Preferred Contact Method</Label>
                      <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="email-contact"
                            name="preferredContact"
                            value="email"
                            checked={formData.preferredContact === 'email'}
                            onChange={(e) => handleSelectChange("preferredContact", e.target.value)}
                            className="text-primary focus:ring-primary"
                          />
                          <Label htmlFor="email-contact" className="text-sm cursor-pointer">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="phone-contact"
                            name="preferredContact"
                            value="phone" 
                            checked={formData.preferredContact === 'phone'}
                            onChange={(e) => handleSelectChange("preferredContact", e.target.value)}
                            className="text-primary focus:ring-primary"
                          />
                          <Label htmlFor="phone-contact" className="text-sm cursor-pointer">Phone</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredTime" className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5 opacity-70" />
                        Best Time to Contact
                      </Label>
                      <Select 
                        value={formData.preferredTime} 
                        onValueChange={(value) => handleSelectChange("preferredTime", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred time (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
                          <SelectItem value="evening">Evening (4PM - 7PM)</SelectItem>
                          <SelectItem value="anytime">Anytime during business hours</SelectItem>
                        </SelectContent>
                      </Select>
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
                        className={cn(formErrors.message && "border-destructive focus-visible:ring-destructive")}
                      />
                      {formErrors.message && (
                        <p className="text-destructive text-xs mt-1">{formErrors.message}</p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="newsletter" 
                        checked={formData.newsletter}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange("newsletter", checked as boolean)
                        }
                      />
                      <Label htmlFor="newsletter" className="text-sm cursor-pointer">
                        Subscribe to our newsletter for promotions and updates
                      </Label>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending Message...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </motion.form>
                </>
              )}
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="showroom" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video relative bg-muted">
                  {/* Replace with actual showroom image */}
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    Showroom Image
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Our Main Showroom</h3>
                  <p className="text-muted-foreground text-sm">
                    Experience our extensive collection of luxury furniture in our spacious main showroom.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video relative bg-muted">
                  {/* Replace with actual design center image */}
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    Design Center Image
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Design Consultation Center</h3>
                  <p className="text-muted-foreground text-sm">
                    Meet with our design experts to create custom furniture solutions for your space.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video relative bg-muted">
                  {/* Replace with actual workshop image */}
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    Workshop Image
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Restoration Workshop</h3>
                  <p className="text-muted-foreground text-sm">
                    See where we restore and refinish our imported used furniture pieces.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Virtual Tour</h2>
            <div className="aspect-[16/9] bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Virtual tour video will be displayed here</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="faq" className="mt-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What payment methods do you accept?",
                answer: "We accept cash, credit/debit cards, bank transfers, and select mobile payment options. For larger purchases, we also offer financing options."
              },
              {
                question: "Do you offer delivery services?",
                answer: "Yes, we provide delivery services throughout Sri Lanka. Delivery fees vary based on location and size of the furniture. For most local deliveries, we offer same-day or next-day delivery."
              },
              {
                question: "What is your return policy?",
                answer: "We offer a 14-day return policy for most items. Custom-made and clearance items are non-returnable. Items must be in their original condition and packaging."
              },
              {
                question: "Do you offer assembly services?",
                answer: "Yes, our professional team offers assembly services for all furniture purchased from our store. This service is complimentary for most large items."
              },
              {
                question: "Can you help with interior design?",
                answer: "Absolutely! Our experienced design consultants can help you select the right furniture for your space and provide comprehensive interior design services."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
            
            <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
              <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">
                If you couldn't find the answer to your question, please don't hesitate to reach out to us directly.
              </p>
              <Button variant="outline" onClick={() => setActiveTab("contact")}>
                Contact Our Team
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
