import mappingImage from "@/assets/mapping-visualization.jpg";
import pointCloudImage from "@/assets/point-cloud.jpg";

const features = [
  {
    title: "Garden & Orchard Planning",
    description:
      "Identify the best locations for gardens and orchards based on sunlight exposure, slope, and soil drainage patterns.",
  },
  {
    title: "Slope & Runoff Analysis",
    description:
      "Visualize water flow paths, identify low spots that collect moisture, and understand how water moves across your land.",
  },
  {
    title: "Infrastructure Planning",
    description:
      "Make informed decisions about building sites, access roads, and utility placement with accurate terrain data.",
  },
  {
    title: "Long-Term Land Stewardship",
    description:
      "Document your property over time to track changes, plan improvements, and avoid costly drainage mistakes.",
  },
];

const Homesteads = () => {
  return (
    <section id="homesteads" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="text-secondary font-semibold tracking-widest text-sm uppercase">
              Homesteads & Gardens
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
              Plan Your Land with Confidence
            </h2>
            <p className="text-muted-foreground mb-8">
              Aerial mapping reveals what you can't see from the ground. Before you break
              soil on that new garden, build that barn, or plant those fruit trees—understand
              your land's natural drainage patterns and terrain.
            </p>

            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-secondary mt-2" />
                  <div>
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="relative">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-card border border-border">
              <img
                src={mappingImage}
                alt="Elevation heatmap showing terrain and drainage patterns"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-2/3 rounded-xl overflow-hidden shadow-card border border-border z-20">
              <img
                src={pointCloudImage}
                alt="3D point cloud visualization of terrain"
                className="w-full h-auto"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homesteads;
