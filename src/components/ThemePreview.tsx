"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Play, Sparkles, Check, RefreshCw } from "lucide-react";

interface ThemeSpec {
  name: string;
  label: string;
  desc: string;
  fonts: string;
  cssVars: Record<string, string>;
  darkCssVars: Record<string, string>;
}

const themes: ThemeSpec[] = [
  {
    name: "neutral",
    label: "Neutral 极简",
    desc: "柔和极简，灰度平衡，适合作为项目起点",
    fonts: "font-sans",
    cssVars: {
      "--preview-bg-body": "#F8F4ED",
      "--preview-bg-surface": "#FFFFFF",
      "--preview-text-primary": "#15110C",
      "--preview-text-secondary": "#4E606F",
      "--preview-accent": "#15110C",
      "--preview-border": "#E5E5E0",
      "--preview-radius": "12px",
    },
    darkCssVars: {
      "--preview-bg-body": "#111112",
      "--preview-bg-surface": "#1F1F22",
      "--preview-text-primary": "#DFE2E5",
      "--preview-text-secondary": "#AAAFB5",
      "--preview-accent": "#DFE2E5",
      "--preview-border": "#2E2E32",
      "--preview-radius": "12px",
    },
  },
  {
    name: "butter",
    label: "Butter 奶油",
    desc: "金色奶油底色，蓝色强调，暖意融融",
    fonts: "font-sans",
    cssVars: {
      "--preview-bg-body": "#FCF9F2",
      "--preview-bg-surface": "#FFFDF9",
      "--preview-text-primary": "#2D2924",
      "--preview-text-secondary": "#7A7267",
      "--preview-accent": "#3B82F6",
      "--preview-border": "#F0EAE1",
      "--preview-radius": "16px",
    },
    darkCssVars: {
      "--preview-bg-body": "#1D1A16",
      "--preview-bg-surface": "#282420",
      "--preview-text-primary": "#F5EFE6",
      "--preview-text-secondary": "#A89E90",
      "--preview-accent": "#60A5FA",
      "--preview-border": "#3A342E",
      "--preview-radius": "16px",
    },
  },
  {
    name: "chocolate",
    label: "Chocolate 巧克力",
    desc: "暖棕调与米色结合，舒适优雅，经典复古",
    fonts: "font-serif",
    cssVars: {
      "--preview-bg-body": "#FDFBF7",
      "--preview-bg-surface": "#F6EFE5",
      "--preview-text-primary": "#4A2C11",
      "--preview-text-secondary": "#8A6B4E",
      "--preview-accent": "#8B4513",
      "--preview-border": "#EADECF",
      "--preview-radius": "8px",
    },
    darkCssVars: {
      "--preview-bg-body": "#19110B",
      "--preview-bg-surface": "#2B1D14",
      "--preview-text-primary": "#F2E3D5",
      "--preview-text-secondary": "#BC9D84",
      "--preview-accent": "#D4A373",
      "--preview-border": "#473224",
      "--preview-radius": "8px",
    },
  },
  {
    name: "gothic",
    label: "Gothic 哥特",
    desc: "冷色调深蓝灰表面，纯暗黑风格",
    fonts: "font-sans",
    cssVars: {
      // Gothic 默认只有暗色模式，亮模式我们也提供一个偏冷灰的版本
      "--preview-bg-body": "#EBF0F5",
      "--preview-bg-surface": "#D7E0E8",
      "--preview-text-primary": "#1A2530",
      "--preview-text-secondary": "#506578",
      "--preview-accent": "#6D28D9",
      "--preview-border": "#C4D2DE",
      "--preview-radius": "4px",
    },
    darkCssVars: {
      "--preview-bg-body": "#0D0E12",
      "--preview-bg-surface": "#161821",
      "--preview-text-primary": "#DFE2E5",
      "--preview-text-secondary": "#8892B0",
      "--preview-accent": "#A78BFA",
      "--preview-border": "#2D3142",
      "--preview-radius": "4px",
    },
  },
  {
    name: "matcha",
    label: "Matcha 抹茶",
    desc: "大地绿意主题，Figtree 字体，清新静谧",
    fonts: "font-sans",
    cssVars: {
      "--preview-bg-body": "#F4F9F4",
      "--preview-bg-surface": "#EBF3EB",
      "--preview-text-primary": "#1B301C",
      "--preview-text-secondary": "#586F59",
      "--preview-accent": "#2D6A4F",
      "--preview-border": "#DAE6DA",
      "--preview-radius": "12px",
    },
    darkCssVars: {
      "--preview-bg-body": "#0E150F",
      "--preview-bg-surface": "#172318",
      "--preview-text-primary": "#E2ECE3",
      "--preview-text-secondary": "#8EA390",
      "--preview-accent": "#52B788",
      "--preview-border": "#283C2A",
      "--preview-radius": "12px",
    },
  },
  {
    name: "stone",
    label: "Stone 暖石",
    desc: "暖石与石板色结合，自然粗砺，搭配 Montserrat",
    fonts: "font-sans",
    cssVars: {
      "--preview-bg-body": "#F2F1ED",
      "--preview-bg-surface": "#EAE8E2",
      "--preview-text-primary": "#1C1917",
      "--preview-text-secondary": "#6B6661",
      "--preview-accent": "#292524",
      "--preview-border": "#DDD9D0",
      "--preview-radius": "14px",
    },
    darkCssVars: {
      "--preview-bg-body": "#1C1917",
      "--preview-bg-surface": "#272522",
      "--preview-text-primary": "#F5F5F4",
      "--preview-text-secondary": "#A8A29E",
      "--preview-accent": "#E7E5E4",
      "--preview-border": "#44403C",
      "--preview-radius": "14px",
    },
  },
  {
    name: "y2k",
    label: "Y2K 未来主义",
    desc: "长春花蓝底色与霓虹全息粉的俏皮碰撞",
    fonts: "font-mono",
    cssVars: {
      "--preview-bg-body": "#EEF2FF",
      "--preview-bg-surface": "#E0E7FF",
      "--preview-text-primary": "#1E1B4B",
      "--preview-text-secondary": "#4F46E5",
      "--preview-accent": "#EC4899",
      "--preview-border": "#C7D2FE",
      "--preview-radius": "24px",
    },
    darkCssVars: {
      "--preview-bg-body": "#0B081B",
      "--preview-bg-surface": "#16132D",
      "--preview-text-primary": "#EEF2FF",
      "--preview-text-secondary": "#818CF8",
      "--preview-accent": "#F472B6",
      "--preview-border": "#2C2754",
      "--preview-radius": "24px",
    },
  },
];

