import { MapPin } from "lucide-react";

const ServiceArea = () => {
  return (
    <section id="service-area" className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <MapPin className="w-5 h-5" />
            <span className="font-semibold">Service Area</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Serving All of New Brunswick
          </h2>
          <p className="text-muted-foreground">
            From coastal communities to inland forests—we cover rural, remote, and 
            developing areas across the entire province. No property too far.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
