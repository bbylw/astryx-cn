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

将以下指令复制到你的 AI 编程工具中，让它来自动完成项目的初始化工作：

```text
Install @astryxdesign/core, @stylexjs/stylex, @astryxdesign/theme-neutral, and @astryxdesign/cli in this project, then run `astryx init` to set up agent docs. Read the generated files to learn the conventions.
```

随后让它确认应用的视觉方向。每个应用都会获得主题，因此在初始化时花一分钟选好主题，比之后返工已经按错误风格搭好的界面更划算：

```text
Ask me what look and feel this app should have. Run `astryx theme list`, install the closest theme package, and run `theme add <slug>`; use `--package` when owners share a slug. Import `themes` and `defaultThemeSlug` from the generated module once and pass `themes[defaultThemeSlug]` to `<Theme>`. Customize with `defineTheme({extends: importedTheme, ...})`. Use `theme eject` only when I ask for an independent source fork. Default to neutral if I have no preference, and show me the result before moving on.
```

### 安装

Astryx 要求 **React 19** 或更高版本：`react` 与 `react-dom` >= 19.0.0 是 `@astryxdesign/core` 的 peer dependencies。

在现有项目中添加核心包及其 `@stylexjs/stylex` peer dependency，再添加一个主题与 CLI：

```bash
# npm
npm install @astryxdesign/core @stylexjs/stylex @astryxdesign/theme-neutral @astryxdesign/cli

# pnpm
pnpm add @astryxdesign/core @stylexjs/stylex @astryxdesign/theme-neutral @astryxdesign/cli

# yarn
yarn add @astryxdesign/core @stylexjs/stylex @astryxdesign/theme-neutral @astryxdesign/cli
```

然后运行 `astryx init`，生成 AI 智能体速查文档（AGENTS.md / CLAUDE.md）。它是**非交互式**的，不会弹出提示，因此可以安全地用于 AI 智能体、CI 和脚本；加上 `--all` 还会补充主题与页面构建工作流的指引：

```bash
npx astryx init
```

### 只安装一次，随处可用

也建议为自己的电脑全局安装 CLI。这样即使当前还没有项目，`astryx` 命令也能在任何文件夹中为你和任何编程智能体所用。在项目内，项目自己的版本仍会响应，因此全局安装不会改变团队和 CI 得到的结果——推荐项目安装与全局安装同时保留：

```bash
npm install -g @astryxdesign/cli
```

项目安装、全局安装还是两者都装？`astryx docs global/project-global-or-both` 会比较这几种方式；全局模式的完整说明见 `astryx docs global`。

### 添加基础 CSS 与主题

在全局 CSS 中引入重置样式和基础组件样式。然后运行 `astryx theme add neutral`，生成的 app 模块会为你引入主题的生产 CSS 与字体 CSS：

```css
@import '@astryxdesign/core/reset.css';
@import '@astryxdesign/core/astryx.css';
```

运行 `astryx theme list` 查看全部主题，然后用生成的模块把应用包起来：

```tsx
import {Theme} from '@astryxdesign/core/theme';
import {themes, defaultThemeSlug} from './astryx-themes';

<Theme theme={themes[defaultThemeSlug]}><App /></Theme>
```

**可用主题：**

| 主题包 | 说明 |
|---|---|
| `@astryxdesign/theme-neutral` | 柔和极简，Figtree 字体，适合作为起点 |
| `@astryxdesign/theme-butter` | 金色奶油表面配蓝色强调色；Sarina + Outfit 字体 |
| `@astryxdesign/theme-chocolate` | 暖棕色调和舒适米色；Fraunces + Albert Sans 字体 |
| `@astryxdesign/theme-gothic` | 仅深色模式，深蓝灰表面，做旧展示字体 |
| `@astryxdesign/theme-matcha` | 大地绿色主题；DM Sans + Playwrite US Trad 字体 |
| `@astryxdesign/theme-stone` | 暖石与石板色；Montserrat + Figtree 字体 |
| `@astryxdesign/theme-y2k` | 俏皮 Y2K 风格，长春花底色，全息强调色；Poppins + Crimson Text 字体 |

> 这些样式表带有级联层：重置样式位于 `@layer reset`，组件样式位于 `@layer astryx-base`。如果你的项目已有全局 CSS、旧版 reset 或 Tailwind，请显式声明层顺序，并把每个样式表放进明确的层中——未分层的样式和更晚的层都会覆盖 `astryx-base`，与选择器优先级无关。开始搭建界面前，请先阅读迁移指南中关于级联层的内容。

### 添加第一个组件

从组件自己的入口导入，路径可以通过 `astryx component <Name>` 查到。这样可保持打包体积小巧且意图清晰：

