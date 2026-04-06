"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Customization ──────────────────────────────────────────────
const HER_NAME = "Tania Khan"; // Change this to her name!
const SONG_PATH = "/Sorry_Sorry.mp3"; // Put your audio file in /public and update this name if needed.
// ──────────────────────────────────────────────────────────────

const CONSOLE_LOGS = [
  "$ initializing_fix.sh",
  "> scanning error source...",
  "> detecting ego... found.",
  "> removing ego... ✔ done",
  "> increasing love... ✔ done",
  "> applying emotional patch...",
  "> compiling apology.txt...",
  "> patch ready. awaiting approval.",
];

const CHECKLIST = [
  "More understanding",
  "Less stupidity",
  "More patience",
  "Better boyfriend behavior",
  "Unlimited love ♾",
];

const CHAOS_TESTS = [
  { label: "EgoLimiter.exe", score: 99 },
  { label: "ListeningSkill.dll", score: 97 },
  { label: "OverthinkingFirewall", score: 95 },
  { label: "RomanceAPI", score: 100 },
];

const EXCUSES = [
  "My Wi-Fi was down",
  "Mercury retrograde",
  "Cat stepped on keyboard",
  "No excuses. I was wrong.",
];

const MEMORIES = [
  {
    src: "/memories/memory-1.jpg",
    title: "The Day We Laughed Too Much",
    note: "Bug count: 0 | Smile count: infinite",
  },
  {
    src: "/memories/memory-2.jpg",
    title: "Our Favorite Food Mission",
    note: "Calories high, drama low, vibes perfect",
  },
  {
    src: "/memories/memory-3.jpg",
    title: "That Random Cute Selfie",
    note: "Taken in 0.5x chaos mode",
  },
  {
    src: "/memories/memory-4.jpg",
    title: "Sunrise + Us + Peace",
    note: "Best deployed update so far",
  },
  {
    src: "/memories/memory-5.jpg",
    title: "Walk, Talk, Repeat",
    note: "Daily standup with extra romance",
  },
  {
    src: "/memories/memory-6.jpg",
    title: "Tiny Moment, Big Memory",
    note: "Saved in heart cache forever",
  },
];

const HEART_EMOJIS = ["❤", "💙", "💜", "🤍", "💗", "💕", "🩷"];

// ── Sub-components ────────────────────────────────────────────

function AppButton({
  children,
  onClick,
  variant = "blue",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "blue" | "pink" | "green" | "ghost";
}) {
  const colors = {
    blue: "border-[#6bb3ff] text-[#6bb3ff] hover:bg-[#6bb3ff22] hover:shadow-[0_0_20px_#6bb3ff44]",
    pink: "border-[#ff6b9d] text-[#ff6b9d] hover:bg-[#ff6b9d22] hover:shadow-[0_0_20px_#ff6b9d44]",
    green:
      "border-[#6bffb3] text-[#6bffb3] hover:bg-[#6bffb322] hover:shadow-[0_0_20px_#6bffb344]",
    ghost:
      "border-[#444] text-[#555] hover:border-[#ff6b9d] hover:text-[#ff6b9d]",
  };
  return (
    <button
      onClick={onClick}
      className={`bg-transparent border font-mono px-8 py-3 text-sm cursor-pointer rounded-md transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] ${colors[variant]}`}
    >
      {children}
    </button>
  );
}

function VersionBadge({ text }: { text: string }) {
  return (
    <span className="text-[11px] text-[#58a6ff] bg-[#58a6ff15] border border-[#58a6ff33] px-3 py-1 rounded-full mb-4 inline-block">
      {text}
    </span>
  );
}

function ConsoleLog({ logs, visible }: { logs: string[]; visible: boolean }) {
  return (
    <div className="bg-[#010409] border border-[#21262d] rounded-md p-4 w-full max-w-xl text-xs min-h-[140px] scrollbar-hide">
      {logs.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: i * 0.45, duration: 0.3 }}
          className="text-[#3fb950] my-0.5"
        >
          {line}
        </motion.div>
      ))}
      {visible && <span className="cursor-blink" />}
    </div>
  );
}

function CheckItem({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="flex items-center gap-3 px-4 py-2.5 my-2 bg-[#0d1117] border border-[#21262d] rounded-md text-sm"
    >
      <div className="w-5 h-5 rounded-full bg-[#3fb950] flex items-center justify-center text-[10px] flex-shrink-0 shadow-[0_0_8px_#3fb95055]">
        ✓
      </div>
      <span className="text-[#c9c9ff]">{text}</span>
    </motion.div>
  );
}

