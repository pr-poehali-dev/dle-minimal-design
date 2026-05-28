import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const MOCK_POSTS = [
  {
    id: 1,
    category: "Технологии",
    title: "Новые горизонты веб-разработки в 2026 году",
    excerpt: "Искусственный интеллект меняет подход к созданию интерфейсов — от прототипирования до финального кода.",
    date: "28 мая 2026",
    views: 1240,
    comments: 14,
  },
  {
    id: 2,
    category: "Дизайн",
    title: "Минимализм как философия: меньше значит больше",
    excerpt: "Чистые линии, белое пространство и типографика — три кита современного цифрового дизайна.",
    date: "27 мая 2026",
    views: 870,
    comments: 9,
  },
  {
    id: 3,
    category: "Бизнес",
    title: "Как небольшая команда запустила продукт за три недели",
    excerpt: "История о фокусе, скорости и правильных инструментах. Без венчурного финансирования и лишних совещаний.",
    date: "26 мая 2026",
    views: 2100,
    comments: 31,
  },
  {
    id: 4,
    category: "Культура",
    title: "Читать или смотреть: дилемма цифрового поколения",
    excerpt: "Длинные тексты возвращаются. Почему нарратив снова в центре внимания аудитории.",
    date: "25 мая 2026",
    views: 540,
    comments: 7,
  },
];

const CATEGORIES = ["Все", "Технологии", "Дизайн", "Бизнес", "Культура"];

type LessonStatus = "done" | "active" | "locked";
type Lesson = {
  title: string;
  type: "Theory" | "Practice";
  duration: string;
  status: LessonStatus;
};
type Module = {
  id: string;
  title: string;
  label: string;
  lessons: Lesson[];
};

const MODULES: Module[] = [
  {
    id: "m1",
    title: "LLM Foundations",
    label: "Module 1",
    lessons: [
      { title: "What is an LLM", type: "Theory", duration: "18:20", status: "done" },
      { title: "Tokenization Basics", type: "Theory", duration: "14:05", status: "done" },
      { title: "Prompt Engineering", type: "Practice", duration: "22:40", status: "done" },
      { title: "Context Windows", type: "Theory", duration: "11:30", status: "done" },
      { title: "Fine-tuning Overview", type: "Theory", duration: "19:50", status: "done" },
      { title: "Evaluation Metrics", type: "Practice", duration: "25:10", status: "done" },
    ],
  },
  {
    id: "m2",
    title: "Building Autonomous Agents",
    label: "Module 2",
    lessons: [
      { title: "ReAct and Chain-of-Thought", type: "Theory", duration: "24:12", status: "done" },
      { title: "Giving LLMs Access to External APIs", type: "Theory", duration: "16:40", status: "done" },
      { title: "Memory Management: Long-term vs Short-term", type: "Practice", duration: "32:05", status: "active" },
      { title: "RAG Explained", type: "Theory", duration: "12:09", status: "locked" },
      { title: "Build a Research Assistant Agent", type: "Practice", duration: "19:17", status: "locked" },
      { title: "Handling Multi-turn Conversations", type: "Theory", duration: "17:03", status: "locked" },
      { title: "Tool Selection Strategies", type: "Theory", duration: "14:22", status: "locked" },
      { title: "Error Recovery", type: "Practice", duration: "20:11", status: "locked" },
      { title: "Agent Debugging", type: "Practice", duration: "18:45", status: "locked" },
    ],
  },
  {
    id: "m3",
    title: "Multi-Agent Systems & Deployment",
    label: "Module 3",
    lessons: [
      { title: "Orchestration Patterns", type: "Theory", duration: "21:00", status: "done" },
      { title: "Agent Communication", type: "Theory", duration: "17:30", status: "done" },
      { title: "Production Monitoring", type: "Practice", duration: "26:15", status: "done" },
      { title: "Scaling Strategies", type: "Theory", duration: "19:40", status: "locked" },
      { title: "Cost Optimization", type: "Practice", duration: "22:05", status: "locked" },
      { title: "Security Best Practices", type: "Theory", duration: "15:50", status: "locked" },
      { title: "Final Project", type: "Practice", duration: "45:00", status: "locked" },
    ],
  },
];

