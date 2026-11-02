export interface DocItem {
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string; // Markdown or detailed text
}

export interface SidebarSection {
  title: string;
  items: {
    title: string;
    slug: string;
  }[];
}

export const sidebarSections: SidebarSection[] = [
  {
    title: "入门指南",
    items: [
      { title: "快速开始", slug: "getting-started" },
      { title: "设计原则", slug: "principles" },
      { title: "与 AI 协同工作", slug: "ai-co-working" },
    ],
  },
  {
    title: "设计体系",
    items: [
      { title: "布局系统", slug: "layout" },
      { title: "排版系统", slug: "typography" },
      { title: "色彩系统", slug: "colors" },
      { title: "间距尺度", slug: "spacing" },
      { title: "形状与圆角", slug: "shapes" },
      { title: "阴影与高度", slug: "shadows" },
      { title: "动效系统", slug: "motion" },
    ],
  },
  {
    title: "开发指南",
    items: [
      { title: "样式方案", slug: "styling" },
      { title: "样式库互操作", slug: "interop" },
      { title: "主题系统", slug: "theme" },
      { title: "CLI 工具", slug: "cli" },
      { title: "图标与插图", slug: "assets" },
      { title: "迁移指南", slug: "migration" },
    ],
  },
];

export const docsData: Record<string, { title: string; description: string; markdown: string }> = {
  "getting-started": {
    title: "快速开始",
    description: "将 Astryx 设计系统添加到你的项目中，开启人机协同的全新构建方式。",
    markdown: `### 通过 AI 快速开始

将以下指令复制到你的 AI 编程工具中，让它来自动完成项目的初始化工作：

\`\`\`text
Install @astryxdesign/core, @stylexjs/stylex, @astryxdesign/theme-neutral, and @astryxdesign/cli in this project, then run \`astryx init\` to set up agent docs. Read the generated files to learn the conventions.
\`\`\`

随后让它确认应用的视觉方向。每个应用都会获得主题，因此在初始化时花一分钟选好主题，比之后返工已经按错误风格搭好的界面更划算：

\`\`\`text
Ask me what look and feel this app should have. Run \`astryx theme list\`, install the closest theme package, and run \`theme add <slug>\`; use \`--package\` when owners share a slug. Import \`themes\` and \`defaultThemeSlug\` from the generated module once and pass \`themes[defaultThemeSlug]\` to \`<Theme>\`. Customize with \`defineTheme({extends: importedTheme, ...})\`. Use \`theme eject\` only when I ask for an independent source fork. Default to neutral if I have no preference, and show me the result before moving on.
\`\`\`

---

### 安装

Astryx 要求 **React 19** 或更高版本：\`react\` 与 \`react-dom\` >= 19.0.0 是 \`@astryxdesign/core\` 的 peer dependencies。

在现有项目中添加核心包及其 \`@stylexjs/stylex\` peer dependency，再添加一个主题与 CLI：

\`\`\`bash
# npm
npm install @astryxdesign/core @stylexjs/stylex @astryxdesign/theme-neutral @astryxdesign/cli

# pnpm
pnpm add @astryxdesign/core @stylexjs/stylex @astryxdesign/theme-neutral @astryxdesign/cli

# yarn
yarn add @astryxdesign/core @stylexjs/stylex @astryxdesign/theme-neutral @astryxdesign/cli
\`\`\`

然后运行 \`astryx init\`，生成 AI 智能体速查文档（AGENTS.md / CLAUDE.md）。它是**非交互式**的，不会弹出提示，因此可以安全地用于 AI 智能体、CI 和脚本；加上 \`--all\` 还会补充主题与页面构建工作流的指引：

\`\`\`bash
npx astryx init
\`\`\`

---

### 只安装一次，随处可用

也建议为自己的电脑全局安装 CLI。这样即使当前还没有项目，\`astryx\` 命令也能在任何文件夹中为你和任何编程智能体所用。在项目内，项目自己的版本仍会响应，因此全局安装不会改变团队和 CI 得到的结果——推荐项目安装与全局安装同时保留：

\`\`\`bash
npm install -g @astryxdesign/cli
\`\`\`

项目安装、全局安装还是两者都装？\`astryx docs global/project-global-or-both\` 会比较这几种方式；全局模式的完整说明见 \`astryx docs global\`。

---

### 添加基础 CSS 与主题

在全局 CSS 中引入重置样式和基础组件样式。然后运行 \`astryx theme add neutral\`，生成的 app 模块会为你引入主题的生产 CSS 与字体 CSS：

\`\`\`css
@import '@astryxdesign/core/reset.css';
@import '@astryxdesign/core/astryx.css';
\`\`\`

运行 \`astryx theme list\` 查看全部主题，然后用生成的模块把应用包起来：

\`\`\`tsx
import {Theme} from '@astryxdesign/core/theme';
import {themes, defaultThemeSlug} from './astryx-themes';

<Theme theme={themes[defaultThemeSlug]}><App /></Theme>
\`\`\`

#### 开箱即用的主题一览：
- **\`@astryxdesign/theme-neutral\`**: 柔和极简，适合作为项目起点。
- **\`@astryxdesign/theme-butter\`**: 金色奶油表面配蓝色强调色；Sarina + Outfit 字体。
- **\`@astryxdesign/theme-chocolate\`**: 暖棕调与舒适米色；Fraunces + Albert Sans 字体。
- **\`@astryxdesign/theme-gothic\`**: 仅深色模式，深蓝灰表面，冷酷现代哥特风。
- **\`@astryxdesign/theme-matcha\`**: 大地绿色主题；DM Sans + Playwrite US Trad 字体。
- **\`@astryxdesign/theme-stone\`**: 暖石与石板色；Montserrat + Figtree 字体。
- **\`@astryxdesign/theme-y2k\`**: 俏皮复古 Y2K 风格，长春花底色与全息强调色；Poppins + Crimson Text 字体。

> 这些样式表带有级联层：重置样式位于 \`@layer reset\`，组件样式位于 \`@layer astryx-base\`。如果你的项目已有全局 CSS、旧版 reset 或 Tailwind，请显式声明层顺序，并把每个样式表放进明确的层中——未分层的样式和更晚的层都会覆盖 \`astryx-base\`，与选择器优先级无关。开始搭建界面前，请先阅读迁移指南中关于级联层的两节内容。

---

### 编写第一个组件

从组件自己的入口导入，路径可以通过 \`astryx component <Name>\` 查到。这能保持打包体积小巧且代码意图清晰：

\`\`\`tsx
import { Button } from '@astryxdesign/core/Button';
import { VStack } from '@astryxdesign/core/VStack';

export default function Page() {
  return (
    <VStack gap={4}>
      <Button label="Hello Astryx" onClick={() => alert('Hi!')} />
    </VStack>
  );
}
\`\`\`

---

### 使用 StyleX 自定义样式

Astryx 组件支持从普通 CSS、\`className\` 到 Tailwind 与 CSS-in-JS 的多种样式方案。它还深度集成了 [StyleX](https://stylexjs.com/)：用 \`stylex.create()\` 创建样式，并通过 \`xstyle\` prop 传给组件：

\`\`\`tsx
import * as stylex from '@stylexjs/stylex';

const overrides = stylex.create({
  save: { 
    alignSelf: 'flex-end', 
    marginTop: 16 
  },
});

<Button label="Save" xstyle={overrides.save} />
\`\`\`

---

### 示例应用

| 示例 | 技术栈 | 路径 |
|---|---|---|
| Next.js | Next.js + 主题 CSS | [apps/example-nextjs](https://github.com/meta/astryx/tree/main/apps/example-nextjs) |
| Next.js + StyleX | Next.js + StyleX 自定义样式 | [apps/example-nextjs-stylex](https://github.com/meta/astryx/tree/main/apps/example-nextjs-stylex) |
| Next.js + Tailwind | Next.js + Tailwind 桥接 | [apps/example-nextjs-tailwind](https://github.com/meta/astryx/tree/main/apps/example-nextjs-tailwind) |
| Vite + Tailwind | Vite + Tailwind 桥接 | [apps/example-vite-tailwind](https://github.com/meta/astryx/tree/main/apps/example-vite-tailwind) |

\`\`\`bash
git clone https://github.com/meta/astryx.git
cd astryx/apps/example-nextjs
npm install
npm run dev
\`\`\`

---

### 探索 CLI

CLI 是组件、令牌、模板与文档的参考入口。为了稳定调用（尤其是配合 AI 助手时），请在 \`package.json\` 中添加脚本：

\`\`\`json
"scripts": {
  "astryx": "node node_modules/@astryxdesign/cli/clients/cli/bin/astryx.mjs"
}
\`\`\`

然后浏览可用内容：

\`\`\`bash
npm run astryx -- component           # 列出所有组件
npm run astryx -- component Button    # 查看 Button 的 props、用法与主题
npm run astryx -- docs                # 列出所有文档主题
npm run astryx -- template --list     # 查看可用页面模板
npm run astryx -- docs tokens         # 间距、颜色、圆角参考
\`\`\`
`,
  },
  principles: {
    title: "设计原则",
    description: "Astryx 设计系统的设计原则与代码规范约束，指导人与 AI 开发出高一致性的应用。",
    markdown: `### 核心哲学

- **组件优先于原生元素**：在组件能覆盖的场景下，不要直接使用裸 HTML 标签。
- **语义令牌优先于硬编码值**：颜色、间距和圆角应当以“用途”命名，而非“外观”。
- **主题无关的代码**：应用层代码不应写死特定的颜色或尺寸，主题和亮暗模式应自动生效。
- **开放内部实现**：每个小原语都应该对外导出并可以任意组合，赋能开发者而不是限制其发挥。

---

### 八条推荐实践规范

1. 在组件覆盖的场景下，处处使用 Astryx 组件。
2. 页面布局采用框架优先：先选定外壳并规划各区域尺寸，再编写具体内容。
3. 密集数据以行（Table、List/Item）通栏渲染并带分隔线；Card 仅用于小部件、画廊和设置分组。
4. 使用 StyleX 或 Tailwind 进行自定义样式定制，两者都是一等公民。
5. 始终使用语义令牌，不要写入硬编码的数值（例如 \`16px\` -> \`spacing-4\`）。
6. 颜色使用 CSS 自定义属性，避免写入 hex 十六进制值。
7. 表单输入框应始终为受控模式（value + onChange）。
8. 导航跳转应使用 \`useLinkComponent()\`，让使用方可以通过 LinkProvider 接入自己的框架路由。

---

### 样式方法

组件覆盖使用 \`xstyle\` prop；布局使用 StyleX 或 Tailwind。完整指南见“样式方案”与“样式库互操作”。

---

### 反模式对比 (Anti-patterns)

| 不要这样做 | 推荐这样做 |
|---|---|
| 在原生元素上使用 inline style | 使用 StyleX/Tailwind 覆盖或使用 Astryx 布局组件 |
| 硬编码颜色（例如 \`color: #ffffff\`） | 使用 \`var(--color-text-primary)\` 或 Tailwind \`text-primary\` |
| 硬编码间距（\`padding: 16px\`） | 使用 \`var(--spacing-4)\` 或 Tailwind \`p-4\` |
| 硬编码 \`<a>\` 标签 | 使用 \`useLinkComponent()\` 绑定框架 Link |
| 将每个列表项或页面小部分包裹在 \`Card\` 中 | 先定框架；密集数据使用 \`ListItem\` 或 \`Table\` |
| 将 \`Badge\` 当作纯装饰 | 将 \`Badge\` 保留给计数和枚举状态；状态请使用 \`StatusDot\` 或 \`Token\` |
| 自创组件 props | 先阅读组件文档 |
`,
  },
  layout: {
    title: "布局系统",
    description: "由外向内构建布局：先定外壳与区域预算，再安排内容结构、间距和响应式行为。",
    markdown: `### 由外向内构建

在编写任何页面内容前，先确定**整体框架**。真实应用都是自顶向下构建的：

1. **搭建外壳（Scaffold）**：通常是 \`AppShell\` 配合导航，并为每个区域分配尺寸预算。
2. **组织内容（Structure）**：为每个区域的内容排定层级，并选择容器（行/列表、卡片或面板）。
3. **调整间距（Spacing）**：让每个区域对齐到同一条内容线，再设置 gap 与密度。
4. **处理断点（Breakpoints）**：决定宽度变化时每个区域如何分栏、显隐、缩放或替换。

\`astryx build "<idea>"\` 会给出最接近你应用类型的起始模板，以及缺失部分所需的区块与组件；\`astryx component <Name>\` 可查看组件 props。

---

### 三区域工具框架示例

\`\`\`tsx
// 经典三区域：左侧导航栏 256px | 中间内容自适应 | 右侧详情面板 380px (支持拖拽调整大小)
<AppShell sideNav={<SideNav>{/* 导航项 */}</SideNav>} contentPadding={0}>
  <Layout>
    <LayoutContent>
      {/* 边缘对齐的表格或密集列表 */}
    </LayoutContent>
    <LayoutPanel width={380} resizable={{minSizePx: 320, maxSizePx: 480}} hasDivider>
      {/* 选中项的详情查看器 (Inspector) */}
    </LayoutPanel>
  </Layout>
</AppShell>
\`\`\`

---

### 常见应用框架原型

- **后台工作台 / 跟踪器**: \`AppShell + SideNav\` 经典侧边栏，选中行后在右侧滑出 \`LayoutPanel\` 检查器。**容器策略**：只用行/列表，杜绝使用多层卡片。
- **仪表盘 / 可观测性控制台**: \`AppShell\` 顶部或左侧导航。**容器策略**：KPI 核心数据和小部件使用 Bento 网格卡片，其余表格或数据展示依旧用行。
- **即时通讯 / 消息流**: 多列分栏布局（频道列表 + 聊天流 + 成员看板）。**容器策略**：使用气泡和紧凑行，聊天流中避免包裹卡片。
- **设置面板**: 经典 FormLayout 分区。**容器策略**：仅危险操作或支付设置使用 \`Card\` 容器。

---

### 响应式约定 (Responsive Contract)

在宣布布局完成前，为每个区域写下明确的响应式约定，并说明由哪个 prop 或 hook 执行：

- **分栏（Divide）**：每个宽度下保留几个区域。
- **显隐（Reveal）**：哪些区域只在空间足够时出现，空间不足时改为按需打开。
- **缩放（Resize）**：内容弹性伸缩，固定区域保持预算，文本受 \`contentWidth\` 限制以维持行长。
- **替换（Swap）**：导航在 AppShell 的 mobileNav 断点切换为 \`MobileNav\`；侧面板由 \`useMediaQuery\` 驱动，切换为 \`Dialog\` 或 \`BottomSheet\`。

\`\`\`tsx
// 推荐阈值：> 1024px 三区域；768–1024px 两区域；< 768px 单区域 + MobileNav
// 响应式设计约定：
//   > 1024px  显示侧边栏(256px) + 内容 + 检查面板(380px)
//   <= 1024px 检查面板呈绝对定位覆盖层形式展现
//   <= 768px  侧边栏折叠为抽屉式 MobileNav，工具栏操作项自动换行
\`\`\`

**避免**：在三个区域都没有可用空间时仍强行并排；把所有区域统一缩小而不是替换或隐藏；在 CSS 中接入约定注释从未提到的断点。
`,
  },
  typography: {
    title: "排版系统",
    description: "基于几何字号尺度与 4px 垂直网格的排版体系，保障良好的信息阶梯和易读性。",
    markdown: `### 字体族 (Font Families)

- **正文 & 标题**: \`var(--font-family-body)\` 默认 Figtree / 系统默认无衬线字体。
- **代码 & 终端**: \`var(--font-family-code)\` 默认 \`"SF Mono"\` / \`Geist Mono\`。

---

### 几何字号尺度 (Typography Scale)

基于公式：\`round(14 × 1.2^step)\`。默认生成从 \`4xs (6px)\` 到 \`5xl (42px)\` 共 12 个字号等级：

| 令牌 | 尺寸 (rem) | 对应像素 (16px base) |
|---|---|---|
| \`--font-size-base\` | \`0.875rem\` | 14px (默认正文字号) |
| \`--font-size-lg\` | \`1.0625rem\` | 17px |
| \`--font-size-xl\` | \`1.25rem\` | 20px |
| \`--font-size-2xl\` | \`1.5rem\` | 24px |
| \`--font-size-3xl\` | \`1.8125rem\` | 29px |
| \`--font-size-4xl\` | \`2.1875rem\` | 35px |
| \`--font-size-5xl\` | \`2.625rem\` | 42px |

---

### 行高与垂直网格

为了在长文本阅读中保持韵律，行高自动对齐至 **4px 垂直网格**：
- **小字号 (<20px)**: 目标倍率为 1.5
- **中等字号 (20-31px)**: 目标倍率为 1.4
- **大字号 (>=32px)**: 目标倍率为 1.25

---

### 排版组件用法

推荐使用系统提供的 \`Heading\` 与 \`Text\` 组件，这能让您自动符合排版令牌的语义约束：

\`\`\`tsx
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';

// 页面级标题
<Heading level={1}>控制台首页</Heading>

// 大字号展示（例如 KPI 数据）
<Heading level={2} type="display-2">$1,234,567.89</Heading>

// 视觉层级与文档大纲不一致时，显式指定语义级别
<Heading level={2} accessibilityLevel={3}>侧边栏标题</Heading>

// 基础段落
<Text type="body">这是系统的基础正文文本排版风格。</Text>

// 辅助描述信息
<Text type="supporting">最后更新于 3 分钟前</Text>
\`\`\`

**最佳实践**：标题用 \`Heading\`，其余文本用 \`Text\`；不要手动设置 font-size 或 line-height；不要跳过标题层级，必要时使用 \`accessibilityLevel\`；display 类型只用于 hero、营销或数据展示场景。
`,
  },
  colors: {
    title: "色彩系统",
    description: "高度抽象的语义化色彩机制，通过 CSS light-dark() 实现亮暗模式的完全自动适配。",
    markdown: `### 语义色彩哲学

Astryx 坚信颜色应由**功能决定**，而不是名称。例如不要使用 \`text-black\` 或 \`bg-white\`，而是使用 \`text-primary\` 或 \`bg-surface\`。所有颜色都通过 \`light-dark()\` 自动适配亮暗模式。

---

### 色彩分层结构 (Color Hierarchy)

#### 1. 表面层背景 (Backgrounds)
- **\`--color-background-body\`**: 页面整体底色（亮模式 \`#F1F4F7\` | 暗模式 \`#111112\`）
- **\`--color-background-surface\`**: 基础面板底色（\`#FFFFFF\` | \`#1F1F22\`）
- **\`--color-background-card\`**: 卡片底色（\`#FFFFFF\` | \`#1F1F22\`）
- **\`--color-background-popover\`**: 弹出层底色（\`#FFFFFF\` | \`#28292C\`）
- **\`--color-background-muted\`**: 弱化背景（\`#0536590C\` | \`#1111127F\`）

#### 2. 文本前景色 (Foregrounds)
- **\`--color-text-primary\`**: 首要文本颜色（\`#0A1317\` | \`#DFE2E5\`）
- **\`--color-text-secondary\`**: 次要说明文本（\`#4E606F\` | \`#AAAFB5\`）
- **\`--color-text-disabled\`**: 禁用状态文本（\`#A4B0BC\` | \`#6F747C\`）
- **\`--color-text-accent\`**: 强调文本（\`#0064E0\` | \`#3E9EFB\`）

#### 3. 强调色与状态色
- **\`--color-accent\`**: 品牌核心强调色（\`#0064E0\` | \`#2694FE\`）
- **\`--color-accent-muted\`**: 弱化强调色（\`#0082FB33\` | \`#0082FB3F\`）
- **\`--color-on-accent\`**: 强调色上的文本/图标（\`#FFFFFF\`）
- **\`--color-success\`**: 成功指示色（\`#0D8626\`）
- **\`--color-error\`**: 错误指示色（\`#E3193B\` | \`#F5394F\`）
- **\`--color-warning\`**: 警告指示色（\`#E9AF08\` | \`#F2C00B\`）
- **\`--color-info\`**: 信息指示色（\`#0064E0\`）
- **\`--color-border\`**: 默认边框（\`#05365919\` | \`#F2F4F619\`）

---

### 状态角色 (Status Roles)

根据所在表面选择状态令牌。\`<status>\` 可以是 info、success、warning 或 error：

| 状态角色 | 用途 | 搭配 |
|---|---|---|
| \`--color-text-<status>\` | 页面或卡片上的状态文本（对比度 ≥ 4.5:1） | — |
| \`--color-icon-<status>\` | 页面或卡片上的状态图标，默认取文本色 | — |
| \`--color-border-<status>\` | 页面或卡片上的状态边框（例如无效输入框），默认取文本色 | — |
| \`--color-<status>\` | 强状态填充，例如 Badge 或 StatusDot | \`--color-on-<status>\` |
| \`--color-on-<status>\` | 强填充上的文本/图标（≥ 4.5:1） | \`--color-<status>\` |
| \`--color-<status>-muted\` | 浅色状态填充，例如 Banner | \`--color-on-<status>-muted\` |
| \`--color-on-<status>-muted\` | 浅色填充上的文本/图标（≥ 4.5:1） | \`--color-<status>-muted\` |

---

### 数据可视化色彩 (Data Categorical)

提供 10 种高对比度的分类色彩，特别为图表和指标标识优化：

- \`--color-data-categorical-blue\`: \`#0171E3\`
- \`--color-data-categorical-orange\`: \`#EB6E00\`
- \`--color-data-categorical-purple\`: \`#6B1EFD\`
- \`--color-data-categorical-green\`: \`#0B991F\`
- \`--color-data-categorical-pink\`: \`#F351C0\`
- \`--color-data-categorical-cyan\`: \`#0171A4\`
- \`--color-data-categorical-red\`: \`#F5394F\`
- \`--color-data-categorical-teal\`: \`#08A3A3\`
- \`--color-data-categorical-brown\`: \`#965E03\`
- \`--color-data-categorical-indigo\`: \`#6F8AFF\`
- \`--color-data-neutral\`: \`#8494A3\` | \`#8C939B\`

---

### 语法高亮色 (Syntax)

代码高亮色默认引用调色板令牌，因此会跟随主题变化；\`defineTheme({syntax})\` 可以用一套语法主题整体替换：

| 令牌 | 值 |
|---|---|
| \`--color-syntax-keyword\` | \`var(--color-text-accent)\` |
| \`--color-syntax-string\` | \`var(--color-text-green)\` |
| \`--color-syntax-comment\` | \`var(--color-text-secondary)\` |
| \`--color-syntax-number\` / \`constant\` | \`var(--color-text-orange)\` |
| \`--color-syntax-function\` | \`var(--color-text-blue)\` |
| \`--color-syntax-type\` | \`var(--color-text-purple)\` |
| \`--color-syntax-variable\` | \`var(--color-text-primary)\` |
| \`--color-syntax-operator\` / \`property\` | \`var(--color-text-cyan)\` |
| \`--color-syntax-tag\` | \`var(--color-text-red)\` |
| \`--color-syntax-attribute\` | \`var(--color-text-teal)\` |
| \`--color-syntax-background\` | \`var(--color-background-muted)\` |

---

### 在 StyleX 中使用

\`\`\`tsx
import * as stylex from '@stylexjs/stylex';
import {colorVars} from '@astryxdesign/core/theme/tokens.stylex';

const styles = stylex.create({
  container: {
    backgroundColor: colorVars['--color-background-surface'],
    color: colorVars['--color-text-primary'],
    borderColor: colorVars['--color-border'],
  },
});
\`\`\`
`,
  },
  spacing: {
    title: "间距尺度",
    description: "基于 4px 基础网格系统，提供高度一致性的内外边距和网格间隔方案。",
    markdown: `### 间距尺度表

系统使用 4px 基础单位的间距尺度，并以 rem 书写，使 gap 与 padding 能像文本一样随读者浏览器的字号增长：每一步为 \`0.25rem\`，在默认 16px 根字号下即 4px。

| 令牌名称 | 对应像素值 (px) | rem 尺寸 | 推荐使用场景 |
|---|---|---|---|
| \`--spacing-0\` | 0px | \`0rem\` | 无间距 |
| \`--spacing-0-5\` | 2px | \`0.125rem\` | 极细微对齐 |
| \`--spacing-1\` | 4px | \`0.25rem\` | 细微对齐、极紧凑的子元素间隔 |
| \`--spacing-1-5\` | 6px | \`0.375rem\` | 紧凑控件内部的细微间隔 |
| \`--spacing-2\` | 8px | \`0.5rem\` | 按钮内文字与图标间距、列表项内距 |
| \`--spacing-3\` | 12px | \`0.75rem\` | 表单项上下间隔、卡片内边距(紧凑型) |
| \`--spacing-4\` | 16px | \`1.0rem\` | 标准卡片和区域的内边距、核心 Gap 默认值 |
| \`--spacing-5\` | 20px | \`1.25rem\` | 中等密度区块 |
| \`--spacing-6\` | 24px | \`1.5rem\` | 大板块分栏间隔、主要页面侧内距 |
| \`--spacing-7\` | 28px | \`1.75rem\` | 宽松的内容分组 |
| \`--spacing-8\` | 32px | \`2.0rem\` | 页面首尾留白、超大容器级 padding |
| \`--spacing-9\` | 36px | \`2.25rem\` | 大型区块间隔 |
| \`--spacing-10\` | 40px | \`2.5rem\` | 页面级留白 |
| \`--spacing-11\` | 44px | \`2.75rem\` | 页面级留白 |
| \`--spacing-12\` | 48px | \`3.0rem\` | Hero 区域段落间距、大型版式区分 |

---

### 组件级 Gap 绑定

\`Stack\`、\`HStack\`、\`VStack\`、\`Grid\`、\`Toolbar\`、\`OverflowList\` 与 \`ChatMessageList\` 接受 gap 步进：0、0.5、1、1.5、2、3、4、5、6、8、10（×4px）。\`Carousel\` 接受 0 到 4 的步进。

\`\`\`tsx
import { HStack } from '@astryxdesign/core/HStack';

// gap={4} 会自动映射并翻译为 --spacing-4 (16px) 的间距
<HStack gap={4}>
  <div>左侧元素</div>
  <div>右侧元素</div>
</HStack>
\`\`\`

自定义布局可直接使用 StyleX 间距令牌：

\`\`\`tsx
import {spacingVars} from '@astryxdesign/core/theme/tokens.stylex';

const styles = stylex.create({
  custom: {
    padding: spacingVars['--spacing-4'],
    gap: spacingVars['--spacing-3'],
  },
});
\`\`\`
`,
  },
  shapes: {
    title: "形状与圆角",
    description: "语义化圆角层级，基于 4dp 数值尺度并由主题的圆角乘数统一缩放。",
    markdown: `### 圆角语义尺度

圆角尺度以**所在 UI 的层级角色**命名，同时基于 4dp 数值尺度，并随主题的 \`radius.multiplier\` 整体缩放；\`--radius-none\` 与 \`--radius-full\` 固定不变。

| 令牌 | 值 | 用途 |
|---|---|---|
| \`--radius-none\` | 0px | 无圆角 |
| \`--radius-inner\` | 4px | 内嵌子元素 |
| \`--radius-element\` | 8px | 交互控件（按钮、输入框、选择器） |
| \`--radius-container\` | 12px | 内容容器（卡片、面板、对话框） |
| \`--radius-page\` | 28px | 页面级容器 |
| \`--radius-chat\` | 28px | 聊天气泡 |
| \`--radius-full\` | 9999px | 胶囊形状（徽章、标签、头像状态点） |

---

### 同心圆角 (Nested Radius)

如果外部大容器与内部子元素圆角一样大，视觉上内部看起来就会非常拥挤不协调。在有内边距的圆角容器中，请为嵌套元素使用“外部圆角减去内边距”的圆角，以保持同心：

\`\`\`css
.inner {
  border-radius: max(0px, calc(var(--radius-container) - var(--spacing-4)));
}
\`\`\`

> 注意：Card **不会**自动为你的内容计算同心圆角，需要你按上述公式处理。

---

### 在 StyleX 中使用

\`\`\`tsx
import {radiusVars} from '@astryxdesign/core/theme/tokens.stylex';

const styles = stylex.create({
  panel: {
    borderRadius: radiusVars['--radius-container'],
  },
});
\`\`\`
`,
  },
  shadows: {
    title: "阴影与高度",
    description: "通过分级的高度令牌与 elevation prop 表达表面堆叠关系，并提供内阴影状态反馈。",
    markdown: `### 阴影三级尺度

利用多重阴影重叠，营造出柔和自然的悬浮效果：

| 令牌 | 值（亮/暗） |
|---|---|
| \`--shadow-low\` | 1px 1px + 2px 8px 双层投影 |
| \`--shadow-med\` | 1px 2px + 2px 12px 双层投影 |
| \`--shadow-high\` | 2px 2px + 8px 24px 双层投影 |

阴影通过 \`light-dark()\` 自动适配亮暗模式。

---

### 用 elevation 表达层级

可配置的表面暴露一个 \`elevation\` prop，而不是让使用方手写 box-shadow。取值为 \`none | low | med | high\`，并按组件收窄到它需要的层级：

| 级别 | 何时使用 | 示例 |
|---|---|---|
| \`none\` | 平铺嵌入表面，属于页面而非浮在其上。除 ChatComposer 外所有表面的默认值 | 网格中的 Card、内联 Banner、普通 Button |
| \`low\` | 位于正常页面流中，但需要与背景区分；仍不浮在其他内容之上 | 需要强调的 Card、ChatComposer |
| \`med\` | 浮在同一页面的其他内容之上，但不覆盖整个屏幕 | Popover、浮动 Banner、浮动操作 Button |
| \`high\` | 覆盖整个 UI 的最上层，通常带背景遮罩或独占焦点 | 模态 Dialog、全屏覆盖层 |

如果两个表面重叠，上层使用更高的级别；如果表面不与任何内容重叠，它应是 \`none\` 或 \`low\`，绝不用 \`med\` 或 \`high\`。

\`\`\`tsx
// 默认平铺；需要悬浮时再抬高。
<Card elevation="low">Raised card</Card>

// 浮动操作按钮。
<IconButton icon={<Icon icon={Plus} />} label="New" variant="primary" elevation="med" />

// 将 composer 压平（默认是 low）。
<ChatComposer elevation="none" onSubmit={handleSubmit} />
\`\`\`

Dialog、Popover、Tooltip、Toast、HoverCard、DropdownMenu 等固有覆盖层会把高度烘焙进去，不暴露该 prop；输入框等流式内容永远不抬高，而是使用内阴影环。

---

### 内阴影状态反馈 (Inset Shadows)

为了避免在聚焦和激活时产生像素级的页面抖动，Astryx 使用内阴影来实现各类焦点与校验状态的边框高亮：

- **\`--shadow-inset-hover\`**: 悬停环。
- **\`--shadow-inset-selected\`**: 聚焦和被选择环，映射为半透明的强调色。
- **\`--shadow-inset-success\`**: 验证成功的绿色软边框。
- **\`--shadow-inset-warning\`**: 验证警告的黄色软边框。
- **\`--shadow-inset-error\`**: 校验报错的红色醒目内投影。

---

### 在 StyleX 中使用

\`\`\`tsx
import {shadowVars} from '@astryxdesign/core/theme/tokens.stylex';

const styles = stylex.create({
  dropdown: { boxShadow: shadowVars['--shadow-med'] },
  dialog: { boxShadow: shadowVars['--shadow-high'] },
  inputFocused: { boxShadow: shadowVars['--shadow-inset-selected'] },
});
\`\`\`

**避免**：在应用代码中手写 \`box-shadow\`；给不重叠的表面使用 \`med\`/\`high\`；在同一元素上叠加多个高度级别；用高度阴影充当装饰性边框（应使用 \`--color-border\` 令牌）。
`,
  },
  motion: {
    title: "动效系统",
    description: "以提升用户认知为核心的动效框架，内置完整的时间节奏、缓动曲线与主题级调节旋钮。",
    markdown: `### 动效哲学

在 Astryx 中，动画具有极高的理智性：
- 动效应当**使用户界面更易理解**（如过渡动画展示层级），或**使体验更有温度**。
- 绝不使用**阻塞用户操作**的低效动画。
- 绝不给表格的悬停、大列表的滚动项加繁复的动效。

---

### 时间节奏 (Durations)

| 令牌名称 | 默认时长 | 推荐场景 |
|---|---|---|
| \`--duration-fast-min\` | 130ms | 极快状态，如选择框打勾、图标悬停 |
| \`--duration-fast\` | 175ms | 默认微动效，按钮悬浮缩放 |
| \`--duration-fast-max\` | 230ms | 快速动效的上限 |
| \`--duration-medium-min\` | 310ms | 中等动效的下限 |
| \`--duration-medium\` | 410ms | 面板推入、大对话框滑入 |
| \`--duration-medium-max\` | 550ms | 中等动效的上限 |
| \`--duration-slow-min\` | 730ms | 慢速动效的下限 |
| \`--duration-slow\` | 975ms | 大范围的翻页、渐变背景转场 |
| \`--duration-slow-max\` | 1300ms | 慢速动效的上限 |

---

### 缓动曲线 (Easing)

| 令牌 | 值 | 用途 |
|---|---|---|
| \`--ease-standard\` | \`cubic-bezier(0.24, 1, 0.4, 1)\` | 状态变化，减速收尾 |
| \`--ease-entrance\` | \`cubic-bezier(0.24, 1, 0.4, 1)\` | 元素入场 |
| \`--ease-move\` | \`cubic-bezier(0.24, 1, 0.4, 1)\` | 元素在屏幕中移动 |
| \`--ease-exit\` | \`cubic-bezier(0.3, 0, 0.6, 0.6)\` | 元素退场，从静止加速离开 |

\`--ease-entrance\` 与 \`--ease-move\` 会随主题的 \`character\` 变化；在 \`standard\` 下二者等于 \`--ease-standard\`。\`--ease-exit\` 在任何 \`character\` 下都保持不变。

---

### 主题级动效调节

\`defineTheme\` 的 \`motion\` 提供两个旋钮：

- **\`tempo\`**：缩放所有动效时长。1 是 Astryx 自身节奏，0.75 最快，1.5 最慢（超出范围会被夹取）。
- **\`character\`**：决定动效的活跃程度。\`'crisp'\` 减速且不回弹，\`'standard'\` 是 Astryx 自身节奏，\`'expressive'\` 在入场和移动时轻微过冲；退场和淡出永不过冲。

\`\`\`ts
export const brandTheme = defineTheme({
  name: 'brand',
  motion: {tempo: 0.85, character: 'crisp'},
});
\`\`\`

优先级从低到高：旋钮 → 时长尺度（\`fast\`、\`medium\`、\`slow\`、\`ratio\`）→ 显式 \`tokens\`。没有设置 \`motion\` 的主题渲染结果与之前完全一致。

---

### 响应减少运动 (Reduced Motion)

当操作系统开启“减少运动”时，Astryx 组件在鼠标或触控板下立即变化；在手指操作下则改为交叉淡入淡出：只改变透明度，时长不超过 200ms。原地变化的值（例如进度填充）在任何指针下都会立即采用新值。

在你自己的动画中使用 \`@media (prefers-reduced-motion: reduce)\`，并为触摸交叉淡入额外加上 \`(pointer: coarse)\`。

---

### 在 StyleX 中使用

\`\`\`tsx
import {durationVars, easeVars} from '@astryxdesign/core/theme/tokens.stylex';

const styles = stylex.create({
  fadeIn: {
    transitionProperty: 'opacity',
    transitionDuration: durationVars['--duration-fast'],
    transitionTimingFunction: easeVars['--ease-standard'],
  },
});
\`\`\`
`,
  },
  styling: {
    title: "样式方案",
    description: "三种 CSS 接入路径：普通 CSS、Tailwind 以及用于自身代码的 StyleX，全部使用预构建样式。",
    markdown: `### 选择一条路径

| 路径 | 适合 | 需要构建步骤？ |
|---|---|---|
| 普通 CSS | 大多数应用。使用 \`className\`、\`xstyle\` 或任意 CSS 库 | 无 |
| Tailwind | 使用 Tailwind v4 的应用。CSS 桥接把工具类映射到设计令牌 | 除 Tailwind 自身外无 |
| 用于自身代码的 StyleX | 你自己的 \`stylex.create()\` 样式，以及 swizzle（弹出）出来的组件。Astryx 本身仍是预构建的 | 需要为自身代码添加 StyleX 插件 |

三条路径都会加载同一套预构建 Astryx 样式表，解析到同一套设计令牌，并支持主题与亮暗模式；它们都不会编译 Astryx 包源码，也可以在同一应用中混用。

---

### 1. 普通 CSS

\`\`\`bash
npm install @astryxdesign/core @stylexjs/stylex @astryxdesign/theme-neutral
\`\`\`

\`\`\`css
@import "@astryxdesign/core/reset.css";
@import "@astryxdesign/core/astryx.css";
@import "@astryxdesign/theme-neutral/theme.css";
\`\`\`

完成后组件即可使用——通过 \`className\`、\`xstyle\` 或 \`style\` 自定义。把 \`theme-neutral\` 换成任意主题包即可（\`astryx theme list\` 查看可用主题）。

---

### 2. Tailwind CSS

Tailwind v4 桥接把设计令牌映射到工具类：颜色、间距、圆角、阴影和排版都会解析到当前主题。

\`\`\`css
@layer reset, theme, base, astryx-base, astryx-theme, components, utilities;

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "@astryxdesign/core/reset.css";
@import "@astryxdesign/core/astryx.css";
@import "@astryxdesign/theme-neutral/theme.css";
@import "@astryxdesign/core/tailwind-theme.css";
@import "tailwindcss/utilities.css" layer(utilities);
\`\`\`

\`\`\`tsx
<div className="text-primary bg-surface rounded-container p-4 flex gap-3">
  <Button label="Save" variant="primary" />
  <Button label="Cancel" variant="secondary" />
</div>
\`\`\`

桥接是纯 CSS，无 JS。主题变化（暗色模式、自定义主题）会自动生效，因为工具类引用的是组件同样使用的 CSS 自定义属性。

---

### 3. 组件覆盖：xstyle Prop

每个组件都接受 \`xstyle\` prop，用于样式定制。它接受 \`stylex.create()\` 创建的 StyleX 样式，而不是内联对象或类名字符串。StyleX 样式在构建时编译，以获得最佳去重和死代码消除。

\`\`\`tsx
import * as stylex from '@stylexjs/stylex';
import { Button } from '@astryxdesign/core/Button';

const styles = stylex.create({
  ctaButton: {
    paddingInline: 24,
    transform: {
      default: 'scale(1)',
      '@media (hover: hover)': {
        ':hover': 'scale(1.02)',
      },
    },
  },
});

<Button label="立即体验" xstyle={styles.ctaButton} />
\`\`\`

- 所有 xstyle 值必须来自 \`stylex.create()\`。
- 支持伪类（\`:hover\`、\`:focus-visible\`）。
- 所有 \`:hover\` 样式必须使用 \`@media (hover: hover)\` 保护。
- 非 StyleX 样式（Tailwind、外部 CSS）请使用 \`className\`。

---

### 4. className、style 与属性透传

所有组件底层均采用“属性透传”机制，可以直接使用 \`className\`、\`style\`、\`data-*\`、\`aria-*\` 等原生属性：

\`\`\`tsx
<Card style={{ opacity: 0.9 }} data-testid="user-profile-card">
  内容
</Card>
\`\`\`

如需与外部 CSS 配合，推荐使用数据属性选择器：

\`\`\`css
.my-app .astryx-button[data-variant="primary"] { /* ... */ }
.my-app .astryx-button[data-variant="primary"][data-size="sm"] { /* ... */ }
\`\`\`
`,
  },
  interop: {
    title: "样式库互操作",
    description: "将 Astryx 作为全局设计令牌的唯一源，实现与 Emotion、MUI、Panda CSS 等生态的有机结合。",
    markdown: `### 核心共存原则

设计系统是**系统设计令牌的唯一真实来源**。所有主题的适配切换最终都会体现到 HTML 的 CSS 自定义属性上。

因此，其他第三方组件库或自定义样式系统应该**绑定并映射到 Astryx 暴露的全局 CSS 变量**。普通 DOM 样式优先使用 CSS 变量，因为变量会沿树继承、跟随 \`data-theme\` 色彩模式、尊重嵌套的 \`data-astryx-theme\` 作用域，并在主题切换时更新。只有 SVG 属性、canvas、图表配置或静态配置生成等无法消费 CSS 自定义属性的场景，才使用令牌解析 API。

---

### 选择集成路径

| 路径 | 使用场景 | 值形状 |
|---|---|---|
| CSS 变量别名 | 库最终写 CSS 并接受字符串值 | \`var(--color-text-primary)\` |
| StyleX 令牌导入 | 在应用代码中编写 StyleX 样式 | \`colorVars['--color-text-primary']\` |
| Tailwind 桥接 | 想要由系统令牌驱动的工具类 | \`@astryxdesign/core/tailwind-theme.css\` |
| 令牌解析器 API | JS 需要令牌值用于图表、canvas、SVG、配置对象 | \`resolveThemeToken(theme, '--color-*', {mode})\` |

---

### 与各类主流样式方案的整合

#### 1. Tailwind CSS v4 绑定
直接使用 \`@layer\` 规整样式层，让 Tailwind 的语义类直接引用 Astryx 令牌：

\`\`\`css
@layer reset, theme, base, astryx-base, astryx-theme, components, utilities;

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "@astryxdesign/core/reset.css";
@import "@astryxdesign/core/astryx.css";
@import "@astryxdesign/theme-neutral/theme.css";
@import "@astryxdesign/core/tailwind-theme.css";
@import "tailwindcss/utilities.css" layer(utilities);
\`\`\`

#### 2. Styled Components / Emotion 绑定
定义全局 Theme 对象，其底层的 Value 直接写入 CSS 变量名称：

\`\`\`ts
export const theme = {
  colors: {
    primaryText: "var(--color-text-primary)",
    brandAccent: "var(--color-accent)",
    pageBackground: "var(--color-background-body)",
  },
  radii: {
    btn: "var(--radius-element)",
  }
};
\`\`\`

#### 3. Panda CSS / Chakra UI 语义配置
\`\`\`ts
semanticTokens: {
  colors: {
    text: {
      primary: { value: 'var(--color-text-primary)' },
    },
    background: {
      surface: { value: 'var(--color-background-surface)' },
    }
  }
}
\`\`\`

#### 4. MUI 调色板映射
\`\`\`ts
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
    dark: { /* 同样的变量 */ },
  },
});
\`\`\`

#### 5. 非 CSS 处理

当 React 外的代码需要令牌值时使用 \`resolveThemeTokens()\`：

\`\`\`ts
import {resolveThemeTokens} from '@astryxdesign/core/theme/tokens';
import {neutralTheme} from '@astryxdesign/theme-neutral';

const lightTokens = resolveThemeTokens(neutralTheme, {mode: 'light'});
\`\`\`

在客户端组件内使用 \`useTheme()\`：

\`\`\`tsx
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
\`\`\`

**最佳实践**：按语义意图映射（text、surface、border、accent、status、radius、spacing、typography）；让系统拥有色彩模式；优先使用 CSS 变量以支持运行时主题切换与嵌套主题。**避免**：在 \`var(...)\` 可用时把原始 hex/px 复制到第二个主题对象；运行第二个不同步的暗色模式提供器；让另一个库的 CSS 变量成为系统的真实来源。
`,
  },
  theme: {
    title: "主题系统",
    description: "使用 theme add 引入主题，通过生成模块统一接线，并可用 defineTheme 完全定制品牌主题。",
    markdown: `### 快速开始：把应用包进主题

安装并添加主题，然后用 CLI 生成的模块接线一次：

\`\`\`bash
npm install @astryxdesign/theme-neutral
npx astryx theme add neutral
\`\`\`

\`\`\`tsx
import {Theme} from '@astryxdesign/core/theme';
import {themes, defaultThemeSlug} from './astryx-themes';

function App() {
  return (
    <Theme theme={themes[defaultThemeSlug]}>
      <YourApp />
    </Theme>
  );
}
\`\`\`

\`theme add\` 会记录已安装的包主题，并重新生成 \`src/astryx-themes.ts\`（或 \`.js\`），其中包含主题的 built 模块、生产 CSS 与可选字体 CSS。项目中若没有 \`src\`，模块位于项目根目录。**第一个添加的主题成为默认主题**；\`theme use <slug>\` 更改默认主题，\`theme remove <slug>\` 移除非默认主题。\`theme eject <slug>\` 会把主题源码复制到项目中，形成不再接收包更新的独立分支——只在你明确需要独立源码时使用。

\`\`\`bash
npx astryx theme list                 # 查看所有可用主题
npx astryx theme add stone            # 添加一个包主题
npx astryx theme use stone            # 切换默认主题
npx astryx theme eject stone          # 复制源码，形成独立本地主题
npx astryx theme build src/themes/stone/stoneTheme.ts
\`\`\`

---

### 可用主题

| 主题 | 添加命令 | 说明 |
|---|---|---|
| Neutral | \`astryx theme add neutral\` | 柔和极简，Figtree 字体，适合作为起点 |
| Butter | \`astryx theme add butter\` | 金色奶油表面配蓝色强调色；Sarina + Outfit 字体 |
| Chocolate | \`astryx theme add chocolate\` | 暖棕色调和舒适米色；Fraunces + Albert Sans 字体 |
| Gothic | \`astryx theme add gothic\` | 仅深色模式，深蓝灰表面，做旧展示字体 |
| Matcha | \`astryx theme add matcha\` | 大地绿色；DM Sans + Playwrite US Trad 字体 |
| Stone | \`astryx theme add stone\` | 暖石与石板色；Montserrat + Figtree 字体 |
| Y2K | \`astryx theme add y2k\` | 俏皮 Y2K 流行风；长春花底色、全息强调色，Poppins + Crimson Text 字体 |

每个第一方包都在 \`@astryxdesign/theme-{name}/built\` 导出 built 主题，在 \`/theme.css\` 提供生产 CSS，在 \`/fonts.css\` 提供字体加载 CSS；\`theme add\` 会把这些导入写进生成的 app 模块。

---

### 集成主题

把集成作为直接依赖安装。Astryx 无需 \`astryx.config\` 条目即可发现它的主题与指南。只有当已安装包导出 built 模块和生产样式表时，主题才能被添加：

\`\`\`bash
npm install @astryxdesign/core @acme/brand-integration
npx astryx theme list --package @acme/brand-integration
npx astryx docs brand-theme
npx astryx theme add ocean --package @acme/brand-integration
\`\`\`

\`theme add\` 会把 owner 包保留在 app 记录中，并导入其 built 模块、样式表与可选字体样式表，因此包更新会持续到达应用。只有需要把源码复制到 \`src/themes/ocean\` 作为独立本地分支时，才运行 \`theme eject ocean --package @acme/brand-integration\`。

---

### 创建自定义主题

你可以直接使用 \`defineTheme\` API 来描述你的视觉系统。扩展已有主题是推荐做法：

\`\`\`tsx
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
    body: { family: 'Geist', fallbacks: 'sans-serif' }
  },
  radius: {
    base: 6,
    multiplier: 1.2
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
\`\`\`

\`defineTheme\` 支持颜色、排版尺度、字体族、圆角、动效、组件覆盖、图标、语法主题与自定义变体。自定义变体会在构建后获得类型安全：

\`\`\`tsx
<Button variant="primary-muted" label="Save draft" />
\`\`\`

需要一套全新的协调配色时，可生成调色板：

\`\`\`bash
npx astryx theme palette generate palette.config.json --out palette.generated.ts
\`\`\`

审查并提交生成的调色板模块与 receipt，导入它的 \`palette\` 导出，然后在语义令牌中引用稳定的色阶。重新生成已接受的调色板会更新所有保留这些引用的映射令牌；生成过程不会改写主题。

---

### 暗色模式

令牌值中的 \`[亮, 暗]\` 元组会自动适配模式。\`Theme\` 默认 \`mode="system"\`，跟随操作系统偏好，也可以显式设为 \`light\` 或 \`dark\`：

\`\`\`tsx
'--color-accent': ['#0064E0', '#2694FE']
//                   ^亮色     ^暗色

const [mode, setMode] = useState<'light' | 'dark'>('light');

<Theme theme={myTheme} mode={mode}>
  <Button
    label={mode === 'light' ? 'Switch to Dark' : 'Switch to Light'}
    onClick={() => setMode(m => (m === 'light' ? 'dark' : 'light'))}
  />
</Theme>
\`\`\`

---

### 嵌套主题

把不同区域包进各自的 \`<Theme>\` 提供器即可：

\`\`\`tsx
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
\`\`\`

---

### 运行时主题 vs 构建主题

| | 运行时（源码） | 构建 |
|---|---|---|
| 导入 | \`@astryxdesign/theme-{name}\` | \`/built\` + \`/theme.css\` |
| 工作原理 | useInsertionEffect 注入 \`<style>\` | 预编译 CSS 文件 |
| 组件覆盖 | 仅在客户端注入 | 在静态 CSS 中，SSR 时即存在 |
| SSR 安全 | 令牌是，组件覆盖会在水合时闪烁 | 完全 SSR 安全 |
| 适用场景 | 开发、原型、客户端 SPA | 生产、SSR 应用 |

在生产环境中，为了消除客户端 JS 计算和 CSS 动态注入带来的抖动，推荐用 CLI 预先编译本地主题：

\`\`\`bash
npx astryx theme build ./src/themes/my-brand-theme.ts
\`\`\`

这会生成 \`.css\`（所有 CSS 变量预编译文件）、\`.js\`（主题对象）、\`.d.ts\`（类型声明）以及 \`.variants.d.ts\`（自定义变体类型增强）。

---

### Theme Props

| Prop | 类型 | 默认 | 说明 |
|---|---|---|---|
| theme | DefinedTheme | — | 主题对象（必需） |
| mode | 'system' \\| 'light' \\| 'dark' | 'system' | 色彩模式 |
| children | ReactNode | — | 应用内容 |

完整 props 可运行 \`astryx component Theme\` 查看。
`,
  },
  cli: {
    title: "CLI 工具",
    description: "组件发现、文档查阅、主题管理、模板脚手架与健康体检的统一命令行入口。",
    markdown: `### 安装

CLI 推荐作为项目的开发依赖安装，同时建议全局安装一份：

\`\`\`bash
npm install -D @astryxdesign/cli
npm install -g @astryxdesign/cli
\`\`\`

全局安装后，\`astryx\` 在任何文件夹中都能使用，对你和所有编程智能体都可用；在项目内，项目自己的版本仍会响应，因此全局安装不会改变团队与 CI 得到的结果。项目安装、全局安装还是两者都装？运行 \`astryx docs global/project-global-or-both\` 查看对比（推荐两者都装）。

如果尚未在项目中安装，请使用带 scope 的一次性调用；不要直接 \`npx astryx\`，因为未安装时该名字会解析到另一个无关的 npm 包：

\`\`\`bash
npx @astryxdesign/cli --help
npx @astryxdesign/cli component Button
\`\`\`

为了确保在多人协作或 CI 环境下命令调用稳定，推荐在 \`package.json\` 的 \`scripts\` 中进行包装：

\`\`\`json
"scripts": {
  "astryx": "node node_modules/@astryxdesign/cli/clients/cli/bin/astryx.mjs"
}
\`\`\`

---

### 常用命令

| 命令 | 说明 |
|---|---|
| \`astryx init\` | 初始化设计系统；非交互式，生成智能体文档 |
| \`astryx build "<idea>"\` | 从最接近的模板开始构建页面，并给出所需区块与组件 |
| \`astryx component\` | 列出组件，或打印组件详细文档 |
| \`astryx search <query>\` | 跨组件、钩子、文档、模板与主题统一搜索 |
| \`astryx docs <topic>\` | 打印参考文档；\`astryx docs\` 列出全部主题 |
| \`astryx template\` | 列出、查看或注入页面与区块模板 |
| \`astryx hook\` | 列出钩子或打印钩子文档 |
| \`astryx theme\` | 添加、切换、移除、构建与创作主题 |
| \`astryx swizzle <Name>\` | 把组件源码复制进项目，接管完整定制权 |
| \`astryx upgrade\` | 升级 Astryx 后迁移代码，并刷新 ShadCN 复制组件 |
| \`astryx discover\` | 浏览与搜索集成：已安装的和可以添加的 |
| \`astryx doctor\` | 诊断 Astryx 项目与集成包 |
| \`astryx manifest --json\` | 输出完整能力清单：命令、参数、标志与响应类型 |

\`astryx <command> --help\` 查看单个命令的参数；\`astryx docs cli\` 逐层浏览 CLI 自己的文档树，例如 \`astryx docs cli/commands\` 或 \`astryx docs cli/api/functions/search\`。

---

### 输出模式

- \`--detail brief\`：每个小节一行摘要。
- \`--detail compact\`：紧凑输出。
- \`--dense\`：在文档提供 dense 版本时切换为更短的文本。
- \`--json\`：机器可读的类型化 envelope。
- \`--zh\`：输出简体中文文档。

\`\`\`bash
astryx component Dialog --detail compact
astryx docs styling --full --detail brief
astryx docs principles --dense
astryx component Button --json
\`\`\`

---

### Swizzle 弹出接管

Astryx 反对“API 枷锁”。当组件原生 props 已无法支持你的业务细节时，可以运行 \`swizzle\`：

\`\`\`bash
astryx swizzle Button
\`\`\`

这会把 Button 的完整 TSX 实现与样式复制到你的本地目录。从此刻起，这个组件完全属于你，你拥有 100% 的自定义修改权。

---

### Doctor 诊断

\`\`\`bash
astryx doctor
\`\`\`

运行一系列健康检查并报告 PASS/WARN/FAIL。它只读，不会安装或修改任何内容。检查项包括 Node.js 版本、\`@astryxdesign/core\` 是否安装、版本对齐、主题包、AI 智能体文档与 peer dependencies。
`,
  },
  assets: {
    title: "图标与插图",
    description: "内置语义图标、主题级图标替换与变体机制，以及空状态插图的布局规范。",
    markdown: `### 内置语义图标清单

为了降低资源打包大小，系统默认提供并注册了一套高频交互的语义化图标名称：

| 图标名称 | 推荐用途 |
|---|---|
| \`close\` | 弹窗、信息提示的关闭动作 |
| \`chevronDown\` / \`chevronUp\` | 下拉菜单展示、折叠切换 |
| \`chevronLeft\` / \`chevronRight\` | 返回 / 前进、上一步 / 下一步 |
| \`chevronsLeft\` / \`chevronsRight\` | 跳到开头 / 跳到末尾 |
| \`check\` | 表单选项选中状态、校验成功状态 |
| \`success\` / \`error\` / \`warning\` / \`info\` | 状态指示器 |
| \`search\` | 顶部全局搜索、输入框内置搜索镜 |
| \`copy\` | 一键复制数据到剪切板 |
| \`upload\` | 上传文件或内容 |
| \`moreHorizontal\` / \`menu\` | 更多操作、汉堡菜单与导航切换 |
| \`calendar\` / \`clock\` | 日期与时间选择 |
| \`externalLink\` | 在新标签页打开的链接 |
| \`eyeSlash\` | 隐藏 / 可见性切换 |
| \`microphone\` | 语音输入、录音 |

#### 使用自定义图标

如果你希望使用外部的 SVG 组件（例如 Heroicons 或 Lucide）：

\`\`\`tsx
import { PhotoIcon } from '@heroicons/react/24/outline';
import { Icon } from '@astryxdesign/core/Icon';

<Icon icon={PhotoIcon} size="lg" />
\`\`\`

注意 \`Icon\` 的颜色 prop 使用语义状态名，例如 \`color="error"\`（旧版 \`negative\` 已不再推荐）。

---

### 主题级图标替换

主题可以通过 \`defineTheme()\` 的 \`icons\` 字段替换任意语义图标的默认 SVG。这样可以在不改组件代码的情况下整体更换图标集（例如 Heroicons → Lucide），并且查找作用域限定在当前主题，而不是修改全局默认值：

\`\`\`tsx
import {defineTheme} from '@astryxdesign/core/theme';
import {XMarkIcon, ChevronDownIcon} from '@heroicons/react/24/outline';

export const brandTheme = defineTheme({
  name: 'brand',
  icons: {
    close: <XMarkIcon />,
    chevronDown: <ChevronDownIcon />,
  },
});
\`\`\`

条目也可以是接收请求的函数，把 \`Icon\` 的尺寸映射到图标库自己的 props 或素材。\`Icon\` 会以 \`{size, variant}\` 调用它，其中 \`size\` 是实际渲染尺寸（\`xsm\`、\`sm\`、\`md\` 或 \`lg\`）：

\`\`\`tsx
export const brandTheme = defineTheme({
  name: 'brand',
  icons: {
    info: ({size}) => <Info strokeWidth={size === 'sm' || size === 'xsm' ? 2.5 : 2} />,
  },
});
\`\`\`

函数必须保持纯粹且同步：只根据请求计算结果，不使用 hooks、DOM/SVG 测量、浏览器全局对象、网络访问、可变模块状态或副作用。返回 \`null\` 表示不绘制图标，而不是回退到已注册或内置图标。

---

### 图标变体

主题用 \`defineTheme()\` 的 \`iconVariants\` 一次性声明它支持的变体名称。列表属于整个主题，而不属于单个图标；Astryx 自身不定义任何变体名称：

\`\`\`tsx
export const brandTheme = defineTheme({
  name: 'brand',
  iconVariants: ['outline', 'filled'],
  icons: {
    info: ({size, variant}) =>
      variant === 'filled' ? <InfoFilledIcon /> : <InfoIcon bold={size === 'sm'} />,
  },
});
\`\`\`

通过 \`Icon\` 的 \`variant\` prop 请求变体。只有当前主题列出了该名称时，条目才会收到它；否则条目收到 \`undefined\` 并绘制普通素材。通过 \`extends\` 继承的主题会继承变体列表，除非它设置自己的列表（设置后替换而非合并）。

\`\`\`tsx
<Icon icon="info" variant="filled" />  // 使用 filled 素材
<Icon icon="info" />                    // 普通素材
\`\`\`

---

### 插图使用设计规范

- **空状态优先使用 \`EmptyState\`**：把插图传给 \`EmptyState\` 的 \`icon\` 插槽，它会把插图居中放在标题与描述上方。
- **亮暗模式适配**：插图应设计为在浅色背景和深色背景下都有很好的视觉对比。
- **标准大小预算**：典型插图尺寸从内联空状态的 120px 到整页引导的 240px，始终配合标题与说明文本。

\`\`\`tsx
<EmptyState
  icon={<img src="/illustrations/empty-search.svg" alt="" width={200} height={200} />}
  title="No results found"
  description="Try adjusting your search or filters."
/>
\`\`\`
`,
  },
  migration: {
    title: "迁移指南",
    description: "详尽且低风险的存量项目迁移步骤，先建立级联层与主题底座，再逐面替换。",
    markdown: `### 推荐的渐进式迁移步骤

迁移是一个循序渐进的过程，不要把迁移当成全局类名替换。先把应用放进 Theme 与 AppShell，然后一次迁移一个路由或表面，同时保留现有数据、路由与业务逻辑。Tailwind 可以在迁移期间共存，用于旧版包裹层与局部布局。

1. **安装与基础注入**
   安装包并运行 \`astryx init\` 生成智能体文档，然后引入 \`reset.css\`、\`astryx.css\` 与主题 CSS。
2. **外壳先行**
   用 \`Theme\` 包裹应用根节点，并确定初始的亮色、暗色或跟随系统行为。
3. **先理顺级联层**
   在替换组件之前，显式声明 Tailwind 与设计系统 CSS 的层顺序，并审计已有的 reset。
4. **基础冒烟测试**
   渲染一个基础冒烟测试页面，确认原语组件保留了正确的 padding，再开始迁移任何表面。
5. **迁移持久框架**
   先替换 AppShell、TopNav、SideNav、页面内容与移动端导航。
6. **替换共享原语**
   Button、IconButton、TextInput、NumberInput、Switch、CheckboxInput、RadioList、Selector、TabList、Dialog、AlertDialog、Banner、Toast、Badge、Card、Table、ListItem。
7. **替换全局工作流**
   命令面板、设置弹出层、主题切换、搜索、筛选、创建流程与破坏性确认对话框。
8. **清理与验证**
   删除已完成表面下的旧版 Tailwind 类名，只保留基于令牌的布局工具类或仍需迁移的局部包裹层。然后在进入下一个路由前验证亮暗模式、键盘导航、响应式布局以及空/错误/加载状态。

---

### 级联层顺序

\`\`\`css
@layer reset, theme, base, astryx-base, astryx-theme, components, utilities;

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "@astryxdesign/core/reset.css";
@import "@astryxdesign/core/astryx.css";
@import "@astryxdesign/theme-neutral/theme.css";
@import "@astryxdesign/core/tailwind-theme.css";
@import "tailwindcss/utilities.css" layer(utilities);
\`\`\`

未分层的样式和更晚的层都会覆盖 \`astryx-base\`，与选择器优先级无关；务必把每个样式表放进明确的层中。

---

### CLI 工作流

\`\`\`bash
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
\`\`\`

需要粘贴给 AI 的简短版本时，使用 \`--full --detail brief\`；构建自动化迁移报告时使用 \`--json\`。

---

### 原语组件映射参考

| 原有组件或 HTML 元素 | 推荐替换的 Astryx 原语 |
|---|---|
| \`<button>\` 或 \`shadcn Button\` | \`Button\` 或 \`IconButton\` |
| \`<input type="text">\` | \`TextInput\` |
| \`<textarea>\` | \`TextArea\` |
| \`<select>\` / \`combobox\` | \`Selector\` 或 \`Typeahead\` |
| \`<input type="checkbox">\` | \`CheckboxInput\` 或 \`CheckboxList\` |
| \`<input type="radio">\` | \`RadioList\` |
| \`Radix Tabs\` 或 \`shadcn Tabs\` | \`TabList\` |
| \`shadcn Command\` | \`CommandPalette\` |
| \`shadcn Dialog\` | \`Dialog\` 或 \`AlertDialog\` |
| \`shadcn Dropdown\` | \`DropdownMenu\` 或 \`MoreMenu\` |
| \`alert\` / \`callout\` | \`Banner\` 或 \`Toast\` |
| 卡片式列表行 | \`ListItem\` |

---

### 验证清单

- 在亮暗模式下检查所有表面、边框、文本、图标、悬停状态、焦点环和状态色。
- 从外壳打开命令面板，输入内容，用键盘选择，确认焦点返回触发器。
- 检查 SideNav 在折叠、展开、激活、悬停、嵌套和移动状态。
- 验证设置弹出层和对话框。
- 搜索遗留的硬编码 Tailwind 颜色与任意十六进制值。
`,
  },
  "ai-co-working": {
    title: "与 AI 协同工作",
    description: "说明 Astryx 针对 AI 助手所做的底层优化，以及如何引导 AI 一次性写出正确的 UI 代码。",
    markdown: `### 为人机协同而生

Astryx 的所有 API 命名遵循高度一致的约定，CLI 会把结构化文档直接送入 AI 的上下文窗口。\`init --features agents\` 会生成 AI 所需的全部内容——组件索引、行为规则、CLI 参考，以及来自已配置集成的包指引——并且全部来自当前安装的项目版本：

\`\`\`text
Install @astryxdesign/cli and run \`astryx init --features agents\` to set up your Astryx context. Read the generated file.
\`\`\`

默认写入项目根目录的 \`AGENTS.md\`（大多数智能体都读取的通用标准）。Claude Code 在项目存在 \`CLAUDE.md\` 或 \`.claude/CLAUDE.md\` 时会跳过 \`AGENTS.md\`，因此 init 也会同时写入该文件；Gemini CLI 只读取 \`GEMINI.md\`，init 会在其中添加一行对 \`AGENTS.md\` 的导入。依赖升级后运行 \`astryx upgrade --from <旧版本>\` 会报告过期的 Astryx 块，加上 \`--apply\` 即可刷新。

如需针对特定工具的文件：

\`\`\`bash
astryx init --features agents --agent claude    # CLAUDE.md（若存在），否则 .claude/CLAUDE.md
astryx init --features agents --agent cursor    # .cursorrules（若存在），否则 AGENTS.md
astryx init --features agents --agent codex     # AGENTS.md（Copilot、Codex 等）
astryx init --features agents --agent hermes    # .hermes.md 或 HERMES.md（若存在），否则 AGENTS.md
astryx init --features agents --agent muse      # AGENTS.md（Muse）
astryx init --features agents --agent all       # 现有全部 agent 文件（GEMINI.md 除外），否则 AGENTS.md 与 .claude/CLAUDE.md
\`\`\`

对于不属于任何单个项目的智能体，全局安装会保留一份简短的 Astryx skill：\`~/.agents/skills/astryx/SKILL.md\`，并链接到各智能体工具读取的 skill 文件夹，例如 \`~/.claude/skills/astryx\`。它会告诉智能体 Astryx 存在以及何时使用；\`astryx init --user\` 可立即写入，\`--remove-agents\` 可关闭。项目内，智能体遵循项目自己的 agent 文档。

---

### 教导 AI 遵循的三步开发法

在让 AI 帮您修改或生成任何前端代码前，先让它阅读生成的约束，并按照以下工作流行动：

1. **找到起点**：运行 \`astryx build "<idea>"\`，获得最接近的页面模板（始终有一个：最接近的模板或 app shell）、另外两个模板，以及缺失部分所需的区块与组件。
2. **搭建骨架**：运行 \`astryx template <name> <path>\` 把模板脚手架进项目，保留其框架与间距，再替换内容。
3. **查阅组件**：运行 \`astryx component <Name>\` 读取所用每个组件的 props 与示例。

生成的文档还包含防止常见错误的规则（每个页面都从模板开始、不要裸 div、不要 \`style={{}}\`、使用令牌而不是魔法值）、CLI 速查，以及带有包标签的集成指引。设置完成后，你通常不需要再手动纠正 AI 的这些约定。

---

### 验证 AI 设置

在让 AI 写任何 Astryx 代码前，先让它自检：

\`\`\`text
Before writing any Astryx code, check your knowledge:

1. What is the correct import path for Button?
2. How do you make a Dialog non-dismissible?
3. What prop does Selector use for its items?

If you don't know all three, run \`astryx init --features agents\` to generate agent docs, then read the generated file.
\`\`\`

---

### 更短的输出：--detail 与 --dense

在把 CLI 输出粘贴进 ChatGPT 或 Claude 等网页版 AI 工具时，使用更短的读取方式：

- \`--detail brief\`：每个小节一行。
- \`--detail compact\`：紧凑输出。
- \`--dense\`：在文档提供 dense 版本时使用更短文本。

\`\`\`bash
astryx docs styling --full --detail brief
astryx component Dialog --detail compact
astryx docs principles --dense
\`\`\`

---

### MCP 服务器

Astryx 提供 Model Context Protocol (MCP) 服务器。把以下内容加入 MCP 配置（Claude Code 的 \`.mcp.json\` 示例）：

\`\`\`json
{
  "mcpServers": {
    "astryx": {
      "type": "http",
      "url": "https://astryx.atmeta.com/mcp"
    }
  }
}
\`\`\`

Claude Code 也可以从终端写入该条目：

\`\`\`bash
claude mcp add --transport http astryx https://astryx.atmeta.com/mcp
\`\`\`

服务器暴露两个工具：\`search(query)\` 用于发现组件、文档主题和模板；\`get(name)\` 用于获取包含 props、用法和示例的完整文档。
`,
  },
};
