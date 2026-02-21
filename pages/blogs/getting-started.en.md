---
title: Getting Started with Alirator
date: 2024-06-15
excerpt: A step-by-step guide to setting up, customizing, and deploying your Alirator site.
tags: [tutorial, getting-started]
---

# Getting Started with Alirator

Alirator is a bilingual (Arabic/English) personal site template that runs entirely from static files. Everything is controlled by a single `config.yaml` file, and content is written in Markdown. This guide walks you through setup, customization, content creation, and deployment.

## 1. Clone and Run

```bash
git clone https://github.com/AliOsm/alirator.git my-site
cd my-site
bash dev.sh
```

Open `http://localhost:6570` to see your site. The `dev.sh` script builds collection manifests and starts a local server.

> **Requirement:** Ruby 2.7+ must be installed (built-in libraries only, no gems needed).

## 2. Configure Your Site

Open `config.yaml`. This single file controls your entire site:

### Site Identity

```yaml
siteName:
  en: Your Name
  ar: اسمك
defaultLang: ar
```

`defaultLang` sets which language loads first.

### Theme

```yaml
theme:
  accent: "#2D5A27"
```

Change the hex color to set the accent color across the whole site. The favicon is also generated automatically from this color and the first letter of your site name.

### Author Profile

```yaml
author:
  avatar: assets/author.svg
  name:
    en: Your Name
    ar: اسمك
  bio:
    en: A short bio about yourself.
    ar: نبذة مختصرة عنك.
  location: Earth
  website:
    label: yoursite
    url: "#home"
  social:
    - platform: github
      url: https://github.com/username
      label: GitHub
```

The sidebar displays your avatar, name, bio, location, and social links. Supported platforms: `github`, `linkedin`, `twitter`, `instagram`, `email`, and any custom URL (shown with a link icon).

### Footer

```yaml
footer:
  en: "&copy; {year} Your Name. All rights reserved."
  ar: "&copy; {year} اسمك. جميع الحقوق محفوظة."
```

`{year}` is replaced with the current year automatically.

### SEO

```yaml
seo:
  description:
    en: Personal website and blog.
    ar: الموقع الشخصي والمدونة.
  image: ""
```

These populate Open Graph and Twitter Card meta tags.

## 3. Pages

Static pages live in `pages/` as Markdown files named `slug.lang.md` (e.g., `home.ar.md`, `contact.en.md`).

Register each page in `config.yaml`:

```yaml
pages:
  - [home, الرئيسية, Home]
  - [contact, تواصل, Contact]
  - [publications, المنشورات, Publications]
```

The format is `[slug, Arabic title, English title]`. These titles appear in the navigation bar.

### Language-Specific Pages

Use `~` (YAML null) to make a page available in only one language:

```yaml
pages:
  - [resume, ~, Resume]         # English only
  - [about, نبذة عني, ~]         # Arabic only
```

A page with `~` for a language is hidden from the nav when that language is active.

## 4. Blog Posts and Short Posts

The template supports two collection types:

- **Blogs** (`pages/blogs/`) — displayed as cards with cover images
- **Posts** (`pages/posts/`) — displayed as a compact list

### Creating an Entry

Create a Markdown file in the collection directory with front matter:

```yaml
---
title: My First Post
date: 2024-06-15
excerpt: A brief description shown in the listing.
tags: [tutorial, web]
cover: /path/to/image.jpg
---

Your content here in Markdown...
```

- `title` and `date` are required
- `excerpt` is shown on listing pages
- `tags` appear as labels on cards and entry pages
- `cover` is optional (used as a card background in blog collections)

### Bilingual Entries

Create both `slug.ar.md` and `slug.en.md` in the same directory. The language toggle appears automatically when both versions exist.

### Building Manifests

After adding, editing, or removing entries, rebuild the manifests:

```bash
ruby build.rb
```

This generates `_manifest.json` files that power the listing pages. The `dev.sh` script also runs this automatically.

## 5. Collections Configuration

```yaml
collections:
  - [blogs, المدونة, Blogs, blog]
  - [posts, المقالات, Posts, post]
```

The format is `[slug, Arabic title, English title, type]`. The `type` controls the layout:

- `blog` — card layout with cover images, dates, excerpts, and tags
- `post` — compact list with dates and excerpts

## 6. Project Structure

```
alirator/
├── index.html          # Single HTML page
├── app.js              # Application logic
├── style.css           # Styles
├── config.yaml         # All site configuration
├── build.rb            # Manifest generator
├── dev.sh              # Local dev script
├── assets/             # Avatar, favicon, images
└── pages/
    ├── home.ar.md      # Static pages
    ├── home.en.md
    ├── blogs/          # Blog entries
    │   └── my-post.ar.md
    └── posts/          # Short post entries
        └── my-post.en.md
```

## 7. Deployment

### GitHub Pages

The repo includes a GitHub Actions workflow. On push to `main`, it:

1. Builds collection manifests
2. Appends a hash to `style.css` and `app.js` for cache-busting
3. Deploys to GitHub Pages

To enable: go to your repo **Settings → Pages → Source → GitHub Actions**.

### Other Hosts

The site is just static files. Upload the directory to any host — Netlify, Vercel, Cloudflare Pages, or any web server.

## 8. Features You Get for Free

- **Syntax highlighting** — code blocks are highlighted via highlight.js
- **Mermaid diagrams** — use ` ```mermaid ` code blocks to render diagrams
- **Language toggle** — appears automatically when a page has both language versions
- **RTL support** — Arabic pages automatically set `dir="rtl"` on the document
- **Responsive sidebar** — collapses to a hamburger menu on mobile
- **Page caching** — Markdown files are fetched once and cached in memory

## 9. Using Other Languages

The template defaults to Arabic and English, but supports any language pair:

1. Update language codes in `build.rb` (`extract_slug_and_lang`) and `app.js`
2. Set `langDir` in `config.yaml` to define each language's direction
3. Change the Google Fonts in `index.html` to match the new languages