```tsx
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';

export default function Page() {
  return (
    <VStack gap={4}>
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
| Next.js | Next.js + 主题 CSS | [apps/example-nextjs](https://github.com/meta/astryx/tree/main/apps/example-nextjs) |
| Next.js + StyleX | Next.js + StyleX 自定义样式 | [apps/example-nextjs-stylex](https://github.com/meta/astryx/tree/main/apps/example-nextjs-stylex) |
| Next.js + Tailwind | Next.js + Tailwind 桥接 | [apps/example-nextjs-tailwind](https://github.com/meta/astryx/tree/main/apps/example-nextjs-tailwind) |
| Vite + Tailwind | Vite + Tailwind 桥接 | [apps/example-vite-tailwind](https://github.com/meta/astryx/tree/main/apps/example-vite-tailwind) |

```bash
git clone https://github.com/meta/astryx.git
cd astryx/apps/example-nextjs
npm install
npm run dev
```

### 探索 CLI

CLI 是组件、令牌、模板与文档的参考入口。为了稳定调用（尤其是配合 AI 助手时），请在 `package.json` 中添加脚本：

```json
"scripts": {
  "astryx": "node node_modules/@astryxdesign/cli/clients/cli/bin/astryx.mjs"
}
```

然后浏览可用内容：

```bash
npm run astryx -- component           # 列出所有组件
npm run astryx -- component Button    # 查看 Button 的 props、用法与主题
npm run astryx -- docs                # 列出所有文档主题
npm run astryx -- template --list     # 查看可用页面模板
npm run astryx -- docs tokens         # 间距、颜色、圆角参考
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
3. 密集数据渲染为行（Table、List/Item）并带分隔线；卡片仅用于小部件、画廊和设置分组
4. 使用 StyleX 或 Tailwind 进行自定义样式，两者都是一等公民
5. 使用语义令牌，而非硬编码值
6. 颜色使用 CSS 自定义属性，而非十六进制值
7. 表单输入为受控模式（value + onChange）
8. 使用 `useLinkComponent()` 实现导航，以便通过 `LinkProvider` 接入框架路由

### 样式方法

组件覆盖使用 `xstyle` prop；布局使用 StyleX 或 Tailwind。完整指南见“样式方案”与“样式库互操作”。

### 反模式

| 指导 | 做法 |
|---|---|
| 不要 | 在原生元素上使用行内样式，应在组件上使用 xstyle，或使用 Astryx 布局组件 |
| 不要 | 硬编码颜色（#fff），应使用 var(--color-*) 或 Tailwind 语义类 |
| 不要 | 硬编码间距（16px），应使用间距令牌或 Tailwind 间距工具类 |
| 不要 | 硬编码 `<a>` 元素，应使用 useLinkComponent() |
| 不要 | 将每个列表项或页面部分包裹在 Card 中，密集数据应使用 ListItem 或 Table |
| 不要 | 将 Badge 作为装饰，应保留给计数和枚举状态；状态请使用 StatusDot 或 Token |
| 不要 | 自创 props，应先阅读组件文档 |

---

## 布局系统

由外向内构建布局：先定外壳与区域预算，再安排内容结构、间距和响应式行为。

### 由外向内构建

在编写任何页面内容前，先确定**整体框架**。真实应用都是自顶向下构建的：

1. **搭建外壳（Scaffold）**：通常是 `AppShell` 配合导航，并为每个区域分配尺寸预算。
2. **组织内容（Structure）**：为每个区域的内容排定层级，并选择容器（行/列表、卡片或面板）。
3. **调整间距（Spacing）**：让每个区域对齐到同一条内容线，再设置 gap 与密度。
4. **处理断点（Breakpoints）**：决定宽度变化时每个区域如何分栏、显隐、缩放或替换。

`astryx build "<idea>"` 会给出最接近你应用类型的起始模板，以及缺失部分所需的区块与组件；`astryx component <Name>` 可查看组件 props。

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

### 响应式契约

在构建前声明断点行为作为契约，并放在框架根部的注释中：

```tsx
// 响应式契约：
//   > 1024px  nav 256 | content | inspector 380
//   <= 1024px inspector 覆盖内容列（absolute 定位，末端对齐）
//   <= 768px  nav 折叠为 MobileNav 抽屉；工具栏操作换行
```

每个区域只应做四件事之一：**分栏（divide）**、**显隐（reveal）**、**缩放（resize）**或**替换（swap）**。不要在所有区域都没有空间时仍强行并排，也不要把所有区域统一缩小；空间不足时应替换或隐藏。需要读取断点时使用 `useMediaQuery`，不要自行监听 `window` 尺寸。

```tsx
import {useMediaQuery} from '@astryxdesign/core/useMediaQuery';

const isCompact = useMediaQuery('(max-width: 768px)');
```

---

## 样式方案

### 选择一条路径

| 路径 | 适合 | 需要构建步骤？ |
|---|---|---|
| 普通 CSS | 大多数应用。使用 `className`、`xstyle` 或任意 CSS 库 | 无 |
| Tailwind | 使用 Tailwind v4 的应用。CSS 桥接把工具类映射到设计令牌 | 除 Tailwind 自身外无 |
| 用于自身代码的 StyleX | 你自己的 `stylex.create()` 样式，以及 swizzle（弹出）出来的组件。Astryx 本身仍是预构建的 | 需要为自身代码添加 StyleX 插件 |

三条路径都会加载同一套预构建 Astryx 样式表，解析到同一套设计令牌，并支持主题与亮暗模式；它们都不会编译 Astryx 包源码，也可以在同一应用中混用。

### 普通 CSS

```bash
npm install @astryxdesign/core @stylexjs/stylex @astryxdesign/theme-neutral
```

```css
@import "@astryxdesign/core/reset.css";
@import "@astryxdesign/core/astryx.css";
@import "@astryxdesign/theme-neutral/theme.css";
```

