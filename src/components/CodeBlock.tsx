"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  npm: string;
  pnpm: string;
  yarn: string;
  bun: string;
}

export function CodeBlock({ npm, pnpm, yarn, bun }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("npm");

  const commands: Record<string, string> = { npm, pnpm, yarn, bun };

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
    <div className="relative my-6 rounded-xl border border-border/80 bg-neutral-900/5 dark:bg-neutral-950/40 backdrop-blur-sm overflow-hidden group">
      <Tabs defaultValue="npm" onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between border-b border-border/60 bg-neutral-100/60 dark:bg-neutral-900/60 px-4 py-1.5">
          <TabsList className="bg-transparent h-8 p-0 gap-1 border-none shadow-none">
            {["npm", "pnpm", "yarn", "bun"].map((pm) => (
              <TabsTrigger
                key={pm}
                value={pm}
                className="h-7 text-xs px-2.5 rounded-md data-[state=active]:bg-background/80 data-[state=active]:shadow-sm font-mono"
              >
                {pm}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <Button
            size="icon"
            variant="ghost"
            onClick={handleCopy}
            className="h-7 w-7 text-muted-foreground hover:text-foreground opacity-80 hover:opacity-100 transition-opacity"
            title="复制代码"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>

        <div className="p-4 font-mono text-sm overflow-x-auto leading-relaxed dark:text-neutral-200">
          <TabsContent value="npm" className="mt-0 outline-none">
            <pre className="m-0"><code className="text-xs sm:text-sm">{npm}</code></pre>
          </TabsContent>
          <TabsContent value="pnpm" className="mt-0 outline-none">
            <pre className="m-0"><code className="text-xs sm:text-sm">{pnpm}</code></pre>
          </TabsContent>
          <TabsContent value="yarn" className="mt-0 outline-none">
            <pre className="m-0"><code className="text-xs sm:text-sm">{yarn}</code></pre>
          </TabsContent>
          <TabsContent value="bun" className="mt-0 outline-none">
            <pre className="m-0"><code className="text-xs sm:text-sm">{bun}</code></pre>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
