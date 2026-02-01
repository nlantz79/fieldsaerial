import { Target, Plane, Package, HeadphonesIcon } from "lucide-react";

const steps = [
  {
    icon: Target,
    step: "01",
    title: "Scope",
    description:
      "We discuss your goals, assess your property, and define exactly what data and deliverables you need.",
  },
  {
    icon: Plane,
    step: "02",
    title: "Fly",
    description:
      "Professional drone operations with precise flight planning to capture comprehensive coverage of your land.",
  },
  {
    icon: Package,
    step: "03",
    title: "Deliver",
    description:
      "High-quality imagery, videos, and mapping data processed and delivered in formats ready for your use.",
  },
  {
    icon: HeadphonesIcon,
    step: "04",
    title: "Support",
    description:
      "We walk you through your deliverables, answer questions, and help you get the most from your data.",
  },
];

const Process = () => {
  return (
    <section id="process" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold tracking-widest text-sm uppercase">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Simple, Clear, Professional
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From first conversation to final delivery, we make the process straightforward
            and the outputs actionable.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-border" />
              )}

              {/* Step Circle */}
              <div className="relative inline-flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-card border-2 border-primary/30 flex items-center justify-center mb-4 z-10">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="text-xs font-bold text-primary/60 mb-2">
                  {step.step}
                </span>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
