import { Mail, Phone, Printer, Smartphone, Instagram, Facebook, ExternalLink, Sparkles, Star, Wand2 } from "lucide-react";
import heroImage from "@/assets/hero-magic.jpg";
import logoImage from "@/assets/magic-logo.png";

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={logoImage} alt="M-Magic Logo" className="w-10 h-10 object-contain" />
        <span className="font-display text-xl font-bold text-gradient-magic">M-Magic</span>
      </div>
      <nav className="hidden md:flex items-center gap-6 text-sm font-body">
        <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">關於我們</a>
        <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">服務</a>
        <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">聯絡</a>
      </nav>
      <div className="flex items-center gap-3">
        <a href="https://www.instagram.com/m_magic.hk/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Instagram size={20} />
        </a>
        <a href="https://www.facebook.com/profile.php?id=100063671511395" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Facebook size={20} />
        </a>
      </div>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImage} alt="Magic performance" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
    </div>
    <div className="relative z-10 container mx-auto px-4 text-center">
      <div className="animate-fade-in-up">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/10">
          <Sparkles size={16} className="text-primary" />
          <span className="text-sm text-primary font-body">Since 2000</span>
        </div>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-wider">
          <span className="text-gradient-magic">M-MAGIC</span>
        </h1>
        <p className="font-display text-xl md:text-2xl text-foreground/80 mb-2 tracking-wide">
          ENTERTAINMENT
        </p>
        <p className="text-2xl md:text-3xl font-body font-bold text-foreground/90 mb-8">
          魔術娛樂製作
        </p>
        <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto mb-10 leading-relaxed">
          魔術表演指導、相關訓練課程 及 道具租賃服務
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact" className="bg-gradient-magic text-primary-foreground px-8 py-3 rounded-lg font-body font-medium hover:opacity-90 transition-opacity shadow-glow">
            聯絡我們
          </a>
          <a href="#about" className="border border-primary/40 text-foreground px-8 py-3 rounded-lg font-body font-medium hover:bg-primary/10 transition-colors">
            了解更多
          </a>
        </div>
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section id="about" className="py-20 md:py-28 bg-gradient-dark">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/30" />
          <Star size={20} className="text-accent" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient-magic">關於我們</h2>
          <Star size={20} className="text-accent" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/30" />
        </div>
        <div className="space-y-6 text-foreground/80 font-body text-lg leading-relaxed">
          <p>
            <span className="text-accent font-bold">陳偉賢 先生 Mr. Mike Chan</span> 於2000年成立 M-Magic Entertainment。
          </p>
          <p>提供舞台表演及各種魔術教學課程為主。專為個人或各類團體設計合適的項目，並不斷致力向各界推廣魔術。</p>
          <div className="border border-border rounded-xl p-6 bg-card/50">
            <p className="text-muted-foreground text-base">
              本公司已獲<span className="text-foreground font-medium">信和集團</span>、<span className="text-foreground font-medium">康樂及文化事務署</span>及<span className="text-foreground font-medium">長江集團</span>(旗下公司)認可為合資格節目和活動製作服務之承辦商及供應商。
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const services = [
  { icon: Wand2, title: "舞台魔術表演", desc: "為各類型活動提供精彩的舞台魔術表演" },
  { icon: Star, title: "魔術教學課程", desc: "針對不同程度提供專業的魔術訓練課程" },
  { icon: Sparkles, title: "道具租賃服務", desc: "提供各類專業魔術道具租賃" },
];

const ServicesSection = () => (
  <section id="services" className="py-20 md:py-28">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient-magic mb-4">我們的服務</h2>
        <p className="text-muted-foreground font-body">專業魔術娛樂解決方案</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {services.map((s, i) => (
          <div key={i} className="group bg-card border border-border rounded-2xl p-8 hover:border-primary/40 hover:shadow-glow transition-all duration-300">
            <div className="w-14 h-14 rounded-xl bg-gradient-magic flex items-center justify-center mb-6 group-hover:animate-float">
              <s.icon size={24} className="text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-3">{s.title}</h3>
            <p className="text-muted-foreground font-body">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const contactInfo = [
  { icon: Mail, label: "電郵", value: "info@m-magic.hk", href: "mailto:info@m-magic.hk" },
  { icon: Smartphone, label: "WhatsApp", value: "+852-6378 9026", href: "https://wa.me/85263789026" },
  { icon: Phone, label: "電話", value: "+852-2782 5253", href: "tel:+85227825253" },
  { icon: Printer, label: "傳真", value: "+852-2782 6465", href: null },
];

const ContactSection = () => (
  <section id="contact" className="py-20 md:py-28 bg-gradient-dark">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient-magic mb-4">聯絡我們</h2>
        <p className="text-muted-foreground font-body mb-12">歡迎查詢任何魔術表演及課程資訊</p>
        <div className="grid sm:grid-cols-2 gap-6">
          {contactInfo.map((c, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 flex items-center gap-4 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <c.icon size={22} className="text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground font-body mb-1">{c.label}</p>
                {c.href ? (
                  <a href={c.href} className="text-foreground font-body font-medium hover:text-primary transition-colors">{c.value}</a>
                ) : (
                  <p className="text-foreground font-body font-medium">{c.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-muted-foreground font-body mb-4">推薦網頁</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="http://www.cltd.com.hk/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors font-body">
              <ExternalLink size={14} /> www.CLtd.com.hk
            </a>
            <a href="http://www.mikesir.hk/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors font-body">
              <ExternalLink size={14} /> www.MikeSir.hk
            </a>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-muted-foreground font-body mb-4">最新消息請在 IG / Facebook 專頁瀏覽</p>
          <div className="flex items-center justify-center gap-4">
            <a href="https://www.instagram.com/m_magic.hk/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-colors">
              <Instagram size={22} className="text-primary" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100063671511395" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-colors">
              <Facebook size={22} className="text-primary" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-8 border-t border-border">
    <div className="container mx-auto px-4 text-center">
      <p className="text-muted-foreground font-body text-sm">
        © 2000 - {new Date().getFullYear()} M-Magic Entertainment 魔術娛樂製作. All rights reserved.
      </p>
    </div>
  </footer>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
