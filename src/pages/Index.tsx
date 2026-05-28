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
  {
    id: 5,
    category: "Технологии",
    title: "Edge Computing и будущее распределённых систем",
    excerpt: "Вычисления на периферии сети открывают новые возможности для IoT и реального времени.",
    date: "24 мая 2026",
    views: 690,
    comments: 5,
  },
  {
    id: 6,
    category: "Дизайн",
    title: "Системы дизайна: от Figma к production",
    excerpt: "Путь от компонента в макете до переиспользуемого кода — практический взгляд на токены и архитектуру.",
    date: "23 мая 2026",
    views: 1050,
    comments: 18,
  },
];

const CATEGORIES = ["Все", "Технологии", "Дизайн", "Бизнес", "Культура"];

const Index = () => {
  const [dark, setDark] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
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
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
              }}
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
            <div
              className="flex items-center gap-2 px-3 py-2 mt-1 rounded-sm"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
            >
              <Icon name="Search" size={13} style={{ color: "var(--muted-text)" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск..."
                className="bg-transparent outline-none flex-1 text-sm"
                style={{ color: "var(--fg)" }}
              />
            </div>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-5 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-24 animate-fade-in">
            <p className="font-cormorant text-3xl" style={{ color: "var(--muted-text)" }}>
              Ничего не найдено
            </p>
            <p className="text-sm mt-2" style={{ color: "var(--muted-text)" }}>
              Попробуйте изменить запрос или выбрать другую категорию
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
                  <span
                    className="text-xs font-semibold tracking-widest uppercase"
                    style={{ color: "var(--muted-text)" }}
                  >
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
                <p
                  className="text-base leading-relaxed max-w-2xl mb-5"
                  style={{ color: "var(--muted-text)" }}
                >
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
                  <button
                    className="ml-auto flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-60"
                    style={{ color: "var(--fg)" }}
                  >
                    Читать
                    <Icon name="ArrowRight" size={12} />
                  </button>
                </div>
              </article>
            )}

            {rest.length > 0 && (
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                style={{ border: "1px solid var(--border-color)" }}
              >
                {rest.map((post, i) => (
                  <article
                    key={post.id}
                    className={`p-6 cursor-pointer group animate-fade-in-up delay-${i + 1}`}
                    style={{
                      background: "var(--bg)",
                      borderRight: (i + 1) % 3 !== 0 ? "1px solid var(--border-color)" : "none",
                      borderBottom: i < rest.length - 3 ? "1px solid var(--border-color)" : "none",
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-xs font-semibold tracking-widest uppercase"
                        style={{ color: "var(--muted-text)" }}
                      >
                        {post.category}
                      </span>
                      <span className="text-xs" style={{ color: "var(--muted-text)" }}>
                        {post.date}
                      </span>
                    </div>
                    <h2
                      className="font-cormorant text-xl font-semibold leading-snug mb-3 group-hover:opacity-70 transition-opacity duration-200"
                      style={{ color: "var(--fg)" }}
                    >
                      {post.title}
                    </h2>
                    <p
                      className="text-sm leading-relaxed mb-4 line-clamp-3"
                      style={{ color: "var(--muted-text)" }}
                    >
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

      {/* Footer */}
      <footer
        className="border-t mt-10"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="max-w-5xl mx-auto px-5 py-6 flex items-center justify-between">
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
