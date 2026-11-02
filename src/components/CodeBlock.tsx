"use client";

import { useState } from "react";
import { Button, Tab, TabList } from "@astryxdesign/core";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  npm: string;
  pnpm: string;
  yarn: string;
  bun: string;
}

const packageManagers = ["npm", "pnpm", "yarn", "bun"] as const;
type PackageManager = (typeof packageManagers)[number];

export function CodeBlock({ npm, pnpm, yarn, bun }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<PackageManager>("npm");

  const commands: Record<PackageManager, string> = { npm, pnpm, yarn, bun };

  const handleCopy = async () => {
    const textToCopy = commands[activeTab];
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative my-6 rounded-xl border border-border bg-muted/40 backdrop-blur-sm overflow-hidden group">
      <div className="flex items-center justify-between border-b border-border bg-muted/60 px-4 py-1.5">
        <TabList
          value={activeTab}
          onChange={(value) => setActiveTab(value as PackageManager)}
          size="sm"
          layout="hug"
          aria-label="选择包管理器"
        >
          {packageManagers.map((pm) => (
            <Tab key={pm} value={pm} label={pm} />
          ))}
        </TabList>

        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          label="复制代码"
          icon={copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
          onClick={handleCopy}
          className="h-7 w-7 text-muted-foreground"
        />
      </div>

      <div className="p-4 font-mono text-sm overflow-x-auto leading-relaxed text-foreground">
        <pre className="m-0">
          <code className="text-xs sm:text-sm">{commands[activeTab]}</code>
        </pre>
      </div>
    </div>
  );
}