完成后组件即可使用——通过 `className`、`xstyle` 或 `style` 自定义。把 `theme-neutral` 换成任意主题包即可（`astryx theme list` 查看可用主题）。

### xstyle Prop

每个组件都接受 xstyle prop 进行样式自定义。它接受通过 `stylex.create()` 创建的 StyleX 样式，而非行内对象或类名。StyleX 样式在构建时编译，以获得最佳去重和死代码消除。

```tsx
import * as stylex from '@stylexjs/stylex';

const overrides = stylex.create({
  card: { maxWidth: 400, marginBlock: 16 },
  saveButton: { alignSelf: 'flex-end' },
});

<Card xstyle={overrides.card} />
<Button label="Save" xstyle={overrides.saveButton} />
```

**规则：**

- 所有 xstyle 值必须来自 `stylex.create()`。
- 支持伪类（`:hover`、`:focus-visible`）。
- 所有 `:hover` 样式必须使用 `@media (hover: hover)` 保护。
- 非 StyleX 样式（Tailwind、外部 CSS）请使用 `className`。

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

让系统成为主题值的唯一真实来源。组件从 CSS 自定义属性读取设计令牌，其他样式库应将自己的语义令牌、工具名称或主题对象映射到这些系统 CSS 变量。

普通 DOM 样式优先使用 CSS 变量，因为变量会沿树继承、跟随 `data-theme` 色彩模式、尊重嵌套的 `data-astryx-theme` 作用域，并在主题切换时更新。只有 SVG 属性、canvas、图表配置或静态配置生成等无法消费 CSS 自定义属性的场景，才使用令牌解析 API。

### 选择集成路径

| 路径 | 使用场景 | 值形状 |
|---|---|---|
| CSS 变量别名 | 库最终写 CSS 并接受字符串值 | `var(--color-text-primary)` |
| StyleX 令牌导入 | 在应用代码中编写 StyleX 样式 | `colorVars['--color-text-primary']` |
| Tailwind 桥接 | 想要由系统令牌驱动的工具类 | `@astryxdesign/core/tailwind-theme.css` |
| 令牌解析器 API | JS 需要令牌值用于图表、canvas、SVG、配置对象 | `resolveThemeTokens(theme, {mode})` |

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
  const {mode, token} = useTheme();
  const options = useMemo(() => ({
    textColor: token('--color-text-primary'),
    seriesColor: token('--color-data-categorical-blue'),
  }), [mode, token]);
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
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

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

**最佳实践**：标题用 `Heading`，其余文本用 `Text`；不要手动设置 font-size 或 line-height；不要跳过标题层级，必要时使用 `accessibilityLevel`；display 类型只用于 hero、营销或数据展示场景。

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

- `--color-background-body`：#F1F4F7 / #111112（页面背景）
- `--color-background-surface`：#FFFFFF / #1F1F22（表面背景）
- `--color-background-card`：#FFFFFF / #1F1F22（卡片背景）
- `--color-background-popover`：#FFFFFF / #28292C（弹出层背景）
- `--color-background-muted`：#0536590C / #1111127F（弱化背景）

### 文本颜色

- `--color-text-primary`：#0A1317 / #DFE2E5
- `--color-text-secondary`：#4E606F / #AAAFB5
- `--color-text-disabled`：#A4B0BC / #6F747C
- `--color-text-accent`：#0064E0 / #3E9EFB

### 强调色与状态色

- `--color-accent`：#0064E0 / #2694FE
- `--color-accent-muted`：#0082FB33 / #0082FB3F
- `--color-on-accent`：#FFFFFF
- `--color-success`：#0D8626
- `--color-error`：#E3193B / #F5394F
- `--color-warning`：#E9AF08 / #F2C00B
- `--color-info`：#0064E0
- `--color-border`：#05365919 / #F2F4F619

### 状态角色

根据所在表面选择状态令牌。`<status>` 可以是 info、success、warning 或 error：

| 状态角色 | 用途 | 搭配 |
|---|---|---|
| `--color-text-<status>` | 页面或卡片上的状态文本（对比度 ≥ 4.5:1） | — |
| `--color-icon-<status>` | 页面或卡片上的状态图标，默认取文本色 | — |
| `--color-border-<status>` | 页面或卡片上的状态边框（例如无效输入框），默认取文本色 | — |
| `--color-<status>` | 强状态填充，例如 Badge 或 StatusDot | `--color-on-<status>` |
| `--color-on-<status>` | 强填充上的文本/图标（≥ 4.5:1） | `--color-<status>` |
| `--color-<status>-muted` | 浅色状态填充，例如 Banner | `--color-on-<status>-muted` |
| `--color-on-<status>-muted` | 浅色填充上的文本/图标（≥ 4.5:1） | `--color-<status>-muted` |

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

代码高亮色默认引用调色板令牌，因此会跟随主题变化；`defineTheme({syntax})` 可以用一套语法主题整体替换：

| 令牌 | 值 |
|---|---|
| `--color-syntax-keyword` | `var(--color-text-accent)` |
| `--color-syntax-string` | `var(--color-text-green)` |
| `--color-syntax-comment` | `var(--color-text-secondary)` |
| `--color-syntax-number` / `constant` | `var(--color-text-orange)` |
| `--color-syntax-function` | `var(--color-text-blue)` |
| `--color-syntax-type` | `var(--color-text-purple)` |
| `--color-syntax-variable` | `var(--color-text-primary)` |
| `--color-syntax-operator` / `property` | `var(--color-text-cyan)` |
| `--color-syntax-tag` | `var(--color-text-red)` |
| `--color-syntax-attribute` | `var(--color-text-teal)` |
| `--color-syntax-background` | `var(--color-background-muted)` |

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

