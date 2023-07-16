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
yarn jest

# OpenAPI Generator typescript-fetch 導入

## 参考記事

[https://zenn.dev/erukiti/articles/openapi-generator-typescript-fetch](https://zenn.dev/erukiti/articles/openapi-generator-typescript-fetch)

## コマンド

```bash
yarn add -D @openapitools/openapi-generator-cli
npm install @openapitools/openapi-generator-cli -g
openapi-generator-cli generate -g typescript-fetch -i openapi/typescript-fetch.yaml  -o openapi/client --additional-properties=modelPropertyNaming=camelCase,supportsES6=true,withInterfaces=true,typescriptThreePlus=true
```
