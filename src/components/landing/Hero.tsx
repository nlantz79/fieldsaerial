import { Button } from "@/components/ui/button";
import { Mail, FileText } from "lucide-react";
import heroImage from "@/assets/hero-aerial.jpg";
import logo from "@/assets/logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Aerial view of rural farmland and homestead"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Brand */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <img 
              src={logo} 
              alt="3 Fields Aerial" 
              className="h-24 md:h-32 w-auto mx-auto"
            />
          </div>

          {/* Headline */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Aerial Visuals &{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Land Mapping
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            Drone photography, video, and mapping for landowners, builders, and homesteaders
            across New Brunswick.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Button variant="hero" size="xl" asChild>
              <a href="mailto:info@3fieldsaerial.com">
                <Mail className="w-5 h-5" />
                Email Us
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="mailto:info@3fieldsaerial.com?subject=Quote Request">
                <FileText className="w-5 h-5" />
                Get a Quote
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
