# Acento's product story: language with social context

Knowing a translation is different from knowing when to say it. A learner may recognize a Spanish phrase yet still wonder whether it fits a friend, a teacher, a stranger, or a formal meeting. Regional speech adds another layer: a word can be common in one place, mean something different elsewhere, or depend strongly on tone and relationship.

Acento explores that problem through a small Dominican-Spanish learning prototype. Its content pairs standard and regional wording with meaning, cultural context, formality, and guidance about safe and risky situations. This is an explanation of the product's intended benefit, inferred from its source and content model. It is not a claim about the creator's personal history, paying customers, revenue, learning outcomes, or a deployed language school.

## A clearly hypothetical learner

Imagine an English-speaking learner preparing to spend time with a Dominican friend's family. They know some standard Spanish but have seen informal expressions in messages and are unsure where those expressions belong. They do not need an endless feed of slang. They need a small amount of language accompanied by enough context to avoid assuming that every phrase fits every relationship.

In a hypothetical “before” workflow, the learner copies an expression from a message, looks up a translation elsewhere, and guesses about tone. A flashcard might give the literal meaning without explaining whether a formal alternative would be wiser.

Acento's implemented web slice starts with one Greetings phrase. The learner reads it, compares standard and Dominican wording, opens safe-use and avoid-use guidance, and answers an authored context question. The dictionary provides examples and usage warnings for fourteen terms. Saving a phrase keeps it available during the current session. The interface states clearly that saving and progress reset on reload.

This hypothetical scenario is not evidence that the content has been clinically or educationally validated, nor that a learner will become fluent. The content should receive appropriate regional editorial review as it evolves. Its actual records are inspectable in [packages/content](../packages/content/src/index.ts), and review expectations are in [content-safety.md](content-safety.md).

## What makes the idea useful

The [shared model](../packages/shared/src/index.ts) separates dialect, formality, slang level, and social context. That is a substantive product choice: regional language is not automatically risky slang, and the same written phrase can carry different implications in different settings.

The warm paper background, sienna accents, restrained typography, and compact one-phrase session support a focused learning rhythm. The current implementation is in [product.tsx](../apps/web/app/product.tsx); it uses reusable [UI components](../packages/ui/src/index.ts) without turning the experience into a generic analytics dashboard.

| Hypothetical before                               | Acento's current learning slice                      |
| ------------------------------------------------- | ---------------------------------------------------- |
| Translation detached from situation               | Meaning plus context and cultural note               |
| Treating all regional language as slang           | Separate dialect, formality, and slang fields        |
| Guessing whether a greeting fits a formal setting | Authored Greetings quiz with an explanation          |
| A long unsorted list of expressions               | One phrase at a time and a small session saved list  |
| Unclear recording status                          | Explicit unavailable-audio label and text comparison |

The intended beneficiaries are learners interested in contextual regional speech, educators reviewing a structured content approach, and developers studying how a content model shapes a learning interface. These are plausible users, not claimed customers. No improvement in fluency, retention, cultural competence, or engagement has been measured here.

## Current value and honest limits

The repository includes ten starter lessons and fifty phrases, but the present web flow exposes the five Greetings phrases and a searchable dictionary. There is no lesson selector yet. Progress records button-driven completion; it does not measure comprehension. Saved phrases, progress, and daily goals are memory-only. There are no playable recordings, authentication, AI coaching, account sync, or live learner database writes.

The Spring API exposes scaffold information and applies a database schema. The web does not call it. SwiftUI and Compose files are foundations rather than verified distributable clients. These boundaries matter because a polished interface can otherwise imply a more complete platform than exists. The [technical manual](technical-manual.md) teaches both the working slice and the missing integration work.

## An honest 60–90 second demo

**0–15 seconds:** “Acento is a regional-Spanish learning prototype focused on context. The content package starts with Dominican Spanish, and this web session walks through Greetings.” Show the phrase and the explicit session-reset notice.

**15–35 seconds:** Click Compare phrases and Learn why. “Standard and regional wording sit beside guidance about formality and social use. Sometimes they are the same word; regional does not automatically mean slang.” Point to the disabled audio control. “Reviewed recordings are not included yet.”

**35–55 seconds:** Answer the Greetings job-interview question incorrectly, then choose `Buenos días`. “Feedback comes from the authored lesson question and explanation. The product should teach why a choice fits, not blindly reward the regional wording.”

**55–75 seconds:** Save a phrase, move on, and search the dictionary for `guagua`. “The dictionary pairs meaning with an example and a usage note. The saved list and progress are temporary in this prototype.”

**75–90 seconds:** “The repository also contains a tested API/database foundation and native scaffolds, but the web does not use them yet. The manual shows the real architecture and exercises for adding durable state, identity, lesson navigation, and audio.”

The credible next chapter is to deepen and verify this learning workflow, guided by content review and actual learner needs. It is not to invent a story of production scale around a scaffold.
