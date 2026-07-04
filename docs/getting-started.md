# Astryx 设计系统完整技术文档

## 目录

- [快速开始](#快速开始)
- [设计原则](#设计原则)
- [布局系统](#布局系统)
- [样式方案](#样式方案)
- [样式库互操作](#样式库互操作)
- [排版系统](#排版系统)
- [色彩系统](#色彩系统)
- [间距](#间距)
- [形状与圆角](#形状与圆角)
- [阴影与高度](#阴影与高度)
- [动效](#动效)
- [图标](#图标)
- [插图](#插图)
- [设计令牌](#设计令牌)
- [主题系统](#主题系统)
- [CLI 工具](#cli-工具)
- [核心库](#核心库)
- [迁移指南](#迁移指南)
- [与 AI 协同工作](#与-ai-协同工作)

---

## 快速开始

将设计系统添加到你的项目中，然后开始构建。

### 通过 AI 快速开始

将以下内容粘贴到你的 AI 编程工具中，让它来完成初始化：

```text
Install @astryxdesign/core, @astryxdesign/theme-neutral, and @astryxdesign/cli in this project. Run `npx astryx init` to set up agent docs. Read the generated files to learn the conventions.
```

### 安装

在现有项目中添加核心包、一个主题以及 CLI：

```bash
npm install @astryxdesign/core @astryxdesign/theme-neutral @astryxdesign/cli
```

然后运行初始化向导，以设置 AI 智能体文档、选择启动模板并了解主题系统：

```bash
npx astryx init
```

### 添加主题 CSS

在你的全局 CSS 文件中引入重置样式表和主题。主题以 CSS 自定义属性的形式提供所有设计令牌（颜色、间距、圆角、排版）：

```css
@import '@astryxdesign/core/reset.css';
@import '@astryxdesign/core/astryx.css';
@import '@astryxdesign/theme-neutral/theme.css';
```

**可用主题：**

| 主题包 | 说明 |
|---|---|
| `@astryxdesign/theme-neutral` | 柔和极简，适合作为起点 |
| `@astryxdesign/theme-butter` | 金色奶油表面配蓝色强调色；Sarina + Outfit 字体 |
| `@astryxdesign/theme-chocolate` | 暖棕色调和舒适米色；Fraunces + Albert Sans 字体 |
| `@astryxdesign/theme-gothic` | 仅深色模式，深蓝灰表面，哥特风格 |
| `@astryxdesign/theme-matcha` | 大地绿色主题，Figtree 字体 |
| `@astryxdesign/theme-stone` | 暖石与石板色；Montserrat + Figtree 字体 |
| `@astryxdesign/theme-y2k` | 俏皮 Y2K 风格，长春花底色，全息强调色 |

### 添加第一个组件

组件按类别通过子路径入口导入，这样可保持打包体积小巧且意图清晰：

```tsx
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/Layout';

export default function Page() {
  return (
    <VStack gap={2}>
      <Button label="Hello Astryx" onClick={() => alert('Hi!')} />
    </VStack>
  );
}
```

### 使用 StyleX 自定义样式

Astryx 组件支持多种样式方案。与 [StyleX](https://stylexjs.com/) 深度集成，StyleX 是一个原子化 CSS-in-JS 库：使用 `stylex.create()` 创建样式，并通过 `xstyle` prop 传递给组件：

```tsx
import * as stylex from '@stylexjs/stylex';

const overrides = stylex.create({
  save: { alignSelf: 'flex-end', marginTop: 16 },
});

<Button label="Save" xstyle={overrides.save} />
```

### 示例应用

| 示例 | 技术栈 | 路径 |
|---|---|---|
| Next.js | Next.js + 主题 CSS | [apps/example-nextjs](https://github.com/facebook/astryx/tree/main/apps/example-nextjs) |
| Next.js + StyleX | Next.js + StyleX 自定义样式 | [apps/example-nextjs-stylex](https://github.com/facebook/astryx/tree/main/apps/example-nextjs-stylex) |
| Next.js + Tailwind | Next.js + Tailwind 桥接 | [apps/example-nextjs-tailwind](https://github.com/facebook/astryx/tree/main/apps/example-nextjs-tailwind) |
| Next.js Source | 从源码导入的 Next.js | [apps/example-nextjs-source](https://github.com/facebook/astryx/tree/main/apps/example-nextjs-source) |
| Vite | Vite | [apps/example-vite](https://github.com/facebook/astryx/tree/main/apps/example-vite) |

### 探索 CLI

在 `package.json` 中添加脚本以便稳定调用：

```json
"scripts": {
  "astryx": "node node_modules/@astryxdesign/cli/bin/astryx.mjs"
}
```

常用命令：

```bash
npx astryx component           # 列出所有组件
npx astryx component Button    # 查看 Button 的 props、用法与主题
npx astryx docs                # 列出所有文档主题
npx astryx template --list     # 查看可用页面模板
npx astryx docs tokens         # 间距、颜色、圆角参考
```

---

## 设计原则

### 设计理念

- **组件优先于原生元素**：在组件能覆盖的场景下，不要使用裸 HTML
- **语义令牌优先于硬编码值**：颜色、间距和圆角以用途命名，而非外观
- **主题无关的代码**：应用代码不引用特定颜色或尺寸，主题和暗色模式自动生效
- **开放内部实现**：每个原语都导出并可组合，让你在其基础上构建而不受限制

### 规则

1. 尽可能使用组件
2. 布局为先：先选框架，再定区域预算，最后写内容
3. 密集数据渲染为行（Table、List/Item），卡片仅用于小部件和设置组
4. 使用 StyleX 或 Tailwind 进行自定义样式
5. 使用语义令牌，而非硬编码值
6. 颜色使用 CSS 自定义属性，而非十六进制值
7. 表单输入为受控模式（value + onChange）
8. 使用 `useLinkComponent()` 实现导航，以便通过 `LinkProvider` 接入框架路由

### 反模式

| 指导 | 做法 |
|---|---|
| 不要 | 在原生元素上使用行内样式，应在组件上使用 xstyle |
| 不要 | 硬编码颜色（#fff），应使用 var(--color-*) 或 Tailwind 语义类 |
| 不要 | 硬编码间距（16px），应使用间距令牌或 Tailwind 间距工具类 |
| 不要 | 硬编码 `<a>` 元素，应使用 useLinkComponent() |
| 不要 | 将每个列表项或页面部分包裹在 Card 中 |
| 不要 | 将 Badge 作为装饰，应保留给计数和枚举状态 |
| 不要 | 自创 props，应先阅读组件文档 |

---

## 布局系统

框架优先的应用布局：选择外壳、预算区域，以及何时使用卡片 vs 行。

### 框架优先

在写任何内容之前决定框架。真实应用是自顶向下构建的：选择外壳，命名区域，给每个区域明确的大小预算，然后填充内容。

**三区域工具框架示例：**

```tsx
// 框架：nav 256 | content flex | inspector 380（可调整大小）
<AppShell sideNav={<SideNav>{/* nav items */}</SideNav>} contentPadding={0}>
  <Layout>
    <LayoutContent>{/* 密集列表或表格，边缘到边缘 */}</LayoutContent>
    <LayoutPanel width={380} resizable={{minSizePx: 320, maxSizePx: 480}} hasDivider>
      {/* 选中行的检查器 */}
    </LayoutPanel>
  </Layout>
</AppShell>
```

### 应用原型

| 原型 | 框架 | 容器策略 |
|---|---|---|
| 跟踪器/工作工具 | AppShell + SideNav；选中后显示 inspector LayoutPanel | 仅行，分组边缘到边缘列表，零卡片 |
| 控制台/可观测性 | AppShell + SideNav 或 TopNav + TabList | 仪表板小部件用卡片网格，其余用 Table |
| 消息/信息流 | 列框架：导航栏 + 侧边栏 + 流 + 面板 | 行和气泡，流中无卡片 |
| 媒体库/画廊 | AppShell + TopNav；网格内容 | 卡片网格（ClickableCard），详情视图用密集元数据行 |
| 设置/表单 | AppShell + SideNav 或设置模板 | FormLayout 分区；仅危险或账单操作用 Card |

### 卡片 vs 行

Card 是小部件容器，不是列表项包装器。密集数据——用户扫描、筛选或选择的任何内容——应使用行。

- **Table**（带选择/排序插件）用于列式记录
- **List/Item** 行用于可扫描的单行记录
- **Card** 用于自包含小部件：KPI 磁贴、图表面板、画廊条目
- **EmptyState** 当筛选无匹配时放在区域内

### 面板和检查器

主从结构是工具 UI 的骨干：选中一行时打开固定宽度的检查器面板，而非导航离开。

```tsx
<LayoutPanel
  width={380}
  hasDivider
  isScrollable
  label="Details"
  resizable={{minSizePx: 320, maxSizePx: 480, autoSaveId: 'inspector'}}>
  {selected ? <DetailFields item={selected} /> : <EmptyState title="Nothing selected" />}
</LayoutPanel>
```

### 响应式约定

在构建前声明断点行为作为约定，并放在框架根部的注释中：

```tsx
// 响应式约定：
//   > 1024px  nav 256 | content | inspector 380
//   <= 1024px inspector 覆盖内容列（absolute 定位，末端对齐）
//   <= 768px  nav 折叠为 MobileNav 抽屉；工具栏操作换行
```

---

## 样式方案

### 概览

| 方式 | 用途 | 示例 |
|---|---|---|
| StyleX | 组件级覆盖、可复用样式、伪类、类型化令牌 | `stylex.create(...)` + `xstyle` |
| Tailwind 工具类 | 布局、包装器、工具样式 | `className="flex gap-3 p-4"` |
| className | 与外部 CSS 或 Tailwind 集成 | `className="my-card shadow-lg"` |
| 样式库令牌别名 | 使 Panda、Chakra、MUI 等与系统同步 | `colors.surface = 'var(--color-background-surface)'` |

### xstyle Prop

每个组件都接受 xstyle prop 进行样式自定义。它接受通过 `stylex.create()` 创建的 StyleX 样式，而非行内对象或类名。

```tsx
import * as stylex from '@stylexjs/stylex';

const overrides = stylex.create({
  card: { maxWidth: 400, marginBlock: 16 },
  saveButton: { alignSelf: 'flex-end' },
});

<Card xstyle={overrides.card} />
<Button label="Save" xstyle={overrides.saveButton} />
```

**伪类和条件样式：**

```tsx
const overrides = stylex.create({
  card: {
    boxShadow: {
      default: 'none',
      ':hover': { '@media (hover: hover)': '0 4px 12px rgba(0,0,0,0.1)' },
    },
  },
});
```

### Tailwind 集成

导入 Tailwind v4 主题桥接文件，所有设计令牌映射到 Tailwind 工具类：

```css
@layer reset, theme, base, astryx-base, astryx-theme, components, utilities;

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "@astryxdesign/core/reset.css";
@import "@astryxdesign/core/astryx.css";
@import "@astryxdesign/theme-neutral/theme.css";
@import "@astryxdesign/core/tailwind-theme.css";
@import "tailwindcss/utilities.css" layer(utilities);
```

```tsx
<div className="text-primary bg-surface rounded-container p-4 flex gap-3">
  <Button label="Save" variant="primary" />
  <Button label="Cancel" variant="secondary" />
</div>
```

### className 和 style Props

每个组件也接受标准的 className 和 style props。className 附加在组件自有类之后，style 在 StyleX 行内样式之后合并。

### 剩余 Props（属性透传）

组件扩展 HTML 属性并将剩余 props 透传到根 DOM 元素。`data-*`、`aria-*`、事件处理程序等都会自动传递。

```tsx
<Card data-testid="user-card" data-user-id={user.id} onMouseEnter={handleHover}>
  ...
</Card>
```

### 复合组件

复杂组件由小组件组合而成。每个子组件接受自己的 xstyle、className 和剩余 props。

```tsx
<Dialog isOpen={isOpen} onClose={close} xstyle={overrides.dialog}>
  <Layout
    header={
      <LayoutHeader hasDivider>
        <Heading level={2}>Edit Profile</Heading>
      </LayoutHeader>
    }
    content={
      <LayoutContent xstyle={overrides.content}>
        <TextInput label="Name" value={name} onChange={setName} />
      </LayoutContent>
    }
    footer={
      <LayoutFooter hasDivider>
        <Button label="Cancel" variant="secondary" onClick={close} />
        <Button label="Save" variant="primary" onClick={save} />
      </LayoutFooter>
    }
  />
</Dialog>
```

### 推荐选择器：数据属性

将稳定的组件类与反射数据属性结合使用：

```css
.my-app .astryx-button[data-variant="primary"] { /* ... */ }
.my-app .astryx-button[data-variant="primary"][data-size="sm"] { /* ... */ }
.my-app .astryx-heading[data-level="2"] { /* ... */ }
```

### 不推荐：裸属性和状态类

旧版裸类（如 `.primary`、`.sm`、`.level-2`）仍为兼容性而保留，但新 CSS 应使用数据属性选择器。

### 设计令牌

在编写自定义样式时使用设计令牌：

```tsx
import * as stylex from '@stylexjs/stylex';
import {colorVars, spacingVars, radiusVars} from '@astryxdesign/core/theme/tokens.stylex';

const styles = stylex.create({
  highlight: {
    backgroundColor: colorVars['--color-accent-muted'],
    padding: spacingVars['--spacing-3'],
    borderRadius: radiusVars['--radius-element'],
  },
});
```

---

## 样式库互操作

### 核心原则

让系统成为主题值的唯一真实来源。组件从 CSS 自定义属性读取设计令牌。其他样式库应将自己的语义令牌、工具名称或主题对象映射到系统 CSS 变量。

### 选择集成路径

| 路径 | 使用场景 | 值形状 |
|---|---|---|
| CSS 变量别名 | 库最终写 CSS 并接受字符串值 | `var(--color-text-primary)` |
| StyleX 令牌导入 | 在应用代码中编写 StyleX 样式 | `colorVars['--color-text-primary']` |
| Tailwind 桥接 | 想要由系统令牌驱动的工具类 | `@astryxdesign/core/tailwind-theme.css` |
| 令牌解析器 API | JS 需要令牌值用于图表、canvas、SVG | `resolveThemeToken(theme, '--color-*', {mode})` |

### 纯 CSS 和 CSS Modules

```css
.card {
  background: var(--color-background-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-container);
  padding: var(--spacing-4);
}
```

### StyleX

```tsx
import {colorVars, spacingVars, radiusVars} from '@astryxdesign/core/theme/tokens.stylex';
```

### Tailwind

Tailwind v4 桥接使用 `@theme inline` 将 Tailwind 主题变量映射到系统 CSS 变量。工具类如 `text-primary`、`bg-surface`、`border-border`、`rounded-lg`、`shadow-md` 与活动主题保持同步。

### Panda、Chakra 等语义令牌系统

将系统 CSS 变量放在语义令牌对象的叶子节点：

```ts
semanticTokens: {
  colors: {
    text: {
      primary: {value: 'var(--color-text-primary)'},
      secondary: {value: 'var(--color-text-secondary)'},
    },
    background: {
      surface: {value: 'var(--color-background-surface)'},
    },
    border: {
      default: {value: 'var(--color-border)'},
    },
  },
}
```

### MUI

```ts
const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        primary: {main: 'var(--color-accent)'},
        background: {
          default: 'var(--color-background-body)',
          paper: 'var(--color-background-surface)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
        },
        divider: 'var(--color-border)',
      },
    },
    dark: { /* same vars */ },
  },
});
```

### Emotion、styled-components 等

使用 CSS 变量引用作为主题对象的值：

```ts
const appTheme = {
  colors: {
    textPrimary: 'var(--color-text-primary)',
    surface: 'var(--color-background-surface)',
    border: 'var(--color-border)',
  },
};
```

### UnoCSS 等自定义工具系统

```ts
export default defineConfig({
  theme: {
    colors: {
      surface: 'var(--color-background-surface)',
      primary: 'var(--color-text-primary)',
    },
  },
});
```

### 非 CSS 处理

当 React 外的代码需要令牌值时使用 `resolveThemeTokens()`：

```ts
import {resolveThemeTokens} from '@astryxdesign/core/theme/tokens';
import {neutralTheme} from '@astryxdesign/theme-neutral';

const lightTokens = resolveThemeTokens(neutralTheme, {mode: 'light'});
```

在客户端组件内使用 `useTheme()`：

```tsx
'use client';
import {useTheme} from '@astryxdesign/core/theme';

function ChartConfig() {
  const {mode, tokens} = useTheme();
  const options = useMemo(() => ({
    textColor: tokens['--color-text-primary'],
    seriesColor: tokens['--color-data-categorical-blue'],
  }), [mode, tokens]);
  return <Chart options={options} />;
}
```

---

## 排版系统

### 概览

排版构建在几何字体尺度上：基础大小 × 比例^步进，默认值为 14px 和 1.2。每个文本样式都是组合字体大小、字重和行高的语义令牌。

### 字体族

| 令牌 | 值 |
|---|---|
| `--font-family-body` | `var(--font-figtree,Figtree)` |
| `--font-family-code` | `"SF Mono"` |
| `--font-family-heading` | `var(--font-figtree,Figtree)` |

### 字体大小

几何尺度：round(14 × 1.2^step)。默认尺度产生从 4xs（6px）到 5xl（42px）的 12 个步进。

| 令牌 | 值 |
|---|---|
| `--font-size-4xs` | 0.375rem |
| `--font-size-3xs` | 0.4375rem |
| `--font-size-2xs` | 0.5rem |
| `--font-size-xs` | 0.625rem |
| `--font-size-sm` | 0.75rem |
| `--font-size-base` | 0.875rem |
| `--font-size-lg` | 1.0625rem |
| `--font-size-xl` | 1.25rem |
| `--font-size-2xl` | 1.5rem |
| `--font-size-3xl` | 1.8125rem |
| `--font-size-4xl` | 2.1875rem |
| `--font-size-5xl` | 2.625rem |

### 字重

| 令牌 | 值 | 用途 |
|---|---|---|
| `--font-weight-normal` | 400 | 正文/代码 |
| `--font-weight-medium` | 500 | 标签/数据 |
| `--font-weight-semibold` | 600 | 标题/标题 |
| `--font-weight-bold` | 700 | 强强调 |

### 行高

行高根据分级目标比计算，并捕捉到 4px 垂直网格。小文本（<20px）目标 1.5，中等文本（20-31px）目标 1.4，大文本（≥32px）目标 1.25。

### 类型尺度

| 示例 | 令牌 |
|---|---|
| H1 | `--font-size-2xl` · `--font-weight-semibold` · 1.3333 |
| H2 | `--font-size-xl` · `--font-weight-semibold` · 1.4 |
| H3 | `--font-size-lg` · `--font-weight-semibold` · 1.4118 |
| H4 | `--font-size-base` · `--font-weight-semibold` · 1.4286 |
| H5 | `--font-size-sm` · `--font-weight-semibold` · 1.6667 |
| H6 | `--font-size-xs` · `--font-weight-semibold` · 1.6 |
| Display 1 | `--font-size-5xl` · `--font-weight-normal` · 1.2381 |
| Display 2 | `--font-size-4xl` · `--font-weight-normal` · 1.2571 |
| Display 3 | `--font-size-3xl` · `--font-weight-normal` · 1.2414 |
| Large | `--font-size-lg` · `--font-weight-semibold` · 1.4118 |
| Body | `--font-size-base` · `--font-weight-normal` · 1.4286 |
| Label | `--font-size-base` · `--font-weight-medium` · 1.4286 |
| Code | `--font-size-base` · `--font-weight-normal` · 1.4286 |
| Supporting | `--font-size-sm` · `--font-weight-normal` · 1.6667 |

### 用法

```tsx
import {Heading, Text} from '@astryxdesign/core';

<Heading level={1}>Page Title</Heading>
<Heading level={2}>Section</Heading>
<Heading level={3}>Subsection</Heading>
<Heading level={1} type="display-1">Hero Title</Heading>
<Heading level={2} accessibilityLevel={3}>Sidebar Section</Heading>

<Text type="body">Body text at the base scale.</Text>
<Text type="large">Emphasized body text.</Text>
<Text type="label">Form label</Text>
<Text type="supporting">Helper text, timestamps, metadata.</Text>
<Text type="code">{'const x = 1;'}</Text>
<Text type="display-2">$1.2M Revenue</Text>
```

### 自定义类型尺度

```tsx
const editorialTheme = defineTheme({
  name: 'editorial',
  typography: {
    scale: { base: 16, ratio: 1.25 },
    body: { family: 'Geist', fallbacks: '-apple-system, sans-serif' },
    heading: { weight: 'bold' },
    code: { family: 'Geist Mono', fallbacks: '"SF Mono", monospace' },
  },
});
```

---

## 色彩系统

### 概览

颜色是语义化的：令牌描述用途而非外观。每个颜色通过 CSS `light-dark()` 在亮暗模式之间自动适配。

### 表面层次

- `--color-background-body`：#F8F4ED / #111112（页面背景）
- `--color-background-surface`：#FFFFFF / #1F1F22（表面背景）
- `--color-background-card`：#FFFFFF / #1F1F22（卡片背景）
- `--color-background-popover`：#FFFFFF / #28292C（弹出层背景）

### 文本颜色

- `--color-text-primary`：#15110C / #DFE2E5
- `--color-text-secondary`：#4E606F / #AAAFB5
- `--color-text-disabled`：#A4B0BC / #6F747C
- `--color-text-accent`：#15110C / #DFE2E5

### 强调色与状态色

- `--color-accent`：#15110C / #DFE2E5
- `--color-success`：#0D8626
- `--color-error`：#E3193B / #F5394F
- `--color-warning`：#E9AF08 / #F2C00B

### 语义类别色

- `--color-data-categorical-blue`：#0171E3
- `--color-data-categorical-orange`：#EB6E00
- `--color-data-categorical-purple`：#6B1EFD
- `--color-data-categorical-green`：#0B991F
- `--color-data-categorical-pink`：#F351C0
- `--color-data-categorical-cyan`：#0171A4
- `--color-data-categorical-red`：#F5394F
- `--color-data-categorical-teal`：#08A3A3
- `--color-data-categorical-brown`：#965E03
- `--color-data-categorical-indigo`：#6F8AFF
- `--color-data-neutral`：#8494A3 / #8C939B

### 语法高亮色

- `--color-syntax-keyword`：var(--color-text-accent)
- `--color-syntax-string`：var(--color-text-green)
- `--color-syntax-comment`：var(--color-text-secondary)
- `--color-syntax-number`：var(--color-text-orange)
- `--color-syntax-function`：var(--color-text-blue)
- `--color-syntax-type`：var(--color-text-purple)
- `--color-syntax-background`：var(--color-background-muted)

### 用法

```tsx
import {colorVars} from '@astryxdesign/core/theme/tokens.stylex';

const styles = stylex.create({
  container: {
    backgroundColor: colorVars['--color-background-surface'],
    color: colorVars['--color-text-primary'],
    borderColor: colorVars['--color-border'],
  },
});
```

---

## 间距

### 概览

设计系统使用 4px 基础单位的间距尺度。组件 gap props 接受映射到这些令牌的步进值。

### 尺度

| 令牌 | 值 |
|---|---|
| `--spacing-0` | 0px |
| `--spacing-0-5` | 2px |
| `--spacing-1` | 4px |
| `--spacing-1-5` | 6px |
| `--spacing-2` | 8px |
| `--spacing-3` | 12px |
| `--spacing-4` | 16px |
| `--spacing-5` | 20px |
| `--spacing-6` | 24px |
| `--spacing-7` | 28px |
| `--spacing-8` | 32px |
| `--spacing-9` | 36px |
| `--spacing-10` | 40px |
| `--spacing-11` | 44px |
| `--spacing-12` | 48px |

### 用法

```tsx
// 通过组件 props（推荐）
<Stack gap={4}>{/* 16px gap */}</Stack>

// 通过 StyleX 令牌（自定义布局）
import {spacingVars} from '@astryxdesign/core';
const styles = stylex.create({
  custom: {
    padding: spacingVars['--spacing-4'],
    gap: spacingVars['--spacing-3'],
  },
});
```

---

## 形状与圆角

### 概览

圆角尺度使用语义命名系统：inner → element → container → page。主题可以通过圆角乘数缩放整个尺度。

### 圆角尺度

| 令牌 | 值 | 用途 |
|---|---|---|
| `--radius-none` | 0px | 无圆角 |
| `--radius-inner` | 8px | 内嵌子元素 |
| `--radius-element` | 12px | 交互控件（按钮、输入框、选择器） |
| `--radius-container` | 16px | 内容容器（卡片、面板、对话框） |
| `--radius-page` | 32px | 页面级容器 |
| `--radius-chat` | 28px | 聊天气泡 |
| `--radius-full` | 9999px | 胶囊形状（徽章、标签、头像状态点） |

### 同心圆角

当圆角容器有内边距时，内部元素需要更小的圆角以保持同心。Card 等组件会自动处理——内部圆角计算为 `max(0, outerRadius - padding)`。

---

## 阴影与高度

### 概览

阴影令牌通过 box-shadow 创建深度感。三级（low、med、high）为浮动元素建立了视觉层次。内阴影为交互组件提供焦点和选择环。

### 阴影尺度

| 令牌 | 值（亮/暗） |
|---|---|
| `--shadow-low` | 0px 1px 1px + 0px 2px 8px |
| `--shadow-med` | 0px 1px 2px + 0px 2px 12px |
| `--shadow-high` | 0px 2px 2px + 0px 8px 24px |
| `--shadow-inset-hover` | inset 0px 0px 0px 2px |
| `--shadow-inset-selected` | inset 0px 0px 0px 2px rgba(1, 113, 227, 0.5) |
| `--shadow-inset-success` | inset 0px 0px 0px 2px rgba(38, 167, 86, 0.3) |
| `--shadow-inset-warning` | inset 0px 0px 0px 2px rgba(226, 164, 0, 0.3) |
| `--shadow-inset-error` | inset 0px 0px 0px 2px rgba(227, 25, 59, 0.3) |

### 用法

```tsx
import {shadowVars} from '@astryxdesign/core';

const styles = stylex.create({
  dropdown: { boxShadow: shadowVars['--shadow-med'] },
  dialog: { boxShadow: shadowVars['--shadow-high'] },
  inputFocused: { boxShadow: shadowVars['--shadow-inset-selected'] },
});
```

---

## 动效

### 概览

动效服务于两个目的：使用户界面更易理解，并使体验更愉悦。系统提供持续时间和缓动曲线令牌以保持一致性。

### 持续时间

| 令牌 | 值 |
|---|---|
| `--duration-fast-min` | 130ms |
| `--duration-fast` | 175ms |
| `--duration-fast-max` | 230ms |
| `--duration-medium-min` | 310ms |
| `--duration-medium` | 410ms |
| `--duration-medium-max` | 550ms |
| `--duration-slow-min` | 730ms |
| `--duration-slow` | 975ms |
| `--duration-slow-max` | 1300ms |

### 缓动

| 令牌 | 值 |
|---|---|
| `--ease-standard` | cubic-bezier(0.24, 1, 0.4, 1) |

### 动效应有帮助的场景

- 面板、对话框和可折叠部分从动画中获益
- Toast 和通知需要足够的入场动画以被注意到
- 状态变化（开关切换、选择高亮）通过短暂过渡显得更有意图

### 动效应避免的场景

- 表格行悬停、列表项高亮等高频交互
- 阻止用户操作的动画

### 运动原则

- 不是所有东西都需要退场动画
- 退场动画应与入场匹配
- 方向应与操作匹配
- 上下文 UI 应感觉与触发器相连
- 尊重用户减少运动偏好

### 用法

```tsx
import {durationVars, easeVars} from '@astryxdesign/core';

const styles = stylex.create({
  fadeIn: {
    transitionProperty: 'opacity',
    transitionDuration: durationVars['--duration-fast'],
    transitionTimingFunction: easeVars['--ease-standard'],
  },
});
```

---

## 图标

### 可用名称

| 名称 | 用途 |
|---|---|
| close | 关闭、取消对话框/面板 |
| chevronDown | 下拉触发器、展开/折叠 |
| chevronLeft | 返回、上一步 |
| chevronRight | 前进、下一步 |
| check | 复选框选中、确认 |
| success | 成功状态指示器 |
| error | 错误状态指示器 |
| warning | 警告状态指示器 |
| info | 信息状态指示器 |
| calendar | 日期选择器、日程安排 |
| clock | 时间选择器、时间戳 |
| externalLink | 在新标签页打开的链接 |
| menu | 汉堡菜单、导航切换 |
| moreHorizontal | 溢出菜单、更多操作 |
| search | 搜索输入、查找 |
| arrowUp / arrowDown | 排序 |
| funnel | 筛选控件 |
| eyeSlash | 隐藏/可见性切换 |
| copy | 复制到剪贴板 |
| microphone | 语音输入、录音 |

### 自定义图标

对于不在语义列表中的图标，直接传入 SVG 组件：

```tsx
import { PhotoIcon } from '@heroicons/react/24/outline';
<Icon icon={PhotoIcon} size="lg" />
```

### 主题覆盖

使用 `registerIcons()` 替换默认 SVG：

```tsx
import { registerIcons } from '@astryxdesign/core/Icon';
registerIcons({
  close: <XMarkIcon />,
  chevronDown: <ChevronDownIcon />,
});
```

---

## 插图

### 使用场景

| 上下文 | 示例 |
|---|---|
| 空状态 | 无数据、首次体验、搜索无结果 |
| 入门引导 | 欢迎界面、功能介绍、设置向导 |
| 功能亮点 | 新功能公告、升级提示 |
| 错误状态 | 权限拒绝、未找到、服务不可用 |

### 指南

- 保持产品中插图风格一致
- 使用简单扁平的插图，在亮暗模式下都能正常工作
- 按比例缩放插图，通常 120-240px
- 插图居中，支撑文本放在下方

### 放置

```tsx
<Center>
  <Stack direction="vertical" gap={3} hAlign="center">
    <img src="/illustrations/empty-search.svg" alt="No results" style={{ width: 200, height: 200 }} />
    <Heading level={3}>No results found</Heading>
    <Text type="body" color="secondary">Try adjusting your search or filters to find what you're looking for.</Text>
  </Stack>
</Center>
```

---

## 设计令牌

### 尺寸令牌

| 令牌 | 值 |
|---|---|
| `--size-element-sm` | 28px |
| `--size-element-md` | 32px |
| `--size-element-lg` | 36px |

### 边框令牌

| 令牌 | 值 |
|---|---|
| `--border-width` | 1px |

### 完整颜色令牌参考

详细颜色令牌包括：表面色、文本色、图标色、边框色、状态色（成功/错误/警告）、语义类别色（12 种颜色 5 级渐变）、语法高亮色、品牌色等。完整参考见 [官方令牌文档](https://astryx.atmeta.com/docs/tokens)。

---

## 主题系统

### 快速开始

```bash
npm install @astryxdesign/theme-neutral
```

```tsx
import {Theme} from '@astryxdesign/core';
import {neutralTheme} from '@astryxdesign/theme-neutral';

function App() {
  return (
    <Theme theme={neutralTheme}>
      <YourApp />
    </Theme>
  );
}
```

### 优化设置（预构建 CSS）

```tsx
import {Theme} from '@astryxdesign/core';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';
import '@astryxdesign/theme-neutral/theme.css';

function App() {
  return (
    <Theme theme={neutralTheme}>
      <YourApp />
    </Theme>
  );
}
```

### Theme Props

| Prop | 类型 | 默认 | 说明 |
|---|---|---|---|
| theme | DefinedTheme | — | 主题对象（必需） |
| mode | 'system' \| 'light' \| 'dark' | 'system' | 色彩模式 |
| children | ReactNode | — | 应用内容 |

### 创建自定义主题

使用 CLI 向导（推荐）或使用 `defineTheme` 手动创建：

```bash
npx astryx theme
```

```tsx
import {defineTheme} from '@astryxdesign/core/theme';

const myTheme = defineTheme({
  name: 'my-theme',
  color: { accent: '#7B61FF', neutralStyle: 'cool' },
  typography: {
    scale: { base: 14, ratio: 1.2 },
    body: { family: 'Inter', fallbacks: '-apple-system, sans-serif' },
  },
  radius: { base: 4, multiplier: 1 },
  motion: { fast: 175, medium: 410, ratio: 0.75 },
  tokens: {
    '--color-accent': ['#7B61FF', '#9B85FF'],
  },
  components: {
    button: { 'variant:primary': { color: 'white' } },
  },
});
```

### defineTheme 配置

| 配置 | 生成内容 | 参数 |
|---|---|---|
| color | accent、background、text、border 等 | accent (hex)、neutralStyle?、contrast? |
| typography.scale | heading、body 的 size/weight/leading | base (px)、ratio |
| typography.body/heading/code | font-family 等 | family、fallbacks?、weight? |
| radius | inner、element、container、page、chat | base (px)、multiplier (0-2) |
| motion | duration 系列令牌 | fast (ms)、medium (ms)、ratio、easing? |

### 扩展主题

`extends` 让你从现有主题派生新主题：

```tsx
const brandTheme = defineTheme({
  name: 'brand',
  extends: neutralTheme,
  icons: myIcons,
  tokens: {
    '--color-accent': ['#7B61FF', '#9B85FF'],
  },
});
```

### 组件样式覆盖

```tsx
components: {
  card: { base: { borderRadius: '20px', padding: '24px' } },
  button: {
    base: { borderRadius: '9999px', textTransform: 'uppercase' },
    'variant:ghost': { borderWidth: '2px', borderStyle: 'solid' },
  },
}
```

### 自定义变体

主题可以为任何组件添加新的 prop 值：

```tsx
components: {
  button: {
    'variant:primary-muted': {
      backgroundColor: 'light-dark(#F2F4F6, #28292C)',
      color: 'var(--color-text-primary)',
    },
  },
}
```

构建后新值在 JSX 中类型安全：

```tsx
<Button variant="primary-muted" label="Save draft" />
```

### 构建主题用于生产

```bash
npx astryx theme build ./src/themes/ocean.ts
```

生成：ocean.css（预编译 CSS）、ocean.js（主题对象）、ocean.d.ts（类型声明）、ocean.variants.d.ts（自定义变体类型增强）。

### 运行时 vs 构建主题

| | 运行时（源码） | 构建 |
|---|---|---|
| 导入 | `@astryxdesign/theme-{name}` | `/built` + `theme.css` |
| 工作原理 | useInsertionEffect 注入 `<style>` | 预编译 CSS 文件 |
| 组件覆盖 | 仅在客户端注入 | 在静态 CSS 中，SSR 时即存在 |
| SSR 安全 | 令牌是，组件覆盖会在水合时闪烁 | 完全 SSR 安全 |
| 适用场景 | 开发、原型、客户端 SPA | 生产、SSR 应用 |

### 亮/暗模式

```tsx
// 令牌中使用 [亮, 暗] 元组
'--color-accent': ['#0064E0', '#2694FE']

// 使用按钮切换
const [mode, setMode] = useState<'light' | 'dark'>('light');
<Theme theme={myTheme} mode={mode}>
  <Button
    label={mode === 'light' ? 'Switch to Dark' : 'Switch to Light'}
    onClick={() => setMode(m => (m === 'light' ? 'dark' : 'light'))}
  />
</Theme>
```

### 嵌套主题

```tsx
<Theme theme={lightTheme} mode="light">
  <Layout
    header={<LayoutHeader>...</LayoutHeader>}
    start={
      <Theme theme={darkTheme} mode="dark">
        <LayoutPanel>{/* 暗色侧边栏 */}</LayoutPanel>
      </Theme>
    }
    content={<LayoutContent>{/* 亮色内容 */}</LayoutContent>}
  />
</Theme>
```

### 令牌工具函数

```ts
import {tokenVar, tokenVars, resolveThemeTokens} from '@astryxdesign/core/theme/tokens';

// 用于样式库配置的 CSS var 引用
const pandaTheme = {
  colors: { text: tokenVar('--color-text-primary') },
};

// 无需 React 上下文的令牌值解析
const lightTokens = resolveThemeTokens(neutralTheme, {mode: 'light'});
```

### useTheme Hook

```tsx
'use client';
import {useTheme} from '@astryxdesign/core/theme';

function ChartConfig() {
  const {mode, tokens} = useTheme();
  // 在 SVG、canvas、图表等中使用 tokens
}
```

---

## CLI 工具

### 安装

```bash
npm install -D @astryxdesign/cli
```

### 搜索

```bash
npx astryx search button
```

结果跨组件、钩子、文档和模板。支持 `--type`、`--limit`、`--detail`、`--json` 选项。

### 命令

| 命令 | 说明 |
|---|---|
| `init` | 初始化设计系统：安装包、设置主题、添加 AI 智能体文档 |
| `component` | 列出组件或打印详细文档 |
| `search` | 在组件、钩子、文档和模板中搜索 |
| `docs` | 打印参考文档 |
| `template` | 将页面或块模板注入项目 |
| `hook` | 列出钩子并打印钩子文档 |
| `swizzle` | 复制组件源码到项目中进行深度自定义 |
| `upgrade` | 运行 codemod 在版本之间迁移 |
| `theme build` | 编译 defineTheme 文件为 CSS 和 JS |
| `discover` | 发现外部包和组件 |
| `doctor` | 诊断 Astryx 设置并报告问题 |

### 全局选项

- `--json`：输出类型化 JSON
- `--detail <level>`：详情级别（brief、compact、full）
- `--zh`：输出简体中文文档
- `--dense`：压缩格式（节省令牌，适合 AI 智能体）
- `--lang <locale>`：语言/格式简写（en、zh、dense）

### JSON API

所有命令支持 `--json` 用于机器可读的输出。响应是类型化信封：

```json
{"type": "component.detail", "data": {"name": "Button", ...}}
```

错误响应：

```json
{
  "error": "No component named \"Buttn\"",
  "code": "ERR_UNKNOWN_COMPONENT",
  "suggestions": [{"name": "Button", "reason": "similar name"}]
}
```

### 能力清单（智能体发现）

```bash
astryx manifest --json
```

返回自描述清单：每个命令、参数、标志（类型、选项、默认值）、是否支持 `--json` 以及可发出的响应类型鉴别器。

### 编程 API

```ts
import { component, docs, search, AstryxError } from '@astryxdesign/cli/api';

const btn = await component('Button');
btn.data.name; // 'Button'

const list = await component(undefined, {list: true});
const principles = await docs('principles');

try {
  await component('Buttn');
} catch (e) {
  e.code; // 'ERR_UNKNOWN_COMPONENT'
}
```

### Doctor 诊断

```bash
npx astryx doctor
```

运行一系列健康检查并报告 PASS/WARN/FAIL。只读，不会安装或修改任何内容。

检查项：

- Node.js 版本
- @astryxdesign/core 已安装
- 版本对齐
- 主题包
- AI 智能体文档
- 对等依赖

### 配置

可选 `astryx.config.mjs` 在项目根目录：

```js
export default {
  templates: {
    get: async id => fetchTemplateFromAPI(id),
  },
  issuesUrl: 'https://github.com/your-org/your-repo/issues',
};
```

---

## 核心库

### 安装

```bash
npm install @astryxdesign/core
```

### 组件文档

```bash
npx astryx component Button
```

### 页面布局

```bash
npx astryx template --list
npx astryx template dashboard
npx astryx template settings --skeleton
```

### 相关包

| 包 | 说明 |
|---|---|
| `@astryxdesign/cli` | CLI 工具：组件文档、模板、脚手架、codemod |
| `@astryxdesign/theme-neutral` | 柔和极简主题（Lucide 图标） |
| `@astryxdesign/theme-butter` | 金色奶油主题 |
| `@astryxdesign/theme-chocolate` | 暖棕主题 |
| `@astryxdesign/theme-gothic` | 暗色哥特主题 |
| `@astryxdesign/theme-matcha` | 大地绿主题 |
| `@astryxdesign/theme-stone` | 暖石主题 |
| `@astryxdesign/theme-y2k` | Y2K 风格主题 |

---

## 迁移指南

### 概览

将迁移视为产品外壳和工作流迁移，而非全局类替换。先让应用运行在 Theme 和 AppShell 中，然后一次一个路由或表面迁移到设计系统原语。

### 推荐顺序

1. 安装设计系统并运行 init
2. 用 Theme 包裹应用根节点
3. 在替换组件之前明确 Tailwind 和设计系统 CSS 的层顺序
4. 先迁移持久框架：AppShell、TopNav、SideNav 等
5. 替换共享原语：Button、TextInput、Switch、Dialog 等
6. 替换全局工作流：命令面板、设置弹出层、主题切换等
7. 移除每个已完成表面的旧 Tailwind 类
8. 验证亮暗模式、键盘导航、响应式布局和空/错误/加载状态

### CLI 工作流

```bash
npx astryx docs migration
npx astryx docs theme
npx astryx template AppShellTopNavWithSideNav --skeleton
npx astryx component AppShell
npx astryx component Button
```

### Theme 和 CSS 设置

```tsx
import {Theme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';
import '@astryxdesign/theme-neutral/theme.css';

export function AppRoot({children}) {
  const [mode, setMode] = useState<'system' | 'light' | 'dark'>('system');
  return (
    <Theme theme={neutralTheme} mode={mode}>
      {children}
    </Theme>
  );
}
```

### Tailwind 共存

```css
@layer reset, theme, base, astryx-base, astryx-theme, components, utilities;

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "@astryxdesign/core/reset.css";
@import "@astryxdesign/core/astryx.css";
@import "@astryxdesign/theme-neutral/theme.css";
@import "@astryxdesign/core/tailwind-theme.css";
@import "tailwindcss/utilities.css" layer(utilities);
```

### shadcn/Radix 原语映射

| 现有原语 | Astryx 组件 |
|---|---|
| button / shadcn Button | Button 或 IconButton |
| input | TextInput |
| textarea | TextArea |
| switch | Switch |
| checkbox | CheckboxInput 或 CheckboxList |
| radio group | RadioList |
| select / combobox | Selector 或 Typeahead |
| tabs | TabList |
| command dialog | CommandPalette |
| dropdown | DropdownMenu 或 MoreMenu |
| alert / callout | Banner 或 Toast |
| dialog | Dialog 或 AlertDialog |
| card-like list row | ListItem |

### 验证清单

- 在亮暗模式下检查所有表面、边框、文本、图标、悬停状态、焦点环和状态色
- 从外壳打开命令面板，输入内容，用键盘选择，确认焦点返回触发器
- 检查 SideNav 在折叠、展开、激活、悬停、嵌套和移动状态
- 验证设置弹出层和对话框
- 搜索遗留硬编码的 Tailwind 颜色、任意十六进制值

---

## 与 AI 协同工作

### 概览

设计系统专为 AI 友好构建：一致的命名、可预测的 prop 模式，以及将结构化文档直接送入 AI 上下文窗口的 CLI。

### 快速开始

```text
Install @astryxdesign/cli and run `npx astryx init --features agents` to set up your Astryx context. Read the generated file.
```

针对特定 AI 工具的选项：

```bash
npx astryx init --features agents --agent claude    # CLAUDE.md
npx astryx init --features agents --agent cursor    # .cursorrules
npx astryx init --features agents --agent codex     # AGENTS.md (Copilot, Codex, etc.)
```

### 生成的智能体文档

教导 AI 在编写 UI 代码之前执行三步工作流：

1. `npx astryx template --list`：找到相关的页面模式作为参考
2. `npx astryx template <name> --skeleton`：研究布局结构
3. `npx astryx component <Name>`：读取所用每个组件的 props 和示例

还包括防止常见错误（避免裸 div、避免 style={{}、使用令牌而非魔数）的规则。

### Cursor 设置

```bash
mkdir -p ~/.cursor/rules
npx astryx init --features agents --agent-docs-path ~/.cursor/rules/xds.mdc
```

### 验证 AI 设置

```text
Before writing any Astryx code, check your knowledge:

1. What is the correct import path for Button?
2. How do you make a Dialog non-dismissible?
3. What prop does Selector use for its items?

If you don't know all three, run `npx astryx init --features agents` to generate agent docs, then read the generated file.
```

### --dense 标志

每个 CLI 命令支持 `--dense`，输出为专为 AI 上下文窗口设计的令牌高效格式。

```bash
npx astryx component Dialog --dense
npx astryx docs styling --dense
npx astryx docs tokens --dense
```

### MCP 服务器

Astryx 提供 Model Context Protocol (MCP) 服务器。将以下内容添加到 MCP 配置：

```json
{
  "mcpServers": {
    "xds": {
      "type": "url",
      "url": "https://astryx.atmeta.com/mcp"
    }
  }
}
```

暴露两个工具：`search(query)` 用于发现组件、文档主题和模板；`get(name)` 用于获取包含 props、用法和示例的完整文档。
