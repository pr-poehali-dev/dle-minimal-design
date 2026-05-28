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

  // Точные цвета как на макете
  const sidebarBg = dark ? "#0A0F1D" : "#FFFFFF";
  const pageBg = dark ? "#0A0F1D" : "#F2F2F2";
  const textColor = dark ? "#F2F2F2" : "#0A0F1D";
  const mutedColor = dark ? "#5C6273" : "#A8ACB5";
  const iconMuted = dark ? "#7A7F8C" : "#9DA1AB";
  const borderColor = dark ? "#1A1F2E" : "#EFEFEF";
  const accent = "#7C5CFF";
  const accentSoft = dark ? "#1F1A3D" : "#F1EDFF";

  const expandedWidth = 240;
  const collapsedWidth = 64;

  return (
    <div
      className="min-h-screen flex font-golos"
      style={{ background: pageBg, color: textColor }}
    >
      {/* Sidebar */}
      <aside
        className="relative flex flex-col h-screen sticky top-0 shrink-0 transition-all duration-300 ease-out"
        style={{
          width: collapsed ? collapsedWidth : expandedWidth,
          background: sidebarBg,
          borderRight: `1px solid ${borderColor}`,
          borderRadius: collapsed ? "0 20px 20px 0" : "0 20px 20px 0",
        }}
      >
        {/* Top: logo + settings/expand */}
        <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} px-4 pt-5 pb-4`}>
          {!collapsed ? (
            <>
              <div className="flex items-center gap-2">
                <div className="relative w-7 h-7 flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ background: accent, opacity: 0.95 }}
                  />
                  <span className="relative font-bold text-white text-sm">D</span>
                </div>
                <span className="text-[15px] font-semibold tracking-tight" style={{ color: textColor }}>
                  DesignLib
                </span>
              </div>

              <div className="relative">
                <button
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className="w-7 h-7 flex items-center justify-center rounded-md"
                  style={{ color: iconMuted }}
                  aria-label="Настройки"
                >
                  <Icon name="Settings" size={16} />
                </button>

                {settingsOpen && (
                  <div
                    className="absolute right-0 top-9 z-50 w-44 p-1.5 rounded-xl shadow-lg animate-fade-in"
                    style={{
                      background: sidebarBg,
                      border: `1px solid ${borderColor}`,
                    }}
                  >
                    <div
                      className="text-[10px] font-semibold tracking-[0.18em] uppercase px-2.5 pt-1 pb-1.5"
                      style={{ color: mutedColor }}
                    >
                      Тема
                    </div>
                    <button
                      onClick={() => { setDark(false); setSettingsOpen(false); }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-[13px]"
                      style={{
                        background: !dark ? accentSoft : "transparent",
                        color: !dark ? accent : textColor,
                      }}
                    >
                      <Icon name="Sun" size={14} />
                      <span className="font-medium">Светлая</span>
                      {!dark && <Icon name="Check" size={13} style={{ marginLeft: "auto" }} />}
                    </button>
                    <button
                      onClick={() => { setDark(true); setSettingsOpen(false); }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-[13px]"
                      style={{
                        background: dark ? accentSoft : "transparent",
                        color: dark ? accent : textColor,
                      }}
                    >
                      <Icon name="Moon" size={14} />
                      <span className="font-medium">Тёмная</span>
                      {dark && <Icon name="Check" size={13} style={{ marginLeft: "auto" }} />}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: accent, opacity: 0.95 }}
              />
              <span className="relative font-bold text-white text-sm">D</span>
            </div>
          )}
        </div>

        {/* Expand chevron (absolutely positioned next to logo) */}
        {/* Кнопка разворачивания/сворачивания — по центру правой границы */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center z-40 transition-transform duration-300"
          style={{
            right: -12,
            background: sidebarBg,
            border: `1px solid ${borderColor}`,
            color: accent,
            boxShadow: dark
              ? "0 2px 8px rgba(0,0,0,0.4)"
              : "0 2px 8px rgba(10,15,29,0.08)",
          }}
          aria-label={collapsed ? "Развернуть" : "Свернуть"}
        >
          <Icon
            name="ChevronRight"
            size={12}
            style={{
              transform: collapsed ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </button>

        {/* Search */}
        <div className="px-3 pb-3">
          {!collapsed ? (
            <div
              className="flex items-center gap-2 px-3 h-9 rounded-lg"
              style={{
                background: dark ? "#0F1424" : "#F6F6F7",
              }}
            >
              <Icon name="Search" size={13} style={{ color: iconMuted }} />
              <input
                placeholder="Search"
                className="bg-transparent outline-none flex-1 text-[13px] placeholder:text-current"
                style={{ color: mutedColor }}
              />
              <span
                className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                style={{
                  background: dark ? "#161B29" : "#ECECEE",
                  color: mutedColor,
                }}
              >
                Ctrl+D
              </span>
            </div>
          ) : (
            <button
              className="w-9 h-9 mx-auto rounded-lg flex items-center justify-center"
              style={{ background: dark ? "#0F1424" : "#F6F6F7", color: iconMuted }}
            >
              <Icon name="Search" size={13} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 pb-2">
          {SECTIONS.map((section, sIdx) => (
            <div key={section.title} className={sIdx > 0 ? "mt-4" : "mt-1"}>
              <div
                className={`text-[10px] font-semibold tracking-[0.22em] uppercase mb-2 ${collapsed ? "text-center" : "px-3"}`}
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
                        className="w-full flex items-center gap-3 rounded-lg transition-colors duration-150"
                        style={{
                          height: collapsed ? 38 : 36,
                          padding: collapsed ? 0 : "0 12px",
                          justifyContent: collapsed ? "center" : "flex-start",
                          background: isActive
                            ? accentSoft
                            : isHover && !collapsed
                            ? (dark ? "#0F1424" : "#F6F6F7")
                            : "transparent",
                          color: isActive ? accent : textColor,
                        }}
                      >
                        <Icon
                          name={item.icon}
                          size={collapsed ? 18 : 16}
                          style={{ color: isActive ? accent : iconMuted }}
                        />
                        {!collapsed && (
                          <>
                            <span className="text-[13px] font-medium flex-1 text-left" style={{ color: isActive ? accent : textColor }}>
                              {item.label}
                            </span>
                            {item.badge && (
                              <span
                                className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                                style={{
                                  background: item.badge.tone === "warning" ? "#F5B544" : accent,
                                  color: "#FFFFFF",
                                  minWidth: 28,
                                  textAlign: "center",
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
        <div className="px-3 py-3">
          {!collapsed ? (
            <div className="flex items-center justify-around">
              {(["Bell", "MessageCircle", "Inbox", "HelpCircle"] as const).map((ic) => (
                <button
                  key={ic}
                  className="w-8 h-8 rounded-md flex items-center justify-center"
                  style={{ color: iconMuted }}
                >
                  <Icon name={ic} size={15} />
                </button>
              ))}
            </div>
          ) : (
            <div className="flex justify-center">
              <button className="w-8 h-8 rounded-md flex items-center justify-center" style={{ color: iconMuted }}>
                <Icon name="Bell" size={15} />
              </button>
            </div>
          )}
        </div>

        {/* User */}
        <div
          className="px-3 py-3"
          style={{ borderTop: `1px solid ${borderColor}` }}
        >
          {!collapsed ? (
            <button
              className="w-full flex items-center gap-2.5 px-1.5 py-1.5 rounded-lg"
              onClick={() => setCollapsed(true)}
            >
              <div className="relative shrink-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-white text-xs"
                  style={{ background: accent }}
                >
                  M
                </div>
                <span
                  className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
                  style={{ background: "#22C55E", border: `2px solid ${sidebarBg}` }}
                />
              </div>
              <span className="text-[13px] font-medium truncate flex-1 text-left" style={{ color: textColor }}>
                Mahfuzul Islam Nabil
              </span>
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ border: `1px solid ${accent}`, color: accent }}
              >
                <Icon name="ChevronRight" size={11} />
              </div>
            </button>
          ) : (
            <div className="relative mx-auto w-8 h-8">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-white text-xs"
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

      {/* Content area — компактный дашборд */}
      <main className="flex-1 p-8">
        <div className="max-w-2xl">
          <div className="text-[10px] font-semibold tracking-[0.22em] uppercase mb-1.5" style={{ color: mutedColor }}>
            {active}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight mb-1" style={{ color: textColor }}>
            Привет, Mahfuzul
          </h1>
          <p className="text-[13px] leading-relaxed max-w-md" style={{ color: mutedColor }}>
            Переключи тему через шестерёнку в шапке меню — доступны
            <span style={{ color: textColor }}> #F2F2F2 </span>
            и
            <span style={{ color: textColor }}> #0A0F1D</span>.
          </p>

          {/* Маленькие карточки */}
          <div className="grid grid-cols-3 gap-3 mt-6 max-w-lg">
            {[
              { label: "Активных задач", value: "12" },
              { label: "Проектов", value: "4" },
              { label: "Команда", value: "8" },
            ].map((s) => (
              <div
                key={s.label}
                className="p-3 rounded-xl"
                style={{ background: sidebarBg, border: `1px solid ${borderColor}` }}
              >
                <div className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-1" style={{ color: mutedColor }}>
                  {s.label}
                </div>
                <div className="text-xl font-semibold" style={{ color: textColor }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;