设计系统使用 4px 基础单位的间距尺度，并以 rem 书写，使 gap 与 padding 能像文本一样随读者浏览器的字号增长。每一步为 `0.25rem`，在默认 16px 根字号下即 4px。组件 gap props 接受映射到这些令牌的步进值。

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

`Stack`、`HStack`、`VStack`、`Grid`、`Toolbar`、`OverflowList` 与 `ChatMessageList` 接受 gap 步进：0、0.5、1、1.5、2、3、4、5、6、8、10（×4px）。`Carousel` 接受 0 到 4 的步进。

```tsx
// 通过组件 props（推荐）
import {HStack} from '@astryxdesign/core/HStack';

<HStack gap={4}>{/* 16px gap */}</HStack>

// 通过 StyleX 令牌（自定义布局）
import {spacingVars} from '@astryxdesign/core/theme/tokens.stylex';
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

圆角尺度以**所在 UI 的层级角色**命名，同时基于 4dp 数值尺度，并随主题的 `radius.multiplier` 整体缩放；`--radius-none` 与 `--radius-full` 固定不变。

| 令牌 | 值 | 用途 |
|---|---|---|
| `--radius-none` | 0px | 无圆角 |
| `--radius-inner` | 4px | 内嵌子元素 |
| `--radius-element` | 8px | 交互控件（按钮、输入框、选择器） |
| `--radius-container` | 12px | 内容容器（卡片、面板、对话框） |
| `--radius-page` | 28px | 页面级容器 |
| `--radius-chat` | 28px | 聊天气泡 |
| `--radius-full` | 9999px | 胶囊形状（徽章、标签、头像状态点） |

### 同心圆角

当圆角容器有内边距时，内部元素需要更小的圆角以保持同心。为嵌套元素使用“外部圆角减去内边距”的圆角：

```css
.inner {
  border-radius: max(0px, calc(var(--radius-container) - var(--spacing-4)));
}
```

> 注意：Card **不会**自动为你的内容计算同心圆角，需要你按上述公式处理。

### 在 StyleX 中使用

```tsx
import {radiusVars} from '@astryxdesign/core/theme/tokens.stylex';

const styles = stylex.create({
  panel: {
    borderRadius: radiusVars['--radius-container'],
  },
});
```

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

### 用 elevation 表达层级

可配置的表面暴露一个 `elevation` prop，而不是让使用方手写 box-shadow。取值为 `none | low | med | high`，并按组件收窄到它需要的层级：

| 级别 | 何时使用 | 示例 |
|---|---|---|
| `none` | 平铺嵌入表面，属于页面而非浮在其上。除 ChatComposer 外所有表面的默认值 | 网格中的 Card、内联 Banner、普通 Button |
| `low` | 位于正常页面流中，但需要与背景区分；仍不浮在其他内容之上 | 需要强调的 Card、ChatComposer |
| `med` | 浮在同一页面的其他内容之上，但不覆盖整个屏幕 | Popover、浮动 Banner、浮动操作 Button |
| `high` | 覆盖整个 UI 的最上层，通常带背景遮罩或独占焦点 | 模态 Dialog、全屏覆盖层 |

如果两个表面重叠，上层使用更高的级别；如果表面不与任何内容重叠，它应是 `none` 或 `low`，绝不用 `med` 或 `high`。

```tsx
// 默认平铺；需要悬浮时再抬高。
<Card elevation="low">Raised card</Card>

// 浮动操作按钮。
<IconButton icon={<Icon icon={Plus} />} label="New" variant="primary" elevation="med" />

// 将 composer 压平（默认是 low）。
<ChatComposer elevation="none" onSubmit={handleSubmit} />
```

Dialog、Popover、Tooltip、Toast、HoverCard、DropdownMenu 等固有覆盖层会把高度烘焙进去，不暴露该 prop；输入框等流式内容永远不抬高，而是使用内阴影环。

### 用法

```tsx
import {shadowVars} from '@astryxdesign/core/theme/tokens.stylex';

