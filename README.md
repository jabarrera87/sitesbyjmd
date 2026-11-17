# sitesbyjmd.com — JM Designs

The JM Designs website: plain HTML, one stylesheet, a small amount of vanilla JavaScript. It has no build step and no framework, and it runs on any static host.

## What's in the folder

```
index.html         Home: hero with live listing preview, services, Meet Jacob, process, work, check-up CTA
services.html      Five services with what's included and prices, plus the free check-up offer
labels.html        Cottage food labels: how it works, live label template preview, Texas label checklist, what I print, FAQ
process.html       The 7-step process with time frames, and the FAQ
contact.html       Contact form, direct contact details, what happens next
privacy.html       Privacy policy (draft)
404.html           Page-not-found page
css/styles.css     All styles. Colors, fonts and spacing are CSS variables at the top (:root)
js/main.js         Mobile menu, live preview, form checks, scroll entrances
images/            og-image.png (social share image). Add your photos here
favicon.ico, favicon.svg, apple-touch-icon.png
sitemap.xml, robots.txt
```

## Run it locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

Then go to http://localhost:8000.

## Deploy

The site is just files, so any static host works:

- **Netlify** or **Cloudflare Pages:** connect this repo. No build command; the publish directory is the repo root.
- **GitHub Pages:** Settings → Pages → deploy from the `main` branch, root folder.
- **Hostinger or other hosting:** upload the files to `public_html`.

Point the sitesbyjmd.com domain at whichever host you use.

## Before launch: replace these placeholders

Search the project for each placeholder and replace every match.

| Placeholder | What to put there | Where |
| --- | --- | --- |
| `[PHONE]` | Phone number as people should see it, e.g. (830) 555-1234 | All pages |
| `PHONE_DIGITS` | Phone digits only, e.g. 8305551234 (keep the `+1` in front) | All pages (tel: links, schema) |
| `[EMAIL]` | Your email address | All pages |
| `EMAIL_ADDRESS` | The same email (in mailto: links and schema) | All pages |
| `[HOURS]` | Your hours, e.g. Mon–Fri, 9 AM–5 PM | Footer, contact page |
| `[CITY]` | The town you live and work in | index.html (Meet Jacob), schema |
| `[PRICE]` | Starting prices for each service and the care plan | index.html, services.html, process.html |
| `[N]` / `[WEEKS]` | Page counts, revision rounds, timelines | services.html, process.html, index.html |
| `BOOKING_URL` | Your scheduling link (Calendly, Google Calendar booking, etc.) | contact.html |
| `FACEBOOK_URL`, `INSTAGRAM_URL` | Your social profiles. Delete the line if you don't use one | Footer |
| `FORM_ENDPOINT` | Form service address (see below) | contact.html |
| `[FORM SERVICE]`, `[DATE]` | The form service name and today's date | privacy.html |

**Booking buttons:** The "Book a free call" buttons currently go to the contact page. Once you have a scheduling link, you can point them at `BOOKING_URL` instead. Search for `contact.html#book`.

## Photos in use

| File | Where |
| --- | --- |
| `images/shop-owners.webp` | Home, full-width photo under the promise line |
| `images/planning-a-site.webp` | Top of Services |
| `images/devices.webp` | Services, Custom websites example |
| `images/first-meeting.webp` | Top of Process |
| `images/talking-it-through.webp` | Top of Contact |

All photos are WebP, 1536px wide or less, under 200KB each.

## Content still needed

- **Logo:** Done. The header uses `images/logo-white.png` (your transparent white logo, resized).
- **Your photo:** Save it as `images/jacob.jpg` (about 800×1000), then swap it in where `index.html` says `PLACEHOLDER` in the Meet Jacob section.
- **Recent work:** Add three project screenshots (`images/work-1.jpg` etc.) with real business names in `index.html`. If you don't have three yet, delete the "Recent work" section until you do.
- **Testimonials:** Add real client quotes only, in `index.html` and `process.html`. Copy the text from your Google reviews with permission.
- **Social share image:** `images/og-image.png` is a simple generated version. Replace it with a 1200×630 design if you like.

