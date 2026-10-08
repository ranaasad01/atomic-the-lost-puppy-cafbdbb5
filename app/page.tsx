"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { bounceIn, fadeInUp, scaleIn } from "@/lib/motion";

// ─── Story Data ────────────────────────────────────────────────────────────────

type EndingId = "ending-ranger" | "ending-mia" | "ending-gate" | "ending-leo";

const ENDING_IDS: EndingId[] = ["ending-ranger", "ending-mia", "ending-gate", "ending-leo"];
const TOTAL_ENDINGS = ENDING_IDS.length;
const APP_NAME = "Lost Puppy";
const APP_TAGLINE = "A story about kindness";

interface Choice {
  label: string;
  emoji: string;
  next: string;
}

interface Screen {
  id: string;
  emoji: string;
  title: string;
  text: string;
  choices?: Choice[];
  isEnding?: boolean;
  endingId?: EndingId;
  endingLabel?: string;
}

const SCREENS: Record<string, Screen> = {
  start: {
    id: "start",
    emoji: "🐾",
    title: "A Rainy Morning",
    text: "You are walking home from school when you spot a tiny puppy sitting under a bush. He is soaking wet and shivering. His collar says his name is Biscuit. What do you do?",
    choices: [
      { label: "Pick him up and look for his owner", emoji: "🤗", next: "search" },
      { label: "Knock on the nearest door for help", emoji: "🚪", next: "door" },
      { label: "Call out to see if anyone is nearby", emoji: "📣", next: "shout" },
    ],
  },
  search: {
    id: "search",
    emoji: "🐶",
    title: "Biscuit in Your Arms",
    text: "You scoop up Biscuit and he licks your nose! He is so warm and fluffy. You walk down the street looking for anyone who might know him. You see a park ranger and a lady putting up posters.",
    choices: [
      { label: "Talk to the park ranger", emoji: "🌲", next: "ranger" },
      { label: "Run to the lady with the posters", emoji: "📋", next: "mia" },
    ],
  },
  door: {
    id: "door",
    emoji: "🏠",
    title: "A Friendly Neighbour",
    text: "You knock on the door and a kind old man named Mr. Chen opens it. He smiles when he sees Biscuit. He says he has seen the puppy before and knows exactly where he lives!",
    choices: [
      { label: "Ask Mr. Chen to show you the way", emoji: "🗺️", next: "gate" },
      { label: "Let Mr. Chen call the owner for you", emoji: "📞", next: "gate" },
    ],
  },
  shout: {
    id: "shout",
    emoji: "📣",
    title: "Someone Hears You!",
    text: "You call out loudly and a boy about your age comes running around the corner. His name is Leo and his eyes go wide when he sees Biscuit. He has been searching everywhere!",
    choices: [
      { label: "Help Leo carry Biscuit home", emoji: "🏃", next: "leo" },
      { label: "Walk together slowly so Biscuit stays calm", emoji: "🐾", next: "leo" },
    ],
  },
  ranger: {
    id: "ranger",
    emoji: "🌲",
    title: "The Park Ranger",
    text: "The park ranger, Officer Priya, kneels down and checks Biscuit's collar. She has a special scanner and finds a chip with the owner's address. She radios for help and a few minutes later a car pulls up.",
    choices: [
      { label: "Wait and see who gets out", emoji: "🚗", next: "ending-ranger" },
    ],
  },
  mia: {
    id: "mia",
    emoji: "📋",
    title: "The Lady with Posters",
    text: "The lady gasps and drops her posters. Her name is Mia and she has been looking for Biscuit all morning! She hugs the puppy tight and then hugs you too. Tears of joy run down her cheeks.",
    choices: [
      { label: "Celebrate with Mia!", emoji: "🎉", next: "ending-mia" },
    ],
  },
  gate: {
    id: "gate",
    emoji: "🏡",
    title: "The Yellow Gate",
    text: "Mr. Chen leads you to a house with a bright yellow gate. He rings the bell and a little girl named Rosie bursts out. She sees Biscuit and squeals with delight, spinning in circles!",
    choices: [
      { label: "Watch the happy reunion!", emoji: "🌟", next: "ending-gate" },
    ],
  },
  leo: {
    id: "leo",
    emoji: "🏠",
    title: "Leo's House",
    text: "Leo leads you around the corner to a cosy house with flower pots by the door. His mum is standing on the porch looking worried. When she sees Biscuit she claps her hands and laughs with relief!",
    choices: [
      { label: "Join the celebration!", emoji: "🎊", next: "ending-leo" },
    ],
  },
  "ending-ranger": {
    id: "ending-ranger",
    emoji: "🌈",
    title: "A Hero's Welcome!",
    text: "A family jumps out of the car and their little boy runs straight to Biscuit. Officer Priya gives you a special Junior Ranger sticker for being so kind and brave. Biscuit barks happily as you wave goodbye. What a wonderful adventure!",
    isEnding: true,
    endingId: "ending-ranger",
    endingLabel: "The Ranger Ending",
  },
  "ending-mia": {
    id: "ending-mia",
    emoji: "🌸",
    title: "Best Friends Forever!",
    text: "Mia invites you in for hot chocolate and biscuits (the cookie kind!). She tells you Biscuit escaped through a hole in the fence. She promises to fix it and gives you a big thank-you card. Biscuit falls asleep on your lap. Perfect!",
    isEnding: true,
    endingId: "ending-mia",
    endingLabel: "The Mia Ending",
  },
  "ending-gate": {
    id: "ending-gate",
    emoji: "⭐",
    title: "Rosie's Big Smile!",
    text: "Rosie's parents come out and shake your hand. They give you a jar of homemade cookies and a drawing Rosie made of Biscuit. Mr. Chen winks at you proudly. You walk home feeling like the happiest person in the whole world!",
    isEnding: true,
    endingId: "ending-gate",
    endingLabel: "The Yellow Gate Ending",
  },
  "ending-leo": {
    id: "ending-leo",
    emoji: "🎈",
    title: "New Friends!",
    text: "Leo's mum makes everyone warm soup. Leo says you are the bravest person he has ever met and asks if you want to be friends. Biscuit curls up between you both and snores softly. You have found a puppy AND a new best friend!",
    isEnding: true,
    endingId: "ending-leo",
    endingLabel: "The Leo Ending",
  },
};

