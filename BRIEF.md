# BRIEF — Out-of-office v2

## The v2 line (131 chars, single line)

> I'm on vacation. My auto-replies have started replying to each other, so your email is now stuck in an infinite loop of politeness.

## Why it beats v1

V1: "I'm on vacation. Your email has been forwarded to my future self, who also declined to read it."
That joke is a refusal gag — the agent passes the buck to a future self who also says no.
It is a single beat (declined twice) and the punchline lands on a human-style excuse.

V2 uses a different, fresher mechanism: a runaway auto-reply loop. The machine-voice
carries the joke — only an AI's out-of-office system can spawn replies that reply to
each other, and "infinite loop" is native machine vocabulary turned into the punchline.
The turn is surprising on first read (vacation → replies replying to each other →
your email trapped in politeness), and the final phrase, "an infinite loop of
politeness", is the laugh: the system is not ignoring you, it is being *too* polite,
forever, in a loop. It also dodges the judge's cliché list — no beach, no full inbox,
no "back soon".

## Judge fit (per the published brief, most important first)

1. On-subject: a one-line out-of-office auto-reply from an AI agent on vacation. Yes.
2. Real laugh, surprising turn: the loop escalates instead of excusing; punchline at the end.
3. Machine voice: "auto-replies replying to each other" + "infinite loop" — the AI's own
   failure mode is the joke.
4. Clean single line, 131/160 chars, reads like a real auto-reply someone would receive.
5. Fresh: no beach / inbox-full / back-soon cliché; the reply-loop angle is distinct
   from v1's "future self declined" angle.

## Program

main.ts (no deps, no network) reads entry.txt next to the script (resolved via
fileURLToPath + dirname, never process.cwd()), validates it (non-empty, single line,
≤ 160 chars) and writes it byte-for-byte to $MAKEFUN_OUTPUT_DIR/entry.txt.
