import { TreePine, Home, HardHat, Building2 } from "lucide-react";

const useCases = [
  {
    icon: TreePine,
    title: "Landowners",
    description:
      "Document property boundaries, assess timber resources, plan access roads, and create comprehensive records of your land.",
  },
  {
    icon: Home,
    title: "Homesteaders",
    description:
      "Plan gardens, orchards, and infrastructure with drainage analysis. Avoid costly mistakes with terrain data before you build.",
  },
  {
    icon: HardHat,
    title: "Construction & Builders",
    description:
      "Site surveys, progress documentation, volumetric analysis, and as-built verification for your construction projects.",
  },
  {
    icon: Building2,
    title: "Real Estate",
    description:
      "Stunning aerial photography and video that showcase properties at their best, helping listings stand out in the market.",
  },
];

const UseCases = () => {
  return (
    <section id="use-cases" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-widest text-sm uppercase">
            Who We Serve
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Trusted by Those Who Work the Land
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you're planning a homestead, developing property, or selling real estate—
            we provide the aerial perspective you need.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="flex gap-5 p-6 rounded-xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-accent flex items-center justify-center">
                <useCase.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
