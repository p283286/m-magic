import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Trash2, Edit2, Plus, RotateCcw, Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  getPortfolioItems,
  savePortfolioItems,
  resetPortfolioItems,
  type PortfolioItem,
} from "@/lib/portfolioData";

const ADMIN_USER = "admin";
const ADMIN_PASS = "asdqwe123P283286";
const AUTH_KEY = "mmagic_admin_auth";

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem(AUTH_KEY, "1");
      onLogin();
    } else {
      setError("用戶名或密碼錯誤");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-gradient-magic mb-2">M-Magic</h1>
          <p className="text-muted-foreground font-body">後台管理系統</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div>
            <Label htmlFor="username" className="font-body">用戶名</Label>
            <Input id="username" value={username} onChange={e => setUsername(e.target.value)} className="mt-1" autoFocus />
          </div>
          <div>
            <Label htmlFor="password" className="font-body">密碼</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1" />
          </div>
          {error && <p className="text-destructive text-sm font-body">{error}</p>}
          <Button type="submit" className="w-full bg-gradient-magic text-primary-foreground">登入</Button>
        </form>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [items, setItems] = useState<PortfolioItem[]>(getPortfolioItems());
  const [editItem, setEditItem] = useState<PortfolioItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    savePortfolioItems(items);
  }, [items]);

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    window.location.reload();
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
    toast({ title: "已刪除", description: "作品已移除" });
  };

  const handleSave = () => {
    if (!editItem) return;
    if (!editItem.title || !editItem.category) {
      toast({ title: "錯誤", description: "請填寫標題和分類", variant: "destructive" });
      return;
    }
    if (isNew) {
      setItems(prev => [...prev, editItem]);
    } else {
      setItems(prev => prev.map(i => (i.id === editItem.id ? editItem : i)));
    }
    setEditItem(null);
    toast({ title: "已儲存" });
  };

  const handleReset = () => {
    resetPortfolioItems();
    setItems(getPortfolioItems());
    toast({ title: "已重置", description: "作品集已恢復預設" });
  };

  const openNew = () => {
    setIsNew(true);
    setEditItem({ id: Date.now().toString(), img: "", title: "", category: "" });
  };

  const openEdit = (item: PortfolioItem) => {
    setIsNew(false);
    setEditItem({ ...item });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft size={18} />
            </Button>
            <h1 className="font-display text-lg font-bold text-gradient-magic">後台管理</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReset} className="gap-1">
              <RotateCcw size={14} /> 重置
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1 text-destructive">
              <LogOut size={14} /> 登出
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground">作品集管理</h2>
          <Button onClick={openNew} className="bg-gradient-magic text-primary-foreground gap-1">
            <Plus size={16} /> 新增作品
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-card border border-border rounded-xl overflow-hidden group">
              <div className="aspect-[4/3] bg-muted relative">
                {item.img ? (
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm font-body">無圖片</div>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs text-accent font-body mb-1">{item.category}</p>
                <p className="text-sm font-display font-bold text-foreground truncate">{item.title}</p>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => openEdit(item)}>
                    <Edit2 size={12} /> 編輯
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(item.id)}>
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Dialog open={!!editItem} onOpenChange={open => !open && setEditItem(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">{isNew ? "新增作品" : "編輯作品"}</DialogTitle>
          </DialogHeader>
          {editItem && (
            <div className="space-y-4">
              <div>
                <Label className="font-body">標題</Label>
                <Input value={editItem.title} onChange={e => setEditItem({ ...editItem, title: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="font-body">分類</Label>
                <Input value={editItem.category} onChange={e => setEditItem({ ...editItem, category: e.target.value })} className="mt-1" placeholder="例：舞台表演" />
              </div>
              <div>
                <Label className="font-body">圖片網址</Label>
                <Input value={editItem.img} onChange={e => setEditItem({ ...editItem, img: e.target.value })} className="mt-1" placeholder="https://..." />
              </div>
              {editItem.img && (
                <div className="aspect-[4/3] rounded-lg overflow-hidden border border-border">
                  <img src={editItem.img} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditItem(null)}>取消</Button>
            <Button onClick={handleSave} className="bg-gradient-magic text-primary-foreground gap-1">
              <Save size={14} /> 儲存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === "1");

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;
  return <AdminDashboard />;
}