const styles = stylex.create({
  dropdown: { boxShadow: shadowVars['--shadow-med'] },
  dialog: { boxShadow: shadowVars['--shadow-high'] },
  inputFocused: { boxShadow: shadowVars['--shadow-inset-selected'] },
});
```

**避免**：在应用代码中手写 `box-shadow`；给不重叠的表面使用 `med`/`high`；在同一元素上叠加多个高度级别；用高度阴影充当装饰性边框（应使用 `--color-border` 令牌）。

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

| 令牌 | 值 | 用途 |
|---|---|---|
| `--ease-standard` | `cubic-bezier(0.24, 1, 0.4, 1)` | 状态变化，减速收尾 |
| `--ease-entrance` | `cubic-bezier(0.24, 1, 0.4, 1)` | 元素入场 |
| `--ease-move` | `cubic-bezier(0.24, 1, 0.4, 1)` | 元素在屏幕中移动 |
| `--ease-exit` | `cubic-bezier(0.3, 0, 0.6, 0.6)` | 元素退场，从静止加速离开 |

`--ease-entrance` 与 `--ease-move` 会随主题的 `character` 变化；在 `standard` 下二者等于 `--ease-standard`。`--ease-exit` 在任何 `character` 下都保持不变。

### 主题级动效调节

`defineTheme` 的 `motion` 提供两个旋钮：

- **`tempo`**：缩放所有动效时长。1 是 Astryx 自身节奏，0.75 最快，1.5 最慢（超出范围会被夹取）。
- **`character`**：决定动效的活跃程度。`'crisp'` 减速且不回弹，`'standard'` 是 Astryx 自身节奏，`'expressive'` 在入场和移动时轻微过冲；退场和淡出永不过冲。

```ts
export const brandTheme = defineTheme({
  name: 'brand',
  motion: {tempo: 0.85, character: 'crisp'},
});
```

优先级从低到高：旋钮 → 时长尺度（`fast`、`medium`、`slow`、`ratio`）→ 显式 `tokens`。没有设置 `motion` 的主题渲染结果与之前完全一致。

### 减少运动

当操作系统开启“减少运动”时，Astryx 组件在鼠标或触控板下立即变化；在手指操作下则改为交叉淡入淡出：只改变透明度，时长不超过 200ms。原地变化的值（例如进度填充）在任何指针下都会立即采用新值。

在你自己的动画中使用 `@media (prefers-reduced-motion: reduce)`，并为触摸交叉淡入额外加上 `(pointer: coarse)`。

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
import {durationVars, easeVars} from '@astryxdesign/core/theme/tokens.stylex';

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
| chevronDown / chevronUp | 下拉触发器、展开/折叠 |
| chevronLeft / chevronRight | 返回 / 前进、上一步 / 下一步 |
| chevronsLeft / chevronsRight | 跳到开头 / 跳到末尾 |
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
| eyeSlash | 隐藏/可见性切换 |
| copy | 复制到剪贴板 |
| upload | 上传文件或内容 |
| microphone | 语音输入、录音 |

### 自定义图标

对于不在语义列表中的图标，直接传入 SVG 组件：

```tsx
import { PhotoIcon } from '@heroicons/react/24/outline';
import { Icon } from '@astryxdesign/core/Icon';

<Icon icon={PhotoIcon} size="lg" />
```

`Icon` 的颜色 prop 使用语义状态名，例如 `color="error"`（旧版 `negative` 已不再推荐）。

### 主题级图标替换

主题可以通过 `defineTheme()` 的 `icons` 字段替换任意语义图标的默认 SVG。查找作用域限定在当前主题，而不是修改全局默认值：

```tsx
import {defineTheme} from '@astryxdesign/core/theme';
import {XMarkIcon, ChevronDownIcon} from '@heroicons/react/24/outline';

export const brandTheme = defineTheme({
  name: 'brand',
  icons: {
    close: <XMarkIcon />,
    chevronDown: <ChevronDownIcon />,
  },
});
```

条目也可以是接收请求的函数，把 `Icon` 的尺寸映射到图标库自己的 props。`Icon` 会以 `{size, variant}` 调用它，其中 `size` 是实际渲染尺寸（`xsm`、`sm`、`md` 或 `lg`）：

```tsx
export const brandTheme = defineTheme({
  name: 'brand',
  icons: {
    info: ({size}) => <Info strokeWidth={size === 'sm' || size === 'xsm' ? 2.5 : 2} />,
  },
});
```

函数必须保持纯粹且同步：只根据请求计算结果，不使用 hooks、DOM/SVG 测量、浏览器全局对象、网络访问、可变模块状态或副作用。返回 `null` 表示不绘制图标，而不是回退到已注册或内置图标。

### 图标变体

主题用 `defineTheme()` 的 `iconVariants` 一次性声明它支持的变体名称。列表属于整个主题，而不属于单个图标；Astryx 自身不定义任何变体名称：

```tsx
export const brandTheme = defineTheme({
  name: 'brand',
  iconVariants: ['outline', 'filled'],
  icons: {
    info: ({size, variant}) =>
      variant === 'filled' ? <InfoFilledIcon /> : <InfoIcon bold={size === 'sm'} />,
  },
});
```

通过 `Icon` 的 `variant` prop 请求变体。只有当前主题列出了该名称时，条目才会收到它；否则条目收到 `undefined` 并绘制普通素材。通过 `extends` 继承的主题会继承变体列表，除非它设置自己的列表（设置后替换而非合并）。

```tsx
<Icon icon="info" variant="filled" />  // 使用 filled 素材
<Icon icon="info" />                    // 普通素材
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

空状态优先使用 `EmptyState`：把插图传给它的 `icon` 插槽，组件会把插图居中放在标题与描述上方。典型插图尺寸从内联空状态的 120px 到整页引导的 240px，始终配合标题与说明文本。

```tsx
<EmptyState
  icon={<img src="/illustrations/empty-search.svg" alt="" width={200} height={200} />}
  title="No results found"
  description="Try adjusting your search or filters."
/>
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

### 快速开始：把应用包进主题

安装并添加主题，然后用 CLI 生成的模块接线一次：

```bash
npm install @astryxdesign/theme-neutral
npx astryx theme add neutral
```

```tsx
import {Theme} from '@astryxdesign/core/theme';
import {themes, defaultThemeSlug} from './astryx-themes';