const Index = () => {
  const [dark, setDark] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openModule, setOpenModule] = useState<string>("m2");
  const [activePanel, setActivePanel] = useState<"lessons" | "chat">("lessons");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const filtered = MOCK_POSTS.filter((p) => {
    const matchCat = activeCategory === "Все" || p.category === activeCategory;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const totalLessons = MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const doneLessons = MODULES.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.status === "done").length,
    0
  );
  const progressPercent = Math.round((doneLessons / totalLessons) * 100);

  return (
    <div
      className="min-h-screen font-golos transition-colors duration-300"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ background: "var(--bg)", borderColor: "var(--border-color)" }}
      >
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
          <a href="/" className="font-cormorant text-xl font-semibold tracking-wide select-none">
            DLE<span style={{ color: "var(--muted-text)" }}>/</span>Site
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="text-sm transition-opacity duration-200"
                style={{
                  opacity: activeCategory === cat ? 1 : 0.45,
                  fontWeight: activeCategory === cat ? 600 : 400,
                  color: "var(--fg)",
                }}
              >
                {cat}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm rounded-sm"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
            >
              <Icon name="Search" size={13} style={{ color: "var(--muted-text)" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск..."
                className="bg-transparent outline-none w-28 text-sm"
                style={{ color: "var(--fg)" }}
              />
            </div>

            <button
              onClick={() => setDark(!dark)}
              className="w-8 h-8 flex items-center justify-center rounded-sm transition-colors duration-200"
              style={{ border: "1px solid var(--border-color)", color: "var(--fg)" }}
              aria-label="Сменить тему"
            >
              <Icon name={dark ? "Sun" : "Moon"} size={14} />
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-sm"
              style={{ border: "1px solid var(--border-color)", color: "var(--fg)" }}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={14} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="md:hidden border-t px-5 py-4 flex flex-col gap-3 animate-fade-in"
            style={{ background: "var(--bg)", borderColor: "var(--border-color)" }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setMenuOpen(false); }}
                className="text-left text-sm"
                style={{
                  opacity: activeCategory === cat ? 1 : 0.5,
                  fontWeight: activeCategory === cat ? 600 : 400,
                  color: "var(--fg)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main layout: content + right panel */}
      <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
        {/* Left: content */}
        <main>
          {filtered.length === 0 ? (
            <div className="text-center py-24 animate-fade-in">
              <p className="font-cormorant text-3xl" style={{ color: "var(--muted-text)" }}>
                Ничего не найдено
              </p>
            </div>
          ) : (
            <>
              {featured && (
                <article
                  className="mb-10 pb-10 border-b animate-fade-in-up cursor-pointer group"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--muted-text)" }}>
                      {featured.category}
                    </span>
                    <span style={{ color: "var(--border-color)" }}>·</span>
                    <span className="text-xs" style={{ color: "var(--muted-text)" }}>
                      {featured.date}
                    </span>
                  </div>
                  <h1
                    className="font-cormorant text-4xl md:text-5xl font-semibold leading-tight mb-4 group-hover:opacity-75 transition-opacity duration-200"
                    style={{ color: "var(--fg)" }}
                  >
                    {featured.title}
                  </h1>
                  <p className="text-base leading-relaxed max-w-2xl mb-5" style={{ color: "var(--muted-text)" }}>
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-text)" }}>
                      <Icon name="Eye" size={12} />
                      {featured.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-text)" }}>
                      <Icon name="MessageCircle" size={12} />
                      {featured.comments}
                    </span>
                  </div>
                </article>
              )}

              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ border: "1px solid var(--border-color)" }}>
                  {rest.map((post, i) => (
                    <article
                      key={post.id}
                      className={`p-6 cursor-pointer group animate-fade-in-up delay-${i + 1}`}
                      style={{
                        background: "var(--bg)",
                        borderRight: (i + 1) % 2 !== 0 ? "1px solid var(--border-color)" : "none",
                        borderBottom: i < rest.length - 2 ? "1px solid var(--border-color)" : "none",
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--muted-text)" }}>
                          {post.category}
                        </span>
                        <span className="text-xs" style={{ color: "var(--muted-text)" }}>{post.date}</span>
                      </div>
                      <h2
                        className="font-cormorant text-xl font-semibold leading-snug mb-3 group-hover:opacity-70 transition-opacity duration-200"
                        style={{ color: "var(--fg)" }}
                      >
                        {post.title}
                      </h2>
                      <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: "var(--muted-text)" }}>
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-xs" style={{ color: "var(--muted-text)" }}>
                          <Icon name="Eye" size={11} />
                          {post.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1 text-xs" style={{ color: "var(--muted-text)" }}>
                          <Icon name="MessageCircle" size={11} />
                          {post.comments}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </main>

        {/* Right: lessons panel */}
        <aside className="relative">
          <div className="sticky top-20 flex items-start gap-2">
            {/* Card */}
            <div
              className="flex-1 rounded-md p-5 animate-fade-in-up"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
              }}
            >
              {activePanel === "lessons" ? (
                <>
                  {/* Header with progress */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="text-[11px] font-semibold tracking-[0.2em] uppercase"
                      style={{ color: "var(--muted-text)" }}
                    >
                      Lessons
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium" style={{ color: "var(--fg)" }}>
                        {progressPercent}%
                      </span>
                      <div className="relative w-4 h-4">
                        <svg className="w-4 h-4 -rotate-90" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="6" fill="none" stroke="var(--border-color)" strokeWidth="2" />
                          <circle
                            cx="8" cy="8" r="6" fill="none"
                            stroke="var(--fg)" strokeWidth="2"
                            strokeDasharray={`${(progressPercent / 100) * 37.7} 37.7`}
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Modules */}
                  <div className="space-y-1">
                    {MODULES.map((mod, idx) => {
                      const isOpen = openModule === mod.id;
                      const doneCount = mod.lessons.filter((l) => l.status === "done").length;
                      const total = mod.lessons.length;
                      return (
                        <div
                          key={mod.id}
                          className={idx > 0 ? "pt-3 border-t" : ""}
                          style={{ borderColor: idx > 0 ? "var(--border-color)" : "transparent" }}
                        >
                          <button
                            onClick={() => setOpenModule(isOpen ? "" : mod.id)}
                            className="w-full flex items-center justify-between py-2 text-left group"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span
                                className="text-sm font-semibold truncate"
                                style={{ color: "var(--fg)" }}
                              >
                                {mod.title}
                              </span>
                              <span
                                className="text-[10px] px-1.5 py-0.5 rounded shrink-0"
                                style={{
                                  background: "var(--bg)",
                                  color: "var(--muted-text)",
                                  border: "1px solid var(--border-color)",
                                }}
                              >
                                {mod.label}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 ml-2">
                              <span className="text-xs" style={{ color: "var(--muted-text)" }}>
                                {doneCount} / {total}
                              </span>
                              <Icon
                                name={isOpen ? "ChevronUp" : "ChevronDown"}
                                size={14}
                                style={{ color: "var(--muted-text)" }}
                              />
                            </div>
                          </button>

                          {isOpen && (
                            <div className="mt-2 space-y-1 animate-fade-in">
                              {mod.lessons.map((lesson, i) => (
                                <button
                                  key={i}
                                  disabled={lesson.status === "locked"}
                                  className="w-full flex items-start gap-3 p-2.5 rounded text-left transition-colors duration-150"
                                  style={{
                                    background: lesson.status === "active" ? "var(--bg)" : "transparent",
                                    opacity: lesson.status === "locked" ? 0.45 : 1,
                                    cursor: lesson.status === "locked" ? "not-allowed" : "pointer",
                                  }}
                                  onMouseEnter={(e) => {
                                    if (lesson.status !== "locked" && lesson.status !== "active") {
                                      (e.currentTarget as HTMLButtonElement).style.background = "var(--bg)";
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    if (lesson.status !== "active") {
                                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                                    }
                                  }}
                                >
                                  {/* Status icon */}
                                  <div className="shrink-0 mt-0.5">
                                    {lesson.status === "done" && (
                                      <div
                                        className="w-4 h-4 rounded-full flex items-center justify-center"
                                        style={{ border: "1px solid var(--border-color)" }}
                                      >
                                        <Icon name="Check" size={10} style={{ color: "var(--fg)" }} />
                                      </div>
                                    )}
                                    {lesson.status === "active" && (
                                      <div
                                        className="w-4 h-4 rounded-full flex items-center justify-center"
                                        style={{ background: "#ff6b1a" }}
                                      >
                                        <Icon name="Play" size={8} style={{ color: "#fff" }} fallback="Play" />
                                      </div>
                                    )}
                                    {lesson.status === "locked" && (
                                      <div className="w-4 h-4 flex items-center justify-center">
                                        <Icon name="Lock" size={11} style={{ color: "var(--muted-text)" }} />
                                      </div>
                                    )}
                                  </div>

                                  {/* Text */}
                                  <div className="min-w-0 flex-1">
                                    <div
                                      className="text-[13px] font-medium leading-tight truncate"
                                      style={{ color: "var(--fg)" }}
                                    >
                                      {lesson.title}
                                    </div>
                                    <div
                                      className="text-[11px] mt-0.5 flex items-center gap-1.5"
                                      style={{ color: "var(--muted-text)" }}
                                    >
                                      <span>{lesson.type}</span>
                                      <span>·</span>
                                      <span>{lesson.duration}</span>
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="py-16 text-center">
                  <div className="inline-flex w-10 h-10 items-center justify-center rounded-full mb-3"
                    style={{ background: "var(--bg)", border: "1px solid var(--border-color)" }}
                  >
                    <Icon name="MessageSquare" size={16} style={{ color: "var(--fg)" }} />
                  </div>
                  <p className="text-sm font-medium" style={{ color: "var(--fg)" }}>Чат скоро появится</p>
                  <p className="text-xs mt-1" style={{ color: "var(--muted-text)" }}>
                    Здесь можно будет задать вопрос ИИ-ассистенту
                  </p>
                </div>
              )}
            </div>

            {/* Right tabs */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setActivePanel("lessons")}
                className="w-14 h-14 flex flex-col items-center justify-center gap-1 rounded-md transition-colors duration-200"
                style={{
                  background: activePanel === "lessons" ? "var(--bg-secondary)" : "transparent",
                  border: "1px solid var(--border-color)",
                  color: "var(--fg)",
                }}
              >
                <Icon name="PlaySquare" size={16} fallback="Play" />
                <span className="text-[10px] font-medium">Lessons</span>
              </button>
              <button
                onClick={() => setActivePanel("chat")}
                className="w-14 h-14 flex flex-col items-center justify-center gap-1 rounded-md transition-colors duration-200"
                style={{
                  background: activePanel === "chat" ? "var(--bg-secondary)" : "transparent",
                  border: "1px solid var(--border-color)",
                  color: "var(--fg)",
                }}
              >
                <Icon name="MessageSquare" size={16} />
                <span className="text-[10px] font-medium">Chat</span>
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer
        className="border-t mt-10"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="max-w-7xl mx-auto px-5 py-6 flex items-center justify-between">
          <span className="font-cormorant text-lg" style={{ color: "var(--fg)" }}>
            DLE<span style={{ color: "var(--muted-text)" }}>/</span>Site
          </span>
          <span className="text-xs" style={{ color: "var(--muted-text)" }}>
            DataLife Engine 19.1
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
