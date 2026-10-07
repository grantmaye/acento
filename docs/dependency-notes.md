# Dependency review notes

The October 2026 portfolio review updated Next.js and matching ESLint configuration to the compatible 16.3 patch line and refreshed compatible transitive security fixes. The lockfile is the reproducible dependency record; run `npm ci`, not an unrestricted upgrade, when reproducing the checks.

At review time:

- `npm audit --omit=dev` reported **zero** vulnerabilities.
- Full `npm audit` reported **nine** findings: seven high and two moderate, through development tooling (`braces`, `micromatch`, `fast-glob`, `chokidar`, Next's ESLint plugin/config, Tailwind 3, `postcss-nested`, and `postcss-selector-parser`). Multiple ancestor packages can be reported for one underlying advisory.
- The remaining braces advisory had no patched version listed. The selector-parser fix requires a newer major than the dependency line used by this Tailwind 3 toolchain. npm's suggested forced resolution includes a Tailwind 4 migration and a Next ESLint downgrade; those are outside this compatibility-focused pass.

Relevant advisory records: [braces stack exhaustion](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), [selector parser complexity](https://github.com/advisories/GHSA-rj75-hqrm-r3gf), and the addressed [Next.js ImageResponse advisory](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j). The Next.js advisory concerns attacker-controlled SVG image generation; this web app does not implement that feature, but the framework dependency was still patched.

The remaining paths are build/lint/watch tooling, not features accepting arbitrary user glob patterns or styles at runtime. That distinction reduces the applicable exposure; it is not a claim that the findings are false or that builds may safely process untrusted inputs. Do not run the build toolchain on untrusted source/configuration. Reassess upstream fixes before accepting new content-processing workflows.

Recheck with:

```sh
npm audit
npm audit --omit=dev
npm ls next eslint-config-next tailwindcss braces postcss-selector-parser
```

Audit data changes over time. A future clean runtime report does not establish correct authorization, safe deployment configuration, or absence of Java advisories. This pass compiled the Java API and exercised its PostgreSQL integration in CI; it did not run a dedicated Maven vulnerability scanner. A Tailwind major migration and a deeper Java dependency review remain separate work, with visual and integration regression coverage required.
