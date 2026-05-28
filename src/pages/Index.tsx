import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

type IconName =
  | "Home" | "Search" | "Bell" | "Mail" | "Hash"
  | "User" | "Settings" | "Feather" | "MoreHorizontal";

type NavItem = { label: string; icon: IconName };

const NAV: NavItem[] = [
  { label: "Home", icon: "Home" },
  { label: "Search", icon: "Search" },
  { label: "Notifications", icon: "Bell" },
  { label: "Chat", icon: "Mail" },
  { label: "Feeds", icon: "Hash" },
  { label: "Profile", icon: "User" },
  { label: "Settings", icon: "Settings" },
];

type Post = {
  name: string;
  handle: string;
  time: string;
  text: string;
  replies: number;
  reposts: number;
  likes: number;
};

const POSTS: Post[] = [
  {
    name: "Ada Lovelace",
    handle: "@ada.bsky.social",
    time: "2h",
    text: "Just shipped a tiny analytical engine update. The future is computable.",
    replies: 12,
    reposts: 34,
    likes: 189,
  },
  {
    name: "Carl Sagan",
    handle: "@carl.bsky.social",
    time: "5h",
    text: "We are made of star-stuff. Somewhere, something incredible is waiting to be known.",
    replies: 88,
    reposts: 420,
    likes: 2300,
  },
  {
    name: "Grace Hopper",
    handle: "@grace.bsky.social",
    time: "1d",
    text: "The most dangerous phrase in the language is: we've always done it this way.",
    replies: 24,
    reposts: 150,
    likes: 980,
  },
];

const Index = () => {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const bg = dark ? "#0D0D0D" : "#F2EDE4";
  const border = "#2E2E2E";
  const text = dark ? "#F2EDE4" : "#0D0D0D";
  const muted = dark ? "#7A7A7A" : "#6B6B66";
  const surface = dark ? "#161616" : "#FFFFFF";
  const accent = "#1185FE";

  return (
    <div
      className="min-h-screen flex justify-center font-golos"
      style={{ background: bg, color: text }}
    >
      {/* Left sidebar */}
      <aside
        className="hidden md:flex flex-col h-screen sticky top-0 shrink-0 py-6 pr-8"
        style={{ width: 240, marginRight: 50 }}
      >
        <div className="flex items-center gap-2 px-3 mb-8">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: accent }}
          >
            <Icon name="Cloud" size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Bluesky</span>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV.map((item) => {
            const isActive = active === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActive(item.label)}
                className="flex items-center gap-4 px-3 py-2.5 rounded-full text-[17px] transition-colors"
                style={{
                  color: text,
                  background: isActive ? (dark ? "#1A1A1A" : "#FFFFFF") : "transparent",
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                <Icon name={item.icon} size={24} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <button
          className="mt-6 flex items-center justify-center gap-2 py-3 rounded-full font-bold text-white text-[16px]"
          style={{ background: accent }}
        >
          <Icon name="Feather" size={18} />
          New Post
        </button>

        <div className="mt-auto flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full"
              style={{ background: dark ? "#2E2E2E" : "#D8D2C6" }}
            />
            <div className="leading-tight">
              <div className="text-[14px] font-semibold">You</div>
              <div className="text-[13px]" style={{ color: muted }}>
                @you.bsky.social
              </div>
            </div>
          </div>
          <button
            onClick={() => setDark(!dark)}
            className="w-8 h-8 flex items-center justify-center rounded-full"
            style={{ color: muted }}
            aria-label="Сменить тему"
          >
            <Icon name={dark ? "Sun" : "Moon"} size={18} />
          </button>
        </div>
      </aside>

      {/* Center content */}
      <main
        className="shrink-0 min-h-screen"
        style={{ width: 600, borderLeft: `1px solid ${border}`, borderRight: `1px solid ${border}` }}
      >
        <div
          className="sticky top-0 z-10 px-4 py-3 backdrop-blur-md"
          style={{
            borderBottom: `1px solid ${border}`,
            background: dark ? "rgba(13,13,13,0.8)" : "rgba(242,237,228,0.8)",
          }}
        >
          <h1 className="text-[20px] font-bold">Home</h1>
        </div>

        {/* Composer */}
        <div className="flex gap-3 px-4 py-4" style={{ borderBottom: `1px solid ${border}` }}>
          <div className="w-10 h-10 rounded-full shrink-0" style={{ background: dark ? "#2E2E2E" : "#D8D2C6" }} />
          <div className="flex-1">
            <input
              placeholder="What's up?"
              className="w-full bg-transparent outline-none text-[18px] py-2"
              style={{ color: text }}
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-1.5 rounded-full text-white text-[14px] font-bold"
                style={{ background: accent }}
              >
                Post
              </button>
            </div>
          </div>
        </div>

        {/* Feed */}
        {POSTS.map((post, i) => (
          <article
            key={i}
            className="flex gap-3 px-4 py-4 cursor-pointer transition-colors hover:brightness-105"
            style={{ borderBottom: `1px solid ${border}` }}
          >
            <div className="w-10 h-10 rounded-full shrink-0" style={{ background: dark ? "#2E2E2E" : "#D8D2C6" }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[15px]">
                <span className="font-bold">{post.name}</span>
                <span style={{ color: muted }}>{post.handle}</span>
                <span style={{ color: muted }}>·</span>
                <span style={{ color: muted }}>{post.time}</span>
              </div>
              <p className="text-[15px] mt-0.5 leading-relaxed">{post.text}</p>
              <div className="flex items-center gap-12 mt-3 text-[13px]" style={{ color: muted }}>
                <span className="flex items-center gap-1.5">
                  <Icon name="MessageCircle" size={16} /> {post.replies}
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="Repeat2" size={16} /> {post.reposts}
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="Heart" size={16} /> {post.likes}
                </span>
                <Icon name="MoreHorizontal" size={16} />
              </div>
            </div>
          </article>
        ))}
      </main>

      {/* Right sidebar */}
      <aside
        className="hidden lg:flex flex-col h-screen sticky top-0 shrink-0 py-6"
        style={{ width: 300, marginLeft: 100 }}
      >
        <div
          className="flex items-center gap-2 px-4 h-11 rounded-full mb-5"
          style={{ background: surface, border: `1px solid ${border}` }}
        >
          <Icon name="Search" size={18} style={{ color: muted }} />
          <input
            placeholder="Search"
            className="bg-transparent outline-none flex-1 text-[15px]"
            style={{ color: text }}
          />
        </div>

        <div
          className="rounded-2xl p-4"
          style={{ background: surface, border: `1px solid ${border}` }}
        >
          <h2 className="text-[18px] font-bold mb-3">Trending</h2>
          {["#OpenSource", "#WebDev", "#Space", "#Design"].map((tag) => (
            <div key={tag} className="py-2 cursor-pointer">
              <div className="text-[13px]" style={{ color: muted }}>
                Trending now
              </div>
              <div className="text-[15px] font-semibold">{tag}</div>
            </div>
          ))}
        </div>

        <div className="mt-auto text-[13px] px-2" style={{ color: muted }}>
          © 2026 Bluesky · Privacy · Terms
        </div>
      </aside>
    </div>
  );
};

export default Index;