function FloatingHearts() {
  const [hearts, setHearts] = useState<
    {
      id: number;
      left: string;
      emoji: string;
      dur: string;
      delay: string;
      size: string;
    }[]
  >([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      counterRef.current += 1;
      const id = counterRef.current;
      setHearts((prev) => [
        ...prev.slice(-18),
        {
          id,
          left: Math.random() * 100 + "%",
          emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
          dur: 4 + Math.random() * 4 + "s",
          delay: Math.random() * 1 + "s",
          size: 10 + Math.random() * 14 + "px",
        },
      ]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 9000);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {hearts.map((h) => (
        <span
          key={h.id}
          className="heart-particle"
          style={{
            left: h.left,
            bottom: "-20px",
            fontSize: h.size,
            animationDuration: h.dur,
            animationDelay: h.delay,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </>
  );
}

function MuteButton() {
  const [paused, setPaused] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(SONG_PATH);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";
    audio.autoplay = true;

    const onCanPlay = () => {
      setAudioReady(true);
      setAudioError(null);
    };

    const onError = () => {
      setAudioReady(false);
      setAudioError("Song failed to load");
      console.error("Failed to load audio file at:", SONG_PATH);
    };

    audio.addEventListener("canplaythrough", onCanPlay);
    audio.addEventListener("error", onError);

    audioRef.current = audio;

    const tryAutoPlay = async () => {
      try {
        await audio.play();
        setPaused(false);
        setAudioError(null);
      } catch {
        // Browser autoplay policies may block until first user interaction.
        setPaused(true);
        setAudioError("Autoplay blocked: tap anywhere or press play.");
      }
    };

    const startOnFirstInteraction = () => {
      const current = audioRef.current;
      if (!current || !current.paused) return;
      void current
        .play()
        .then(() => {
          setPaused(false);
          setAudioError(null);
        })
        .catch(() => {
          setAudioError("Playback blocked. Press Play Music.");
        });
    };

    void tryAutoPlay();
    window.addEventListener("pointerdown", startOnFirstInteraction, {
      once: true,
    });

    return () => {
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.removeEventListener("error", onError);
      window.removeEventListener("pointerdown", startOnFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (paused || audio.paused) {
      try {
        await audio.play();
        setPaused(false);
        setAudioError(null);
      } catch (error) {
        setAudioError("Tap failed, try again");
        console.error("Audio playback failed. Check SONG_PATH in page.tsx", error);
      }
    } else {
      audio.pause();
      setPaused(true);
    }
  };

  return (
    <button
      onClick={toggle}
      title={audioError ?? `Playing from ${SONG_PATH}`}
      className="fixed top-4 right-4 bg-transparent border border-[#30363d] text-[#8888bb] px-3 py-1.5 font-mono text-xs cursor-pointer rounded z-50 pointer-events-auto transition-all duration-300 hover:border-[#6bb3ff] hover:text-[#6bb3ff]"
    >
      {paused ? "♪ Resume Music" : "♪ Pause Music"}
    </button>
  );
}

// ── Stages ────────────────────────────────────────────────────

function Stage1({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      key="stage1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative z-10"
    >
      <VersionBadge text="SYSTEM ERROR v1.0.4" />

      <h1 className="glitch-text text-white font-bold tracking-widest text-6xl sm:text-8xl mb-2 font-mono">
        ERROR 404
      </h1>

      <h2 className="neon-pink flicker-text text-2xl sm:text-3xl font-mono mb-5">
        {HER_NAME}&apos;s Smile Not Found 💔
      </h2>

      <p className="text-[#8888bb] text-sm max-w-sm leading-8 mb-8 font-mono">
        The happiness you were looking for has been temporarily lost due to a{" "}
        <span className="neon-blue">boyfriend.bug</span>
      </p>

      <AppButton onClick={onNext} variant="blue">
        ⚙ Fix Issue
      </AppButton>
    </motion.div>
  );
}

function Stage2({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      key="stage2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen px-4 py-16 relative z-10 gap-1"
    >
      {/* Debug Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-[#0d1117] border border-[#30363d] rounded-lg p-6 w-full max-w-xl mb-3"
      >
        <div className="text-[#58a6ff] text-xs uppercase tracking-widest mb-4 border-b border-[#21262d] pb-2 font-mono">
          // debug_report.log
        </div>
        {[
          ["bug_identified:", '"I messed up" 😭'],
          ["severity:", "CRITICAL ⚠"],
          ["affected_system:", `${HER_NAME}'s happiness 💔`],
          ["root_cause:", "Unchecked ego overflow"],
        ].map(([k, v]) => (
          <div key={k} className="flex gap-4 my-1.5 text-xs font-mono">
            <span className="text-[#8b949e] min-w-[170px]">{k}</span>
            <span className="text-[#f85149]">{v}</span>
          </div>
        ))}
      </motion.div>

      {/* Console */}
      <p className="text-[#58a6ff] text-xs tracking-widest uppercase self-start max-w-xl w-full font-mono mb-1">
        // console output
      </p>
      <ConsoleLog logs={CONSOLE_LOGS} visible={true} />

      {/* Apology */}
      <p className="text-[#58a6ff] text-xs tracking-widest uppercase self-start max-w-xl w-full font-mono mt-3 mb-1">
        // apology.txt
      </p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-gradient-to-br from-[#1a0d2e] to-[#0d1a2e] border border-[#7c3aed44] rounded-lg p-5 max-w-xl w-full text-xs leading-8 text-[#c9c9ff] italic text-center font-mono"
      >
        &quot;I&apos;m really sorry for what I did. I didn&apos;t mean to hurt
        you. You mean everything to me, and I promise I&apos;ll do better. I
        hate seeing you upset — especially because of me.&quot;
      </motion.div>

      <div className="mt-6">
        <AppButton onClick={onNext} variant="pink">
          💾 Apply Patch
        </AppButton>
      </div>
    </motion.div>
  );
}

function Stage3({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      key="stage3"
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen px-4 py-10 text-center relative z-10"
    >
      <VersionBadge text="CHAOS TEST SUITE v3.7" />

      <h2 className="neon-pink text-xl sm:text-2xl font-mono font-bold mb-3">
        Running Boyfriend Stability Tests 🧪
      </h2>

      <p className="text-[#8b949e] text-xs font-mono mb-6 max-w-lg leading-7">
        We ran intensive simulations including late replies, mood swings, and
        "nothing is wrong" scenarios.
      </p>

      <div className="w-full max-w-xl bg-[#0d1117] border border-[#30363d] rounded-lg p-5">
        {CHAOS_TESTS.map((test, i) => (
          <motion.div
            key={test.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.2, duration: 0.35 }}
            className="mb-4 last:mb-0 text-left"
          >
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-[#58a6ff]">{test.label}</span>
              <span className="text-[#3fb950]">{test.score}% PASS</span>
            </div>
            <div className="h-2 bg-[#161b22] border border-[#21262d] rounded-sm overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${test.score}%` }}
                transition={{ delay: 0.35 + i * 0.22, duration: 0.7 }}
                className="h-full bg-gradient-to-r from-[#58a6ff] via-[#3fb950] to-[#6bffb3]"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6">
        <AppButton onClick={onNext} variant="green">
          ▶ Run Forgiveness CAPTCHA
        </AppButton>
      </div>
    </motion.div>
  );
}

function Stage4({
  onNext,
  onRetry,
}: {
  onNext: () => void;
  onRetry: () => void;
}) {
  const [tries, setTries] = useState(0);
  const [message, setMessage] = useState("Pick the only valid response to continue.");

  const onPick = (choice: string) => {
    if (choice === "No excuses. I was wrong.") {
      setMessage("Correct answer detected. Accountability module loaded ✔");
      setTimeout(() => onNext(), 700);
      return;
    }

    setTries((prev) => prev + 1);
    setMessage(
      `Invalid excuse rejected (${tries + 1}). Honesty required to unlock.`
    );
  };

  return (
    <motion.div
      key="stage4"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45 }}
      className="flex flex-col items-center justify-center min-h-screen px-4 text-center relative z-10"
    >
      <VersionBadge text="HUMILITY CAPTCHA" />

      <h2 className="neon-blue text-xl sm:text-2xl font-mono font-bold mb-4">
        Verify You Are Not A Silly Goose 🤖
      </h2>

      <div className="w-full max-w-xl bg-[#0d1117] border border-[#30363d] rounded-lg p-5 mb-4">
        <p className="text-[#8b949e] text-xs font-mono mb-4 text-left">
          Question: What is the best excuse after messing up?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXCUSES.map((item) => (
            <button
              key={item}
              onClick={() => onPick(item)}
              className="text-left border border-[#30363d] rounded-md px-3 py-2.5 text-xs font-mono text-[#c9d1d9] hover:border-[#58a6ff] hover:bg-[#58a6ff14] transition-all duration-200"
            >
              {item}
            </button>
          ))}
        </div>

        <motion.p
          key={message}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-xs font-mono text-[#58a6ff]"
        >
          {message}
        </motion.p>

        <p className="mt-2 text-[11px] font-mono text-[#6e7681] text-left">
          Failed attempts: {tries}
        </p>
      </div>

      <AppButton onClick={onRetry} variant="ghost">
        Abort Mission & Retry
      </AppButton>
    </motion.div>
  );
}

function Stage5({
  onNext,
  onRetry,
}: {
  onNext: () => void;
  onRetry: () => void;
}) {
  const [failedImages, setFailedImages] = useState<number[]>([]);

  const markFailed = (index: number) => {
    setFailedImages((prev) => (prev.includes(index) ? prev : [...prev, index]));
  };

  return (
    <motion.div
      key="stage5"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen px-4 py-10 text-center relative z-10"
    >
      <VersionBadge text="MEMORY GALLERY // RESTORE POINT" />

      <h2 className="neon-pink text-xl sm:text-2xl font-mono font-bold mb-3">
        Moments I Never Want To Lose 📸
      </h2>

      <p className="text-[#8b949e] text-xs font-mono mb-6 max-w-2xl leading-7">
        A tiny museum of us, where every photo is proof that we are better
        together than apart.
      </p>

      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MEMORIES.map((memory, index) => {
          const isFailed = failedImages.includes(index);
          const tilt = [-2, 2, -1, 3, -3, 1][index % 6];

          return (
            <motion.div
              key={memory.title}
              initial={{ opacity: 0, y: 24, rotate: tilt * 2 }}
              animate={{ opacity: 1, y: 0, rotate: tilt }}
              transition={{ delay: 0.15 + index * 0.1, duration: 0.45 }}
              className="bg-[#0d1117] border border-[#30363d] rounded-xl p-3 text-left hover:border-[#58a6ff66] hover:shadow-[0_8px_30px_#58a6ff22] transition-all duration-300"
            >
              <div className="relative w-full h-60 rounded-md overflow-hidden border border-[#21262d] bg-gradient-to-br from-[#151b25] via-[#1b1630] to-[#12222d]">
                {isFailed ? (
                  <div className="absolute inset-0 flex items-center justify-center text-center px-3">
                    <p className="text-[11px] text-[#8b949e] font-mono leading-5">
                      Add your photo at {memory.src}
                    </p>
                  </div>
                ) : (
                  <img
                    src={memory.src}
                    alt={memory.title}
                    className="w-full h-full object-cover object-center"
                    onError={() => markFailed(index)}
                  />
                )}
              </div>

              <p className="text-[#58a6ff] text-xs font-mono mt-3">{memory.title}</p>
              <p className="text-[#8b949e] text-[11px] font-mono mt-1 leading-5">
                {memory.note}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 flex-wrap justify-center mt-7">
        <AppButton onClick={onRetry} variant="ghost">
          Restart Story
        </AppButton>
        <AppButton onClick={onNext} variant="blue">
          Continue To Final Patch
        </AppButton>
      </div>
    </motion.div>
  );
}

function Stage6({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div
      key="stage6"
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "backOut" }}
      className="flex flex-col items-center justify-center min-h-screen px-4 text-center relative z-10"
    >
      <VersionBadge text="✔ PATCH APPLIED" />

      <h2 className="neon-blue text-xl sm:text-2xl font-mono font-bold mb-6">
        Patch Update v2.0 Applied 💙
      </h2>

      <div className="w-full max-w-sm">
        {CHECKLIST.map((item, i) => (
          <CheckItem key={item} text={item} delay={0.2 + i * 0.4} />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.2 + CHECKLIST.length * 0.4 + 0.3,
          duration: 0.8,
        }}
        className="text-[#8888bb] text-xs mt-6 font-mono blink-text"
      >
        System status: Waiting for your forgiveness... 🤍
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.2 + CHECKLIST.length * 0.4 + 1.2,
          duration: 0.6,
        }}
        className="mt-4"
      >
        <AppButton onClick={onRetry} variant="ghost">
          Still mad? Retry Fix 😭
        </AppButton>
      </motion.div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────

export default function Home() {
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  return (
    <main className="relative bg-gradient-to-br from-[#0a0a0f] via-[#0d0d1a] to-[#0a0f1a] min-h-screen overflow-hidden">
      <FloatingHearts />
      <MuteButton />

      <AnimatePresence mode="wait">
        {stage === 1 && <Stage1 key="1" onNext={() => setStage(2)} />}
        {stage === 2 && <Stage2 key="2" onNext={() => setStage(3)} />}
        {stage === 3 && <Stage3 key="3" onNext={() => setStage(4)} />}
        {stage === 4 && (
          <Stage4
            key="4"
            onNext={() => setStage(5)}
            onRetry={() => setStage(1)}
          />
        )}
        {stage === 5 && (
          <Stage5
            key="5"
            onNext={() => setStage(6)}
            onRetry={() => setStage(1)}
          />
        )}
        {stage === 6 && <Stage6 key="6" onRetry={() => setStage(1)} />}
      </AnimatePresence>
    </main>
  );
}
