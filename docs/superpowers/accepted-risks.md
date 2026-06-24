## elliptic * (GHSA-848j-6mx2-7j84) — low

**Package:** @storybook/nextjs → node-polyfill-webpack-plugin → crypto-browserify → elliptic  
**Advisory:** https://github.com/advisories/GHSA-848j-6mx2-7j84  
**Severity:** low (use of cryptographic primitive with risky implementation — Koblitz curves)  
**Why accepted:** All versions of elliptic are marked as affected — there is no patched release. The vulnerability exists only in Storybook's dev-time webpack bundling, never in production builds. Production exposure is zero. Fixing would require downgrading @storybook/nextjs from v9 to v7 (two major versions), which is a regression.  
**Reviewed:** 2026-06-24  
