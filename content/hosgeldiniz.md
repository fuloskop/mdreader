---
title: "Hoş Geldiniz"
date: "2026-03-16"
description: "MD Reader'a hoş geldiniz. Verileriniz güvende — her şey tarayıcınızda kalır."
---

## MD Reader Nedir?

MD Reader, markdown dosyalarınızı güzel bir tasarımla okumanızı sağlayan statik bir sitedir.

### Gizlilik Öncelikli

- **Sıfır API çağrısı** — sunucuya veri gönderilmez
- **Sıfır cookie** — takip yoktur
- **Sıfır analytics** — kim olduğunuzu bilmiyoruz
- **Tamamen statik** — tüm içerik build sırasında HTML'e dönüşür

### Nasıl Çalışır?

1. Markdown dosyalarınızı `content/` klasörüne koyun
2. Site build edildiğinde her `.md` dosyası bir sayfaya dönüşür
3. Okuyucular sadece statik HTML görür — JavaScript bile minimum

### Markdown Özellikleri

Normal metin, **kalın**, *italik*, `kod` ve daha fazlası desteklenir.

```javascript
// Kod blokları da güzel görünür
const greeting = "Merhaba Dünya!";
console.log(greeting);
```

> Alıntılar da desteklenir. Gizlilik bir lüks değil, bir haktır.

| Özellik | Durum |
|---------|-------|
| GFM Tabloları | ✓ |
| Kod Blokları | ✓ |
| Listeler | ✓ |
| Başlıklar | ✓ |
