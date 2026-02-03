import { 
  TreePine, 
  Home, 
  HardHat, 
  Building2, 
  Tractor, 
  MapPin, 
  Shield, 
  Mountain, 
  Tent, 
  Zap, 
  Video 
} from "lucide-react";

const clientSectors = [
  { icon: Home, title: "Homesteaders & Farmers" },
  { icon: MapPin, title: "Rural Landowners" },
  { icon: HardHat, title: "Builders & Contractors" },
  { icon: Building2, title: "Real Estate Agents & Sellers" },
  { icon: Tractor, title: "Land Developers & Investors" },
  { icon: Shield, title: "Inspectors & Insurance" },
  { icon: TreePine, title: "Forestry & Environmental" },
  { icon: Tent, title: "Tourism, Camps & Lodges" },
  { icon: Mountain, title: "Municipalities & Communities" },
  { icon: Zap, title: "Utilities & Infrastructure" },
  { icon: Video, title: "Content Creators & Events" },
];

const UseCases = () => {
  return (
    <section id="use-cases" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-widest text-sm uppercase">
            Who We Serve
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Trusted Across New Brunswick
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you're planning a homestead, developing land, or marketing a property—
            we provide the aerial data and visuals you need.
          </p>
        </div>

        {/* Client Sectors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {clientSectors.map((sector) => (
            <div
              key={sector.title}
              className="flex items-center gap-3 p-4 rounded-xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <sector.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium leading-tight">{sector.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
