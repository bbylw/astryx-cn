<!-- SYNC CONTRACT: 架构变更需要同步更新文档。 -->

# Astryx

一个开源设计系统，完全可定制，为当下的构建方式而生——由人与并肩工作的智能体共同打造。

> **目前处于 Beta 阶段** · 基于 [React](https://react.dev) 和 [StyleX](https://stylexjs.com) 构建

## 概述

Astryx 是一个在 Meta 内部成长了八年的开源设计系统，如今已成为公司中使用最广泛、规模最大的设计系统——支撑着 13,000 多个应用，由每天依赖它的工程师、设计师和产品团队共同塑造。

它提供 150 多个可访问组件、品牌级主题、深色模式、开箱即用的模板以及 CLI，构成一个统一的系统。你只需导入预构建的 CSS 并使用带类型的 React 组件——无需构建插件、无需引入额外的样式库——无论是人还是 AI 助手，都使用相同的工具进行开发。

**Astryx 的不同之处：**

- **开放内部结构。** 组件可在任意层级组合，不会被封闭的顶层 API 锁定。你需要的构建块直接导出；当需要更深入定制时，swizzle 可将组件完整源码弹出到你的项目中，完全由你掌控。
- **无样式锁定。** Astryx 使用 StyleX 编写样式，但对使用者完全透明。你可以使用 Tailwind、CSS 模块或普通 CSS 通过 `className` 覆盖——随你项目已有的方案即可。
- **无需封装即可定制。** 主题是一组 CSS 自定义属性覆盖，因此设计师无需分叉代码或包装组件源码，就能让 Astryx 打上鲜明的品牌烙印。
- **为人与智能体共建而生。** API、文档与 CLI 统一设计，让人与 AI 助手以相同方式、参考同一份文档进行开发。

## 快速开始

安装 Astryx 及一个主题：

```bash
# npm
npm install @astryxdesign/core @astryxdesign/theme-neutral
npm install -D @astryxdesign/cli

# pnpm
pnpm add @astryxdesign/core @astryxdesign/theme-neutral
pnpm add -D @astryxdesign/cli

# yarn
yarn add @astryxdesign/core @astryxdesign/theme-neutral
yarn add -D @astryxdesign/cli
```

最简单的配置只需引入几行 CSS 并添加主题提供器——无需构建插件、无需 PostCSS 或 Babel 配置。完整指南（Next.js、Tailwind、Vite 与 CDN）请参见 **[@astryxdesign/core README](https://github.com/facebook/astryx/blob/main/packages/core/README.md#quick-start)**。

为了稳定调用 CLI，请在 `package.json` 中添加脚本：

```json
"scripts": {
  "astryx": "node node_modules/@astryxdesign/cli/bin/astryx.mjs"
}
```

然后使用 `npm run astryx -- component --list`。这样可以避免 AI 助手或新开发者直接调用 CLI 时出现路径错误。

## 包

| 包                                                                                      | 描述                                                                                     | README                                                                          |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [`@astryxdesign/core`](https://github.com/facebook/astryx/blob/main/packages/core)      | 组件、主题系统与工具函数                                                                 | [README](https://github.com/facebook/astryx/blob/main/packages/core/README.md)  |
| [`@astryxdesign/cli`](https://github.com/facebook/astryx/blob/main/packages/cli)        | CLI 工具：组件文档、模板、脚手架、主题与代码迁移                                         | [README](https://github.com/facebook/astryx/blob/main/packages/cli/README.md)   |
| [`@astryxdesign/build`](https://github.com/facebook/astryx/blob/main/packages/build)    | StyleX 源码构建插件                                                                      | [README](https://github.com/facebook/astryx/blob/main/packages/build/README.md) |
| [`@astryxdesign/theme-*`](https://github.com/facebook/astryx/blob/main/packages/themes) | 七种开箱即用、完全可定制的主题（neutral、butter、chocolate、matcha、stone、gothic、y2k） | [README](https://github.com/facebook/astryx/blob/main/packages/themes)          |

> `@astryxdesign/lab`（实验性组件）与 `@astryxdesign/vega`（Vega/Vega-Lite 图表封装）目前仅内部用于 Storybook 与沙盒环境，尚未发布到 npm。

## 原则

这些是 Astryx 对使用者的承诺。

- **引导而非强制。** 组件赋予你能力，而不是与你对抗的护栏。设计意见存在于文档与示例中——只要你传入值，组件就会渲染它。
- **强约定、详文档。** 每个组件遵循相同的命名、props 与组合规则，并且都有详尽文档——一旦熟悉了几个，其余的也会感到似曾相识，人与 AI 都能预测陌生组件的行为。
- **人与 AI 共享同一系统。** API、约定、文档与 CLI 统一设计，让人与 AI 助手以相同方式构建。每一个让 Astryx 对 AI 更友好的改动，也让人用起来更顺手。
- **以测量赢得信任。** 我们测试约定而非空口断言，对结果保持开放，并在新情况证明其有误时重新审视。

## 架构

### 基础

构建视觉上统一且可访问界面的基石：排版、颜色、布局与可访问性。

### 组件

150 多个可复用 UI 构建块，完整支持 TypeScript。

### 模式

经实战检验的常见交互与工作流设计解决方案：表格页面、详情页布局、表单向导、导航模式、数据录入流程。

## 项目结构

| 目录        | 用途                                       |
| ----------- | ------------------------------------------ |
| `apps/`     | 示例应用、文档站与 Storybook               |
| `packages/` | 已发布包：core、cli、build、themes         |
| `internal/` | 内部工具：测试工具、ESLint 插件、vibe 测试 |

## 贡献

我们欢迎贡献！完整指南请参见 **[CONTRIBUTING.md](https://github.com/facebook/astryx/blob/main/CONTRIBUTING.md)**。

贡献者快速开始：本仓库通过 [Corepack](https://nodejs.org/api/corepack.html) 使用 **pnpm 10**。启用一次后，正确的 pnpm 版本会自动安装：

```bash
corepack enable
pnpm install
```

## 许可

MIT
