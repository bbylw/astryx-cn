"use client";

import { useState } from "react";
import { Button, Tab, TabList } from "@astryxdesign/core";
import { Check, Copy } from "lucide-react";
import { useCopyFeedback } from "./useCopyFeedback";

interface CodeBlockProps {
  npm: string;
  pnpm: string;
  yarn: string;
  bun: string;
}

const packageManagers = ["npm", "pnpm", "yarn", "bun"] as const;
type PackageManager = (typeof packageManagers)[number];

export function CodeBlock({ npm, pnpm, yarn, bun }: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState<PackageManager>("npm");
  const { message, copied, copy } = useCopyFeedback();

  const commands: Record<PackageManager, string> = { npm, pnpm, yarn, bun };

  return (
    <div className="relative my-6 rounded-xl border border-border bg-muted/40 backdrop-blur-sm overflow-hidden group">
      <div className="flex items-center justify-between border-b border-border bg-muted/60 px-4 py-1.5">
        <TabList
          value={activeTab}
          onChange={(value) => setActiveTab(value as PackageManager)}
          size="sm"
          layout="hug"
          aria-label="选择包管理器"
          className="font-mono"
        >
          {packageManagers.map((pm) => (
            <Tab key={pm} value={pm} label={pm} />
          ))}
        </TabList>

        <span className="relative inline-flex">
          <Button
            variant="ghost"
            size="sm"
            isIconOnly
            label={`复制 ${activeTab} 安装命令`}
            icon={copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
            onClick={() => copy(commands[activeTab])}
            className="min-h-7 min-w-7 text-muted-foreground"
          />
          {/* 反馈气泡即 live region，放在按钮外部（按钮子节点是 presentational） */}
          <span className="copy-status" role="status">
            {message}
          </span>
        </span>
      </div>

      <div className="p-4 font-mono text-sm leading-relaxed text-foreground">
        <pre className="m-0 whitespace-pre-wrap break-words">
          <code className="text-xs sm:text-sm">{commands[activeTab]}</code>
        </pre>
      </div>
    </div>
  );
}