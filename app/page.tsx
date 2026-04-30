'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ThemeAnimationType, useModeAnimation } from 'react-theme-switch-animation';
import { 
  UploadCloud, FileText, CheckCircle2, 
  ShieldAlert, AlertTriangle, Activity, Mail, Home, 
  FolderOpen, ShieldCheck, BookOpen, Search, Eye,
  Sun, Moon, RotateCcw, Users
} from 'lucide-react';

// IMPORT KOMPONEN UI
import { AuroraText } from '../components/ui/aurora-text';
import { Dock, DockIcon } from '../components/ui/dock';
import { ScrollVelocityContainer, ScrollVelocityRow } from '../components/ui/scroll-based-velocity';
import SoftAurora from '../components/SoftAurora';

// ─── KOMPONEN INSTAGRAM CUSTOM ───────────────────────
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

// ─── KOMPONEN WHATSAPP CUSTOM ───────────────────────
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

// ─── KOMPONEN LINKEDIN CUSTOM ───────────────────────
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

// ─── REVEAL BLOCK ──────────────────────────
function RevealBlock({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string; }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── INTERFACES ───────────────────────────────────────────────────
interface DetectionRecord {
  id: number;
  filename: string;
  ai_probability: number;
  status: string;
}

// ─── DATA TEAM AMANIN (8 ORANG) ──────────────────────────────────
const TEAM_MEMBERS = [
  {
    name: "Bagas Haris Saputro",
    role: "Ketua",
    desc: "Menentukan arah besar proyek dan mengambil keputusan krusial",
    image: "/team/member-1.jpeg",
    instagram: "https://www.instagram.com/bagasharis6_?igsh=bm45ODI2cWQzNWJo&utm_source=qr",
    linkedin: "https://www.linkedin.com/in/bagasharis/"
  },
  {
    name: "Muhamad Davi Ardian",
    role: "Sekretaris & Bendahara",
    desc: "Mengelola surat-menyurat, proposal, dan pengarsipan data/dokumentasi.",
    image: "/team/member-2.jpg",
    instagram: "https://www.instagram.com/dviardian/",
    linkedin: "https://www.linkedin.com/in/daviardian/"
  },
  {
    name: "Marshall Rasendria Mahendra",
    role: "Web Developer",
    desc: "Membangun Website AMANIN dan membuat sistem AI Detection",
    image: "/team/member-3.jpeg",
    instagram: "https://instagram.com/mxslr",
    linkedin: "https://linkedin.com/in/mxslr"
  },
  {
    name: "Naufal Athalino",
    role: "Divisi Humas",
    desc: "Membangun hubungan dengan pihak-pihak terkait",
    image: "/team/member-4.jpeg",
    instagram: "https://www.instagram.com/athalino?igsh=OGhqdDhyeGw0Y3d4&utm_source=qr",
    linkedin: "https://www.linkedin.com/in/naufalathalinobakti/"
  },
  {
    name: "Aurellia Verly",
    role: "Divisi Acara",
    desc: "Menyusun konsep edukasi dan mengatur jadwal kegiatan.",
    image: "/team/member-5.jpeg",
    instagram: "https://www.instagram.com/aurelliavrly?igsh=Z3hzaXRpZ2NwdDNy",
    linkedin: "https://www.linkedin.com/in/aurelliaverly/"
  },
  {
    name: "M. Rizki Aulia",
    role: "Divisi Acara",
    desc: "Memastikan materi yang disampaikan mudah diterima masyarakat awam.",
    image: "/team/member-6.jpg",
    instagram: "https://www.instagram.com/mr_awsz_",
    linkedin: "https://www.linkedin.com/in/mrawsz/"
  },
  {
    name: "Cheisya Valda W",
    role: "Divisi Pemateri",
    desc: "Menjelaskan materi dengan bahasa yang sederhana, namun tetap akurat.",
    image: "/team/member-7.jpg",
    instagram: "",
    linkedin: "https://www.linkedin.com/in/cheisyavalda/"
  },
  {
    name: "Setyorini Okviana",
    role: "Divisi Pemateri",
    desc: "Melakukan simulasi cara membedakan mana konten asli dan mana konten hasil manipulasi AI secara langsung.",
    image: "/team/member-8.jpeg",
    instagram: "https://www.instagram.com/setyoriniokviana_?igsh=ZXN5dm1peGhraDll",
    linkedin: "https://www.linkedin.com/in/setyoriniokviana"
  },
];

// ─── MAIN APP ─────────────────────────────────────────────────────
export default function HomeApp() {
const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({ animationType: ThemeAnimationType.CIRCLE });

useEffect(() => {
  document.documentElement.classList.add('dark');
}, []);

  const [showSplash, setShowSplash] = useState(true);
  const [splashExiting, setSplashExiting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<DetectionRecord[]>([]);
  const [currentResult, setCurrentResult] = useState<DetectionRecord | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  document.documentElement.classList.add('dark');
  setMounted(true);
  const t1 = setTimeout(() => setSplashExiting(true), 1800);
  const t2 = setTimeout(() => setShowSplash(false), 2700);
  return () => { clearTimeout(t1); clearTimeout(t2); };
}, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setCurrentResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Contoh:
      const response = await fetch('https://mxslr-amanin-api.hf.space/api/detect', { 
          method: 'POST', 
          body: formData 
      });
      const data = await response.json();
      if (response.ok && data.status === 'success') {
        setCurrentResult(data);
        setHistory(prevHistory => [data, ...prevHistory]);
      } else {
        alert(`Gagal: ${data.message}`);
      }
    } catch (error) {
      alert('Terjadi kesalahan saat menghubungi server.');
    } finally {
      setIsLoading(false);
    }
  };

  const scrollTo = (id: string) => {
    if (!id) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const totalScans = history.length;
  const dangerCount = history.filter(h => h.ai_probability > 75).length;
  const secureCount = history.filter(h => h.ai_probability <= 40).length;

  const NAV_ITEMS = [
    { label: 'Home', icon: Home, id: 'home' },
    { label: 'Edukasi', icon: BookOpen, id: 'edukasi' },
    { label: 'Scanner', icon: FolderOpen, id: 'scanner' },
    { label: 'Team', icon: Users, id: 'team' },
  ];

  const SOCIAL_ITEMS = [
    { label: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com/amanin.project' },
    { label: 'WhatsApp', icon: WhatsAppIcon, href: 'https://wa.me/62812818813' } 
  ];

  if (!mounted) return null;

  return (
    <main className="relative min-h-[100dvh] bg-white dark:bg-black text-black dark:text-white font-sans selection:bg-gray-200 dark:selection:bg-zinc-800 overflow-x-hidden pb-32 transition-colors duration-500 z-0">
      
      {/* ── SPLASH SCREEN ────────────────────── */}
      {showSplash && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-white dark:bg-black transition-colors duration-500"
          animate={splashExiting ? { clipPath: ['circle(150% at 50% 50%)', 'circle(0% at 50% 50%)'] } : { clipPath: 'circle(150% at 50% 50%)' }}
          transition={splashExiting ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] } : {}}
        >
          <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15, duration: 0.5 }} className="text-center z-10 px-6">
            <img src="/logo-amanin.png" alt="Logo AMANIN" className="w-24 h-24 mx-auto mb-6 object-contain animate-pulse" />
            <motion.h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tighter" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
              &lt;Welcome to AMANIN /&gt;
            </motion.h1>
            <motion.div className="h-[2px] bg-black dark:bg-white mx-auto rounded-full transition-colors duration-500" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.6, duration: 1.1, ease: 'easeInOut' }} />
            <motion.p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-zinc-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 0.4 }}>
              Menginisiasi Sistem Keamanan...
            </motion.p>
          </motion.div>
        </motion.div>
      )}

      {/* ── HEADER ─────────────── */}
      <header className="fixed top-0 inset-x-0 z-[100] flex justify-between items-center px-6 md:px-12 py-4 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-black/10 dark:border-white/10 transition-colors duration-500">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:opacity-50 transition-opacity flex items-center gap-3">
          <img src="/logo-amanin.png" alt="Logo AMANIN" className="w-7 h-7 object-contain" />
          <span className="text-xl md:text-2xl font-black tracking-tighter">AMANIN</span>
        </button>
        <div className="flex items-center gap-6">
          <button
            ref={ref as any} onClick={toggleSwitchTheme}
            className="p-2 rounded-xl border border-black/15 dark:border-white/15 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ── FLOATING DOCK (Hanya Navigasi Utama) ─────────── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200]">
        <Dock direction="middle">
          {NAV_ITEMS.map((item) => (
            <DockIcon key={item.label}>
              <div className="relative group/tip w-full h-full flex items-center justify-center">
                <button
                  onClick={() => scrollTo(item.id)}
                  className="flex items-center justify-center w-full h-full rounded-full text-zinc-600 dark:text-zinc-400 bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                >
                  <item.icon className="w-5 h-5" />
                </button>
                <span className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-3 py-1.5 opacity-0 group-hover/tip:opacity-100 transition-opacity shadow-lg">
                  {item.label}
                </span>
              </div>
            </DockIcon>
          ))}
        </Dock>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-32">
 {/* ── SECTION 1: HOMEPAGE ────────────────── */}
        <section id="home" className="min-h-[calc(100dvh-8rem)] flex flex-col justify-center items-center text-center pb-24 md:pb-32 pt-0 relative">
          
          {/* EFEK SOFT AURORA KHUSUS MAIN PAGE */}
          <div className="absolute top-[-128px] left-1/2 -translate-x-1/2 w-screen h-[calc(100%+128px)] -z-10 overflow-hidden [mask-image:linear-gradient(to_bottom,white_70%,transparent_100%)] pointer-events-none">
            <SoftAurora
            speed={0.6}
            scale={1}
            brightness={1}
            color1="#f7f7f7"
            color2="#ebebeb"
            noiseFrequency={2}
            noiseAmplitude={1}
            bandHeight={0.5}
            bandSpread={1}
            octaveDecay={0.1}
            layerOffset={0}
            colorSpeed={1}
            enableMouseInteraction={false}
            mouseInfluence={0.25}
          />
          </div>

          {/* PERUBAHAN: Menambahkan mt-[-2rem] md:mt-[-4rem] untuk menarik konten ke atas */}
          <RevealBlock className="mt-[-2rem] md:mt-[-4rem]">
            
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 2.8, duration: 0.8 }}
              src="/logo-amanin.png" alt="Logo AMANIN" className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-1 object-contain" 
            />
            
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-7">Sistem Keamanan Digital</p>
            
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-15 leading-[0.9]">
              Deteksi Manipulasi <br/>
              <AuroraText>Berbasis AI.</AuroraText>
            </h2>
            
            <p className="max-w-2xl mx-auto text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
              Sebuah proyek kolaborasi inovatif yang merancang{" "}
              
              <span className="relative inline-block px-1 whitespace-nowrap">
                <motion.span 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut", delay: 2.5 }} 
                  style={{ transformOrigin: "left" }} 
                  className="absolute inset-0 bg-[#FF9800]/40 dark:bg-[#FF9800]/50 -skew-x-6 rounded-sm -z-10"
                />
                <span className="relative z-10 text-black dark:text-white font-bold">masa depan</span>
              </span>{" "}
              
              pertahanan digital. Kami menggunakan teknologi{" "}
              
              <span className="relative inline-block px-1 whitespace-nowrap">
                <motion.span 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut", delay: 3.5 }} 
                  style={{ transformOrigin: "left" }}
                  className="absolute inset-0 bg-[#87CEFA]/50 dark:bg-[#87CEFA]/40 -skew-x-6 rounded-sm -z-10"
                />
                <span className="relative z-10 text-black dark:text-white font-bold">Deep Learning</span>
              </span>{" "}
              
              untuk membantu Anda membedakan{" "}
              
              <span className="relative inline-block font-bold text-black dark:text-white">
                <motion.span 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 4 }} 
                  style={{ transformOrigin: "left" }}
                  className="absolute left-0 -bottom-[6px] w-full h-[3px] bg-[#4d99e0] rounded-full"
                />
                <span className="relative z-10">mana realita dan mana manipulasi</span>
              </span>.
            </p>

          </RevealBlock>
        </section>

        {/* ── SECTION 2: MODUL EDUKASI ────────────────────────── */}
        <section id="edukasi" className="py-24 border-t border-black/10 dark:border-white/10 relative z-10">
          <RevealBlock>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-2">Pusat Edukasi.</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-10 text-sm">Pelajari cara algoritma kami, dan mata Anda, dapat mendeteksi kepalsuan.</p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RevealBlock delay={0.1}>
              <div className="bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-3xl p-8 h-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group">
                <Search className="w-8 h-8 mb-6 text-zinc-400 dark:text-zinc-500 group-hover:text-white dark:group-hover:text-black" />
                <h3 className="text-lg font-bold uppercase tracking-tight mb-3">1. Anomali Piksel</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-300 dark:group-hover:text-zinc-600 leading-relaxed">
                  Gambar hasil generate AI seringkali memiliki transisi warna yang terlalu sempurna atau justru bergerigi di bagian tepi objek yang kompleks seperti rambut atau kacamata.
                </p>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.2}>
              <div className="bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-3xl p-8 h-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group">
                <Eye className="w-8 h-8 mb-6 text-zinc-400 dark:text-zinc-500 group-hover:text-white dark:group-hover:text-black" />
                <h3 className="text-lg font-bold uppercase tracking-tight mb-3">2. Bias Pencahayaan</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-300 dark:group-hover:text-zinc-600 leading-relaxed">
                  Perhatikan arah bayangan. AI generatif sering kali menggabungkan beberapa referensi gambar, sehingga bayangan objek A dan objek B bisa jatuh ke arah yang berlawanan.
                </p>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.3}>
              <div className="bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-3xl p-8 h-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group">
                <FileText className="w-8 h-8 mb-6 text-zinc-400 dark:text-zinc-500 group-hover:text-white dark:group-hover:text-black" />
                <h3 className="text-lg font-bold uppercase tracking-tight mb-3">3. Teks Ilogis</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-300 dark:group-hover:text-zinc-600 leading-relaxed">
                  Sampai saat ini, model visual kesulitan merender teks berukuran kecil di latar belakang (seperti rambu jalan atau logo baju), biasanya akan terlihat seperti coretan huruf alien.
                </p>
              </div>
            </RevealBlock>
          </div>
        </section>

        {/* ── SECTION 3: SCANNER ───────────────────────────────── */}
        <section id="scanner" className="py-24 border-t border-black/10 dark:border-white/10 relative z-10">
          <RevealBlock>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-2">Forensik Digital.</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">Unggah file untuk memverifikasi keaslian media dari manipulasi AI.</p>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="max-w-2xl mx-auto bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-3xl p-6 md:p-10 mb-12 shadow-sm transition-all min-h-[380px] flex flex-col justify-center">
              
              {!currentResult ? (
                // ─── TAMPILAN UPLOAD ───
                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                  onDrop={handleDrop}
                  className={`border-2 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all min-h-[280px]
                    ${isDragging ? 'bg-zinc-100 dark:bg-zinc-800 border-black/30 dark:border-white/30 border-dashed scale-[1.02]' : 'border-transparent'}
                  `}
                >
                  {!file ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                      <div className="bg-white dark:bg-black p-4 rounded-full mb-4 shadow-sm border border-black/5 dark:border-white/5">
                        <UploadCloud className="w-8 h-8 text-black dark:text-white" />
                      </div>
                      <h3 className="font-bold text-lg tracking-tight mb-1">Tarik & Lepas Media</h3>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-8 font-medium">Format: JPG, PNG, MP4</p>
                      <button onClick={() => fileInputRef.current?.click()} className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                        Pilih File
                      </button>
                      <input type="file" accept="image/*,video/*" className="hidden" ref={fileInputRef} onChange={(e) => e.target.files && setFile(e.target.files[0])} />
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm mx-auto">
                      <div className="bg-white dark:bg-black p-4 rounded-2xl flex items-center justify-between mb-8 border border-black/10 dark:border-white/10 shadow-sm">
                        <div className="flex items-center gap-3 overflow-hidden text-left">
                          <FileText className="w-8 h-8 text-zinc-300 dark:text-zinc-600 shrink-0" />
                          <div className="truncate">
                            <p className="font-bold text-sm truncate tracking-tight">{file.name}</p>
                            <p className="text-xs text-zinc-400 font-mono">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button onClick={() => { setFile(null); setCurrentResult(null); }} className="text-[10px] uppercase font-bold text-zinc-400 hover:text-red-500 dark:hover:text-red-400 px-2 transition-colors">Batal</button>
                      </div>
                      <button onClick={handleUpload} disabled={isLoading} className="w-full py-4 bg-black text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 flex justify-center items-center gap-3 transition-colors shadow-lg">
                        {isLoading ? <span className="animate-pulse">Menganalisis AI...</span> : <>Mulai Pemindaian <Activity className="w-4 h-4" /></>}
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                // ─── TAMPILAN HASIL ───
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md mx-auto">
                  <p className="text-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-8">Laporan Integritas Selesai</p>
                  <div className="flex flex-col items-center text-center gap-5 mb-10">
                    {currentResult.ai_probability > 75 ? (
                      <div className="bg-red-100 dark:bg-red-900/30 p-5 rounded-full shadow-inner"><ShieldAlert className="w-10 h-10 text-red-600 dark:text-red-400" /></div>
                    ) : currentResult.ai_probability > 40 ? (
                      <div className="bg-yellow-100 dark:bg-yellow-900/30 p-5 rounded-full shadow-inner"><AlertTriangle className="w-10 h-10 text-yellow-600 dark:text-yellow-400" /></div>
                    ) : (
                      <div className="bg-green-100 dark:bg-green-900/30 p-5 rounded-full shadow-inner"><CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" /></div>
                    )}
                    <div>
                      <h2 className="text-3xl font-black tracking-tighter uppercase mb-2">
                        {currentResult.ai_probability > 75 ? 'Indikasi Palsu' : currentResult.ai_probability > 40 ? 'Mencurigakan' : 'Terverifikasi Asli'}
                      </h2>
                      <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed max-w-xs mx-auto">Berdasarkan analisis anomali piksel oleh AI, media ini memiliki probabilitas manipulasi sebesar:</p>
                    </div>
                  </div>
                  
                  <div className="mb-10">
                    <div className="flex justify-between text-sm font-black uppercase tracking-widest mb-3">
                      <span className="text-zinc-500">Skor Akhir</span>
                      <span className={currentResult.ai_probability > 75 ? 'text-red-500' : currentResult.ai_probability > 40 ? 'text-yellow-500' : 'text-green-500'}>
                        {currentResult.ai_probability}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }} animate={{ width: `${currentResult.ai_probability}%` }} transition={{ duration: 1.2, ease: "easeOut" }}
                        className={`h-full ${currentResult.ai_probability > 75 ? 'bg-red-500' : currentResult.ai_probability > 40 ? 'bg-yellow-400' : 'bg-green-500'}`}
                      />
                    </div>
                  </div>

                  {/* Tombol Reset (Scan Ulang) */}
                  <button 
                    onClick={() => { setFile(null); setCurrentResult(null); }} 
                    className="w-full py-4 bg-white dark:bg-black border border-black/10 dark:border-white/10 text-black dark:text-white font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-900 flex justify-center items-center gap-3 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" /> Scan Media Lain
                  </button>
                </motion.div>
              )}

            </div>
          </RevealBlock>

          {/* Kotak Statistik Lokal */}
          <RevealBlock delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Total Scan Sesi Ini</p>
                <p className="text-4xl md:text-5xl font-black mt-3 tracking-tighter">{totalScans}</p>
              </div>
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[10px] font-bold text-red-400 dark:text-red-500 uppercase tracking-widest">Ancaman Ditepis</p>
                <p className="text-4xl md:text-5xl font-black text-red-600 dark:text-red-400 mt-3 tracking-tighter">{dangerCount}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30 rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[10px] font-bold text-green-500 dark:text-green-600 uppercase tracking-widest">Terverifikasi Asli</p>
                <p className="text-4xl md:text-5xl font-black text-green-600 dark:text-green-400 mt-3 tracking-tighter">{secureCount}</p>
              </div>
            </div>
          </RevealBlock>
        </section>

        {/* ── SECTION 4: TEAM ───────────────────────────────── */}
        <section id="team" className="py-24 border-t border-black/10 dark:border-white/10 relative z-10">
          <RevealBlock>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-2">Amanin Team.</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">The people behind AMANIN</p>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-5xl mx-auto">
            {TEAM_MEMBERS.map((member, index) => (
              <RevealBlock key={index} delay={index * 0.1}>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 group">
                  {/* Foto Profil Lokal */}
                  <div className="w-32 h-32 shrink-0 overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Info Anggota */}
                  <div className="text-center sm:text-left flex-1">
                    <h3 className="text-xl font-bold tracking-tight mb-1">{member.name}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#3bc4ff] mb-3">{member.role}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                      {member.desc}
                    </p>
                    
                    {/* Ikon Sosial Media Interaktif */}
                    <div className="flex items-center justify-center sm:justify-start gap-4 text-zinc-400 dark:text-zinc-500">
                      {member.instagram && (
                        <a href={member.instagram} target="_blank" rel="noreferrer" className="hover:text-[#E1306C] transition-colors">
                          <InstagramIcon className="w-4 h-4" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#0a66c2] transition-colors">
                          <LinkedinIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </section>

      </div>

      {/* ── SECTION VELOCITY SCROLL (FULL WIDTH) ───────────────────────── */}
      <div className="w-full py-12 md:py-24 overflow-hidden bg-white dark:bg-black relative z-10">
        <ScrollVelocityContainer className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-black/10 dark:text-white/10">
          <ScrollVelocityRow baseVelocity={4} direction={1}>
            <span className="px-4">PROJECT</span>
            <span className="px-4">AMANIN</span>
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={4} direction={-1}>
            <span className="px-4">AMANIN</span>
            <span className="px-4">PROJECT</span>
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* ── SECTION 5: CONTACT & FOOTER ───────────────────────────────── */}
        <section id="contact" className="scroll-mt-24 pt-16 pb-32 border-t border-black/10 dark:border-white/10">
          <div className="max-w-3xl mx-auto text-center">
            <RevealBlock>
              <h2 className="text-4xl md:text-6xl font-bold mb-5 uppercase tracking-tighter">Mari Berkolaborasi.</h2>
              <p className="text-zinc-500 dark:text-zinc-400 mb-10 text-base md:text-lg leading-relaxed">
                Tertarik menggunakan teknologi ini untuk institusi Anda? Atau ingin mendiskusikan implementasi keamanan digital bersama tim kami?
              </p>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=amanin.project@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest hover:opacity-80 rounded-2xl shadow-xl transition-all"
              >
                <Mail className="w-5 h-5" /> Hubungi via Gmail
              </a>
            </RevealBlock>

            <RevealBlock delay={0.15} className="flex justify-center gap-4 mt-14">
              {SOCIAL_ITEMS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  className="p-3.5 border border-black/15 dark:border-white/15 rounded-2xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all hover:shadow-lg bg-white dark:bg-zinc-900">
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </RevealBlock>

            <div className="mt-14 pt-7 border-t border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-widest text-zinc-400 flex flex-col sm:flex-row items-center justify-center gap-2">
              <span>&copy; {new Date().getFullYear()} Tim AMANIN.</span>
              <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">·</span>
              <span>
                Dibuat dengan{' '}
                <a href="https://nextjs.org" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition-colors">Next.js</a>
                {', '}
                <a href="https://tailwindcss.com" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition-colors">Tailwind CSS</a>
                {' & '}
                <a href="https://www.framer.com/motion" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition-colors">Framer Motion</a>
              </span>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}