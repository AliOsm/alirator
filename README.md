<div align="center">
  <h1>Alirator</h1>
  <p dir="rtl">قالب موقع شخصي ثنائي اللغة (عربي/إنجليزي) — بدون أدوات بناء، وقابل للتخصيص من ملف واحد.</p>
  <a href="README.en.md"><strong>English</strong></a>
</div>

<h2 dir="rtl">المميزات</h2>

<ul dir="rtl">
  <li><strong>ثنائي اللغة</strong> — عربي/إنجليزي مع دعم كامل لـ RTL</li>
  <li><strong>تخصيص فوري</strong> — الألوان والمحتوى والبنية من ملف <code dir="ltr">config.yaml</code></li>
  <li><strong>محتوى Markdown</strong> — صفحات، مدونة، ومقالات قصيرة</li>
  <li><strong>بدون أدوات بناء</strong> — يعمل مباشرة من ملفات المشروع</li>
  <li><strong>SEO تلقائي</strong> — وسوم Open Graph ووصف للصفحات</li>
  <li><strong>تلوين الشيفرات البرمجية</strong> — عبر highlight.js</li>
  <li><strong>رسوم بيانية</strong> — عبر Mermaid</li>
  <li><strong>نشر تلقائي</strong> — GitHub Actions workflow مُضمَّن</li>
</ul>

<h2 dir="rtl">البدء</h2>

```bash
# استنساخ القالب
git clone https://github.com/AliOsm/alirator.git my-site
cd my-site

# تعديل الإعدادات
# عدّل config.yaml باسمك وروابطك ولون الموقع

# تعديل الصفحات
# عدّل ملفات Markdown في مجلد pages/

# بناء الفهارس وتشغيل الخادم المحلِّي
bash dev.sh
# افتح http://localhost:6570
```

<h2 dir="rtl">بنية المشروع</h2>

```
alirator/
├── index.html            # صفحة HTML الرئيسية
├── app.js                # منطق التطبيق
├── style.css             # الأنماط
├── config.yaml           # إعدادات الموقع
├── build.rb              # مولّد فهارس المجموعات
├── dev.sh                # سكربت التشغيل المحلي
├── assets/
│   ├── author.svg        # صورة المؤلف الافتراضية
│   └── favicon.svg       # أيقونة الموقع الافتراضية
└── pages/
    ├── home.ar.md        # الصفحة الرئيسية (عربي)
    ├── home.en.md        # الصفحة الرئيسية (إنجليزي)
    ├── *.ar.md / *.en.md # صفحات ثابتة أخرى
    ├── blogs/            # تدوينات طويلة
    │   └── slug.ar.md / slug.en.md
    └── posts/            # مقالات قصيرة
        └── slug.ar.md / slug.en.md
```

<blockquote dir="rtl">
  <p>ملفات <code dir="ltr">_manifest.json</code> تُولَّد تلقائيًا بواسطة <code dir="ltr">build.rb</code> ولا تُتبَّع في git.</p>
</blockquote>

<h2 dir="rtl">الإعدادات</h2>

<p dir="rtl">ملف <code dir="ltr">config.yaml</code> يتحكم في كل شيء:</p>

<div dir="rtl">

| القسم | الوصف |
|---|---|
| `siteName` | اسم الموقع (عربي/إنجليزي) |
| `defaultLang` | اللغة الافتراضية (`ar` أو `en`) |
| `theme.accent` | لون الموقع الأساسي (hex) |
| `author` | الاسم، النبذة، الصورة، الموقع، روابط التواصل |
| `pages` | صفحات الموقع — `[slug, العربي, English]` (استخدم `~` لإخفاء صفحة من لغة معينة) |
| `collections` | المجموعات — `[slug, العربي, English, type]` |
| `seo` | وصف الموقع وصورة المشاركة |
| `footer` | التذييل (يدعم `{year}`) |

</div>

<h2 dir="rtl">إضافة محتوى</h2>

