"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarSections } from "@/config/docs";
import { Button, ScrollableArea } from "@astryxdesign/core";
import { FileText, ChevronRight, X } from "lucide-react";

export function DocSidebar({
  onNavigate,
  onClose,
}: {
  onNavigate?: () => void;
  onClose?: () => void;
} = {}) {
  const pathname = usePathname();

  // Helper to extract active slug
  const getActiveSlug = () => {
    const parts = pathname.split("/");
    const last = parts[parts.length - 1];
    return last ? last.replace(/\.html$/, "") : "getting-started";
  };

  const activeSlug = getActiveSlug();

  return (
    <aside aria-label="文档导航" className="w-full h-full flex flex-col gap-6">
      <div className="px-3 flex items-center justify-between border-b border-border/40 pb-4 mb-2">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-lg font-black tracking-tight hover:opacity-85 transition-opacity">
            Astryx Docs
          </span>
          <span className="text-[10px] bg-accent text-accent-foreground font-bold px-1.5 py-0.5 rounded">
            中文版
          </span>
        </Link>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            isIconOnly
            label="关闭文档导航"
            icon={<X className="h-4 w-4" />}
            onClick={onClose}
            className="h-8 w-8 shrink-0"
          />
        )}
      </div>

      <ScrollableArea label="文档目录" className="flex-1 min-h-0 -mx-3 px-3">
        <div className="flex flex-col gap-5 pr-4 pb-8">
          {sidebarSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 px-3 py-1">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-0.5 list-none m-0 p-0">
                {section.items.map((item) => {
                  const isActive = activeSlug === item.slug;
                  return (
                    <li key={item.slug} className="m-0 p-0">
                      <Link
                        href={`/docs/${item.slug}`}
                        onClick={onNavigate}
                        aria-current={isActive ? "page" : undefined}
                        className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          isActive
                            ? "bg-primary/5 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                        }`}
                      >
                        <FileText className={`h-4 w-4 shrink-0 transition-colors ${
                          isActive ? "text-primary" : "text-muted-foreground/60 group-hover:text-muted-foreground"
                        }`} />
                        <span className="truncate">{item.title}</span>
                        {isActive && (
                          <ChevronRight className="h-3.5 w-3.5 ml-auto text-primary" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </ScrollableArea>
    </aside>
  );
}
