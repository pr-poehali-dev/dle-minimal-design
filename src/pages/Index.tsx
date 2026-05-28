import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

type IconName =
  | "LayoutGrid" | "ListTodo" | "Trophy" | "Folder" | "BadgePercent"
  | "Ticket" | "BarChart3" | "SlidersHorizontal" | "User" | "Users"
  | "ShieldCheck" | "UserPlus";

type NavItem = {
  label: string;
  icon: IconName;
  badge?: { text: string; tone: "warning" | "accent" };
};

type NavSection = {
  title: string;
  short: string;
  items: NavItem[];
};

const SECTIONS: NavSection[] = [
  {
    title: "General",
    short: "GEN",
    items: [
      { label: "Dashboard", icon: "LayoutGrid" },
      { label: "To-do List", icon: "ListTodo", badge: { text: "05", tone: "warning" } },
      { label: "Goals", icon: "Trophy" },
      { label: "Projects", icon: "Folder" },
      { label: "Budgets", icon: "BadgePercent", badge: { text: "New", tone: "accent" } },
      { label: "Templates", icon: "Ticket" },
      { label: "Reports", icon: "BarChart3" },
    ],
  },
  {
    title: "My Spaces",
    short: "MY",
    items: [
      { label: "All", icon: "SlidersHorizontal" },
      { label: "Assigned to me", icon: "User" },
      { label: "Shared", icon: "Users" },
      { label: "Private", icon: "ShieldCheck" },
      { label: "Add team member", icon: "UserPlus" },
    ],
  },
];

