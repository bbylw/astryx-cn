import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://astryx.ndjp.net"),
  title: {
    default: "Astryx 设计系统 | 开源人机协同设计系统",
    template: "%s | Astryx 设计系统",
  },
  description: "Astryx 是一个完全可定制的开源设计系统，为当下的构建方式而生——由人与并肩工作的智能体共同打造。基于 React 19 与 StyleX 构建，内置 150+ 无障碍组件，提供极致的开发灵活性与人机协同体验。",
  keywords: [
    "Astryx",
    "设计系统",
    "React",
    "StyleX",
    "组件库",
    "无障碍",
    "设计令牌",
    "中文文档",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    siteName: "Astryx 设计系统",
    title: "Astryx 设计系统 | 开源人机协同设计系统",
    description: "完全可定制的开源设计系统，由人与并肩工作的智能体共同打造。基于 React 19 与 StyleX 构建，内置 150+ 无障碍组件。",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Astryx 中文文档：为当下的构建方式而生的开源设计系统",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Astryx 设计系统 | 开源人机协同设计系统",
    description: "完全可定制的开源设计系统，由人与并肩工作的智能体共同打造。",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f4f7" },
    { media: "(prefers-color-scheme: dark)", color: "#111112" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${figtree.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground flex flex-col font-sans">
        <ThemeProvider
          attribute={["class", "data-theme"]}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

