import { Camera, Video, Map, Layers } from "lucide-react";

const services = [
  {
    icon: Camera,
    title: "Aerial Photography",
    description:
      "High-resolution imagery that reveals the full scope of your property, from boundary surveys to feature documentation.",
  },
  {
    icon: Video,
    title: "Cinematic Drone Video",
    description:
      "Professional 4K video productions that showcase your land, property, or project with smooth, dynamic aerial footage.",
  },
  {
    icon: Map,
    title: "Mapping & Point Cloud Data",
    description:
      "Accurate 3D terrain models and point cloud data for surveying, volume calculations, and detailed analysis.",
  },
  {
    icon: Layers,
    title: "Orthomosaics & Terrain Models",
    description:
      "DSM/DTM, slope analysis, and drainage visualization to understand your land's topography and water flow.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-widest text-sm uppercase">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            See Your Land From a New Perspective
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional drone services that help you understand, plan, and document
            your property with precision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-6 rounded-xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-glow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
