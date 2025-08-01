# キャラクターなりきり対話メーカー (TTM)

Test-Time-Matching (TTM) 手法を使用したAIキャラクター対話アプリケーション

## 概要

このアプリケーションは、Google Gemini APIを使用して、入力されたテキストからキャラクターの性格や話し方を分析し、そのキャラクターになりきって対話を行うことができます。

## 必要要件

- Node.js (v18以上)
- pnpm (推奨) または npm
- Google Gemini API キー

## セットアップ

1. 依存関係のインストール:
   ```bash
   pnpm install
   # または
   npm install
   ```

2. 環境変数の設定:
   `.env.local` ファイルに `GEMINI_API_KEY` を設定してください
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. 開発サーバーの起動:
   ```bash
   pnpm dev
   # または
   npm run dev
   ```

## 開発コマンド

```bash
# 開発サーバーの起動
pnpm dev

# プロダクションビルド
pnpm build

# ビルドのプレビュー
pnpm preview

# ESLintでコード品質チェック
pnpm lint

# TypeScript型チェック
pnpm type-check

# テストの実行
pnpm test

# テストカバレッジの確認
pnpm test:coverage
```

## 技術スタック

- **React** 19.1.1 - UIフレームワーク
- **TypeScript** 5.8.2 - 型安全性
- **Vite** 6.2.0 - ビルドツール
- **Google Generative AI SDK** - AI対話生成
- **ESLint** - コード品質管理（strictモード、no-any有効）
- **Jest** + **React Testing Library** - テスト

## プロジェクト構成

```
├── components/          # Reactコンポーネント
│   ├── CharacterSetup.tsx
│   ├── ChatMessage.tsx
│   ├── ChatWindow.tsx
│   ├── LoadingSpinner.tsx
│   └── StepIndicator.tsx
├── services/           # ビジネスロジック
│   └── geminiService.ts
├── App.tsx            # メインアプリケーションコンポーネント
├── index.tsx          # エントリーポイント
├── types.ts           # TypeScript型定義
└── constants.ts       # 定数定義
```

## Test-Time-Matching (TTM) 手法

本アプリケーションは、以下の3ステップでキャラクター応答を生成します：

1. **キャラクター分析**: 入力テキストから性格特性を抽出
2. **コンテンツ生成**: キャラクターの性格に基づいたスタイルレスな応答を生成
3. **スタイル適用**: キャラクターの話し方スタイルを応答に適用

## Vercelへのデプロイ

1. GitHubリポジトリをVercelに接続
2. 環境変数の設定:
   - Vercelダッシュボード → Settings → Environment Variables
   - `GEMINI_API_KEY` を追加し、Google Gemini APIキーを設定
3. デプロイの実行

### 環境変数の設定

| 変数名 | 説明 | 必須 |
|--------|------|------|
| `GEMINI_API_KEY` | Google Gemini APIキー | ✅ |

## ライセンス

このプロジェクトはプライベートです。
