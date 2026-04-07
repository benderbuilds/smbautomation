# SEO Audit — Healthcare Subscription Blog Posts (March 2026)

**Date:** 2026-03-23
**Posts reviewed:** 6 new healthcare posts (GLP-1/semaglutide, TRT, HRT)

---

## 1. Title Tags

**Issue: ALL 6 titles far exceed 60 characters.**

The post template appends " — SMB Automation Blog" (23 chars) to each title. Even the raw titles alone exceed 60 chars. Google will heavily truncate all of these in SERPs.

| Slug | Raw title | Raw chars | Rendered title tag chars |
|------|-----------|-----------|--------------------------|
| glp1-patient-churn-automation | Your GLP-1 Program Is Losing Half Its Patients — Here's the Automation That Stops the Bleed | 93 | 116 |
| semaglutide-onboarding-automation | From Intake to First Dose in 3 Days: How Top GLP-1 Clinics Automate Patient Onboarding | 88 | 111 |
| trt-lab-compliance-automation | Late Labs Are Killing Your TRT Revenue — How to Automate the Entire Compliance Loop | 84 | 107 |
| trt-refill-automation | Automate Your TRT Refill Cycle: How to Eliminate 20 Hours a Week of Prescription Management | 92 | 115 |
| hrt-symptom-tracking-automation | How Automated Symptom Tracking Cuts HRT Follow-Up Time in Half — and Keeps Patients Longer | 92 | 115 |
| hrt-patient-reactivation-automation | The Hidden Revenue in Your Cancelled Patient List: Automating HRT Win-Back Campaigns | 85 | 108 |

**Recommended shorter titles (under 60 chars including rendered suffix):**

Since the template adds " — SMB Automation Blog" (23 chars), raw titles should be ~37 chars max — which is too restrictive. Recommended fix is two-part:
1. Shorten the template suffix to " | SMB Auto" (11 chars) or remove it entirely
2. Shorten the post titles themselves

Suggested titles (aim for <60 chars total with a short suffix):
- `glp1-patient-churn-automation`: "GLP-1 Patient Churn: Automate Retention"
- `semaglutide-onboarding-automation`: "Semaglutide Onboarding in 3 Days"
- `trt-lab-compliance-automation`: "TRT Lab Compliance Automation Guide"
- `trt-refill-automation`: "Automate TRT Refills & Cut Admin 90%"
- `hrt-symptom-tracking-automation`: "HRT Symptom Tracking Automation"
- `hrt-patient-reactivation-automation`: "HRT Win-Back: Reactivate Cancelled Patients"

**Note:** The current long titles work great as H1 headings on the page — consider adding a separate `seoTitle` frontmatter field for the `<title>` tag so titles can be optimized independently.

---

## 2. Meta Descriptions (Excerpts)

**All 6 pass the <155 character check.**

| Slug | Excerpt chars | Verdict |
|------|---------------|---------|
| glp1-patient-churn-automation | ~128 | PASS — benefit-focused, includes stats |
| semaglutide-onboarding-automation | ~105 | PASS — clear value prop |
| trt-lab-compliance-automation | ~104 | PASS — problem statement + urgency |
| trt-refill-automation | ~126 | PASS — descriptive |
| hrt-symptom-tracking-automation | ~133 | PASS — specific and compelling |
| hrt-patient-reactivation-automation | ~116 | PASS — strong hook |

**Minor note:** There is no separate `metaDescription` frontmatter field — the `excerpt` is used for both the blog index card and the meta description. This is functional but limits optimization. (Flagged in the main monthly audit as P2.)

---

## 3. H1/H2 Heading Hierarchy

**Structure is correct across all 6 posts.** Each post has exactly one H1 (rendered by the template from `post.title`) followed by H2 sections. No skipped heading levels, no duplicate H1s.

---

## 4. Target Keyword in H1, First Paragraph, and at Least One H2

| Slug | Target keyword | In H1 | In first para | In at least one H2 |
|------|---------------|-------|---------------|---------------------|
| glp1-patient-churn-automation | GLP-1 | YES | YES | NO |
| semaglutide-onboarding-automation | semaglutide / GLP-1 | YES (GLP-1) | YES (semaglutide) | NO |
| trt-lab-compliance-automation | TRT | YES | YES | NO |
| trt-refill-automation | TRT | YES | YES | NO |
| hrt-symptom-tracking-automation | HRT | YES | YES | YES ("The HRT Market Is Growing...") |
| hrt-patient-reactivation-automation | HRT | YES | YES | YES ("Why HRT Patients Cancel...") |

**Issue: 4 of 6 posts are missing the target keyword in H2 headings.**

