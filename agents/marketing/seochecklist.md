# SEO Check List


## 1. Technical SEO
- [ ] Crawlability & Indexation
  - [ ] Robots.txt configured correctly (allow critical paths, disallow duplicates / staging).
  - [ ] XML Sitemap generated and auto-submitted to Google Search Console (GSC) & Bing WMT.
  - [ ] HTTPS enforced site-wide (HSTS, 301 redirect from HTTP → HTTPS).
  - [ ] Canonical tags self-referencing and unique per URL.
  - [ ] 4xx & 5xx errors fixed; custom 404 page returns 404 status.
  - [ ] Pagination handled with rel=“next/prev” or “view-all” canonical.
- [ ] Site Speed & Core Web Vitals
  - [ ] LCP < 2.5 s, FID < 100 ms, CLS < 0.1 (field data).
  - [ ] Critical CSS inlined, unused CSS/JS removed or deferred.
  - [ ] Images served in next-gen formats (WebP/AVIF) with explicit width/height.
  - [ ] Lazy-loading (native or via IntersectionObserver).
  - [ ] Server response < 200 ms (TTFB).
- [ ] Mobile-First & UX
  - [ ] Responsive, passes Google Mobile-Friendly Test.
  - [ ] Tap targets ≥ 48×48 px; font size ≥ 16 px.
  - [ ] Intrusive interstitials removed.
- [ ] Structured Data
  - [ ] JSON-LD schema.org markup validated (Product, Article, Breadcrumb, FAQ, Review).
  - [ ] No manual actions or rich-result errors in GSC.
- [ ] International & Multilingual
  - [ ] hreflang tags implemented and return 200 status.
  - [ ] Default/x-default hreflang present.
  - [ ] Currency & language selectors crawlable.
- [ ] Security & Maintenance
  - [ ] SSL certificate valid, auto-renewal enabled.
  - [ ] Security headers in place (CSP, X-Frame-Options, X-Content-Type-Options).
  - [ ] Daily automated backup and uptime monitoring (Pingdom / UptimeRobot).
  - [ ] Staging environment blocked from indexing (robots.txt + basic auth).

---

## 2. On-Page SEO
- [ ] Keyword Mapping
  - [ ] One primary keyword + 2-4 secondary keywords mapped per URL.
  - [ ] Search intent (informational, commercial, transactional) aligned with content.
- [ ] Title Tags
  - [ ] 50-60 characters, primary keyword near the front, unique across site.
- [ ] Meta Descriptions
  - [ ] 140-155 characters, compelling CTA, includes primary keyword.
- [ ] URL Structure
  - [ ] Short, hyphenated, lowercase, static; no parameters when possible.
- [ ] Heading Hierarchy
  - [ ] One H1 per page; logical H2-H3 structure including variations/LSI.
- [ ] Content Optimization
  - [ ] ≥ 300 words for product/category pages; ≥ 1 000 for blog/guides.
  - [ ] Keyword density ~ 1-2 %, natural placement (first 100 words, last 100 words, sub-headings).
  - [ ] Synonyms & related entities used (NLP coverage).
- [ ] Internal Linking
  - [ ] 3-5 contextual internal links per page (descriptive anchor text).
  - [ ] Orphan pages audit quarterly; update sitemap.
- [ ] Image SEO
  - [ ] Descriptive filenames & alt text (include keyword where relevant).
  - [ ] Compress to < 100 KB average; width ≤ 1 600 px.
- [ ] User Engagement Signals
  - [ ] Clear above-the-fold value proposition.
  - [ ] Table of contents for long-form.
  - [ ] Commenting or Q&A section enabled and moderated.

---

## 3. Off-Page SEO
- [ ] Link Building
  - [ ] Backlink audit (Ahrefs / SEMrush) – disavow toxic links.
  - [ ] Target DR 40+ sites; 5-10 new referring domains per month.
  - [ ] Diversify anchor text (branded 60 %, partial match 30 %, generic 10 %).
- [ ] Digital PR & Brand Mentions
  - [ ] Publish 1 data-driven study/quarter; outreach to journalists.
  - [ ] Monitor unlinked brand mentions (BuzzSumo / Ahrefs Alerts) and reclaim links.
- [ ] Local SEO (if applicable)
  - [ ] Google Business Profile claimed & fully optimized.
  - [ ] NAP consistency across citations.
  - [ ] Local citations & directories (Yelp, Apple Maps, Bing Places).
- [ ] Social Signals
  - [ ] Share buttons prominent; Open Graph & Twitter Cards validated.
  - [ ] Monthly social media audits (shares, engagement, referral traffic).

---

## 4. Content Strategy
- [ ] Editorial Calendar
  - [ ] 12-month calendar with quarterly OKRs (traffic, leads, revenue).
  - [ ] Content gap analysis vs. top 5 SERP competitors.
- [ ] Content Types
  - [ ] 40 % evergreen how-to guides, 25 % product-led, 20 % comparison, 15 % thought-leadership.
  - [ ] Video transcripts & schema markup for embedded videos.
- [ ] E-E-A-T Compliance
  - [ ] Author bios with credentials, LinkedIn profile links.
  - [ ] External citations to high-authority sources (.gov, .edu, peer-reviewed).
  - [ ] Review & update core pages every 6 months (dateModified in schema).
- [ ] Conversion Paths
  - [ ] CTA buttons above the fold and after 75 % scroll.
  - [ ] Lead magnets (checklists, templates) gated behind email capture.
  - [ ] A/B test headlines & CTAs monthly (Google Optimize / VWO).
- [ ] Content Repurposing & Distribution
  - [ ] Turn top blog posts into Twitter threads, LinkedIn carousels, short-form videos.
  - [ ] Syndicate to Medium & industry publications with canonical tags.

---

## Usage for LLMs
- Each checkbox can be parsed as `- [ ]` (incomplete) or `- [x]` (completed).
- Sections map directly to the original Google-Sheet tabs.
- Append `<!-- LLM: priority=high -->` or other metadata inline to enable automated prioritization.