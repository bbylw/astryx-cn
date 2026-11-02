import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "页面未找到",
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative flex flex-col items-center gap-6 max-w-lg">
        <Link href="/" className="flex items-center gap-2.5 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            aria-hidden="true"
            className="h-9 w-9"
          >
            <rect width="64" height="64" rx="14" fill="#0064E0" />
            <path
              d="M32 12c1.2 7.4 3.2 11.5 7 14.3 2.8 2 6.3 3 13 3.7-6.7.7-10.2 1.7-13 3.7-3.8 2.8-5.8 6.9-7 14.3-1.2-7.4-3.2-11.5-7-14.3-2.8-2-6.3-3-13-3.7 6.7-.7 10.2-1.7 13-3.7 3.8-2.8 5.8-6.9 7-14.3Z"
              fill="#FFFFFF"
            />
          </svg>
          <span className="font-heading text-xl font-extrabold tracking-tight">
            Astryx 设计系统
          </span>
        </Link>

        <span className="font-mono text-sm font-semibold tracking-widest text-primary">
          404
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-black tracking-tight">
          这个页面不在设计系统里
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          你访问的链接可能已经移动或被删除。回到首页，或者从文档重新开始。
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full sm:w-auto">
          <Link
            href="/"
            className="inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Home className="h-4 w-4" />
            返回首页
          </Link>
          <Link
            href="/docs/getting-started"
            className="inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <Compass className="h-4 w-4" />
            浏览文档
          </Link>
        </div>
      </div>
    </main>
  );
}
