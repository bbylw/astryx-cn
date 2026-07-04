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
Install @astryxdesign/core, @astryxdesign/theme-neutral, and @astryxdesign/cli in this project. Run \`npx astryx init\` to set up agent docs. Read the generated files to learn the conventions.
\`\`\`

---

### 手动安装

在你的 React + PostCSS/Tailwind 项目中添加核心依赖包、默认主题以及 CLI 工具：

\`\`\`bash
# npm
npm install @astryxdesign/core @astryxdesign/theme-neutral @astryxdesign/cli

# pnpm
pnpm add @astryxdesign/core @astryxdesign/theme-neutral @astryxdesign/cli

# yarn
yarn add @astryxdesign/core @astryxdesign/theme-neutral @astryxdesign/cli
\`\`\`

随后，运行交互式初始化向导。它会为您配置 AI 智能体文档、选择启动模板并设置主题方案：

\`\`\`bash
npx astryx init
\`\`\`

---

### 引入主题 CSS

在项目的全局 CSS 文件顶层引入重置样式和主题文件。Astryx 的所有设计令牌（颜色、间距、圆角等）都以标准 CSS 自定义属性 (CSS Variables) 的形式暴露：

\`\`\`css
@import '@astryxdesign/core/reset.css';
@import '@astryxdesign/core/astryx.css';
@import '@astryxdesign/theme-neutral/theme.css';
\`\`\`

#### 开箱即用的主题一览：
- **\`@astryxdesign/theme-neutral\`**: 柔和极简，适合作为项目起点。
- **\`@astryxdesign/theme-butter\`**: 金色奶油表面配蓝色强调色，搭配 Outfit 字体。
- **\`@astryxdesign/theme-chocolate\`**: 暖棕调与舒适米色，搭配 Fraunces + Albert Sans。
- **\`@astryxdesign/theme-gothic\`**: 仅深色模式，深蓝灰表面，冷酷现代哥特风。
- **\`@astryxdesign/theme-matcha\`**: 大地绿色主题，清新自然，搭配 Figtree 字体。
- **\`@astryxdesign/theme-stone\`**: 暖石与石板色，搭配 Montserrat + Figtree。
- **\`@astryxdesign/theme-y2k\`**: 俏皮复古 Y2K 风格，长春花底色，全息强调色。

---

### 编写第一个组件

Astryx 组件按类别通过子路径导入，可保持打包体积小巧且代码意图清晰：

\`\`\`tsx
import { Button } from '@astryxdesign/core/Button';
import { VStack } from '@astryxdesign/core/Layout';

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

Astryx 组件与 [StyleX](https://stylexjs.com/) 深度集成。你可以直接使用 StyleX 来覆盖组件样式：

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

### 推荐实践规范

1. 尽可能使用组件。
2. 布局为先：先选定框架，再决定各区域的尺寸预算，最后编写具体内容。
3. 密集数据渲染为行（Table、List/Item），卡片仅用于自包含的仪表盘小部件和设置组。
4. 使用 StyleX 或 Tailwind CSS 进行自定义样式定制。
5. 始终使用语义令牌，不要写入硬编码的数值（例如 \`16px\` -> \`spacing-4\`）。
6. 颜色使用 CSS 自定义属性，避免写入 hex 十六进制值。
7. 表单输入框应始终为受控模式（value + onChange）。
8. 导航跳转应使用 \`useLinkComponent()\`，以便无缝接入框架级路由。

---

### 反模式对比 (Anti-patterns)

| 不要这样做 | 推荐这样做 |
|---|---|
| 在原生元素上使用 inline style | 使用 StyleX/Tailwind 覆盖或使用 Astryx 布局组件 |
| 硬编码颜色（例如 \`color: #ffffff\`） | 使用 \`var(--color-text-primary)\` 或 Tailwind \`text-primary\` |
| 硬编码间距（\`padding: 16px\`） | 使用 \`var(--spacing-4)\` 或 Tailwind \`p-4\` |
| 硬编码 \`<a>\` 标签 | 使用 \`useLinkComponent()\` 绑定框架 Link |
| 将每个列表项或页面小部分包裹在 \`Card\` 中 | 密集列表使用 \`ListItem\` 或 \`Table\` |
| 将 \`Badge\` 当作纯装饰 | 将 \`Badge\` 保留给计数和状态枚举 |
`,
  },
  layout: {
    title: "布局系统",
    description: "框架优先的布局策略，规定了如何合理预算屏幕尺寸、如何取舍卡片与行列表。",
    markdown: `### 框架优先

在编写任何页面内容前，首要决定的是**页面整体框架结构**。真实的应用都是自顶向下构建的：
1. **选择外壳 (Shell)**: 通常是 \`AppShell\` 配合导航条。
2. **划分命名区域**: 如 \`sideNav\`、\`header\`、\`content\`、\`panel\`。
3. **分配尺寸预算**: 为每个区域提供明确的宽度或高度。
4. **填充具体内容**。

#### 三区域工具框架示例：
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

### 响应式约定 (Responsive Conventions)

构建前，在代码根部注释中清晰声明断点行为：

\`\`\`tsx
// 响应式设计约定：
//   > 1024px  显示侧边栏(256px) + 内容 + 检查面板(380px)
//   <= 1024px 检查面板呈绝对定位覆盖层形式展现
//   <= 768px  侧边栏折叠为抽屉式 MobileNav，工具栏操作项自动换行
\`\`\`
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
import { Heading, Text } from '@astryxdesign/core';

// 页面级标题
<Heading level={1}>控制台首页</Heading>

// 大字号展示（例如 KPI 数据）
<Heading level={2} type="display-2">$1,234,567.89</Heading>

// 基础段落
<Text type="body">这是系统的基础正文文本排版风格。</Text>

// 辅助描述信息
<Text type="supporting">最后更新于 3 分钟前</Text>
\`\`\`
`,
  },
  colors: {
    title: "色彩系统",
    description: "高度抽象的语义化色彩机制，通过 CSS light-dark() 实现亮暗模式的完全自动适配。",
    markdown: `### 语义色彩哲学

Astryx 坚信颜色应由**功能决定**，而不是名称。例如不要使用 \`text-black\` 或 \`bg-white\`，而是使用 \`text-primary\` 或 \`bg-surface\`。

---

### 色彩分层结构 (Color Hierarchy)

#### 1. 表面层背景 (Backgrounds)
- **\`--color-background-body\`**: 页面整体底色 (亮模式: \`#F8F4ED\` | 暗模式: \`#111112\`)
- **\`--color-background-surface\`**: 基础面板底色 (亮模式: \`#FFFFFF\` | 暗模式: \`#1F1F22\`)
- **\`--color-background-popover\`**: 弹出层底色 (亮模式: \`#FFFFFF\` | 暗模式: \`#28292C\`)

#### 2. 文本前景色 (Foregrounds)
- **\`--color-text-primary\`**: 首要文本颜色 (亮模式: \`#15110C\` | 暗模式: \`#DFE2E5\`)
- **\`--color-text-secondary\`**: 次要说明文本 (亮模式: \`#4E606F\` | 暗模式: \`#AAAFB5\`)
- **\`--color-text-disabled\`**: 禁用状态文本 (亮模式: \`#A4B0BC\` | 暗模式: \`#6F747C\`)

#### 3. 状态色 (Status Colors)
- **\`--color-accent\`**: 品牌核心强调色 (默认等同于 \`text-primary\`)
- **\`--color-success\`**: 成功指示色 (\`#0D8626\`)
- **\`--color-error\`**: 错误指示色 (亮模式: \`#E3193B\` | 暗模式: \`#F5394F\`)
- **\`--color-warning\`**: 警告指示色 (亮模式: \`#E9AF08\` | 暗模式: \`#F2C00B\`)

---

### 数据可视化色彩 (Data Categorical)

提供 10 种高对比度的分类色彩，特别为图表和指标标识优化：

- 🔵 \`--color-data-categorical-blue\`: \`#0171E3\`
- 🟠 \`--color-data-categorical-orange\`: \`#EB6E00\`
- 🟣 \`--color-data-categorical-purple\`: \`#6B1EFD\`
- 🟢 \`--color-data-categorical-green\`: \`#0B991F\`
- 💗 \`--color-data-categorical-pink\`: \`#F351C0\`
`,
  },
  spacing: {
    title: "间距尺度",
    description: "基于 4px 基础网格系统，提供高度一致性的内外边距和网格间隔方案。",
    markdown: `### 间距尺度表

所有间距均以 4px 作为基础增量单位，确保设计具有天然的韵律感。

| 令牌名称 | 对应像素值 (px) | rem 尺寸 | 推荐使用场景 |
|---|---|---|---|
| \`--spacing-1\` | 4px | \`0.25rem\` | 细微对齐、极紧凑的子元素间隔 |
| \`--spacing-2\` | 8px | \`0.5rem\` | 按钮内文字与图标间距、列表项内距 |
| \`--spacing-3\` | 12px | \`0.75rem\` | 表单项上下间隔、卡片内边距(紧凑型) |
| \`--spacing-4\` | 16px | \`1.0rem\` | 标准卡片和区域的内边距、核心 Gap 默认值 |
| \`--spacing-6\` | 24px | \`1.5rem\` | 大板块分栏间隔、主要页面侧内距 |
| \`--spacing-8\` | 32px | \`2.0rem\` | 页面首尾留白、超大容器级 padding |
| \`--spacing-12\` | 48px | \`3.0rem\` | Hero 区域段落间距、大型版式区分 |

---

### 组件级 Gap 绑定

当使用 Layout 或 Stack 布局组件时，你只需传入步长数字即可自动绑定对应的 Spacing Token：

\`\`\`tsx
import { HStack } from '@astryxdesign/core/Layout';

// gap={4} 会自动映射并翻译为 --spacing-4 (16px) 的间距
<HStack gap={4}>
  <div>左侧元素</div>
  <div>右侧元素</div>
</HStack>
\`\`\`
`,
  },
  shapes: {
    title: "形状与圆角",
    description: "语义化圆角层级，并包含独特的自动同心圆角计算，使得多级嵌套容器美观得体。",
    markdown: `### 圆角语义尺度

圆角尺度不以具体大小（如 8px、12px）命名，而是以**所在 UI 的层级角色**来命名：

- **\`--radius-none\` (0px)**: 直角风格。
- **\`--radius-inner\` (8px)**: 嵌套在内部的子元素（如卡片内的按钮、列表项状态条）。
- **\`--radius-element\` (12px)**: 基础交互控件（Button、TextInput、Dropdown 触发器等）。
- **\`--radius-container\` (16px)**: 中层容器（卡片 Card、侧边面板 Panel、对话框 Dialog）。
- **\`--radius-page\` (32px)**: 页面级大容器。
- **\`--radius-full\` (9999px)**: 完全胶囊形（Badge 标签、Avatar 头像框等）。

---

### 同心圆角原理 (Nested Radius)

如果外部大容器与内部子元素圆角一样大，视觉上内部看起来就会非常拥挤不协调。
Astryx 组件（例如 Card）会自动计算同心圆角大小，其数学计算公式为：

$$\\text{innerRadius} = \\max(0, \\text{outerRadius} - \\text{padding})$$

这在 Astryx 的基础组件里是默认且完全自动化的，你无需手动计算或书写额外的 CSS 覆盖。
`,
  },
  shadows: {
    title: "阴影与高度",
    description: "多维空间高度层次，利用多层投影技术提供高品质的立体深度感。",
    markdown: `### 阴影三级尺度

利用多重阴影重叠，营造出柔和自然的悬浮效果：

#### 1. \`--shadow-low\` (低高度)
- 适合靠近页面的微悬浮层，例如卡片悬停状态。

#### 2. \`--shadow-med\` (中高度)
- 适合浮动组件，如下拉菜单、日期选择弹出面板。

#### 3. \`--shadow-high\` (高高度)
- 适合阻断式对话框（Dialog）或大浮层。

---

### 内阴影状态反馈 (Inset Shadows)

为了避免在聚焦和激活时产生像素级的页面抖动，Astryx使用内阴影来实现各类焦点的边框高亮：

- **\`--shadow-inset-selected\`**: 聚焦和被选择环，映射为半透明的 accent 色。
- **\`--shadow-inset-success\`**: 验证成功的绿色软边框。
- **\`--shadow-inset-warning\`**: 验证警告的黄色软边框。
- **\`--shadow-inset-error\`**: 校验报错的红色醒目内投影。
`,
  },
  motion: {
    title: "动效系统",
    description: "以提升用户认知为核心的动效框架，内置完善的时间节奏和缓动参数。",
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
| \`--duration-medium\` | 410ms | 面板推入、大对话框滑入 |
| \`--duration-slow\` | 975ms | 大范围的翻页、渐变背景转场 |

---

### 标准缓动曲线 (Easing)

推荐使用系统标准的**减速缓动**，能实现极其高级顺滑的视觉反馈：
- **\`--ease-standard\`**: \`cubic-bezier(0.24, 1, 0.4, 1)\`

---

### 响应减少运动 (Reduced Motion)

Astryx 自动适配操作系统的“减少运动”设置。对于有前庭神经敏感或追求极致效率的用户，动画会转为无延迟的渐显或直接呈现：

\`\`\`css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0s !important;
    transition-duration: 0s !important;
  }
}
\`\`\`
`,
  },
  styling: {
    title: "样式方案",
    description: "详述 Astryx 组件所支持的多样样式定制形式，包含 StyleX、Tailwind 和常规 CSS 接入指南。",
    markdown: `### 自定义样式三部曲

无论你的技术栈使用了哪种样式管理方案，Astryx 都提供了完美的透传支持。

#### 1. 首选方案: \`xstyle\` Prop (与 StyleX 深度整合)
通过 \`stylex.create()\` 编写原子化的 CSS-in-JS，不仅支持强类型约束，而且在打包时会提取为静态 CSS，性能最高。

\`\`\`tsx
import * as stylex from '@stylexjs/stylex';
import { Button } from '@astryxdesign/core/Button';

const styles = stylex.create({
  ctaButton: {
    paddingInline: 24,
    transform: {
      default: 'scale(1)',
      ':hover': 'scale(1.02)'
    }
  }
});

<Button label="立即体验" xstyle={styles.ctaButton} />
\`\`\`

---

#### 2. 现代首选: Tailwind CSS 工具类
如果你在项目里使用了 Tailwind CSS，可以直接通过标准的 \`className\` 传入：

\`\`\`tsx
<Button label="主操作" className="px-6 py-3 font-semibold shadow-lg hover:-translate-y-0.5 transition-all" />
\`\`\`

---

#### 3. 经典方式: 原生 \`style\` 与 HTML 属性
所有组件底层均采用“属性透传”机制，可以直接使用 \`style\`、\`data-*\`、\`aria-*\` 等原生属性。

\`\`\`tsx
<Card style={{ opacity: 0.9 }} data-testid="user-profile-card">
  内容
</Card>
\`\`\`
`,
  },
  interop: {
    title: "样式库互操作",
    description: "将 Astryx 作为全局设计系统设计令牌的唯一源，实现与 Emotion、MUI、Panda CSS 等生态的有机结合。",
    markdown: `### 核心共存原则

设计系统是**系统设计令牌的唯一真实来源**。所有主题的适配切换最终都会体现到 HTML 的 CSS 自定义属性上。

因此，其他第三方组件库或自定义样式系统应该**绑定并映射到 Astryx 暴露的全局 CSS 变量**。

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
`,
  },
  theme: {
    title: "主题系统",
    description: "完全自主的品牌定制系统，支持通过配置定义多主题、编译生成独立的 CSS 样式表。",
    markdown: `### 快速使用默认主题

\`\`\`tsx
import { Theme } from '@astryxdesign/core';
import { neutralTheme } from '@astryxdesign/theme-neutral';

export default function App() {
  return (
    <Theme theme={neutralTheme} mode="system">
      <YourAppContent />
    </Theme>
  );
}
\`\`\`

---

### 创建自定义主题

你可以直接使用 \`defineTheme\` API 来描述你的视觉系统：

\`\`\`tsx
import { defineTheme } from '@astryxdesign/core/theme';

const customizedTheme = defineTheme({
  name: 'my-brand-theme',
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
  }
});
\`\`\`

---

### 主题的编译构建 (Production Build)

在生产环境中，为了消除客户端 JS 计算和 CSS 动态注入带来的抖动 (Hydration Flash)，推荐使用 CLI 预先将主题文件编译为静态 CSS 文件：

\`\`\`bash
npx astryx theme build ./src/themes/my-brand-theme.ts
\`\`\`

这会生成：
- \`my-brand-theme.css\` (所有 CSS 变量预编译文件)
- \`my-brand-theme.js\` (组件需要的主题变量 JS 描述)
- \`my-brand-theme.d.ts\` (TS 类型声明)
`,
  },
  cli: {
    title: "CLI 工具",
    description: "功能强大的命令行工具，可协助组件发现、源码 Swizzle 弹出以及一键健康体检。",
    markdown: `### 安装

CLI 推荐作为项目的开发依赖安装：

\`\`\`bash
npm install -D @astryxdesign/cli
\`\`\`

为了确保在多人协作或 CI 环境下命令调用稳定，推荐在 \`package.json\` 的 \`scripts\` 中进行包装：

\`\`\`json
"scripts": {
  "astryx": "node node_modules/@astryxdesign/cli/bin/astryx.mjs"
}
\`\`\`

---

### 常用命令指令表

| 命令用法 | 说明作用 | 支持的标志 |
|---|---|---|
| \`npx astryx init\` | 交互式配置并初始化设计系统 | \`--agent\`, \`--yes\` |
| \`npx astryx component\` | 列出当前仓库支持的所有 React 组件 | \`--detail\`, \`--zh\` |
| \`npx astryx component Button\` | 打印 Button 组件的详细 API 属性和用法 | \`--dense\`, \`--zh\` |
| \`npx astryx docs tokens\` | 快速查阅 Spacing、Color 等常用设计令牌 | \`--dense\` |
| \`npx astryx swizzle Button\` | **重要特性**：将 Button 源码复制进你自己的项目，接管完全的定制控制权 | 无 |
| \`npx astryx doctor\` | 扫描项目依赖版本并诊断常见集成配置故障 | 无 |

---

### Swizzle 弹出接管

Astryx 坚决反对“API 枷锁”。当您发现组件原生的 props 已经完全无法支持你的业务细节时，可以运行 \`swizzle\`：

\`\`\`bash
npx astryx swizzle Button
\`\`\`

这会把 Button 组件的完整 TSX 实现代码和样式复制到你的本地目录。从此刻起，这个组件完全属于你，你拥有 100% 的自定义修改权。
`,
  },
  assets: {
    title: "图标与插图",
    description: "介绍系统内置的语义化图标清单以及插图使用的布局标准规范。",
    markdown: `### 内置语义图标清单

为了降低资源打包大小，系统默认提供并注册了一套高频交互的语义化图标名称：

| 图标名称 | 推荐用途 |
|---|---|
| \`close\` | 弹窗、信息提示的关闭动作 |
| \`chevronDown\` | 下拉菜单展示、折叠切换 |
| \`check\` | 表单选项选中状态、校验成功状态 |
| \`search\` | 顶部全局搜索、输入框内置搜索镜 |
| \`copy\` | 一键复制数据到剪切板 |
| \`warning\` / \`error\` | 表单报错提示、警告标语 |

#### 使用自定义图标:
如果你希望使用外部的 SVG（例如 Heroicons 或 Lucide-react）：

\`\`\`tsx
import { PhotoIcon } from '@heroicons/react/24/outline';
import { Icon } from '@astryxdesign/core/Icon';

<Icon icon={PhotoIcon} size="lg" />
\`\`\`

---

### 插图使用设计规范

- **亮暗模式适配**：插图应设计为在浅色背景和深色背景下都有很好的视觉对比。
- **居中排版结构**：通常插图需要在大容器内水平垂直居中展示，并在正下方提供 12-20px 间距的标题与说明文本。
- **标准大小预算**：插图大小应被严格约束在宽 120px - 240px 之间，避免喧宾夺主。
`,
  },
  migration: {
    title: "迁移指南",
    description: "详尽且低风险的存量项目迁移步骤，规避大拆大建造成的线上故障。",
    markdown: `### 推荐的渐进式迁移步骤

迁移是一个循序渐进的过程，不要尝试在一夜之间完成所有的类名替换。

1. **第一步：基础注入**
   安装设计系统，执行 \`init\` 生成文档约束，并引入基础的 \`theme.css\` 和重置 CSS。
2. **第二步：外壳先行**
   用 \`Theme\` 提供器包裹应用根节点，并首先将网站大框架（如 Header, SideNav, AppShell）替换为设计系统组件，打好布局底座。
3. **第三步：小原语渐进替换**
   替换页面中的按钮 (Button)、文本输入框 (TextInput)、开关 (Switch) 以及弹窗 (Dialog)。
4. **第四步：全局操作重构**
   替换命令面板、全局搜索、全局设置抽屉。
5. **第五步：清理冗余**
   删除已经完全被 Astryx 覆盖页面下的旧版 Tailwind/Sass 零碎类名。
6. **第六步：系统化体检**
   运行 \`npx astryx doctor\` 诊断。在不同设备（移动端/桌面端）及亮暗色模式下进行键盘导航与屏幕阅读器验证。

---

### 原语组件映射参考

| 原有组件或 HTML 元素 | 推荐替换的 Astryx 原语 |
|---|---|
| \`<button>\` 或 \`shadcn Button\` | \`Button\` 或 \`IconButton\` |
| \`<input type="text">\` | \`TextInput\` |
| \`<textarea>\` | \`TextArea\` |
| \`Radix Tabs\` 或 \`shadcn Tabs\` | \`TabList\` |
| \`shadcn Command\` | \`CommandPalette\` |
| \`shadcn Dialog\` | \`Dialog\` |
`,
  },
  "ai-co-working": {
    title: "与 AI 协同工作",
    description: "说明 Astryx 针对 AI 助手所做的底层优化，以及如何引导 AI 一次性写出正确的 UI 代码。",
    markdown: `### 为人机协同而生

Astryx 的所有 API 命名遵循高度的强约定，并且官方提供了可以专供 AI 智能体（如 Claude, Copilot）阅读的高效文档：

\`\`\`bash
# 生成专供 AI 读取的上下文配置文件
npx astryx init --features agents --agent claude    # 生成 CLAUDE.md
npx astryx init --features agents --agent cursor    # 生成 .cursorrules
npx astryx init --features agents --agent codex     # 生成 AGENTS.md
\`\`\`

---

### 教导 AI 遵循的三步开发法

在让 AI 帮您修改或生成任何前端代码前，可先让其阅读生成的约束，并让它按照以下工作流开始行动：

1. **发现模式**：让 AI 运行 \`npx astryx template --list\` 检索适合的模版。
2. **构建骨架**：运行 \`npx astryx template [name] --skeleton\` 搭建页面大体布局。
3. **查阅组件**：运行 \`npx astryx component [ComponentName]\` 读取具体组件所允许的所有 props 声明。

---

### 令牌高效的 \`--dense\` 标志

在 AI 助手的 Prompt 中或者让 AI 自行运行 CLI 时，加上 \`--dense\` 标志。这会让 CLI 输出极为紧凑、剔除自然语言废话的代码级参考清单，**可以节省超过 70% 的 Context 窗口 Token 消耗**：

\`\`\`bash
npx astryx component Dialog --dense
npx astryx docs styling --dense
npx astryx docs tokens --dense
\`\`\`
`,
  },
};
