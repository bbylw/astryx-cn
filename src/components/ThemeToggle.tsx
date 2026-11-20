"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/**
 * 双状态主题开关：两个图标都进 markup，由 CSS（.light/.dark 类 + prefers-color-scheme）
 * 选择显示哪一个，SSR 首帧与 JS 未加载时状态也正确（modern-web-guidance: dark-mode-toggle）。
 */
export function ThemeToggle() {
  const { resolvedTheme, systemTheme, setTheme } = useTheme();

  const handleToggle = () => {
    const target = resolvedTheme === "dark" ? "light" : "dark";
    // 目标与系统偏好一致时回到跟随系统，而不是把值钉死在 localStorage
    setTheme(target === systemTheme ? "system" : target);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="theme-toggle inline-flex min-h-9 min-w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <span className="to-dark items-center justify-center">
        <Moon className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">切换到深色主题</span>
      </span>
      <span className="to-light items-center justify-center">
        <Sun className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">切换到亮色主题</span>
      </span>
    </button>
  );
}