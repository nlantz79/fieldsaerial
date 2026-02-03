import { AspectRatio } from "@/components/ui/aspect-ratio";
import pointCloudImage from "@/assets/point-cloud.jpg";
import mappingImage from "@/assets/mapping-visualization.jpg";
import aerialImage from "@/assets/hero-aerial.jpg";

const galleryItems = [
  {
    src: pointCloudImage,
    alt: "Point cloud 3D data visualization",
    title: "Point Cloud Data",
  },
  {
    src: mappingImage,
    alt: "Orthomosaic mapping visualization",
    title: "Mapping & Elevation",
  },
  {
    src: aerialImage,
    alt: "Aerial drone photography of rural landscape",
    title: "Aerial Photography",
  },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-semibold tracking-widest text-sm uppercase">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Sample Outputs
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional drone data and imagery—orthomosaics, 3D models, point clouds, 
            and aerial photography.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {galleryItems.map((item) => (
            <div
              key={item.title}
              className="group rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300"
            >
              <AspectRatio ratio={4 / 3}>
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </AspectRatio>
              <div className="p-4 bg-gradient-card">
                <h4 className="font-semibold text-sm">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
