import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - in production, integrate with email service
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-primary font-semibold tracking-widest text-sm uppercase">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
              Tell Us About Your Project
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We'll recommend the right drone data or media solution for your needs. 
              Expect a response within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      className="bg-card border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="bg-card border-border"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location in New Brunswick</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="City, town, or region"
                      required
                      className="bg-card border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="acreage">Approximate Acreage / Site Size</Label>
                    <Input
                      id="acreage"
                      name="acreage"
                      placeholder="e.g., 50 acres, 2 hectares"
                      className="bg-card border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project">Type of Project</Label>
                  <Textarea
                    id="project"
                    name="project"
                    placeholder="Tell us what you're looking to accomplish—mapping, photography, site documentation, etc."
                    rows={4}
                    required
                    className="bg-card border-border resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-xl bg-gradient-card border border-border">
                <Mail className="w-6 h-6 text-primary mb-3" />
                <h4 className="font-semibold mb-1">Email Us</h4>
                <a
                  href="mailto:info@3fieldsaerial.com"
                  className="text-primary hover:underline text-sm"
                >
                  info@3fieldsaerial.com
                </a>
              </div>

              <div className="p-6 rounded-xl bg-gradient-card border border-border">
                <MapPin className="w-6 h-6 text-secondary mb-3" />
                <h4 className="font-semibold mb-1">Service Area</h4>
                <p className="text-muted-foreground text-sm">
                  Serving all of New Brunswick—rural, coastal, and inland areas.
                </p>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">
                <strong className="text-foreground">No hidden fees.</strong> We'll 
                provide a clear quote based on your project scope and location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
