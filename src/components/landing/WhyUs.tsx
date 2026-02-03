import { CheckCircle } from "lucide-react";

const reasons = [
  "New Brunswick–focused service",
  "Accurate, professional-grade data outputs",
  "Ideal for large rural and undeveloped properties",
  "Clear deliverables and practical results",
  "Mapping and media under one provider",
];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-primary font-semibold tracking-widest text-sm uppercase">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
              Why 3 Fields Aerial
            </h2>
          </div>

          {/* Reasons List */}
          <div className="space-y-4">
            {reasons.map((reason) => (
              <div
                key={reason}
                className="flex items-center gap-4 p-4 rounded-xl bg-gradient-card border border-border"
              >
                <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0" />
                <span className="text-lg">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
