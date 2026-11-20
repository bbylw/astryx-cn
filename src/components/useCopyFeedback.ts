"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 复制 + 反馈的共享实现（modern-web-guidance: copy-button）：
 * - 成功与失败都反馈（clipboard 权限被拒/非安全上下文时走失败分支）
 * - 反馈文本写入按钮外部的 role="status" 气泡（按钮子节点是 presentational，不可靠播报）
 * - 连点时清掉旧计时器而不是叠加；卸载时清理
 * - VoiceOver 会跳过与上一条相同的播报，重复消息追加不换行空格区分
 */
export function useCopyFeedback() {
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastMessage = useRef("");

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const copy = async (text: string) => {
    if (!text) return;
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      ok = false;
    }
    let next = ok ? "已复制" : "复制失败";
    if (next === lastMessage.current) next += "\u00A0";
    lastMessage.current = next;
    setMessage(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), 2000);
  };

  return { message, copied: message.startsWith("已复制"), copy };
}