function App() {
  return (
    <Theme theme={themes[defaultThemeSlug]}>
      <YourApp />
    </Theme>
  );
}
```

`theme add` 会记录已安装的包主题，并重新生成 `src/astryx-themes.ts`（或 `.js`），其中包含主题的 built 模块、生产 CSS 与可选字体 CSS。项目中若没有 `src`，模块位于项目根目录。**第一个添加的主题成为默认主题**；`theme use <slug>` 更改默认主题，`theme remove <slug>` 移除非默认主题。`theme eject <slug>` 会把主题源码复制到项目中，形成不再接收包更新的独立分支——只在你明确需要独立源码时使用。

```bash
npx astryx theme list                 # 查看所有可用主题
npx astryx theme add stone            # 添加一个包主题
npx astryx theme use stone            # 切换默认主题
npx astryx theme eject stone          # 复制源码，形成独立本地主题
npx astryx theme build src/themes/stone/stoneTheme.ts
```

### 可用主题

| 主题 | 添加命令 | 说明 |
|---|---|---|
| Neutral | `astryx theme add neutral` | 柔和极简，Figtree 字体，适合作为起点 |
| Butter | `astryx theme add butter` | 金色奶油表面配蓝色强调色；Sarina + Outfit 字体 |
| Chocolate | `astryx theme add chocolate` | 暖棕色调和舒适米色；Fraunces + Albert Sans 字体 |
| Gothic | `astryx theme add gothic` | 仅深色模式，深蓝灰表面，做旧展示字体 |
| Matcha | `astryx theme add matcha` | 大地绿色；DM Sans + Playwrite US Trad 字体 |
| Stone | `astryx theme add stone` | 暖石与石板色；Montserrat + Figtree 字体 |
| Y2K | `astryx theme add y2k` | 俏皮 Y2K 流行风；长春花底色、全息强调色，Poppins + Crimson Text 字体 |

每个第一方包都在 `@astryxdesign/theme-{name}/built` 导出 built 主题，在 `/theme.css` 提供生产 CSS，在 `/fonts.css` 提供字体加载 CSS；`theme add` 会把这些导入写进生成的 app 模块。

### 集成主题

把集成作为直接依赖安装。Astryx 无需 `astryx.config` 条目即可发现它的主题与指南。只有当已安装包导出 built 模块和生产样式表时，主题才能被添加：

```bash
npm install @astryxdesign/core @acme/brand-integration
npx astryx theme list --package @acme/brand-integration
npx astryx docs brand-theme
npx astryx theme add ocean --package @acme/brand-integration
```

`theme add` 会把 owner 包保留在 app 记录中，并导入其 built 模块、样式表与可选字体样式表，因此包更新会持续到达应用。只有需要把源码复制到 `src/themes/ocean` 作为独立本地分支时，才运行 `theme eject ocean --package @acme/brand-integration`。

### Theme Props

| Prop | 类型 | 默认 | 说明 |
|---|---|---|---|
| theme | DefinedTheme | — | 主题对象（必需） |
| mode | 'system' \| 'light' \| 'dark' | 'system' | 色彩模式 |
| children | ReactNode | — | 应用内容 |

### 创建自定义主题

推荐从现有主题扩展，直接使用 `defineTheme` 描述你的视觉系统：

```tsx
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';