## Cottage food labels page

- **Model:** You provide templates, the customer fills in their own details, and you print. Formats are product labels, bag labels, thank-you stickers and logo stickers.
- **Texas checklist:** Taken from the Texas DSHS cottage food page (https://www.dshs.texas.gov/foodestablishments/cfpo) as of November 2026, after SB 541. Re-check it whenever Texas changes the law.
- **Disclaimer:** The page says you design and print from the customer's information, they're responsible for its accuracy, and it isn't legal advice. Keep this line.
- **To fill in:** prices and quantities for each format, template setup price, proof and print turnaround, and label materials (marked [DRAFT]).

## Draft copy to confirm

All the copy is written as a first draft. Check these lines especially, since they're promises:

- "I reply within one business day" (contact page, form success message)
- Payment terms in the FAQ: "Half up front, rest at launch" (marked [DRAFT])
- Care plan "Cancel anytime" (marked [DRAFT])
- Hourly rate for changes without the care plan
- The privacy policy: have it reviewed before launch

## Contact form

Plain HTML can't send email by itself, so the form posts to a form service.

1. Create a free form on [Formspree](https://formspree.io), [Basin](https://usebasin.com) or similar. If you host on Netlify, you can use Netlify Forms instead.
2. Copy the form's address (e.g. `https://formspree.io/f/abcdwxyz`).
3. In `contact.html`, replace `action="FORM_ENDPOINT"` with that address.

Until then, the form shows a "not connected yet" message. It already includes a hidden spam trap field (`_gotcha`, which Formspree recognizes).

## Design notes

- **Direction:** Bold local studio, built on the existing JM Designs brand: navy ground (`--navy` #010F28), lime for actions (`--lime` #8EF116), cyan for links and focus (`--cyan` #07BEF6). Sora for headings, DM Sans for text (Google Fonts, free for commercial use).
- **Idea:** The search a neighbor types on their phone becomes the hero. Visitors type their business name and town and see their own listing with a one-tap Call button. Nothing they type is sent anywhere.
- **Vocabulary:** Type scale (`--step-display`, `--step-title`, `--step-sub`, `--step-body`), vertical rhythm (`--section`, `--space-1`…`--space-5`), measure (`--measure`, about 62 characters), tonal steps (`--navy` → `--navy-2` → `--navy-3`) instead of borders and shadows.
- **Motion:** The main moment is the hero phone. Once it's on screen, it types out local searches by itself ("barber near Pleasanton", "restaurant near Poteet") and the listing and Call button update, until the visitor touches the form. Other motion:
  - Sections fade up once as they scroll in
  - The big "JM Designs" footer name sweeps in
  - Homepage service rows turn lime on hover (mouse only)
  - Process step numbers stay pinned while you read each step
  - The header shifts one shade darker on scroll
  - Buttons press down slightly

  Movement is turned off for people who set "reduce motion" on their device, and everything stays visible if JavaScript fails.
- **Drawn examples:** Each service on the Services page has an example drawn in code: a website on a computer and a phone, a Google listing with a printed review QR card, a month of care-plan updates, and a printed menu. They use generic names (Your Taco Shop, Your Barbershop) so nobody mistakes them for real businesses, and they're captioned "Example". Swap in real client work when you have it.

## Checks run

- Screenshots reviewed at 1440, 768 and 390px wide (fonts substituted, since the review machine couldn't load Google Fonts)
- One h1 per page, titles under 60 characters, meta descriptions and Open Graph tags on every page
- All form fields labeled; all internal links resolve; no JavaScript errors
- Mobile menu opens and closes (including the Esc key); the live preview updates; form validation and the skip link work
- Text contrast meets WCAG AA (body text is at least 5:1 everywhere)
- No file over 300KB

Not yet tested: real phones, the form with a live endpoint, and Lighthouse scores. Do these after the placeholders are filled in and the site is deployed.