// ─── Ending badge colours ──────────────────────────────────────────────────────

const ENDING_COLORS: Record<EndingId, string> = {
  "ending-ranger": "bg-[var(--badge-ranger)] text-[var(--badge-ranger-text)]",
  "ending-mia":    "bg-[var(--badge-mia)]    text-[var(--badge-mia-text)]",
  "ending-gate":   "bg-[var(--badge-gate)]   text-[var(--badge-gate-text)]",
  "ending-leo":    "bg-[var(--badge-leo)]    text-[var(--badge-leo-text)]",
};

const ENDING_EMOJIS: Record<EndingId, string> = {
  "ending-ranger": "🌈",
  "ending-mia":    "🌸",
  "ending-gate":   "⭐",
  "ending-leo":    "🎈",
};

// ─── Button variants ───────────────────────────────────────────────────────────

const choiceVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.4, ease: "easeOut" },
  }),
};

const screenVariants: Variants = {
  enter: { opacity: 0, scale: 0.94, y: 20 },
  center: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, scale: 1.04, y: -16, transition: { duration: 0.3, ease: "easeIn" } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [currentId, setCurrentId] = useState<string>("start");
  const [foundEndings, setFoundEndings] = useState<Set<EndingId>>(new Set());
  const [direction, setDirection] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("lostpuppy-endings");
      if (saved) {
        const parsed: string[] = JSON.parse(saved);
        const valid = parsed.filter((e): e is EndingId =>
          ENDING_IDS.includes(e as EndingId)
        );
        setFoundEndings(new Set(valid));
      }
    } catch {
      // ignore
    }
  }, []);

  const screen = SCREENS[currentId];

  function navigate(nextId: string) {
    setDirection(1);
    setCurrentId(nextId);
    const next = SCREENS[nextId];
    if (next?.isEnding && next.endingId) {
      setFoundEndings((prev) => {
        const updated = new Set(prev);
        updated.add(next.endingId as EndingId);
        try {
          localStorage.setItem(
            "lostpuppy-endings",
            JSON.stringify([...updated])
          );
        } catch {
          // ignore
        }
        return updated;
      });
    }
  }

  function restart() {
    setDirection(-1);
    setCurrentId("start");
  }

  if (!screen) return null;

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col items-center py-10 px-4">
      {/* Header */}
      <Reveal className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          {screen.emoji} {APP_NAME}
        </h1>
        <p className="text-[var(--muted)] mt-1 text-sm">{APP_TAGLINE}</p>
      </Reveal>

      {/* Progress */}
      <Reveal className="w-full max-w-md mb-6">
        <div className="flex items-center justify-between text-xs text-[var(--muted)] mb-1">
          <span>Endings found</span>
          <span>
            {foundEndings.size} / {TOTAL_ENDINGS}
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-[var(--track)]">
          <motion.div
            className="h-2 rounded-full bg-[var(--accent)]"
            animate={{ width: `${(foundEndings.size / TOTAL_ENDINGS) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </Reveal>

      {/* Ending badges */}
      {mounted && foundEndings.size > 0 && (
        <Reveal className="w-full max-w-md mb-6">
          <div className="flex flex-wrap gap-2">
            {ENDING_IDS.filter((eid: EndingId) => foundEndings.has(eid)).map((eid: EndingId) => (
              <span
                key={eid}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  ENDING_COLORS[eid]
                }`}
              >
                {ENDING_EMOJIS[eid]} {SCREENS[eid]?.endingLabel ?? eid}
              </span>
            ))}
          </div>
        </Reveal>
      )}

      {/* Screen card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentId}
          variants={screenVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full max-w-md bg-[var(--card)] rounded-2xl shadow-xl p-6 mb-6"
        >
          <motion.div variants={bounceIn} initial="hidden" animate="visible" className="text-6xl text-center mb-4">
            {screen.emoji}
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-2xl font-bold text-center mb-3"
          >
            {screen.title}
          </motion.h2>

          <motion.p
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="text-[var(--muted)] text-center leading-relaxed mb-6"
          >
            {screen.text}
          </motion.p>

          {/* Choices */}
          {screen.choices && (
            <div className="flex flex-col gap-3">
              {screen.choices.map((choice, i) => (
                <motion.button
                  key={choice.next}
                  custom={i}
                  variants={choiceVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(choice.next)}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl bg-[var(--choice-bg)] hover:bg-[var(--choice-hover)] transition-colors font-medium"
                >
                  <span className="text-2xl">{choice.emoji}</span>
                  <span>{choice.label}</span>
                </motion.button>
              ))}
            </div>
          )}

          {/* Ending actions */}
          {screen.isEnding && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-3 mt-2"
            >
              <button
                onClick={restart}
                className="w-full px-4 py-3 rounded-xl bg-[var(--accent)] text-[var(--accent-fg)] font-semibold hover:opacity-90 transition-opacity"
              >
                🔄 Play Again
              </button>
              {foundEndings.size < TOTAL_ENDINGS && (
                <p className="text-center text-xs text-[var(--muted)]">
                  {TOTAL_ENDINGS - foundEndings.size} more ending
                  {TOTAL_ENDINGS - foundEndings.size === 1 ? "" : "s"} to discover!
                </p>
              )}
              {foundEndings.size === TOTAL_ENDINGS && (
                <p className="text-center text-xs text-[var(--muted)] font-semibold">
                  🏆 You found all {TOTAL_ENDINGS} endings!
                </p>
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* All-endings grid */}
      {mounted && (
        <Reveal className="w-full max-w-md">
          <h3 className="text-sm font-semibold text-[var(--muted)] mb-3 text-center">
            All Endings
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {ENDING_IDS.map((eid: EndingId, i: number) => {
              const found = foundEndings.has(eid);
              return (
                <div
                  key={eid}
                  className={`rounded-xl p-3 text-center text-sm font-medium border-2 transition-all ${
                    found
                      ? `${ENDING_COLORS[eid]} border-transparent`
                      : "border-[var(--track)] text-[var(--muted)] opacity-50"
                  }`}
                >
                  <div className="text-2xl mb-1">
                    {found ? ENDING_EMOJIS[eid] : "❓"}
                  </div>
                  <div>
                    {found ? SCREENS[eid]?.endingLabel ?? eid : `Ending ${i + 1}`}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      )}
    </main>
  );
}
