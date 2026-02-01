import { Button } from "@/components/ui/button";
import { Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section Header */}
          <span className="text-primary font-semibold tracking-widest text-sm uppercase">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Ready to See Your Land Differently?
          </h2>
          <p className="text-muted-foreground mb-10">
            Tell us about your property and what you're trying to accomplish. We'll respond
            quickly with clear next steps and honest pricing.
          </p>

          {/* Email CTA */}
          <Button variant="hero" size="xl" className="mb-12" asChild>
            <a href="mailto:info@3fieldsaerial.com">
              <Mail className="w-5 h-5" />
              info@3fieldsaerial.com
            </a>
          </Button>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            <div className="p-6 rounded-xl bg-gradient-card border border-border">
              <MapPin className="w-6 h-6 text-primary mb-3" />
              <h4 className="font-semibold mb-1">Service Area</h4>
              <p className="text-muted-foreground text-sm">
                Serving landowners across New Brunswick and Maine. Remote areas welcome.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-card border border-border">
              <Clock className="w-6 h-6 text-secondary mb-3" />
              <h4 className="font-semibold mb-1">Fast Response</h4>
              <p className="text-muted-foreground text-sm">
                Expect a reply within 24 hours. Clear quotes, no hidden fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
