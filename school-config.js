/**
 * ==============================================================
 * ピアノ教室ごとの変更は、基本的にこのファイルだけで完結します。
 * ==============================================================
 *
 * 主に変更する場所：
 * 1. school        : 教室名・タイトル・説明文
 * 2. theme         : サイト全体の色
 * 3. images        : FV / 教室紹介 / 講師 / 特徴3枚の画像
 * 4. hero          : ファーストビュー文言
 * 5. news          : note のURL
 * 6. about         : 教室紹介文
 * 7. feature       : 特徴3つの見出し・本文
 * 8. featuredPlan  : ヒーロー直下の大きい料金パネル
 * 9. course        : 通常のコース一覧
 * 10. trial        : 体験レッスンの流れ
 * 11. faq          : よくある質問
 * 12. access       : 住所・アクセス・地図
 * 13. contact      : CTAリンク・Instagram
 * 14. nav          : 右側メニューとフッターリンク
 *
 * 画像ファイルも index.html と同じ階層に置き、images.hero などのファイル名を書き換えてください。
 * themeColor / themeDark / accentColor を変えるとサイト全体の色が変わります。
 * NEWS は note RSS と連携します。下の news.profileUrl / feedUrl を変更してください。
 */
window.SCHOOL_CONFIG = {
  school: {
    name: "Harmony Piano Studio",
    shortName: "HARMONY",
    title: "Harmony Piano Studio｜一人ひとりに寄り添うピアノ教室",
    description: "初心者のお子さまから大人まで、一人ひとりのペースに寄り添うピアノ教室です。体験レッスン受付中。"
  },

  theme: {
    themeColor: "#75b3db",
    themeDark: "#5892bf",
    accentColor: "#d2ecfa",
    backgroundColor: "#ebeff2",
    textColor: "#4e5459"
  },

  images: {
    hero: "./hero.svg",
    about: "./about.svg",
    teacher: "./teacher.svg",
    features: [
      "./feature-1.svg",
      "./feature-2.svg",
      "./feature-3.svg"
    ]
  },

  hero: {
    eyebrow: "PIANO LESSON",
    title: "音楽を、ずっと好きでいられる場所。",
    lead: "一人ひとりのペースに寄り添い、\n『できた』の喜びを積み重ねるピアノ教室です。",
    bottomText: "初心者のお子さまから大人の方まで歓迎しています。"
  },

  // NEWSは note と連携します。
  // 教室ごとに YOUR_NOTE_ID の2箇所だけ変更してください。
  news: {
    source: "note",
    profileUrl: "https://note.com/YOUR_NOTE_ID",
    feedUrl: "https://note.com/YOUR_NOTE_ID/rss",
    maxItems: 3
  },

  about: {
    title: "教室について",
    catch: "一人ひとりの『弾けた！』を大切に。",
    text: "ピアノをはじめて触るお子さまから、趣味として楽しみたい大人の方まで。\n基礎を大切にしながら、音楽を好きになる気持ちを育てます。\n一人ひとりの個性や目標に合わせた、無理のないレッスンを行っています。"
  },

  feature: {
    heading: "選ばれる3つの理由",
    items: [
      {
        title: "一人ひとりに合わせた個別レッスン",
        text: "年齢・経験・目標に合わせて内容を調整。『できること』を少しずつ増やし、自信につなげます。"
      },
      {
        title: "基礎から丁寧に、楽しく学べる",
        text: "楽譜の読み方や指づかいなどの基礎を大切にしながら、好きな曲にも挑戦できるレッスンです。"
      },
      {
        title: "発表会やイベントで成長を実感",
        text: "希望者向けの発表会や教室イベントを通じて、人前で演奏する楽しさや達成感を経験できます。"
      }
    ]
  },

  featuredPlan: {
    enabled: true,
    badge: "予約\n不要!",
    title: "スタジオ使い放題プラン",
    sideLabel: "standard plan",
    feeLabel: "月会費",
    price: "8,000",
    priceUnit: "円",
    taxText: "税込\n8,800円",
    note: "【初期費用】入会金：8,000円（税込8,800円）＋入会手数料（セキュリティキー発行費）5,000円（税込5,500円）＋初月日割会費＋翌月会費\n※休会する場合、休会費1,000円（税込1,100円）"
  },

  teacher: {
    heading: "講師紹介・ごあいさつ",
    catch: "音楽を通じて、できる喜びを。",
    message: "ピアノは、上達することだけが目的ではありません。音を楽しみ、自分らしく表現する時間そのものが大切だと考えています。生徒さま一人ひとりの気持ちに寄り添いながら、長く音楽を楽しめる力を育てていきます。",
    name: "山田 花子"
  },

  course: {
    heading: "コース・料金",
    note: "※入会金・教材費・発表会費等は教室によって設定してください。",
    items: [
      { tag: "KIDS", name: "こどもピアノコース", price: "8,800円〜", unit: "/ 月", text: "未就学児〜小学生向け。基礎から楽しく学びます。" },
      { tag: "STUDENT", name: "学生ピアノコース", price: "9,900円〜", unit: "/ 月", text: "中学生・高校生向け。学校行事やコンクールにも対応します。" },
      { tag: "ADULT", name: "大人のピアノコース", price: "11,000円〜", unit: "/ 月", text: "初心者・再開組の方も歓迎。好きな曲を中心に進められます。" }
    ]
  },

  trial: {
    heading: "体験レッスンの流れ",
    miniText: "はじめての方へ",
    steps: [
      { title: "WEBからお申し込み", text: "お問い合わせフォームまたは予約ページから、ご希望の日時をお知らせください。" },
      { title: "教室へお越しください", text: "教室の雰囲気やレッスン内容について簡単にご説明します。" },
      { title: "体験レッスン", text: "実際のピアノを使って、現在のレベルやご希望に合わせてレッスンします。" },
      { title: "ご案内・ご相談", text: "コース・曜日・料金などをご説明します。無理な勧誘は行いません。" }
    ]
  },

  faq: [
    { q: "ピアノがまったく初めてでも大丈夫ですか？", a: "はい。楽譜の読み方や姿勢、指の使い方から丁寧にお伝えします。初めてピアノに触れる方も安心してお越しください。" },
    { q: "何歳から通えますか？", a: "教室ごとに対象年齢を設定できます。このテンプレートでは3歳頃からを想定していますが、実際の教室方針に合わせて変更してください。" },
    { q: "自宅にピアノがなくても始められますか？", a: "まずは体験レッスンでご相談ください。ご家庭での練習方法や楽器選びについてもご案内できます。" },
    { q: "大人でも通えますか？", a: "はい。大人になって初めて始める方、昔習っていて再開したい方も歓迎しています。" }
  ],

  access: {
    address: "東京都〇〇区〇〇 1-2-3",
    accessText: "〇〇駅から徒歩5分",
    lessonHours: "平日 10:00〜20:00 / 土曜 9:00〜18:00",
    mapEmbedUrl: ""
  },

  pcQr: {
    url: "https://example.com/",
    label: "access with smartphone",
    text: "スマートフォンで\nアクセスはこちら"
  },

  contact: {
    lead: "体験レッスンやご質問など、お気軽にお問い合わせください。",
    primary: { label: "体験レッスンを予約する", url: "#contact" },
    secondary: { label: "お問い合わせはこちら", url: "mailto:info@example.com" },
    instagram: { text: "教室の日常やレッスンの様子を発信しています。", url: "https://www.instagram.com/" }
  },

  nav: [
    ["NEWS", "#news"],
    ["教室について", "#about"],
    ["教室の特徴", "#feature"],
    ["講師紹介", "#teacher"],
    ["コース・料金", "#course"],
    ["体験レッスン", "#trial"],
    ["Q&A", "#faq"],
    ["アクセス", "#access"],
    ["お問い合わせ", "#contact"]
  ]
};