const Index = () => {
  const [dark, setDark] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("Goals");
  const [hover, setHover] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const sidebarBg = dark ? "#0A0F1D" : "#FFFFFF";
  const pageBg = dark ? "#050810" : "#F2F2F2";
  const textColor = dark ? "#F2F2F2" : "#0A0F1D";
  const mutedColor = dark ? "#6E7382" : "#8A8F9A";
  const borderColor = dark ? "#161B29" : "#E6E7EA";
  const accent = "#7C5CFF";
  const accentSoft = dark ? "#1A1635" : "#EFEAFF";

  return (
    <div
      className="min-h-screen flex font-golos"
      style={{ background: pageBg, color: textColor }}
    >
      {/* Sidebar */}
      <aside
        className="relative flex flex-col h-screen sticky top-0 shrink-0 transition-all duration-300 ease-out"
        style={{
          width: collapsed ? 72 : 280,
          background: sidebarBg,
          borderRight: `1px solid ${borderColor}`,
        }}
      >
        {/* Top: logo + collapse/settings */}
        <div
          className="flex items-center justify-between h-16 px-4"
          style={{ borderBottom: `1px solid ${borderColor}` }}
        >
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white"
                style={{ background: accent }}
              >
                D
              </div>
              <span className="text-base font-semibold" style={{ color: textColor }}>
                DesignLib
              </span>
            </div>
          ) : (
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white mx-auto"
              style={{ background: accent }}
            >
              D
            </div>
          )}

          {!collapsed ? (
            <div className="relative">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="w-8 h-8 flex items-center justify-center rounded-md transition-colors"
                style={{ color: mutedColor }}
                onMouseEnter={(e) => (e.currentTarget.style.background = accentSoft)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                aria-label="Настройки"
              >
                <Icon name="Settings" size={16} />
              </button>

              {settingsOpen && (
                <div
                  className="absolute right-0 top-10 z-50 w-52 p-2 rounded-xl shadow-xl animate-fade-in"
                  style={{
                    background: sidebarBg,
                    border: `1px solid ${borderColor}`,
                  }}
                >
                  <div
                    className="text-[10px] font-semibold tracking-[0.18em] uppercase px-2 pt-1 pb-2"
                    style={{ color: mutedColor }}
                  >
                    Тема
                  </div>
                  <button
                    onClick={() => { setDark(false); setSettingsOpen(false); }}
                    className="w-full flex items-center gap-2 px-2 py-2 rounded-md text-sm transition-colors"
                    style={{
                      background: !dark ? accentSoft : "transparent",
                      color: !dark ? accent : textColor,
                    }}
                  >
                    <Icon name="Sun" size={14} />
                    <span>Светлая</span>
                    {!dark && <Icon name="Check" size={14} style={{ marginLeft: "auto" }} />}
                  </button>
                  <button
                    onClick={() => { setDark(true); setSettingsOpen(false); }}
                    className="w-full flex items-center gap-2 px-2 py-2 rounded-md text-sm transition-colors"
                    style={{
                      background: dark ? accentSoft : "transparent",
                      color: dark ? accent : textColor,
                    }}
                  >
                    <Icon name="Moon" size={14} />
                    <span>Тёмная</span>
                    {dark && <Icon name="Check" size={14} style={{ marginLeft: "auto" }} />}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setCollapsed(false)}
              className="absolute -right-3 top-5 w-6 h-6 rounded-full flex items-center justify-center shadow-sm"
              style={{
                background: accentSoft,
                color: accent,
                border: `1px solid ${borderColor}`,
              }}
              aria-label="Развернуть"
            >
              <Icon name="ChevronRight" size={12} />
            </button>
          )}
        </div>

        {/* Search */}
        <div className="px-3 py-3">
          {!collapsed ? (
            <div
              className="flex items-center gap-2 px-3 h-10 rounded-lg"
              style={{ background: dark ? "#0F1424" : "#F4F4F6", border: `1px solid ${borderColor}` }}
            >
              <Icon name="Search" size={14} style={{ color: mutedColor }} />
              <input
                placeholder="Search"
                className="bg-transparent outline-none flex-1 text-sm"
                style={{ color: textColor }}
              />
              <span
                className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                style={{
                  background: dark ? "#161B29" : "#E6E7EA",
                  color: mutedColor,
                }}
              >
                Ctrl+D
              </span>
            </div>
          ) : (
            <button
              className="w-10 h-10 mx-auto rounded-lg flex items-center justify-center transition-colors"
              style={{ background: dark ? "#0F1424" : "#F4F4F6", color: mutedColor }}
            >
              <Icon name="Search" size={14} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 pb-3">
          {SECTIONS.map((section) => (
            <div key={section.title} className="mt-3">
              <div
                className="px-3 mb-2 text-[10px] font-semibold tracking-[0.22em] uppercase"
                style={{ color: mutedColor }}
              >
                {collapsed ? section.short : section.title}
              </div>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = active === item.label;
                  const isHover = hover === item.label;
                  return (
                    <div key={item.label} className="relative">
                      <button
                        onClick={() => setActive(item.label)}
                        onMouseEnter={() => setHover(item.label)}
                        onMouseLeave={() => setHover(null)}
                        className="w-full flex items-center gap-3 rounded-lg transition-colors duration-200"
                        style={{
                          height: 40,
                          padding: collapsed ? 0 : "0 12px",
                          justifyContent: collapsed ? "center" : "flex-start",
                          background: isActive ? accentSoft : isHover && !collapsed ? (dark ? "#0F1424" : "#F4F4F6") : "transparent",
                          color: isActive ? accent : textColor,
                        }}
                      >
                        <Icon name={item.icon} size={collapsed ? 18 : 17} />
                        {!collapsed && (
                          <>
                            <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                            {item.badge && (
                              <span
                                className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                                style={{
                                  background: item.badge.tone === "warning" ? "#F5B544" : accent,
                                  color: "#FFFFFF",
                                }}
                              >
                                {item.badge.text}
                              </span>
                            )}
                          </>
                        )}
                      </button>

                      {/* Tooltip when collapsed */}
                      {collapsed && isHover && (
                        <div
                          className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap z-50 animate-fade-in shadow-lg"
                          style={{
                            background: "#0A0F1D",
                            color: "#F2F2F2",
                          }}
                        >
                          {item.label}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer icons */}
        <div className="px-3 py-3" style={{ borderTop: `1px solid ${borderColor}` }}>
          {!collapsed ? (
            <div className="flex items-center justify-around mb-3">
              {(["Bell", "MessageCircle", "Inbox", "HelpCircle"] as const).map((ic) => (
                <button
                  key={ic}
                  className="w-9 h-9 rounded-md flex items-center justify-center transition-colors"
                  style={{ color: mutedColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = accentSoft;
                    e.currentTarget.style.color = accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = mutedColor;
                  }}
                >
                  <Icon name={ic} size={16} />
                </button>
              ))}
            </div>
          ) : (
            <div className="flex justify-center mb-3">
              <button
                className="w-9 h-9 rounded-md flex items-center justify-center"
                style={{ color: mutedColor }}
              >
                <Icon name="Bell" size={16} />
              </button>
            </div>
          )}
        </div>

        {/* User */}
        <div
          className="px-3 py-3 flex items-center"
          style={{ borderTop: `1px solid ${borderColor}` }}
        >
          {!collapsed ? (
            <button
              className="w-full flex items-center gap-3 px-2 py-1.5 rounded-lg transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.background = accentSoft)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              onClick={() => setCollapsed(true)}
            >
              <div className="relative shrink-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-white text-sm"
                  style={{ background: accent }}
                >
                  M
                </div>
                <span
                  className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
                  style={{ background: "#22C55E", border: `2px solid ${sidebarBg}` }}
                />
              </div>
              <span className="text-sm font-medium truncate flex-1 text-left" style={{ color: textColor }}>
                Mahfuzul Islam Nabil
              </span>
              <Icon name="ChevronRight" size={14} style={{ color: accent }} />
            </button>
          ) : (
            <div className="relative mx-auto">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-white text-sm"
                style={{ background: accent }}
              >
                M
              </div>
              <span
                className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
                style={{ background: "#22C55E", border: `2px solid ${sidebarBg}` }}
              />
            </div>
          )}
        </div>
      </aside>

      {/* Content area */}
      <main className="flex-1 p-10">
        <div className="max-w-3xl">
          <div
            className="text-[10px] font-semibold tracking-[0.22em] uppercase mb-2"
            style={{ color: mutedColor }}
          >
            {active}
          </div>
          <h1
            className="font-cormorant text-5xl font-semibold leading-tight mb-3"
            style={{ color: textColor }}
          >
            Привет, Mahfuzul.
          </h1>
          <p className="text-base leading-relaxed max-w-xl" style={{ color: mutedColor }}>
            Это рабочее пространство DesignLib. Используй меню слева для навигации.
            Переключи тему через шестерёнку наверху меню — доступны светлый
            <span style={{ color: textColor }}> #F2F2F2 </span>
            и тёмный
            <span style={{ color: textColor }}> #0A0F1D </span>
            режимы.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
