<!-- TOC -->

- [Next.js 全部盛りリポジトリ](#nextjs-全部盛りリポジトリ)
- [SSR と CSR について](#ssr-と-csr-について)
  - [解説](#解説)
  - [参考](#参考)
- [getServerSideProps と API handler](#getserversideprops-と-api-handler)
- [test 実行コマンド](#test-実行コマンド)
- [OpenAPI Generator typescript-fetch 導入](#openapi-generator-typescript-fetch-導入)
  - [参考記事](#参考記事)
  - [コマンド](#コマンド)
- [エラー](#エラー)
  - [filedownload のテストコードを書くとき Error: Not implemented: navigation になる](#filedownload-のテストコードを書くとき-error-not-implemented-navigation-になる)
  - [expect(jest.fn()).toHaveBeenCalled()となり、mock が呼ばれずテストが失敗する](#expectjestfntohavebeencalledとなりmock-が呼ばれずテストが失敗する)
  - ['render()' によって返された型は、これらの型同士で互換性がありません。](#render-によって返された型はこれらの型同士で互換性がありません)
- [storybook](#storybook)
  - [起動コマンド](#起動コマンド)
  - [構築コマンド](#構築コマンド)
  - [公式チュートリアル](#公式チュートリアル)
  - ['ComponentStoryFn' は非推奨です。ts(6385)](#componentstoryfn-は非推奨ですts6385)
  - [...Default.args.task が undefined の可能性を推論されエラーになる](#defaultargstask-が-undefined-の可能性を推論されエラーになる)
  - [Error: It looks like you are having a known issue with package hoisting.](#error-it-looks-like-you-are-having-a-known-issue-with-package-hoisting)

<!-- /TOC -->

# Next.js 全部盛りリポジトリ

Next.js のなんでも検証用リポジトリ

- 個人用ツール
- ライブラリの動作確認
- 実装試しうち
- 設計(必要ならブランチごとにかえる、その場合別ブランチは継続運用するというより単一の変更を試すために使う。色々合わせた確認がしたいならそれ用に作る)
- 試したソースコードなどにコメントや、ドキュメントを細かくつけて再利用可能にする

# SSR と CSR について

## 解説

![picture 2](images/659787ee4a767393d85aeb376ec3501bf4a214ff73f3f03e94a0730858c5aa7c.png)

## 参考

- [Server Side Rendering の動作を確認する（Next.js&TypeScript 体験シリーズ）](https://www.youtube.com/watch?v=zYebf1dk6P0)
- [tsuyopon-xyz/learn-ts-with-nextjs CSR、SSR の解説用に作成したコード](https://github.com/tsuyopon-xyz/learn-ts-with-nextjs/pull/1/files)
- [注目のフロントエンドフレームワーク Next.js は何ができるか、ご紹介します！！](https://www.youtube.com/watch?v=DdfB0LWXuGI)

# getServerSideProps と API handler

![picture 3](images/0c2942e6849b388b7ae05f8633fd530b52e80349e107875967eabd070cf2a6f4.png)

# test 実行コマンド

```bash
# tsconfig.jsonが"jsx": "react"でないとエラーになるので、tsconfig.test.jsonで対応
yarn test

# jest --clearCacheでキャッシュ削除
yarn test:clear-cache

# カバレッジレポートを見たい場合はこうする
yarn test -- --coverage

# package.jsonで設定したカバレッジレポート出力
yarn test:coverage
```

# OpenAPI Generator typescript-fetch 導入

## 参考記事

[https://zenn.dev/erukiti/articles/openapi-generator-typescript-fetch](https://zenn.dev/erukiti/articles/openapi-generator-typescript-fetch)

## コマンド

```bash
yarn add -D @openapitools/openapi-generator-cli
npm install @openapitools/openapi-generator-cli -g
openapi-generator-cli generate -g typescript-fetch -i openapi/typescript-fetch.yaml  -o openapi/client --additional-properties=modelPropertyNaming=camelCase,supportsES6=true,withInterfaces=true,typescriptThreePlus=true
```

# エラー

## filedownload のテストコードを書くとき Error: Not implemented: navigation になる

createElement で作る a タグのイベント click で window.location.href 　が実行されておきるエラー。
直接 window.location を mock しても意味がない。

```ts
global.URL.createObjectURL = jest.fn()
HTMLAnchorElement.prototype.click = jest.fn()
```

- https://qiita.com/shiho_hoshino/items/f109362314756a556922
- https://www.appsloveworld.com/reactjs/100/32/jest-error-not-implemented-navigation-except-hash-changes-when-click-event-i

## expect(jest.fn()).toHaveBeenCalled()となり、mock が呼ばれずテストが失敗する

コンポーネントの外で、mock したい関数が定義されていたことが原因。
以下のような状況だった。ライフサイクル系の問題だと思われるので、その他不明なエラーが起きたときは、
雑に一旦コンポーネント外で記述したりして放置していないか確認する。
React の思想に反するので。

```ts
await waitFor(() => {
  // こっちは成功する
  expect(DefaultApi).toHaveBeenCalled()

  // こっちはエラー
  expect(mockFilesFilenameDownloadGet).toHaveBeenCalled()
})
```

## 'render()' によって返された型は、これらの型同士で互換性がありません。

`'render()' によって返された型は、これらの型同士で互換性がありません。 型 'React.ReactNode' を型 'import("/Users/username/Desktop/products/next-various/node_modules/@types/react-dom/node_modules/@types/react/index").ReactNode' に割り当てることはできません。 型 '{}' を型 'ReactNode' に割り当てることはできません。ts(2786)`

```bash
# 以下で依存関係を解決すると解消
yarn add @types/react
yarn add @types/react-dom
```

# storybook

## 起動コマンド

```bash
yarn storybook
```

## 構築コマンド

```bash
npx sb init
```

## 公式チュートリアル

[React 向け Storybook のチュートリアル](https://storybook.js.org/tutorials/intro-to-storybook/react/ja/get-started/)

## 'ComponentStoryFn' は非推奨です。ts(6385)

StoryFn を使えば良い

[参考](https://qiita.com/KokiSakano/items/a6e291b6292f025bd037)

## ...Default.args.task が undefined の可能性を推論されエラーになる

as で型を指定する

## Error: It looks like you are having a known issue with package hoisting.

```bash
# npx sb init したときに表示

Running Storybook
yarn run v1.22.19
$ storybook dev -p 6006 --initial-path=/onboarding --quiet
🔴 Error: It looks like you are having a known issue with package hoisting.
Please check the following issue for details and solutions: https://github.com/storybookjs/storybook/issues/22431#issuecomment-1630086092
```

```bash
# 以下で解消
# 依存関係を再インストール
rm -rf node_modules yarn.lock && yarn install
```
