import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import portfolio7 from "@/assets/portfolio-7.jpg";
import portfolio8 from "@/assets/portfolio-8.jpg";
import portfolio9 from "@/assets/portfolio-9.jpg";
import portfolio10 from "@/assets/portfolio-10.jpg";
import portfolio11 from "@/assets/portfolio-11.jpg";
import portfolio12 from "@/assets/portfolio-12.jpg";

export interface PortfolioItem {
  id: string;
  img: string;
  title: string;
  category: string;
}

const defaultPortfolioItems: PortfolioItem[] = [
  { id: "1", img: portfolio1, title: "舞台魔術表演", category: "舞台表演" },
  { id: "2", img: portfolio2, title: "企業晚宴近距離魔術", category: "近距離魔術" },
  { id: "3", img: portfolio3, title: "兒童魔術教學工作坊", category: "教學課程" },
  { id: "4", img: portfolio4, title: "大型幻術表演", category: "舞台表演" },
  { id: "5", img: portfolio5, title: "生日派對魔術表演", category: "派對表演" },
  { id: "6", img: portfolio6, title: "街頭魔術表演", category: "街頭魔術" },
  { id: "7", img: portfolio7, title: "白鴿魔術表演", category: "舞台表演" },
  { id: "8", img: portfolio8, title: "撲克牌近距離魔術", category: "近距離魔術" },
  { id: "9", img: portfolio9, title: "企業晚會魔術演出", category: "近距離魔術" },
  { id: "10", img: portfolio10, title: "青少年魔術課程", category: "教學課程" },
  { id: "11", img: portfolio11, title: "商場魔術活動", category: "舞台表演" },
  { id: "12", img: portfolio12, title: "婚禮魔術表演", category: "派對表演" },
];

const STORAGE_KEY = "mmagic_portfolio";

export function getPortfolioItems(): PortfolioItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultPortfolioItems;
}

export function savePortfolioItems(items: PortfolioItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function resetPortfolioItems() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getCategories(items: PortfolioItem[]): string[] {
  const cats = new Set(items.map(i => i.category));
  return ["全部", ...Array.from(cats)];
}