<h3 dir="rtl">صفحات ثابتة</h3>

<p dir="rtl">أنشئ ملفًّا في <code dir="ltr">pages/</code> بالتنسيق <code dir="ltr">slug.lang.md</code> ثم أضفه إلى <code dir="ltr">pages</code> في <code dir="ltr">config.yaml</code>:</p>

```yaml
pages:
  - [slug, العنوان العربي, English Title]  # كلتا اللغتين
  - [slug, عربي فقط, ~]                    # عربي فقط
  - [slug, ~, English Only]                # إنجليزي فقط
```

<p dir="rtl">استخدم <code dir="ltr">~</code> (null في YAML) بدلاً من العنوان لإخفاء الصفحة من لغة معينة.</p>

<h3 dir="rtl">تدوينات ومقالات</h3>

<p dir="rtl">أنشئ ملفًّا في <code dir="ltr">pages/blogs/</code> أو <code dir="ltr">pages/posts/</code> وحدِّد معلوماته كالتالي:</p>

```yaml
---
title: عنوان التدوينة
date: 2024-06-15
excerpt: وصف مختصر.
tags: [وسم1, وسم2]
cover: /path/to/image.jpg  # اختياري
---
```

<p dir="rtl">ثم شغّل <code dir="ltr">ruby build.rb</code> لتحديث الفهارس.</p>

<h2 dir="rtl">النشر</h2>

<h3 dir="rtl">GitHub Pages</h3>

<p dir="rtl">المستودع يتضمن <a href=".github/workflows/deploy.yml">workflow للنشر التلقائي</a>. عند رفع التعديلات إلى <code dir="ltr">main</code> يتم التالي:</p>

<ol dir="rtl">
  <li>بناء فهارس المجموعات</li>
  <li>إضافة hash لجميع الملفات لكسر التخزين المؤقت</li>
  <li>نشر الموقع على GitHub Pages</li>
</ol>

<p dir="rtl">لتفعيل GitHub Pages على مستودعك: <strong>Settings → Pages → Source → GitHub Actions</strong>.</p>

<h3 dir="rtl">استضافات أخرى</h3>

<p dir="rtl">الموقع عبارة عن ملفات ثابتة — يعمل على أي استضافة (Netlify، Vercel، Cloudflare Pages، إلخ).</p>

<h2 dir="rtl">التشغيل المحلي</h2>

```bash
bash dev.sh
```

<p dir="rtl">يبني هذا الملف الفهارس ويشغِّل خادمًا محليًّا على المنفذ 6570.</p>

<h2 dir="rtl">المتطلبات</h2>

<ul dir="rtl">
  <li><strong dir="ltr">Ruby 2.7+</strong> — لبناء الفهارس وخادم التطوير (لا يستخدم أي اعتماديات خارجية)</li>
  <li>جميع المكتبات الأخرى تُستخدم عبر CDN</li>
</ul>

<h2 dir="rtl">استخدام لغات أخرى</h2>

<p dir="rtl">القالب مصمم للعربية والإنجليزية افتراضيًّا، لكنه يدعم أي زوج من اللغات. لاستخدام لغات أخرى:</p>

<ol dir="rtl">
  <li>حدّث رموز اللغات في <code dir="ltr">build.rb</code> (دالة <code dir="ltr">extract_slug_and_lang</code>) و <code dir="ltr">app.js</code></li>
  <li>عدّل <code dir="ltr">langDir</code> في <code dir="ltr">config.yaml</code> لتحديد اتجاه كل لغة</li>
  <li>غيّر خطوط Google Fonts في <code dir="ltr">index.html</code> لتناسب اللغات الجديدة</li>
</ol>

<h2 dir="rtl">المساهمة</h2>

<p dir="rtl">المساهمات مرحّب بها. افتح issue للنقاش أو أرسل pull request.</p>

<h2 dir="rtl">الرخصة</h2>

<p dir="rtl"><a href="LICENSE">MIT</a></p>
