import { useState, useEffect } from "react";
import { Camera, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PortfolioItem {
  id: string;
  img: string;
  title: string;
  category: string;
}

const PortfolioSection = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [categories, setCategories] = useState<string[]>(["全部"]);
  const [activeCategory, setActiveCategory] = useState("全部");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    if (selectedImage !== null) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedImage]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await supabase
        .from("portfolio_items")
        .select("id, img, title, category")
        .order("sort_order");
      if (data) {
        setPortfolioItems(data);
        const cats = new Set(data.map((i) => i.category));
        setCategories(["全部", ...Array.from(cats)]);
      }
    };
    fetchItems();
  }, []);

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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(i)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-glow"
            >
              {item.img ? (
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-body">
                  {item.title}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-xs text-accent font-body mb-1 block">{item.category}</span>
                <h3 className="font-display text-sm font-bold text-foreground">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

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
            {filtered[selectedImage].img ? (
              <img
                src={filtered[selectedImage].img}
                alt={filtered[selectedImage].title}
                className="w-full rounded-xl shadow-2xl"
              />
            ) : (
              <div className="w-full aspect-video bg-muted rounded-xl flex items-center justify-center text-muted-foreground text-lg">
                {filtered[selectedImage].title}
              </div>
            )}
            <div className="mt-4 text-center">
              <span className="text-xs text-accent font-body">{filtered[selectedImage].category}</span>
              <h3 className="font-display text-xl font-bold text-foreground mt-1">{filtered[selectedImage].title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
