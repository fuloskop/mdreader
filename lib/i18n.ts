export type Locale =
  | "en"
  | "tr"
  | "es"
  | "fr"
  | "de"
  | "pt"
  | "ru"
  | "zh"
  | "ja"
  | "ko"
  | "ar"
  | "hi"
  | "it"
  | "nl"
  | "pl"
  | "uk"
  | "sv"
  | "id";

export interface Translations {
  dropTitle: string;
  dropDesc1: string;
  dropDesc2: string;
  chooseFile: string;
  supported: string;
  privacy: string;
  zeroData: string;
  zeroCookie: string;
  zeroTracking: string;
  openSource: string;
  close: string;
  dropToAdd: string;
  footerPrivacy: string;
  lightMode: string;
  darkMode: string;
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
  ru: "Русский",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  ar: "العربية",
  hi: "हिन्दी",
  it: "Italiano",
  nl: "Nederlands",
  pl: "Polski",
  uk: "Українська",
  sv: "Svenska",
  id: "Bahasa Indonesia",
};

const translations: Record<Locale, Translations> = {
  en: {
    dropTitle: "Drop your Markdown file",
    dropDesc1: "Your files are never sent to a server.",
    dropDesc2: "Everything stays in your browser.",
    chooseFile: "Choose File",
    supported: ".md and .markdown files supported",
    privacy: "Your files never leave your browser",
    zeroData: "Zero data collection",
    zeroCookie: "Zero cookies",
    zeroTracking: "Zero tracking",
    openSource: "Open source",
    close: "Close",
    dropToAdd: "Drop to add file",
    footerPrivacy: "Your files never leave your browser. Source code is open.",
    lightMode: "Light mode",
    darkMode: "Dark mode",
  },
  tr: {
    dropTitle: "Markdown dosyanızı bırakın",
    dropDesc1: "Dosyalarınız sunucuya gönderilmez.",
    dropDesc2: "Her şey tarayıcınızda kalır.",
    chooseFile: "Dosya Seç",
    supported: ".md ve .markdown dosyaları desteklenir",
    privacy: "Dosyalarınız tarayıcınızdan çıkmaz",
    zeroData: "Sıfır veri toplama",
    zeroCookie: "Sıfır cookie",
    zeroTracking: "Sıfır takip",
    openSource: "Açık kaynak",
    close: "Kapat",
    dropToAdd: "Dosyayı bırakarak ekleyin",
    footerPrivacy:
      "Dosyalarınız tarayıcınızdan asla çıkmaz. Kaynak kodu açıktır.",
    lightMode: "Açık mod",
    darkMode: "Koyu mod",
  },
  es: {
    dropTitle: "Suelta tu archivo Markdown",
    dropDesc1: "Tus archivos nunca se envían a un servidor.",
    dropDesc2: "Todo permanece en tu navegador.",
    chooseFile: "Elegir archivo",
    supported: "Se admiten archivos .md y .markdown",
    privacy: "Tus archivos nunca salen de tu navegador",
    zeroData: "Cero recopilación de datos",
    zeroCookie: "Cero cookies",
    zeroTracking: "Cero rastreo",
    openSource: "Código abierto",
    close: "Cerrar",
    dropToAdd: "Suelta para añadir",
    footerPrivacy:
      "Tus archivos nunca salen de tu navegador. El código fuente es abierto.",
    lightMode: "Modo claro",
    darkMode: "Modo oscuro",
  },
  fr: {
    dropTitle: "Déposez votre fichier Markdown",
    dropDesc1: "Vos fichiers ne sont jamais envoyés à un serveur.",
    dropDesc2: "Tout reste dans votre navigateur.",
    chooseFile: "Choisir un fichier",
    supported: "Fichiers .md et .markdown supportés",
    privacy: "Vos fichiers ne quittent jamais votre navigateur",
    zeroData: "Zéro collecte de données",
    zeroCookie: "Zéro cookie",
    zeroTracking: "Zéro traçage",
    openSource: "Open source",
    close: "Fermer",
    dropToAdd: "Déposez pour ajouter",
    footerPrivacy:
      "Vos fichiers ne quittent jamais votre navigateur. Le code source est ouvert.",
    lightMode: "Mode clair",
    darkMode: "Mode sombre",
  },
  de: {
    dropTitle: "Markdown-Datei hier ablegen",
    dropDesc1: "Ihre Dateien werden nie an einen Server gesendet.",
    dropDesc2: "Alles bleibt in Ihrem Browser.",
    chooseFile: "Datei wählen",
    supported: ".md und .markdown Dateien unterstützt",
    privacy: "Ihre Dateien verlassen nie Ihren Browser",
    zeroData: "Keine Datenerfassung",
    zeroCookie: "Keine Cookies",
    zeroTracking: "Kein Tracking",
    openSource: "Open Source",
    close: "Schließen",
    dropToAdd: "Zum Hinzufügen ablegen",
    footerPrivacy:
      "Ihre Dateien verlassen nie Ihren Browser. Der Quellcode ist offen.",
    lightMode: "Heller Modus",
    darkMode: "Dunkler Modus",
  },
  pt: {
    dropTitle: "Solte seu arquivo Markdown",
    dropDesc1: "Seus arquivos nunca são enviados a um servidor.",
    dropDesc2: "Tudo fica no seu navegador.",
    chooseFile: "Escolher arquivo",
    supported: "Arquivos .md e .markdown suportados",
    privacy: "Seus arquivos nunca saem do seu navegador",
    zeroData: "Zero coleta de dados",
    zeroCookie: "Zero cookies",
    zeroTracking: "Zero rastreamento",
    openSource: "Código aberto",
    close: "Fechar",
    dropToAdd: "Solte para adicionar",
    footerPrivacy:
      "Seus arquivos nunca saem do seu navegador. O código-fonte é aberto.",
    lightMode: "Modo claro",
    darkMode: "Modo escuro",
  },
  ru: {
    dropTitle: "Перетащите Markdown файл",
    dropDesc1: "Ваши файлы никогда не отправляются на сервер.",
    dropDesc2: "Всё остаётся в вашем браузере.",
    chooseFile: "Выбрать файл",
    supported: "Поддерживаются файлы .md и .markdown",
    privacy: "Ваши файлы не покидают браузер",
    zeroData: "Без сбора данных",
    zeroCookie: "Без cookie",
    zeroTracking: "Без отслеживания",
    openSource: "Открытый код",
    close: "Закрыть",
    dropToAdd: "Отпустите для добавления",
    footerPrivacy:
      "Ваши файлы никогда не покидают браузер. Исходный код открыт.",
    lightMode: "Светлая тема",
    darkMode: "Тёмная тема",
  },
  zh: {
    dropTitle: "拖放您的 Markdown 文件",
    dropDesc1: "您的文件永远不会发送到服务器。",
    dropDesc2: "一切都在浏览器中完成。",
    chooseFile: "选择文件",
    supported: "支持 .md 和 .markdown 文件",
    privacy: "您的文件不会离开浏览器",
    zeroData: "零数据收集",
    zeroCookie: "零 Cookie",
    zeroTracking: "零追踪",
    openSource: "开源",
    close: "关闭",
    dropToAdd: "拖放以添加文件",
    footerPrivacy: "您的文件永远不会离开浏览器。源代码是开放的。",
    lightMode: "浅色模式",
    darkMode: "深色模式",
  },
  ja: {
    dropTitle: "Markdownファイルをドロップ",
    dropDesc1: "ファイルはサーバーに送信されません。",
    dropDesc2: "すべてブラウザ内で完結します。",
    chooseFile: "ファイルを選択",
    supported: ".md と .markdown ファイルに対応",
    privacy: "ファイルはブラウザから出ません",
    zeroData: "データ収集なし",
    zeroCookie: "Cookieなし",
    zeroTracking: "追跡なし",
    openSource: "オープンソース",
    close: "閉じる",
    dropToAdd: "ドロップして追加",
    footerPrivacy:
      "ファイルはブラウザから出ることはありません。ソースコードは公開されています。",
    lightMode: "ライトモード",
    darkMode: "ダークモード",
  },
  ko: {
    dropTitle: "마크다운 파일을 드롭하세요",
    dropDesc1: "파일은 서버로 전송되지 않습니다.",
    dropDesc2: "모든 것이 브라우저에서 처리됩니다.",
    chooseFile: "파일 선택",
    supported: ".md 및 .markdown 파일 지원",
    privacy: "파일이 브라우저를 떠나지 않습니다",
    zeroData: "데이터 수집 없음",
    zeroCookie: "쿠키 없음",
    zeroTracking: "추적 없음",
    openSource: "오픈 소스",
    close: "닫기",
    dropToAdd: "드롭하여 추가",
    footerPrivacy:
      "파일은 브라우저를 떠나지 않습니다. 소스 코드는 공개되어 있습니다.",
    lightMode: "라이트 모드",
    darkMode: "다크 모드",
  },
  ar: {
    dropTitle: "أسقط ملف Markdown الخاص بك",
    dropDesc1: "لن يتم إرسال ملفاتك إلى أي خادم.",
    dropDesc2: "كل شيء يبقى في متصفحك.",
    chooseFile: "اختر ملفاً",
    supported: "ملفات .md و .markdown مدعومة",
    privacy: "ملفاتك لا تغادر متصفحك",
    zeroData: "صفر جمع بيانات",
    zeroCookie: "صفر كوكيز",
    zeroTracking: "صفر تتبع",
    openSource: "مفتوح المصدر",
    close: "إغلاق",
    dropToAdd: "أسقط لإضافة الملف",
    footerPrivacy: "ملفاتك لا تغادر متصفحك أبداً. الكود المصدري مفتوح.",
    lightMode: "الوضع الفاتح",
    darkMode: "الوضع الداكن",
  },
  hi: {
    dropTitle: "अपनी Markdown फ़ाइल यहाँ छोड़ें",
    dropDesc1: "आपकी फ़ाइलें कभी सर्वर पर नहीं भेजी जातीं।",
    dropDesc2: "सब कुछ आपके ब्राउज़र में रहता है।",
    chooseFile: "फ़ाइल चुनें",
    supported: ".md और .markdown फ़ाइलें समर्थित हैं",
    privacy: "आपकी फ़ाइलें ब्राउज़र से बाहर नहीं जातीं",
    zeroData: "शून्य डेटा संग्रह",
    zeroCookie: "शून्य कुकी",
    zeroTracking: "शून्य ट्रैकिंग",
    openSource: "ओपन सोर्स",
    close: "बंद करें",
    dropToAdd: "जोड़ने के लिए छोड़ें",
    footerPrivacy:
      "आपकी फ़ाइलें कभी ब्राउज़र से बाहर नहीं जातीं। स्रोत कोड खुला है।",
    lightMode: "लाइट मोड",
    darkMode: "डार्क मोड",
  },
  it: {
    dropTitle: "Trascina il tuo file Markdown",
    dropDesc1: "I tuoi file non vengono mai inviati a un server.",
    dropDesc2: "Tutto rimane nel tuo browser.",
    chooseFile: "Scegli file",
    supported: "File .md e .markdown supportati",
    privacy: "I tuoi file non lasciano mai il browser",
    zeroData: "Zero raccolta dati",
    zeroCookie: "Zero cookie",
    zeroTracking: "Zero tracciamento",
    openSource: "Open source",
    close: "Chiudi",
    dropToAdd: "Rilascia per aggiungere",
    footerPrivacy:
      "I tuoi file non lasciano mai il browser. Il codice sorgente è aperto.",
    lightMode: "Modalità chiara",
    darkMode: "Modalità scura",
  },
  nl: {
    dropTitle: "Sleep je Markdown-bestand hierheen",
    dropDesc1: "Je bestanden worden nooit naar een server gestuurd.",
    dropDesc2: "Alles blijft in je browser.",
    chooseFile: "Bestand kiezen",
    supported: ".md en .markdown bestanden ondersteund",
    privacy: "Je bestanden verlaten nooit je browser",
    zeroData: "Geen dataverzameling",
    zeroCookie: "Geen cookies",
    zeroTracking: "Geen tracking",
    openSource: "Open source",
    close: "Sluiten",
    dropToAdd: "Loslaten om toe te voegen",
    footerPrivacy:
      "Je bestanden verlaten nooit je browser. De broncode is open.",
    lightMode: "Lichte modus",
    darkMode: "Donkere modus",
  },
  pl: {
    dropTitle: "Upuść plik Markdown",
    dropDesc1: "Twoje pliki nigdy nie są wysyłane na serwer.",
    dropDesc2: "Wszystko pozostaje w Twojej przeglądarce.",
    chooseFile: "Wybierz plik",
    supported: "Obsługiwane pliki .md i .markdown",
    privacy: "Twoje pliki nie opuszczają przeglądarki",
    zeroData: "Zero zbierania danych",
    zeroCookie: "Zero ciasteczek",
    zeroTracking: "Zero śledzenia",
    openSource: "Open source",
    close: "Zamknij",
    dropToAdd: "Upuść, aby dodać",
    footerPrivacy:
      "Twoje pliki nigdy nie opuszczają przeglądarki. Kod źródłowy jest otwarty.",
    lightMode: "Tryb jasny",
    darkMode: "Tryb ciemny",
  },
  uk: {
    dropTitle: "Перетягніть файл Markdown",
    dropDesc1: "Ваші файли ніколи не надсилаються на сервер.",
    dropDesc2: "Все залишається у вашому браузері.",
    chooseFile: "Обрати файл",
    supported: "Підтримуються файли .md та .markdown",
    privacy: "Ваші файли не залишають браузер",
    zeroData: "Без збору даних",
    zeroCookie: "Без cookie",
    zeroTracking: "Без відстеження",
    openSource: "Відкритий код",
    close: "Закрити",
    dropToAdd: "Відпустіть для додавання",
    footerPrivacy:
      "Ваші файли ніколи не залишають браузер. Вихідний код відкритий.",
    lightMode: "Світла тема",
    darkMode: "Темна тема",
  },
  sv: {
    dropTitle: "Släpp din Markdown-fil",
    dropDesc1: "Dina filer skickas aldrig till en server.",
    dropDesc2: "Allt stannar i din webbläsare.",
    chooseFile: "Välj fil",
    supported: ".md och .markdown filer stöds",
    privacy: "Dina filer lämnar aldrig din webbläsare",
    zeroData: "Ingen datainsamling",
    zeroCookie: "Inga cookies",
    zeroTracking: "Ingen spårning",
    openSource: "Öppen källkod",
    close: "Stäng",
    dropToAdd: "Släpp för att lägga till",
    footerPrivacy:
      "Dina filer lämnar aldrig din webbläsare. Källkoden är öppen.",
    lightMode: "Ljust läge",
    darkMode: "Mörkt läge",
  },
  id: {
    dropTitle: "Letakkan file Markdown Anda",
    dropDesc1: "File Anda tidak pernah dikirim ke server.",
    dropDesc2: "Semuanya tetap di browser Anda.",
    chooseFile: "Pilih File",
    supported: "File .md dan .markdown didukung",
    privacy: "File Anda tidak pernah meninggalkan browser",
    zeroData: "Tanpa pengumpulan data",
    zeroCookie: "Tanpa cookie",
    zeroTracking: "Tanpa pelacakan",
    openSource: "Sumber terbuka",
    close: "Tutup",
    dropToAdd: "Lepas untuk menambahkan",
    footerPrivacy:
      "File Anda tidak pernah meninggalkan browser. Kode sumber terbuka.",
    lightMode: "Mode terang",
    darkMode: "Mode gelap",
  },
};

export function t(locale: Locale): Translations {
  return translations[locale];
}

export const locales = Object.keys(localeNames) as Locale[];
