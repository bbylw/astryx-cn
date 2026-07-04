"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { DocSidebar } from "@/components/DocSidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Moon, ArrowLeft, Home } from "lucide-react";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 顶部公共条 */}
      <header className="sticky top-0 z-30 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* 移动端侧边栏触发器 */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger
                  render={
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Menu className="h-5 w-5" />
                    </Button>
                  }
                />
                <SheetContent side="left" className="w-[300px] p-6 bg-background">
                  <DocSidebar />
                </SheetContent>
              </Sheet>
            </div>

            <Link href="/" className="flex items-center gap-2">
              <span className="font-heading text-lg font-black tracking-tight">
                Astryx
              </span>
              <span className="text-[10px] bg-muted text-muted-foreground font-bold px-1.5 py-0.5 rounded">
                Docs
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1.5 h-9 text-xs">
                <Home className="h-3.5 w-3.5" />
                返回首页
              </Button>
            </Link>

            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full w-9 h-9"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* 双列布局 */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 flex gap-8 relative">
        {/* 左侧固定侧边栏 - 仅桌面端显示 */}
        <div className="hidden lg:block w-[260px] shrink-0 sticky top-24 h-[calc(100vh-8rem)] pt-2 overflow-y-auto">
          <DocSidebar />
        </div>

        {/* 右侧主文档区域 */}
        <main className="flex-1 min-w-0 py-8 lg:py-10 max-w-3xl">
          {children}
        </main>
      </div>
    </div>
  );
}
