"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { ThemePreview } from "@/components/ThemePreview";
import {
  ArrowRight,
  Terminal,
  Cpu,
  Layers,
  Palette,
  Sparkles,
  GitBranch,
  ShieldCheck,
  Moon,
  Sun,
  Eye,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* 复杂的背景装饰：渐变网格与光晕效果 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[600px] pointer-events-none opacity-40 dark:opacity-30">
        <div className="absolute top-[-10%] left-[10%] w-[40%] h-[60%] rounded-full bg-gradient-to-tr from-amber-200 to-orange-100 blur-[120px] dark:from-purple-950/40 dark:to-blue-900/30" />
        <div className="absolute top-[5%] right-[15%] w-[45%] h-[65%] rounded-full bg-gradient-to-bl from-amber-100 to-rose-200 blur-[130px] dark:from-indigo-950/30 dark:to-purple-900/20" />
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        />
      </div>

      {/* 顶部导航 */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-heading text-xl font-extrabold tracking-tighter bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              Astryx<span className="text-amber-500 font-sans font-medium text-xs ml-1 bg-amber-500/10 px-1.5 py-0.5 rounded-full">Beta</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              特性优势
            </Link>
            <Link href="#sandbox" className="text-muted-foreground hover:text-foreground transition-colors">
              主题沙盒
            </Link>
            <Link href="#principles" className="text-muted-foreground hover:text-foreground transition-colors">
              设计原则
            </Link>
            <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
              快速开始
            </Link>
          </nav>

          <div className="flex items-center gap-3">
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
            <Link href="/docs">
              <Button size="sm" className="font-semibold rounded-full px-5">
                阅读文档
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 主体页面内容 */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 md:py-24 flex flex-col gap-24 relative z-10">
        
        {/* HERO 区域 */}
        <section className="text-center md:text-left flex flex-col md:flex-row items-center gap-12 pt-6">
          <div className="flex-1 flex flex-col gap-6 md:pr-6">
            <div className="inline-flex items-center gap-1.5 self-center md:self-start bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-semibold">
              <Sparkles className="h-3 w-3 animate-pulse" />
              Meta 内部锤炼 8 年，支撑 13,000+ 个应用
            </div>
            
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-foreground">
              为当下的构建方式而生的 <br />
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                开源设计系统
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-[60ch]">
              一个完全可定制的系统，由<strong>人类设计师</strong>与并肩工作的<strong>人工智能智能体 (AI Agents)</strong> 协同塑造。基于 React 和 StyleX，为你提供打破封装的无束缚定制体验。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-2">
              <Link href="/docs">
                <Button size="lg" className="rounded-full px-7 font-bold gap-2 text-base">
                  开始使用 <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#sandbox">
                <Button size="lg" variant="outline" className="rounded-full px-7 font-medium text-base">
                  在线预览主题
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-6 text-xs text-muted-foreground font-mono mt-4">
              <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> 无样式锁定</span>
              <span className="flex items-center gap-1"><Cpu className="h-3.5 w-3.5 text-blue-500" /> AI 开发者协同</span>
              <span className="flex items-center gap-1"><Layers className="h-3.5 w-3.5 text-purple-500" /> 150+ 访问性组件</span>
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg md:max-w-none relative aspect-[4/3] rounded-2xl border border-border/80 bg-neutral-900/5 dark:bg-neutral-950/20 backdrop-blur-sm p-6 overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-[60%] h-[60%] rounded-full bg-amber-500/10 blur-[60px]" />
            
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <span className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <span className="text-xs font-mono text-muted-foreground ml-2">quick-start.sh</span>
              </div>
              <Terminal className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="flex-1 font-mono text-sm py-4 flex flex-col justify-center gap-3 select-none">
              <div className="text-muted-foreground"># 安装核心包与 Neutral 主题</div>
              <div className="text-foreground">
                <span className="text-amber-500">npm</span> install @astryxdesign/core @astryxdesign/theme-neutral
              </div>
              <div className="text-muted-foreground"># 运行 AI 智能体上下文初始化</div>
              <div className="text-foreground">
                <span className="text-amber-500">npx</span> astryx init
              </div>
              <div className="text-emerald-500 font-semibold mt-2 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Done! AI documentation setup complete.
              </div>
            </div>

            <div className="border-t border-border pt-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">支持 npm, pnpm, yarn, bun 等包管理</span>
              <span className="text-xs text-muted-foreground font-mono">v0.8.2</span>
            </div>
          </div>
        </section>

        {/* BENTO GRID 特性展示 */}
        <section id="features" className="flex flex-col gap-12">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              为什么选择 Astryx？
            </h2>
            <p className="text-muted-foreground">
              为开发者和 AI 助手精心设计的核心架构特性，让定制化和协作变得前所未有的简单。
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            {/* 卡片 1: 开放内部结构 */}
            <motion.div 
              variants={itemVariants} 
              className="md:col-span-8 group relative rounded-3xl border border-border/80 bg-card p-8 flex flex-col justify-between overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                <div className="h-10 w-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">开放内部结构 (Open Internals)</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[50ch]">
                  组件可在任意层级进行灵活组合，永远不会被封闭的顶层 API 锁定。你需要的所有构建块都直接对外导出；当面临深度定制时，`swizzle` 命令可一键将组件源码释放进项目，接管完全的控制权。
                </p>
              </div>
              <div className="mt-8 border border-border/60 rounded-xl bg-muted/20 p-4 font-mono text-xs text-muted-foreground">
                <span className="text-amber-500">npx</span> astryx swizzle Button
              </div>
            </motion.div>

            {/* 卡片 2: 无样式锁定 */}
            <motion.div 
              variants={itemVariants} 
              className="md:col-span-4 group relative rounded-3xl border border-border/80 bg-card p-8 flex flex-col justify-between overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                <div className="h-10 w-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Palette className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">无样式锁定</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  使用 StyleX 编写，但对用户绝对透明。你可以随意使用 Tailwind CSS、CSS Modules 甚至原生 CSS，通过 `className` 无缝覆盖，适配你项目中已存在的任何样式方案。
                </p>
              </div>
              <span className="text-xs text-muted-foreground font-mono mt-8">className=&quot;bg-surface text-primary&quot;</span>
            </motion.div>

            {/* 卡片 3: 人机协同共建 */}
            <motion.div 
              variants={itemVariants} 
              className="md:col-span-5 group relative rounded-3xl border border-border/80 bg-card p-8 flex flex-col justify-between overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                <div className="h-10 w-10 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">人机协同共建 (AI-Ready)</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  API 风格、详实文档与 CLI 经过统一设计，使人类开发者与 AI 助手可以遵循同一份文档进行开发。为大模型优化过的 `--dense` 标志和内置 MCP 协议更让 AI 生成效率跃升。
                </p>
              </div>
              <span className="text-xs text-muted-foreground font-mono mt-8">支持 Claude, Copilot, Cursor 等大模型</span>
            </motion.div>

            {/* 卡片 4: 语义化主题系统 */}
            <motion.div 
              variants={itemVariants} 
              className="md:col-span-7 group relative rounded-3xl border border-border/80 bg-card p-8 flex flex-col justify-between overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">无需封装的主题定制</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[50ch]">
                  主题系统是一组极具表现力的 CSS 自定义属性。设计师与开发者无需为了适配新品牌而分叉代码、拆包重写，只需简单覆写设计令牌，就能让 Astryx 打上鲜明的品牌烙印。
                </p>
              </div>
              <div className="flex gap-2 mt-8">
                {["Neutral", "Matcha", "Butter", "Chocolate", "Y2K"].map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full border border-border/60 bg-muted/40 font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* 交互式主题沙盒预览 */}
        <section id="sandbox" className="flex flex-col gap-12 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              探索 7 种品牌主题
            </h2>
            <p className="text-muted-foreground">
              在线切换由不同字号倍率、圆角乘数、调色板组成的主题，一窥 Astryx 主题引擎的真正威力。
            </p>
          </div>

          <ThemePreview />
        </section>

        {/* 设计原则对比 Dos & Don'ts */}
        <section id="principles" className="flex flex-col gap-12">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              规范与反模式
            </h2>
            <p className="text-muted-foreground">
              为了保障人与 AI 在混合开发中保障高代码一致性，我们建立了直观的开发红线与推荐准则。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
            {/* Dos */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                <CheckCircle2 className="h-5 w-5" />
                推荐的做法 (Recommended)
              </div>
              <div className="flex flex-col gap-3.5 text-sm text-foreground/90">
                <div className="flex gap-2">
                  <span className="font-bold text-emerald-500 font-mono">1.</span>
                  <span><strong>布局为先</strong>：先选好 {"AppShell"} 框架及侧边栏，划分预算，最后写内容。</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-emerald-500 font-mono">2.</span>
                  <span><strong>语义令牌</strong>：始终使用 <code className="bg-muted px-1 py-0.5 rounded text-xs">{"var(--color-*)"}</code> 或 Tailwind 语义类，防止色彩碎片化。</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-emerald-500 font-mono">3.</span>
                  <span><strong>主从结构</strong>：在当前页面使用 {"LayoutPanel"} / 检查面板展开详情，而不是进行路由离开跳转。</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-emerald-500 font-mono">4.</span>
                  <span><strong>受控表单</strong>：所有的 {"Input"} 表单项严格为受控组件（{"value + onChange"}）。</span>
                </div>
              </div>
            </div>

            {/* Don'ts */}
            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-destructive font-bold">
                <XCircle className="h-5 w-5" />
                避免的做法 (Avoid)
              </div>
              <div className="flex flex-col gap-3.5 text-sm text-foreground/90">
                <div className="flex gap-2">
                  <span className="font-bold text-destructive font-mono">1.</span>
                  <span>在原生 HTML 元素上使用行内硬编码样式，应当在组件上使用 <code className="bg-muted px-1 py-0.5 rounded text-xs">{"xstyle"}</code> 或 Tailwind。</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-destructive font-mono">2.</span>
                  <span>硬编码色值如 <code className="bg-muted px-1 py-0.5 rounded text-xs">{"#fff"}</code> 或间距 <code className="bg-muted px-1 py-0.5 rounded text-xs">{"16px"}</code>，导致无法兼容全局亮暗模式和未来设计重构。</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-destructive font-mono">3.</span>
                  <span>无休止地使用 <code className="bg-muted px-1 py-0.5 rounded text-xs">{"Card"}</code>。卡片是自包含小部件，不要将列表中的每一个 Item 用 Card 包装。</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-destructive font-mono">4.</span>
                  <span>随意硬编码原生 <code className="bg-muted px-1 py-0.5 rounded text-xs">{"<a>"}</code> 标签，这会导致 Next.js 等框架路由无法预加载，应使用 <code className="bg-muted px-1 py-0.5 rounded text-xs">{"useLinkComponent()"}</code>。</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA 开始使用 */}
        <section className="rounded-3xl border border-border/80 p-8 md:p-12 bg-muted/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto w-full">
          <div className="absolute top-0 right-0 w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[50px]" />
          
          <div className="flex flex-col gap-3 max-w-xl text-center md:text-left">
            <h3 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight">
              准备好开启协同构建了吗？
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              探索 Astryx 设计系统的所有细节：色彩分层、行高垂直网格对齐、同心圆角、CLI 命令行以及与 AI 并肩开发的细节指南。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 min-w-[200px]">
            <Link href="/docs">
              <Button size="lg" className="w-full rounded-full font-bold gap-2">
                查阅完整文档
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-border/50 py-12 mt-12 bg-muted/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <span className="font-heading font-extrabold tracking-tight text-foreground">Astryx</span>
            <span>·</span>
            <span>由人与 AI 智能体共同打造</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://stylexjs.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              StyleX
            </a>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              React
            </a>
            <span>MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

