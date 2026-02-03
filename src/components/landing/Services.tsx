import { 
  Map, 
  Box, 
  Scan, 
  Mountain, 
  TrendingUp, 
  Leaf, 
  Camera, 
  Video, 
  Home, 
  RotateCw 
} from "lucide-react";

const mappingServices = [
  {
    icon: Map,
    title: "Orthomosaics (Orthophotos)",
    description: "High-resolution, georeferenced, map-accurate top-down imagery.",
  },
  {
    icon: Box,
    title: "3D Models",
    description: "Textured 3D terrain and object models for planning and visualization.",
  },
  {
    icon: Scan,
    title: "Point Clouds",
    description: "Classified, georeferenced 3D data sets for detailed analysis.",
  },
  {
    icon: Mountain,
    title: "Digital Elevation Models",
    description: "DSM (ground + buildings + vegetation) and DTM (bare-earth terrain).",
  },
  {
    icon: TrendingUp,
    title: "Contour Lines",
    description: "Accurate topographic contour lines derived from elevation data.",
  },
  {
    icon: Leaf,
    title: "Plant Health Mapping (NDVI)",
    description: "Multispectral analysis for crop and vegetation health assessment.",
  },
];

const mediaServices = [
  {
    icon: Camera,
    title: "Drone Photography",
    description: "Professional aerial photography for properties, events, and documentation.",
  },
  {
    icon: Video,
    title: "Drone Videography",
    description: "Cinematic 4K aerial video for promotional and commercial use.",
  },
  {
    icon: Home,
    title: "Real Estate Aerials",
    description: "Stunning property visuals that help listings stand out in the market.",
  },
  {
    icon: RotateCw,
    title: "3D Virtual Tours",
    description: "Immersive virtual experiences for properties, lodges, and facilities.",
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
            Professional Drone Data & Media
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From survey-grade mapping to promotional visuals—accurate, practical 
            outputs for landowners, builders, and businesses.
          </p>
        </div>

        {/* Drone Mapping & Survey Data */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-primary mb-6 flex items-center gap-2">
            <Map className="w-5 h-5" />
            Drone Mapping & Survey Data
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mappingServices.map((service) => (
              <div
                key={service.title}
                className="p-6 rounded-xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-glow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Aerial Media Services */}
        <div>
          <h3 className="text-xl font-semibold text-secondary mb-6 flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Aerial Media Services
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaServices.map((service) => (
              <div
                key={service.title}
                className="p-6 rounded-xl bg-gradient-card border border-border hover:border-secondary/30 transition-all duration-300 hover:shadow-glow"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
