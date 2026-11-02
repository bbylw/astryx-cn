"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { DocSidebar } from "@/components/DocSidebar";
import { Button, Drawer } from "@astryxdesign/core";
import { Menu, Sun, Moon, Home } from "lucide-react";

export default function DocsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 顶部公共条 */}
      <header className="sticky top-0 z-30 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* 移动端侧边栏触发器 */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                isIconOnly
                label="打开文档导航"
                icon={<Menu className="h-5 w-5" />}
                onClick={() => setIsNavOpen(true)}
                className="h-9 w-9"
              />
              <Drawer
                isOpen={isNavOpen}
                onOpenChange={setIsNavOpen}
                side="start"
                width={300}
                label="文档导航"
                padding={4}
              >
                <DocSidebar
                  onNavigate={() => setIsNavOpen(false)}
                  onClose={() => setIsNavOpen(false)}
                />
              </Drawer>
            </div>

            <Link href="/" className="flex items-center gap-2">
              <span className="font-heading text-lg font-black tracking-tight">
                Astryx
              </span>
              <span className="text-[10px] bg-accent text-accent-foreground font-bold px-1.5 py-0.5 rounded">
                Docs
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button
              href="/"
              as={Link}
              variant="ghost"
              size="sm"
              label="返回首页"
              icon={<Home className="h-3.5 w-3.5" />}
              className="h-9 text-xs"
            />

            <Button
              variant="ghost"
              size="sm"
              isIconOnly
              label="切换深色模式"
              icon={resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="rounded-full h-9 w-9"
            />
          </div>
        </div>
      </header>

      {/* 双列布局 */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 flex gap-8 relative">
        {/* 左侧固定侧边栏 - 仅桌面端显示 */}
        <div className="hidden lg:block w-[260px] shrink-0 sticky top-24 h-[calc(100vh-8rem)] pt-2">
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
