# NgBasicsite

這個專案用來展示 Angular 與 IdentityServer4 整合的功能展示。

## 如何開發專案

1. 安裝 [Node.js](https://nodejs.org/)

2. 安裝 npm 套件

    ```bash
    npm install
    ```

3. 啟動開發伺服器

    ```bash
    npm start
    ```

4. 連到 `http://localhost:4200` 即可進行預覽與測試。

## 重要檔案說明

* `src\app\app-routing.module.ts`

  * 全域路由模組

* `src\environments\environment.prod.ts`

  * 開發環境的基本參數設定，用來設定 OAuth 2.0 與 OpenID Connect 相關參數。

* `src\environments\environment.prod.ts`

  * 正式環境的基本參數設定，用來設定 OAuth 2.0 與 OpenID Connect 相關參數。

* `src\polyfills.ts`

  * 用來設定 IE9, IE10, IE11 的 Polyfills 支援，需要的時候才進行調整。

* `src\typings.d.ts`

  * 如果有需要額外定義 TypeScript 模組定義檔設定時，才需要編輯這個檔案。

* `src\tsconfig.app.json`

  * 如果有需要額外載入 `@types/*` 模組定義檔時，才需要編輯這個檔案。
  * 記得安裝模組定義檔，範例：`npm install @types/jquery`
  * 記得設定 `compilerOptions.types` 底下的字串陣列 (一定要設定)。

## 如何發行專案

1. 品質檢查

    透過 [TSLint](https://palantir.github.io/tslint/) 進行檢查驗證。

    ```bash
    npm run lint
    ```

    ※ 如要對 TSLint 規則進行調整，可編輯 `tslint.json` 設定。

2. 建置專案

    ```bash
    npm run build -- --prod
    ```

3. 將 `dist/` 目錄下所有檔案進行部署即可。

## 如何執行測試

1. 執行 `npm run test`即可啟動 [Karma](https://karma-runner.github.io) 進行測試。

2. 執行 `npm run e2e` 即可啟動 [Protractor](http://www.protractortest.org/) 進行 E2E 測試。

## 相關連結

* 使用 `ng help` 可以查詢 `ng` 命令列工具使用說明，或可查看 [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md) 文件說明。
