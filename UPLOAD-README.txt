GitHub Pagesアップロード用

このサイトは GitHub Pages の Jekyll 機能を利用し、SEO設定を別ファイルで管理します。
既存のデザイン・CSS・表示内容の設定方法はそのままです。

【重要】
_data フォルダを含め、ZIP内のフォルダ構成を保ったままGitHubへアップロードしてください。

主なファイル:
- index.html              : ページ本体（SEO値は _data/seo.yml から自動挿入）
- style.css               : デザイン
- school-config.js        : 教室名・本文・料金・画像・CTAなど
- app.js                  : 表示処理
- _data/seo.yml           : SEO設定値を一元管理
- _includes/seo.html       : SEOタグの出力テンプレート（通常は編集不要）
- _config.yml             : GitHub Pages / Jekyll設定
- robots.txt              : 検索エンジン向けクロール設定
- sitemap.xml             : サイトマップ

【SEO設定】
基本的に _data/seo.yml だけを編集します。
設定できる内容:
- title
- description
- canonical URL
- robots
- OGP
- X（Twitter）カード
- 構造化データ（初期状態では無効）

公開前に必ず変更する項目:
- _data/seo.yml の canonical_url
- schema を使う場合は schema 内の実在情報
- OGP画像を使う場合は og.image

【教室ごとの表示内容】
- school-config.js を編集
- note のURLは news.profileUrl / news.feedUrl を変更

【NEWS】
- GitHub Actionsは使いません。
- note RSSをRSS→JSON変換サービス経由でブラウザから取得し、最新記事を表示します。

【注意】
index.html の先頭にある --- から --- までの3行は削除しないでください。
GitHub Pages が _data/seo.yml を読み込んでSEO情報をHTMLへ埋め込むために必要です。
