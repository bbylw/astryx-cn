"use client";

import React from "react";
import { CodeBlock } from "./CodeBlock";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // 1. 解析 markdown 文件为块结构
  const parseBlocks = (text: string) => {
    const lines = text.split("\n");
    const blocks: { type: string; content: string; lang?: string }[] = [];
    let currentBlock: { type: string; lines: string[]; lang?: string } | null = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // 代码块边界
      if (line.trim().startsWith("```")) {
        if (currentBlock && currentBlock.type === "code") {
          blocks.push({
            type: "code",
            content: currentBlock.lines.join("\n"),
            lang: currentBlock.lang,
          });
          currentBlock = null;
        } else {
          const lang = line.trim().slice(3).trim();
          currentBlock = { type: "code", lines: [], lang };
        }
        continue;
      }

      // 如果处于代码块中，收集行
      if (currentBlock && currentBlock.type === "code") {
        currentBlock.lines.push(line);
        continue;
      }

      // 表格边界
      if (line.trim().startsWith("|")) {
        if (currentBlock && currentBlock.type === "table") {
          currentBlock.lines.push(line);
        } else {
          if (currentBlock) {
            blocks.push({ type: currentBlock.type, content: currentBlock.lines.join("\n") });
          }
          currentBlock = { type: "table", lines: [line] };
        }
        continue;
      }

      // 列表边界
      if (line.trim().startsWith("- ") || line.trim().match(/^\d+\.\s/)) {
        if (currentBlock && currentBlock.type === "list") {
          currentBlock.lines.push(line);
        } else {
          if (currentBlock) {
            blocks.push({ type: currentBlock.type, content: currentBlock.lines.join("\n") });
          }
          currentBlock = { type: "list", lines: [line] };
        }
        continue;
      }

      // 引用边界
      if (line.trim().startsWith(">")) {
        if (currentBlock && currentBlock.type === "blockquote") {
          currentBlock.lines.push(line);
        } else {
          if (currentBlock) {
            blocks.push({ type: currentBlock.type, content: currentBlock.lines.join("\n") });
          }
          currentBlock = { type: "blockquote", lines: [line] };
        }
        continue;
      }

      // 分割线
      if (line.trim() === "---") {
        if (currentBlock) {
          blocks.push({ type: currentBlock.type, content: currentBlock.lines.join("\n") });
          currentBlock = null;
        }
        blocks.push({ type: "divider", content: "---" });
        continue;
      }

      // 标题
      if (line.trim().startsWith("#")) {
        if (currentBlock) {
          blocks.push({ type: currentBlock.type, content: currentBlock.lines.join("\n") });
          currentBlock = null;
        }
        blocks.push({ type: "heading", content: line });
        continue;
      }

      // 空行
      if (line.trim() === "") {
        if (currentBlock) {
          blocks.push({ type: currentBlock.type, content: currentBlock.lines.join("\n") });
          currentBlock = null;
        }
        continue;
      }

      // 普通段落
      if (currentBlock && currentBlock.type === "paragraph") {
        currentBlock.lines.push(line);
      } else {
        if (currentBlock) {
          blocks.push({ type: currentBlock.type, content: currentBlock.lines.join("\n") });
        }
        currentBlock = { type: "paragraph", lines: [line] };
      }
    }

    if (currentBlock) {
      blocks.push({ type: currentBlock.type, content: currentBlock.lines.join("\n") });
    }

    return blocks;
  };

  // 2. 渲染行内元素（粗体、行内代码、链接等）
  const renderInlineText = (text: string) => {
    // 匹配 **bold**, `code`, [text](url)
    const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={index}
            className="bg-muted text-foreground/90 px-1.5 py-0.5 rounded text-xs sm:text-[13px] font-mono font-semibold"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return (
          <a
            key={index}
            href={linkMatch[2]}
            target={linkMatch[2].startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium decoration-primary/40 underline-offset-4"
          >
            {linkMatch[1]}
          </a>
        );
      }
      return part;
    });
  };

  const blocks = parseBlocks(content);

  // 辅助组件：普通的单代码块渲染（带复制按钮）
  const SingleCode = ({ code, lang }: { code: string; lang?: string }) => {
    const [copied, setCopied] = React.useState(false);
    const handleCopy = () => {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="relative my-5 rounded-xl border border-border bg-neutral-900/5 dark:bg-neutral-950/40 backdrop-blur-sm overflow-hidden group">
        <div className="flex items-center justify-between border-b border-border bg-neutral-100/60 dark:bg-neutral-900/60 px-4 py-1.5">
          <span className="text-[11px] font-mono text-muted-foreground uppercase">{lang || "code"}</span>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleCopy}
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
          </Button>
        </div>
        <pre className="p-4 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed dark:text-neutral-200">
          <code>{code}</code>
        </pre>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 text-foreground/90 leading-relaxed text-sm sm:text-base">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading": {
            const hMatch = block.content.match(/^(#{1,6})\s+(.*)$/);
            if (!hMatch) return null;
            const level = hMatch[1].length;
            const text = hMatch[2];
            
            // h1, h2, h3, etc.
            if (level === 1) {
              return (
                <h1 key={index} className="font-heading text-3xl font-extrabold tracking-tight mt-8 mb-4 border-b border-border/40 pb-2">
                  {renderInlineText(text)}
                </h1>
              );
            }
            if (level === 2) {
              return (
                <h2 key={index} className="font-heading text-2xl font-bold tracking-tight mt-8 mb-4 border-b border-border/40 pb-2">
                  {renderInlineText(text)}
                </h2>
              );
            }
            if (level === 3) {
              return (
                <h3 key={index} className="font-heading text-xl font-bold tracking-tight mt-6 mb-3">
                  {renderInlineText(text)}
                </h3>
              );
            }
            return (
              <h4 key={index} className="font-heading text-lg font-semibold tracking-tight mt-4 mb-2">
                {renderInlineText(text)}
              </h4>
            );
          }
          case "paragraph": {
            return (
              <p key={index} className="my-1.5 text-muted-foreground leading-relaxed max-w-[65ch]">
                {renderInlineText(block.content)}
              </p>
            );
          }
          case "blockquote": {
            const quoteContent = block.content.replace(/^>\s*/gm, "");
            return (
              <blockquote key={index} className="my-4 border-l-4 border-amber-500 bg-amber-500/5 px-4 py-3 rounded-r-lg text-sm text-foreground/80">
                {renderInlineText(quoteContent)}
              </blockquote>
            );
          }
          case "divider": {
            return <hr key={index} className="my-6 border-border/50" />;
          }
          case "list": {
            const items = block.content.split("\n");
            const isNumbered = block.content.trim().match(/^\d+\./);
            
            if (isNumbered) {
              return (
                <ol key={index} className="my-4 list-decimal pl-6 flex flex-col gap-1.5">
                  {items.map((item, idx) => {
                    const text = item.replace(/^\d+\.\s*/, "");
                    return (
                      <li key={idx} className="text-muted-foreground pl-1">
                        {renderInlineText(text)}
                      </li>
                    );
                  })}
                </ol>
              );
            }
            
            return (
              <ul key={index} className="my-4 list-disc pl-6 flex flex-col gap-1.5">
                {items.map((item, idx) => {
                  const text = item.replace(/^-\s*/, "");
                  return (
                    <li key={idx} className="text-muted-foreground pl-1">
                      {renderInlineText(text)}
                    </li>
                  );
                })}
              </ul>
            );
          }
          case "code": {
            // 如果是快速安装的 package manager 切换
            if (block.lang === "bash" && block.content.includes("npm install @astryxdesign/core")) {
              return (
                <CodeBlock
                  key={index}
                  npm="npm install @astryxdesign/core @astryxdesign/theme-neutral @astryxdesign/cli"
                  pnpm="pnpm add @astryxdesign/core @astryxdesign/theme-neutral @astryxdesign/cli"
                  yarn="yarn add @astryxdesign/core @astryxdesign/theme-neutral @astryxdesign/cli"
                  bun="bun add @astryxdesign/core @astryxdesign/theme-neutral @astryxdesign/cli"
                />
              );
            }
            return <SingleCode key={index} code={block.content} lang={block.lang} />;
          }
          case "table": {
            const rows = block.content.split("\n");
            const headers = rows[0]
              .split("|")
              .map((h) => h.trim())
              .filter((h) => h);
            
            const alignRow = rows[1]; // --- | ---
            
            const dataRows = rows.slice(2).map((row) =>
              row
                .split("|")
                .map((cell) => cell.trim())
                .filter((_, idx) => idx > 0 && idx <= headers.length)
            );

            return (
              <div key={index} className="my-6 w-full overflow-x-auto border border-border/80 rounded-xl">
                <table className="w-full text-sm border-collapse text-left">
                  <thead className="bg-muted/40 font-semibold border-b border-border/60">
                    <tr>
                      {headers.map((h, idx) => (
                        <th key={idx} className="px-4 py-3 font-medium text-foreground">
                          {renderInlineText(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {dataRows.map((row, rowIdx) => (
                      <tr key={rowIdx} className="hover:bg-muted/10 transition-colors">
                        {row.map((cell, cellIdx) => (
                          <td key={cellIdx} className="px-4 py-2.5 text-muted-foreground whitespace-pre-wrap">
                            {renderInlineText(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