export function ThemePreview() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeSpec>(themes[0]);
  const [isPreviewDark, setIsPreviewDark] = useState(false);
  const [demoInput, setDemoInput] = useState("AI-Agent 友好型设计系统");
  const [clickCount, setClickCount] = useState(0);

  const activeVars = isPreviewDark ? selectedTheme.darkCssVars : selectedTheme.cssVars;

  // 将主题变量应用为 inline style 对象
  const containerStyle = {
    ...activeVars,
    fontFamily: selectedTheme.name === "chocolate" ? "Georgia, serif" : "var(--font-sans)",
  } as React.CSSProperties;

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl border border-border/80 overflow-hidden shadow-2xl bg-card">
      <div className="p-6 border-b border-border bg-muted/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-heading text-lg font-bold tracking-tight flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" />
            Astryx 交互式主题沙盒
          </h3>
          <p className="text-sm text-muted-foreground">
            选择下方主题，观察右侧组件样式、圆角及对比度如何实时适配。
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPreviewDark(!isPreviewDark)}
            className="text-xs h-9"
          >
            切换模式: {isPreviewDark ? "🌙 深色" : "☀️ 亮色"}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setClickCount(0);
              setDemoInput("AI-Agent 友好型设计系统");
            }}
            className="h-9 w-9"
            title="重置沙盒"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* 左侧主题选择器 */}
        <div className="lg:col-span-4 p-6 border-r border-border flex flex-col gap-3.5 bg-muted/10">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            选择品牌主题
          </span>
          <div className="flex flex-col gap-2">
            {themes.map((t) => (
              <button
                key={t.name}
                onClick={() => setSelectedTheme(t)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 group relative ${
                  selectedTheme.name === t.name
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border/60 hover:border-border hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-foreground">
                    {t.label}
                  </span>
                  {selectedTheme.name === t.name && (
                    <motion.div
                      layoutId="active-indicator"
                      className="h-2 w-2 rounded-full bg-primary"
                    />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 group-hover:text-foreground/80 transition-colors">
                  {t.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* 右侧沙盒渲染区 */}
        <div 
          className="lg:col-span-8 p-8 flex items-center justify-center transition-colors duration-500 min-h-[420px]"
          style={{ backgroundColor: activeVars["--preview-bg-body"] }}
        >
          <div 
            className="w-full max-w-md p-6 border transition-all duration-500 shadow-md flex flex-col gap-5"
            style={{ 
              backgroundColor: activeVars["--preview-bg-surface"],
              borderColor: activeVars["--preview-border"],
              borderRadius: activeVars["--preview-radius"],
              color: activeVars["--preview-text-primary"],
              ...containerStyle
            }}
          >
            {/* 卡片头部 */}
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: activeVars["--preview-border"] }}>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-semibold tracking-wider opacity-60">
                  Astryx Component
                </span>
                <h4 className="text-base font-bold tracking-tight">
                  {selectedTheme.label.split(" ")[0]} Preview
                </h4>
              </div>
              <Badge 
                className="text-[10px] font-mono select-none px-2 py-0.5 rounded-full"
                style={{ 
                  backgroundColor: activeVars["--preview-accent"],
                  color: isPreviewDark ? "#111" : "#fff",
                  borderRadius: "9999px"
                }}
              >
                Beta v0.8
              </Badge>
            </div>

            {/* 组件1：输入框 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold opacity-70">受控输入框 (TextInput)</label>
              <input
                type="text"
                value={demoInput}
                onChange={(e) => setDemoInput(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-transparent border outline-none transition-all duration-300 focus:ring-2 focus:ring-offset-1 focus:ring-primary"
                style={{
                  borderColor: activeVars["--preview-border"],
                  borderRadius: `calc(${activeVars["--preview-radius"]} * 0.8)`,
                  color: activeVars["--preview-text-primary"],
                }}
              />
            </div>

            {/* 组件2：状态徽章展示 */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold opacity-70">状态反馈 (Badge)</label>
              <div className="flex flex-wrap gap-2">
                <span 
                  className="text-xs px-2.5 py-1 font-medium border flex items-center gap-1.5"
                  style={{
                    borderColor: "rgba(13, 134, 38, 0.3)",
                    backgroundColor: "rgba(13, 134, 38, 0.08)",
                    color: "#0D8626",
                    borderRadius: activeVars["--preview-radius"],
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0D8626] animate-pulse" />
                  正常运行
                </span>
                <span 
                  className="text-xs px-2.5 py-1 font-medium border flex items-center gap-1.5"
                  style={{
                    borderColor: "rgba(227, 25, 59, 0.3)",
                    backgroundColor: "rgba(227, 25, 59, 0.08)",
                    color: isPreviewDark ? "#F5394F" : "#E3193B",
                    borderRadius: activeVars["--preview-radius"],
                  }}
                >
                  故障警告
                </span>
              </div>
            </div>

            {/* 组件3：按钮组 */}
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-xs font-semibold opacity-70">交互按钮 (Buttons)</label>
              <div className="flex flex-wrap items-center gap-3">
                {/* 主操作按钮 */}
                <button
                  onClick={() => setClickCount(c => c + 1)}
                  className="px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-95 flex items-center gap-1.5 shadow-sm"
                  style={{
                    backgroundColor: activeVars["--preview-accent"],
                    color: isPreviewDark && selectedTheme.name !== "gothic" ? "#111" : "#fff",
                    borderRadius: `calc(${activeVars["--preview-radius"]} * 0.8)`,
                  }}
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  主按钮 ({clickCount})
                </button>

                {/* 次要操作按钮 */}
                <button
                  className="px-4 py-2 text-sm font-medium border transition-all duration-200 active:scale-95 bg-transparent"
                  style={{
                    borderColor: activeVars["--preview-border"],
                    borderRadius: `calc(${activeVars["--preview-radius"]} * 0.8)`,
                    color: activeVars["--preview-text-primary"],
                  }}
                >
                  次要按钮
                </button>
              </div>
            </div>

            {/* 信息流展示 */}
            <div 
              className="p-3 text-xs border rounded-lg bg-neutral-900/5 dark:bg-white/5 opacity-80"
              style={{ borderColor: activeVars["--preview-border"] }}
            >
              <p className="font-mono break-all">
                输入同步：{demoInput || "(无内容)"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
