import { useState } from "react";
import { Camera, Play, X } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const portfolioItems = [
  { img: portfolio1, title: "舞台魔術表演", category: "舞台表演", type: "photo" },
  { img: portfolio2, title: "企業晚宴近距離魔術", category: "近距離魔術", type: "photo" },
  { img: portfolio3, title: "兒童魔術教學工作坊", category: "教學課程", type: "photo" },
  { img: portfolio4, title: "大型幻術表演", category: "舞台表演", type: "photo" },
  { img: portfolio5, title: "生日派對魔術表演", category: "派對表演", type: "photo" },
  { img: portfolio6, title: "街頭魔術表演", category: "街頭魔術", type: "photo" },
] as const;

const categories = ["全部", "舞台表演", "近距離魔術", "教學課程", "派對表演", "街頭魔術"];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filtered = activeCategory === "全部"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-primary/30 bg-primary/10">
            <Camera size={16} className="text-primary" />
            <span className="text-sm text-primary font-body">作品集</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient-magic mb-4">精彩回顧</h2>
          <p className="text-muted-foreground font-body">歷年魔術表演及活動精選</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-body transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-magic text-primary-foreground shadow-glow"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {filtered.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              onClick={() => setSelectedImage(portfolioItems.indexOf(item))}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-glow"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-xs text-accent font-body mb-1 block">{item.category}</span>
                <h3 className="font-display text-lg font-bold text-foreground">{item.title}</h3>
              </div>
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-primary/80 flex items-center justify-center backdrop-blur-sm">
                    <Play size={24} className="text-primary-foreground ml-1" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary/10 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={20} />
          </button>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img
              src={portfolioItems[selectedImage].img}
              alt={portfolioItems[selectedImage].title}
              className="w-full rounded-xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <span className="text-xs text-accent font-body">{portfolioItems[selectedImage].category}</span>
              <h3 className="font-display text-xl font-bold text-foreground mt-1">{portfolioItems[selectedImage].title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