const customizedTheme = defineTheme({
  name: 'my-brand-theme',
  extends: neutralTheme,
  color: {
    accent: '#ff4d4f',      // 亮红色强调色
    neutralStyle: 'cool',  // 偏冷色调的灰色阶
  },
  typography: {
    scale: { base: 14, ratio: 1.25 },
    body: { family: 'Geist', fallbacks: 'sans-serif' },
  },
  radius: {
    base: 6,
    multiplier: 1.2,
  },
  tokens: {
    '--color-accent': ['#ff4d4f', '#ff7a7c'],
  },
  components: {
    button: {
      'variant:primary-muted': {
        backgroundColor: 'light-dark(#F2F4F6, #28292C)',
        color: 'var(--color-text-primary)',
      },
    },
  },
});
```

`defineTheme` 支持颜色、排版尺度、字体族、圆角、动效、组件覆盖、图标、语法主题与自定义变体。自定义变体会在构建后获得类型安全：

```tsx
<Button variant="primary-muted" label="Save draft" />
```

需要一套全新的协调配色时，可生成调色板：

```bash
npx astryx theme palette generate palette.config.json --out palette.generated.ts
```

审查并提交生成的调色板模块与 receipt，导入它的 `palette` 导出，然后在语义令牌中引用稳定的色阶。重新生成已接受的调色板会更新所有保留这些引用的映射令牌；生成过程不会改写主题。

### defineTheme 配置

| 配置 | 生成内容 | 参数 |
|---|---|---|
| color | accent、background、text、border 等 | accent (hex)、neutralStyle?、contrast? |
| typography.scale | heading、body 的 size/weight/leading | base (px)、ratio |
| typography.body/heading/code | font-family 等 | family、fallbacks?、weight? |
| radius | inner、element、container、page、chat | base (px)、multiplier (0-2) |
| motion | duration 系列令牌与缓动行为 | fast (ms)、medium (ms)、ratio、easing?、tempo?、character? |
| icons | 主题级语义图标替换 | 图标名 → ReactNode 或纯函数 |
| iconVariants | 主题支持的图标变体名称 | string[] |
| syntax | 语法高亮色整体替换 | 语法令牌映射 |

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

CLI 推荐作为项目的开发依赖安装，同时建议全局安装一份：

```bash
npm install -D @astryxdesign/cli
npm install -g @astryxdesign/cli
```

全局安装后，`astryx` 在任何文件夹中都能使用，对你和所有编程智能体都可用；在项目内，项目自己的版本仍会响应，因此全局安装不会改变团队与 CI 得到的结果。项目安装、全局安装还是两者都装？运行 `astryx docs global/project-global-or-both` 查看对比（推荐两者都装）。

如果尚未在项目中安装，请使用带 scope 的一次性调用；不要直接 `npx astryx`，因为未安装时该名字会解析到另一个无关的 npm 包：

```bash
npx @astryxdesign/cli --help
npx @astryxdesign/cli component Button
```

为了确保在多人协作或 CI 环境下命令调用稳定，推荐在 `package.json` 的 `scripts` 中进行包装：

```json
"scripts": {
  "astryx": "node node_modules/@astryxdesign/cli/clients/cli/bin/astryx.mjs"
}
```

### 搜索

```bash
astryx search button
```

结果跨组件、钩子、文档、模板与主题。支持 `--type`、`--limit`、`--detail`、`--json` 选项。

### 命令

| 命令 | 说明 |
|---|---|
| `init` | 初始化设计系统；非交互式，生成智能体文档 |
| `build "<idea>"` | 从最接近的模板开始构建页面，并给出所需区块与组件 |
| `component` | 列出组件或打印详细文档 |
| `search` | 跨组件、钩子、文档、模板与主题统一搜索 |
| `docs` | 打印参考文档；`astryx docs` 列出全部主题 |
| `template` | 列出、查看或注入页面与区块模板 |
| `hook` | 列出钩子并打印钩子文档 |
| `theme` | 添加、切换、移除、构建与创作主题 |
| `swizzle` | 把组件源码复制进项目，接管完整定制权 |
| `upgrade` | 升级 Astryx 后迁移代码，并刷新 ShadCN 复制组件 |
| `discover` | 浏览与搜索集成：已安装的和可以添加的 |
| `doctor` | 诊断 Astryx 项目与集成包 |
| `manifest` | 输出完整能力清单：命令、参数、标志与响应类型 |

`astryx <command> --help` 查看单个命令的参数；`astryx docs cli` 逐层浏览 CLI 自己的文档树，例如 `astryx docs cli/commands` 或 `astryx docs cli/api/functions/search`。

### 输出模式

- `--detail brief`：每个小节一行摘要。
- `--detail compact`：紧凑输出。
- `--dense`：在文档提供 dense 版本时切换为更短的文本。
- `--json`：机器可读的类型化 envelope。
- `--zh`：输出简体中文文档。

```bash
astryx component Dialog --detail compact
astryx docs styling --full --detail brief
astryx docs principles --dense
astryx component Button --json
```

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
| `@astryxdesign/theme-neutral` | 柔和极简主题，Figtree 字体 |
| `@astryxdesign/theme-butter` | 金色奶油主题，Sarina + Outfit 字体 |
| `@astryxdesign/theme-chocolate` | 暖棕主题，Fraunces + Albert Sans 字体 |
| `@astryxdesign/theme-gothic` | 仅深色模式，深蓝灰表面，做旧展示字体 |
| `@astryxdesign/theme-matcha` | 大地绿主题，DM Sans + Playwrite US Trad 字体 |
| `@astryxdesign/theme-stone` | 暖石主题，Montserrat + Figtree 字体 |
| `@astryxdesign/theme-y2k` | Y2K 风格主题，Poppins + Crimson Text 字体 |

---

## 迁移指南

### 概览

将迁移视为产品外壳和工作流迁移，而非全局类替换。先让应用运行在 Theme 和 AppShell 中，然后一次一个路由或表面迁移到设计系统原语。

### 推荐顺序

迁移是一个循序渐进的过程，不要把迁移当成全局类名替换。先把应用放进 Theme 与 AppShell，然后一次迁移一个路由或表面，同时保留现有数据、路由与业务逻辑。Tailwind 可以在迁移期间共存，用于旧版包裹层与局部布局。

1. **安装与基础注入**：安装包并运行 `astryx init` 生成智能体文档，然后引入 `reset.css`、`astryx.css` 与主题 CSS。
2. **外壳先行**：用 `Theme` 包裹应用根节点，并确定初始的亮色、暗色或跟随系统行为。
3. **先理顺级联层**：在替换组件之前，显式声明 Tailwind 与设计系统 CSS 的层顺序，并审计已有的 reset。
4. **基础冒烟测试**：渲染一个基础冒烟测试页面，确认原语组件保留了正确的 padding，再开始迁移任何表面。
5. **迁移持久框架**：先替换 AppShell、TopNav、SideNav、页面内容与移动端导航。
6. **替换共享原语**：Button、IconButton、TextInput、NumberInput、Switch、CheckboxInput、RadioList、Selector、TabList、Dialog、AlertDialog、Banner、Toast、Badge、Card、Table、ListItem。
7. **替换全局工作流**：命令面板、设置弹出层、主题切换、搜索、筛选、创建流程与破坏性确认对话框。
8. **清理与验证**：删除已完成表面下的旧版 Tailwind 类名，只保留基于令牌的布局工具类或仍需迁移的局部包裹层。然后在进入下一个路由前验证亮暗模式、键盘导航、响应式布局以及空/错误/加载状态。

### CLI 工作流

```bash
astryx docs migration
astryx docs theme
astryx docs styling
astryx template --list --type block
astryx template AppShellTopNavWithSideNav --skeleton
astryx template PopoverSettingsPanel --skeleton
astryx component AppShell
astryx component SideNav
astryx component TopNav
astryx component CommandPalette
astryx component Button
astryx component TextInput
```

需要粘贴给 AI 的简短版本时，使用 `--full --detail brief`；构建自动化迁移报告时使用 `--json`。

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

未分层的样式和更晚的层都会覆盖 `astryx-base`，与选择器优先级无关；务必把每个样式表放进明确的层中。

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

Astryx 的所有 API 命名遵循高度一致的约定，CLI 会把结构化文档直接送入 AI 的上下文窗口。`init --features agents` 会生成 AI 所需的全部内容——组件索引、行为规则、CLI 参考，以及来自已配置集成的包指引——并且全部来自当前安装的项目版本：

```text
Install @astryxdesign/cli and run `astryx init --features agents` to set up your Astryx context. Read the generated file.
```

默认写入项目根目录的 `AGENTS.md`（大多数智能体都读取的通用标准）。Claude Code 在项目存在 `CLAUDE.md` 或 `.claude/CLAUDE.md` 时会跳过 `AGENTS.md`，因此 init 也会同时写入该文件；Gemini CLI 只读取 `GEMINI.md`，init 会在其中添加一行对 `AGENTS.md` 的导入。依赖升级后运行 `astryx upgrade --from <旧版本>` 会报告过期的 Astryx 块，加上 `--apply` 即可刷新。

如需针对特定工具的文件：

```bash
astryx init --features agents --agent claude    # CLAUDE.md（若存在），否则 .claude/CLAUDE.md
astryx init --features agents --agent cursor    # .cursorrules（若存在），否则 AGENTS.md
astryx init --features agents --agent codex     # AGENTS.md（Copilot、Codex 等）
astryx init --features agents --agent hermes    # .hermes.md 或 HERMES.md（若存在），否则 AGENTS.md
astryx init --features agents --agent muse      # AGENTS.md（Muse）
astryx init --features agents --agent all       # 现有全部 agent 文件（GEMINI.md 除外），否则 AGENTS.md 与 .claude/CLAUDE.md
```

对于不属于任何单个项目的智能体，全局安装会保留一份简短的 Astryx skill：`~/.agents/skills/astryx/SKILL.md`，并链接到各智能体工具读取的 skill 文件夹，例如 `~/.claude/skills/astryx`。它会告诉智能体 Astryx 存在以及何时使用；`astryx init --user` 可立即写入，`--remove-agents` 可关闭。项目内，智能体遵循项目自己的 agent 文档。若需要自定义文档路径，可使用 `--agent-docs-path ~/.cursor/rules/xds.mdc`。

### 教导 AI 遵循的三步开发法

在让 AI 帮您修改或生成任何前端代码前，先让它阅读生成的约束，并按照以下工作流行动：

1. **找到起点**：运行 `astryx build "<idea>"`，获得最接近的页面模板（始终有一个：最接近的模板或 app shell）、另外两个模板，以及缺失部分所需的区块与组件。
2. **搭建骨架**：运行 `astryx template <name> <path>` 把模板脚手架进项目，保留其框架与间距，再替换内容。
3. **查阅组件**：运行 `astryx component <Name>` 读取所用每个组件的 props 与示例。

生成的文档还包含防止常见错误的规则（每个页面都从模板开始、不要裸 div、不要 `style={{}}`、使用令牌而不是魔法值）、CLI 速查，以及带有包标签的集成指引。设置完成后，你通常不需要再手动纠正 AI 的这些约定。

### 验证 AI 设置

```text
Before writing any Astryx code, check your knowledge:

1. What is the correct import path for Button?
2. How do you make a Dialog non-dismissible?
3. What prop does Selector use for its items?

If you don't know all three, run `astryx init --features agents` to generate agent docs, then read the generated file.
```

### 更短的输出：--detail 与 --dense

在把 CLI 输出粘贴进 ChatGPT 或 Claude 等网页版 AI 工具时，使用更短的读取方式：

- `--detail brief`：每个小节一行。
- `--detail compact`：紧凑输出。
- `--dense`：在文档提供 dense 版本时使用更短文本。

```bash
astryx docs styling --full --detail brief
astryx docs tokens --dense
astryx component Dialog --detail compact
```

### MCP 服务器

Astryx 提供 Model Context Protocol (MCP) 服务器。将以下内容添加到 MCP 配置：

```json
{
  "mcpServers": {
    "xds": {
      "type": "http",
      "url": "https://astryx.atmeta.com/mcp"
    }
  }
}
```

暴露两个工具：`search(query)` 用于发现组件、文档主题和模板；`get(name)` 用于获取包含 props、用法和示例的完整文档。
