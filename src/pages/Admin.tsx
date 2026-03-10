import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Trash2, Edit2, Plus, RotateCcw, Save, ArrowLeft, Loader2 } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";

interface PortfolioItem {
  id: string;
  img: string;
  title: string;
  category: string;
  sort_order: number;
}

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("電郵或密碼錯誤");
      setLoading(false);
      return;
    }

    // Check admin role
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("登入失敗");
      setLoading(false);
      return;
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) {
      await supabase.auth.signOut();
      setError("你沒有管理員權限");
      setLoading(false);
      return;
    }

    onLogin();
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
            <Label htmlFor="email" className="font-body">電郵</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1" autoFocus />
          </div>
          <div>
            <Label htmlFor="password" className="font-body">密碼</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1" />
          </div>
          {error && <p className="text-destructive text-sm font-body">{error}</p>}
          <Button type="submit" className="w-full bg-gradient-magic text-primary-foreground" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            登入
          </Button>
        </form>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [editItem, setEditItem] = useState<PortfolioItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const { data } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("sort_order");
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
    if (error) {
      toast({ title: "錯誤", description: error.message, variant: "destructive" });
      return;
    }
    setItems(prev => prev.filter(i => i.id !== id));
    toast({ title: "已刪除", description: "作品已移除" });
  };

  const handleSave = async () => {
    if (!editItem) return;
    if (!editItem.title || !editItem.category) {
      toast({ title: "錯誤", description: "請填寫標題和分類", variant: "destructive" });
      return;
    }

    if (isNew) {
      const { data, error } = await supabase
        .from("portfolio_items")
        .insert({ img: editItem.img, title: editItem.title, category: editItem.category, sort_order: items.length + 1 })
        .select()
        .single();
      if (error) {
        toast({ title: "錯誤", description: error.message, variant: "destructive" });
        return;
      }
      setItems(prev => [...prev, data]);
    } else {
      const { error } = await supabase
        .from("portfolio_items")
        .update({ img: editItem.img, title: editItem.title, category: editItem.category })
        .eq("id", editItem.id);
      if (error) {
        toast({ title: "錯誤", description: error.message, variant: "destructive" });
        return;
      }
      setItems(prev => prev.map(i => (i.id === editItem.id ? { ...i, ...editItem } : i)));
    }
    setEditItem(null);
    toast({ title: "已儲存" });
  };

  const openNew = () => {
    setIsNew(true);
    setEditItem({ id: "", img: "", title: "", category: "", sort_order: 0 });
  };

  const openEdit = (item: PortfolioItem) => {
    setIsNew(false);
    setEditItem({ ...item });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setAuthed(false);
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin");
      setAuthed(roles && roles.length > 0);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });

    return () => subscription.unsubscribe();
  }, []);

  if (authed === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;
  return <AdminDashboard />;
}
