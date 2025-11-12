import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useContactInfo } from "@/api/contactApi";
import { useCreateQuery } from "@/hooks/use-query";
import SocialSidebar from "@/components/socialSidebar";
import bg1 from "@/assets/coverimg.jpg";
import belowBg from "@/assets/belowwbg.png";


const ContactInfoCard = ({ icon, title, children }: any) => (
  <div className="flex items-start space-x-4 hover:bg-gold/5 p-4 rounded-xl transition-all duration-300">
    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 flex-shrink-0 hover:bg-gold/20 transition-colors duration-300">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <div className="text-muted-foreground text-sm">{children}</div>
    </div>
  </div>
);

const Contact = () => {
  const { data: user } = useAuth();
  const { data: contactData, isLoading } = useContactInfo();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        message: "",
      });
    }
  }, [user]);


const addQueryMutation = useCreateQuery();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await addQueryMutation.mutateAsync({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      query: formData.message,
      isAddressed: false,
    });

    toast.success("Your query has been submitted successfully!");
    setFormData({ name: user.fullName, email: user.email, phone: user.phone, message: "" });
  } catch (error) {
    console.error(error);
    toast.error("Failed to submit your query. Please try again.");
  }
};


  if (isLoading) return <div className="p-8">Loading contact info...</div>;

  const contact = contactData || {};

  // Handle phone numbers (string or array)
  const phoneNumbers =
    typeof contact.phone === "string"
      ? contact.phone.split(",").map((num: string) => num.trim())
      : contact.phone || [];

  // Fallback map URL
  const mapUrl =
    contact.mapEmbed ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.241990478216!2d77.5115432756321!3d28.4722580913407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cebe9ddd434c5%3A0xf9cef746f7ab1cc5!2sS.L.%20TOWER!5e0!3m2!1sen!2sin!4v1760475634398!5m2!1sen!2sin";

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation/>
      <SocialSidebar/>
      <main className="flex-1">
        {/* Header */}
       

        <section
          className="relative text-primary-foreground py-20 shadow-lg bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bg1})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="container relative z-10 mx-auto px-4 flex flex-col justify-center items-center text-center">
            <h1 className="font-serif text-white text-4xl md:text-5xl font-bold mb-4">
            Get in{" "}
              <span className="text-gold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Touch
              </span>
            </h1>
            <p className="text-lg text-white max-w-3xl">
            We're here to help you find your perfect property
            </p>
          </div>
        </section>

        {/* Main Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Contact Form */}
              <div className="bg-muted/10 p-8 rounded-2xl shadow-lg border border-border">
                <h2 className="font-serif text-3xl font-bold mb-6">
                  We'd Love to Hear From You
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { label: "Full Name", name: "name", type: "text" },
                    { label: "Email Address", name: "email", type: "email" },
                    { label: "Phone Number", name: "phone", type: "tel" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label htmlFor={field.name} className="block text-sm font-medium mb-2">
                        {field.label}
                      </label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={(e) =>
                          setFormData({ ...formData, [e.target.name]: e.target.value })
                        }
                        required
                      />
                    </div>
                  ))}

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      rows={5}
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <Button type="submit" variant="gold" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Info Section */}
              <div className="space-y-8">
                <h2 className="font-serif text-3xl font-bold mb-6">
                  Contact Information
                </h2>

                <ContactInfoCard icon={<Phone className="h-6 w-6 text-gold" />} title="Phone">
                  {phoneNumbers.length > 0 ? (
                    phoneNumbers.map((num: string, i: number) => <p key={i}>{num}</p>)
                  ) : (
                    <p>No contact numbers available</p>
                  )}
                </ContactInfoCard>

                <ContactInfoCard icon={<Mail className="h-6 w-6 text-gold" />} title="Email">
                  <p>{contact.email || "Not available"}</p>
                </ContactInfoCard>

                <ContactInfoCard icon={<MapPin className="h-6 w-6 text-gold" />} title="Address">
                  <p>{contact.address || "No address available"}</p>
                </ContactInfoCard>

                <ContactInfoCard icon={<Clock className="h-6 w-6 text-gold" />} title="Business Hours">
                  <p>{contact.hours || "10:00 AM - 6:00 PM"}</p>
                </ContactInfoCard>

                <div className="mt-8 rounded-xl overflow-hidden shadow-lg border border-border">
                  <iframe
                    src={mapUrl}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className=" bottom-0 left-0 right-0 w-full">
        <img
          src={belowBg}
          alt="Footer Decorative Background"
          className="w-full object-cover opacity-80 pointer-events-none select-none"
        />
      </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Contact;
