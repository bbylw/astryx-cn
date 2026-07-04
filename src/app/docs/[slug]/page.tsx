import React from "react";
import { docsData } from "@/config/docs";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return Object.keys(docsData).map((slug) => ({
    slug,
  }));
}

export default async function DocItemPage(props: PageProps<"/docs/[slug]">) {
  const { slug } = await props.params;
  const doc = docsData[slug];

  if (!doc) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 pb-6 border-b border-border/40">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          {doc.title}
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-[65ch]">
          {doc.description}
        </p>
      </div>

      <div className="mt-4">
        <MarkdownRenderer content={doc.markdown} />
      </div>
    </div>
  );
}