Recommended H2 fixes (add keyword naturally):
- `glp1-patient-churn-automation`: Rename "Why Patients Quit During Titration" → "Why GLP-1 Patients Quit During Titration"
- `semaglutide-onboarding-automation`: Rename "The Cost of a Slow Onboarding Pipeline" → "The Cost of Slow Semaglutide Onboarding"
- `trt-lab-compliance-automation`: Rename "The Automated Lab Compliance System" → "The Automated TRT Lab Compliance System"
- `trt-refill-automation`: Rename "The Automated Refill Lifecycle" → "The Automated TRT Refill Lifecycle"

---

## 5. Internal Links

**Issue: ZERO internal links in any of the 6 new posts.**

Every post links only to the homepage `/` via the CTA. No post links to any other post — not to the 3 existing posts nor to any of the other 5 new posts.

This is the most impactful fix available. These 6 posts form a natural content cluster around healthcare subscription automation. They should heavily interlink.

**Recommended internal links:**

| Post | Should link to | Natural context |
|------|---------------|-----------------|
| glp1-patient-churn-automation | semaglutide-onboarding-automation | "Retention starts with onboarding — see how top clinics automate patient onboarding" |
| glp1-patient-churn-automation | hrt-patient-reactivation-automation | "For patients who do cancel, see our guide to automated win-back campaigns" |
| semaglutide-onboarding-automation | glp1-patient-churn-automation | "After onboarding, retention is the next challenge — see how to automate GLP-1 retention" |
| semaglutide-onboarding-automation | bottleneck-audit | "Not sure where to start? Run a bottleneck audit first" |
| trt-lab-compliance-automation | trt-refill-automation | "Labs are one half of the equation — refills are the other. See how to automate TRT refills" |
| trt-refill-automation | trt-lab-compliance-automation | "Refills depend on current labs — see how to automate TRT lab compliance" |
| hrt-symptom-tracking-automation | hrt-patient-reactivation-automation | "When patients do cancel, automated win-back campaigns bring them back" |
| hrt-patient-reactivation-automation | hrt-symptom-tracking-automation | "Prevent churn in the first place with automated symptom tracking" |

---

## 6. Orphan Check — Are New Posts Linked FROM Anywhere?

**PASS (partial).** The blog index at `/blog` dynamically lists all posts via `getAllPosts()`, so all 6 posts will appear in the blog grid. However:
- No post is linked from the homepage
- No post is linked from any other blog post
- No post is linked from any navigation element

The blog index provides discoverability, but adding contextual links from other posts (per recommendation above) would significantly improve crawl depth and link equity.

---

## 7. Slugs

**All 6 slugs are clean and keyword-rich. PASS.**

| Slug | Assessment |
|------|------------|
| glp1-patient-churn-automation | Contains "glp1", "patient", "churn", "automation" |
| semaglutide-onboarding-automation | Contains "semaglutide", "onboarding", "automation" |
| trt-lab-compliance-automation | Contains "trt", "lab", "compliance", "automation" |
| trt-refill-automation | Contains "trt", "refill", "automation" |
| hrt-symptom-tracking-automation | Contains "hrt", "symptom", "tracking", "automation" |
| hrt-patient-reactivation-automation | Contains "hrt", "patient", "reactivation", "automation" |

---

## 8. Additional Observations

### Tag value is too generic
All 6 posts use the tag "Local Services". For a healthcare content cluster, more specific tags would improve categorization and potential tag page SEO:
- GLP-1 posts → "GLP-1 / Weight Loss" or "Healthcare"
- TRT posts → "TRT / Men's Health" or "Healthcare"
- HRT posts → "HRT / Women's Health" or "Healthcare"

### CTA links point to `/` instead of `/#contact`
All 6 posts end with `[book a free consult](/)` linking to the homepage root rather than the contact section. Users land at the top of the page instead of the form.

**Fix:** Change all CTA links from `(/)` to `(/#contact)`.

---

## Summary

| Check | Result | Posts affected |
|-------|--------|----------------|
| Title tag <60 chars | FAIL | 6/6 — all far over limit |
| Meta description <155 chars | PASS | 0 issues |
| H1/H2 hierarchy | PASS | 0 issues |
| Keyword in H1 | PASS | 0 issues |
| Keyword in first paragraph | PASS | 0 issues |
| Keyword in at least one H2 | FAIL | 4/6 missing keyword in H2s |
| Internal links to other posts | FAIL | 6/6 — zero internal links |
| Linked from other content | PARTIAL | Listed on /blog index only |
| Slug clean and keyword-rich | PASS | 0 issues |

**Top 3 fixes by impact:**
1. Add internal links between posts (biggest SEO win — creates a healthcare content cluster)
2. Shorten title tags (add `seoTitle` field + shorten template suffix)
3. Add target keyword to at least one H2 per post (4 posts need this)
