"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  playClick,
  playTypingSound,
  playSuccessChime,
  playErrorBuzzer,
  playFireworkPop,
  toggleAudioMute,
} from "./utils/audio";

// ── Customization ──────────────────────────────────────────────
const HER_NAME = "Tania Khan"; // Change this to her name!
const BASE_PATH = process.env.NODE_ENV === "production" ? "/Sorry" : "";
const SONG_PATH = `${BASE_PATH}/Sorry_Sorry.mp3`; // Audio file in /public
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
    src: `${BASE_PATH}/memories/memory-1.jpg`,
    title: "The Day We Laughed Too Much",
    note: "Bug count: 0 | Smile count: infinite",
    category: "Laughs",
  },
  {
    src: `${BASE_PATH}/memories/memory-2.jpg`,
    title: "Our Favorite Food Mission",
    note: "Calories high, drama low, vibes perfect",
    category: "Food",
  },
  {
    src: `${BASE_PATH}/memories/memory-3.jpg`,
    title: "That Random Cute Selfie",
    note: "Taken in 0.5x chaos mode",
    category: "Cute",
  },
  {
    src: `${BASE_PATH}/memories/memory-4.jpg`,
    title: "Sunrise + Us + Peace",
    note: "Best deployed update so far",
    category: "Vibes",
  },
  {
    src: `${BASE_PATH}/memories/memory-5.jpg`,
    title: "Walk, Talk, Repeat",
    note: "Daily standup with extra romance",
    category: "Vibes",
  },
  {
    src: `${BASE_PATH}/memories/memory-6.jpg`,
    title: "Tiny Moment, Big Memory",
    note: "Saved in heart cache forever",
    category: "Cute",
  },
];

const BUG_DETAILS: Record<string, { title: string; desc: string; fix: string }> = {
  "bug_identified:": {
    title: "Error 0xBOYFRIEND_DUMB",
    desc: "Occurred when I let a stupid mistake ruin a good day.",
    fix: "Solution: Apologize deeply, give hugs, and learn.",
  },
  "severity:": {
    title: "System Alert: CRITICAL ⚠",
    desc: "Happiness levels dropped below acceptable safety threshold.",
    fix: "Solution: Immediate emotional patch application required.",
  },
  "affected_system:": {
    title: "Target System Compromised",
    desc: `${HER_NAME}'s smile status: Offline.`,
    fix: "Solution: Deploy maximum effort and love to restore.",
  },
  "root_cause:": {
    title: "Memory Leak: Ego Overflow",
    desc: "Temporary stupidity overflowed buffer memory.",
    fix: "Solution: Erase ego completely, install 100% humility.",
  },
};

const HEART_EMOJIS = ["❤", "💙", "💜", "🤍", "💗", "💕", "🩷"];

// ── Sub-components ────────────────────────────────────────────

function GlowCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="glow-cursor hidden md:block"
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
    />
  );
}

function StageIndicator({ stage }: { stage: number }) {
  return (
    <div className="fixed top-4 left-4 bg-[#0d1117]/80 backdrop-blur-md border border-[#30363d] text-[#8b949e] px-3 py-1.5 font-mono text-xs rounded z-50 pointer-events-none flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
      <span>[ stage {stage} / 6 ]</span>
    </div>
  );
}

function AppButton({
  children,
  onClick,
  variant = "blue",
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "blue" | "pink" | "green" | "ghost";
  className?: string;
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
      onClick={() => {
        playClick();
        onClick();
      }}
      className={`bg-transparent border font-mono px-8 py-3 text-sm cursor-pointer rounded-md transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] ${colors[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

function VersionBadge({ text }: { text: string }) {
  return (
    <span className="text-[11px] text-[#58a6ff] bg-[#58a6ff15] border border-[#58a6ff33] px-3 py-1 rounded-full mb-4 inline-block font-mono">
      {text}
    </span>
  );
}

function ConsoleLog({
  logs,
  visible,
  customOutputs,
}: {
  logs: string[];
  visible: boolean;
  customOutputs: string[];
}) {
  const [completedLines, setCompletedLines] = useState(0);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    setCompletedLines(0);
    const interval = setInterval(() => {
      setCompletedLines((prev) => {
        if (prev < logs.length) {
          playTypingSound();
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [visible, logs.length]);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [completedLines, customOutputs.length]);

  return (
    <div
      ref={consoleRef}
      className="bg-[#010409] border border-[#21262d] rounded-md p-4 w-full max-w-xl text-xs max-h-[180px] min-h-[140px] overflow-y-auto scrollbar-hide shadow-inner"
    >
      {logs.slice(0, completedLines).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#3fb950] my-0.5 font-mono"
        >
          {line}
        </motion.div>
      ))}

      {customOutputs.map((out, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[#6bb3ff] my-0.5 font-mono font-semibold"
        >
          {out}
        </motion.div>
      ))}

      {visible && completedLines < logs.length && (
        <span className="cursor-blink" />
      )}

      {visible && completedLines === logs.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[#3fb950] font-mono mt-1 flex items-center gap-1.5 font-bold"
        >
          <span>[DONE]</span>
          <span className="cursor-blink" />
        </motion.div>
      )}
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
      <span className="text-[#c9c9ff] font-mono">{text}</span>
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
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(SONG_PATH);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";
    audio.autoplay = true;

    const onError = () => {
      setAudioError("Song failed to load");
    };

    audio.addEventListener("error", onError);
    audioRef.current = audio;

    const tryAutoPlay = async () => {
      try {
        await audio.play();
        setPaused(false);
      } catch {
        setPaused(true);
      }
    };

    const startOnFirstInteraction = () => {
      const current = audioRef.current;
      if (!current || !current.paused) return;
      void current.play().then(() => setPaused(false)).catch(() => {});
    };

    void tryAutoPlay();
    window.addEventListener("pointerdown", startOnFirstInteraction, {
      once: true,
    });

    return () => {
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
    playClick();
    const audio = audioRef.current;
    if (!audio) return;

    if (paused || audio.paused) {
      try {
        await audio.play();
        setPaused(false);
        toggleAudioMute(false);
      } catch {
        setAudioError("Playback failed");
      }
    } else {
      audio.pause();
      setPaused(true);
      toggleAudioMute(true);
    }
  };

  return (
    <button
      onClick={toggle}
      title={audioError ?? `Playing from ${SONG_PATH}`}
      className="fixed top-4 right-4 bg-[#0d1117]/80 backdrop-blur-md border border-[#30363d] text-[#8888bb] px-3 py-1.5 font-mono text-xs cursor-pointer rounded z-50 pointer-events-auto transition-all duration-300 hover:border-[#6bb3ff] hover:text-[#6bb3ff] flex items-center gap-2"
    >
      {paused ? (
        <span className="flex items-center gap-1.5">
          <span>♪</span> Resume Music
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <span className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 bg-[#6bb3ff] rounded-full eq-bar-1" />
            <span className="w-0.5 bg-[#6bb3ff] rounded-full eq-bar-2" />
            <span className="w-0.5 bg-[#6bb3ff] rounded-full eq-bar-3" />
          </span>
          Pause Music
        </span>
      )}
    </button>
  );
}

// ── Stages ────────────────────────────────────────────────────

function Stage1({ onNext }: { onNext: () => void }) {
  const [showDiagnostic, setShowDiagnostic] = useState(false);

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

      <p className="text-[#8888bb] text-sm max-w-sm leading-8 mb-6 font-mono">
        The happiness you were looking for has been temporarily lost due to a{" "}
        <span className="neon-blue">boyfriend.bug</span>
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <AppButton onClick={onNext} variant="blue">
          ⚙ Fix Issue
        </AppButton>
        <AppButton
          onClick={() => {
            setShowDiagnostic(true);
            playSuccessChime();
          }}
          variant="ghost"
        >
          🔍 Run Scan
        </AppButton>
      </div>

      <AnimatePresence>
        {showDiagnostic && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="mt-6 bg-[#0d1117] border border-[#58a6ff66] rounded-lg p-4 max-w-md w-full text-left font-mono text-xs shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-[#21262d] pb-2 mb-2 text-[#58a6ff]">
              <span>[SYSTEM DIAGNOSTIC SCAN]</span>
              <button
                onClick={() => setShowDiagnostic(false)}
                className="text-[#8b949e] hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-[#c9c9ff] my-1">
              • Target: {HER_NAME}&apos;s happiness
            </p>
            <p className="text-[#f85149] my-1">• Status: Critical Regret Detected</p>
            <p className="text-[#3fb950] my-1">• Recommended Action: Forgiveness</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Stage2({ onNext }: { onNext: () => void }) {
  const [selectedBugKey, setSelectedBugKey] = useState<string | null>(null);
  const [cliInput, setCliInput] = useState("");
  const [customOutputs, setCustomOutputs] = useState<string[]>([]);

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    playClick();

    if (!cmd) return;

    if (cmd === "help") {
      setCustomOutputs((prev) => [
        ...prev,
        `$ ${cmd}`,
        "> Available commands: help, status, forgive, love, clear",
      ]);
    } else if (cmd === "status") {
      setCustomOutputs((prev) => [
        ...prev,
        `$ ${cmd}`,
        "> Heart status: Missing you 100%. Regret: 9999%",
      ]);
    } else if (cmd === "forgive" || cmd === "love") {
      setCustomOutputs((prev) => [
        ...prev,
        `$ ${cmd}`,
        "> Forgiveness module requested! Proceeding to patch...",
      ]);
      playSuccessChime();
      setTimeout(() => onNext(), 900);
    } else if (cmd === "clear") {
      setCustomOutputs([]);
    } else {
      setCustomOutputs((prev) => [
        ...prev,
        `$ ${cmd}`,
        `> Command '${cmd}' not recognized. Type 'help' or 'forgive'.`,
      ]);
    }
    setCliInput("");
  };

  const executePill = (cmd: string) => {
    setCliInput(cmd);
    playClick();
  };

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
        className="bg-[#0d1117] border border-[#30363d] rounded-lg p-6 w-full max-w-xl mb-3 shadow-xl"
      >
        <div className="flex items-center justify-between text-[#58a6ff] text-xs uppercase tracking-widest mb-4 border-b border-[#21262d] pb-2 font-mono">
          <span>// debug_report.log</span>
          <span className="text-[10px] text-[#8b949e]">Click row to inspect</span>
        </div>
        {[
          ["bug_identified:", '"I messed up" 😭'],
          ["severity:", "CRITICAL ⚠"],
          ["affected_system:", `${HER_NAME}'s happiness 💔`],
          ["root_cause:", "Unchecked ego overflow"],
        ].map(([k, v], i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.18, duration: 0.35 }}
            onClick={() => {
              setSelectedBugKey(k);
              playClick();
            }}
            className="flex gap-4 my-1.5 text-xs font-mono cursor-pointer hover:bg-[#161b22] px-2 py-1 rounded transition-colors"
          >
            <span className="text-[#8b949e] min-w-[170px]">{k}</span>
            <span className="text-[#f85149]">{v}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Bug Detail Modal */}
      <AnimatePresence>
        {selectedBugKey && BUG_DETAILS[selectedBugKey] && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#161b22] border border-[#f8514988] rounded-lg p-4 w-full max-w-xl mb-3 text-left font-mono text-xs"
          >
            <div className="flex items-center justify-between text-[#f85149] font-bold mb-2">
              <span>{BUG_DETAILS[selectedBugKey].title}</span>
              <button
                onClick={() => setSelectedBugKey(null)}
                className="text-[#8b949e] hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-[#c9d1d9] mb-1">{BUG_DETAILS[selectedBugKey].desc}</p>
            <p className="text-[#3fb950] font-semibold">
              {BUG_DETAILS[selectedBugKey].fix}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Console Section */}
      <div className="w-full max-w-xl text-left font-mono">
        <p className="text-[#58a6ff] text-xs tracking-widest uppercase mb-4">
          // console output
        </p>
        <ConsoleLog logs={CONSOLE_LOGS} visible={true} customOutputs={customOutputs} />

        {/* Interactive CLI Prompt */}
        <form
          onSubmit={handleCliSubmit}
          className="w-full mt-2 flex items-center gap-2"
        >
          <span className="text-[#3fb950] font-mono text-xs">$</span>
          <input
            type="text"
            value={cliInput}
            onChange={(e) => setCliInput(e.target.value)}
            placeholder="Type command (e.g. forgive, help, status)..."
            className="flex-1 bg-[#010409] border border-[#30363d] rounded px-3 py-1.5 text-xs font-mono text-[#c9c9ff] focus:outline-none focus:border-[#58a6ff]"
          />
          <button
            type="submit"
            className="bg-[#21262d] border border-[#30363d] hover:border-[#58a6ff] text-[#58a6ff] text-xs font-mono px-3 py-1.5 rounded"
          >
            Run
          </button>
        </form>

        {/* Quick Command Pills */}
        <div className="flex gap-2 w-full mt-2 justify-start flex-wrap">
          {["help", "status", "forgive"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => executePill(cmd)}
              className="text-[10px] font-mono bg-[#0d1117] border border-[#30363d] text-[#8b949e] px-2 py-1 rounded hover:border-[#58a6ff] hover:text-[#58a6ff]"
            >
              $ {cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Apology Section */}
      <div className="w-full max-w-xl text-left font-mono mt-4">
        <p className="text-[#58a6ff] text-xs tracking-widest uppercase mb-4">
          // apology.txt
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gradient-to-br from-[#1a0d2e] to-[#0d1a2e] border border-[#7c3aed44] rounded-lg p-5 w-full text-xs leading-8 text-[#c9c9ff] italic text-center font-mono"
        >
          &quot;I&apos;m really sorry for what I did. I didn&apos;t mean to hurt
          you. You mean everything to me, and I promise I&apos;ll do better. I
          hate seeing you upset — especially because of me.&quot;
        </motion.div>
      </div>


      <div className="mt-6">
        <AppButton onClick={onNext} variant="pink">
          💾 Apply Patch
        </AppButton>
      </div>
    </motion.div>
  );
}

function Stage3({ onNext }: { onNext: () => void }) {
  const [scores, setScores] = useState<number[]>([0, 0, 0, 0]);
  const [allPassed, setAllPassed] = useState(false);

  const runTestAnimation = () => {
    setScores([0, 0, 0, 0]);
    setAllPassed(false);

    CHAOS_TESTS.forEach((test, idx) => {
      let current = 0;
      const step = Math.ceil(test.score / 25);
      const interval = setInterval(() => {
        current += step;
        if (current >= test.score) {
          current = test.score;
          clearInterval(interval);
        }
        setScores((prev) => {
          const next = [...prev];
          next[idx] = current;
          return next;
        });
      }, 35);
    });

    setTimeout(() => {
      setAllPassed(true);
      playSuccessChime();
    }, 1800);
  };

  useEffect(() => {
    runTestAnimation();
  }, []);

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

      {/* Metrics Dashboard */}
      <div className="w-full max-w-xl grid grid-cols-3 gap-2 mb-4">
        <div className="bg-[#0d1117] border border-[#30363d] rounded p-2 text-center font-mono">
          <p className="text-[10px] text-[#8b949e]">Heartbeat Sync</p>
          <p className="text-xs text-[#3fb950] font-bold">99.9%</p>
        </div>
        <div className="bg-[#0d1117] border border-[#30363d] rounded p-2 text-center font-mono">
          <p className="text-[10px] text-[#8b949e]">Mood Firewall</p>
          <p className="text-xs text-[#58a6ff] font-bold">100% ACTIVE</p>
        </div>
        <div className="bg-[#0d1117] border border-[#30363d] rounded p-2 text-center font-mono">
          <p className="text-[10px] text-[#8b949e]">Love Odds</p>
          <p className="text-xs text-[#ff6b9d] font-bold">INFINITE ♾</p>
        </div>
      </div>

      <div className="w-full max-w-xl bg-[#0d1117] border border-[#30363d] rounded-lg p-5">
        {CHAOS_TESTS.map((test, i) => (
          <motion.div
            key={test.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.35 }}
            className="mb-4 last:mb-0 text-left"
          >
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-[#58a6ff]">{test.label}</span>
              <span className="text-[#3fb950] font-bold">{scores[i]}% PASS</span>
            </div>
            <div className="h-2.5 bg-[#161b22] border border-[#21262d] rounded-sm overflow-hidden">
              <div
                style={{ width: `${scores[i]}%` }}
                className={`h-full transition-all duration-150 bg-gradient-to-r from-[#58a6ff] via-[#3fb950] to-[#6bffb3] ${
                  allPassed ? "pulse-glow" : ""
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {allPassed && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mt-5 font-mono text-sm neon-green font-bold tracking-wide"
          >
            ALL TESTS PASSED ✔
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3 mt-6 flex-wrap justify-center">
        <AppButton
          onClick={() => {
            playClick();
            runTestAnimation();
          }}
          variant="ghost"
        >
          🔄 Re-Run Stress Test
        </AppButton>
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
  const [wrongChoiceIndex, setWrongChoiceIndex] = useState<number | null>(null);
  const [correctChoiceIndex, setCorrectChoiceIndex] = useState<number | null>(null);
  const [evasionOffset, setEvasionOffset] = useState<{ [key: number]: { x: number; y: number } }>({});
  const [sliderVal, setSliderVal] = useState(0);

  const handleEvasion = (index: number) => {
    if (index === 3) return; // Don't evade on correct answer
    const randX = (Math.random() - 0.5) * 80;
    const randY = (Math.random() - 0.5) * 40;
    setEvasionOffset((prev) => ({ ...prev, [index]: { x: randX, y: randY } }));
  };

  const onPick = (choice: string, index: number) => {
    if (choice === "No excuses. I was wrong.") {
      setCorrectChoiceIndex(index);
      setWrongChoiceIndex(null);
      setMessage("Correct answer detected. Accountability module loaded ✔");
      playSuccessChime();
      setTimeout(() => onNext(), 750);
      return;
    }

    playErrorBuzzer();
    setWrongChoiceIndex(index);
    setTries((prev) => prev + 1);
    setMessage(
      `Invalid excuse rejected (${tries + 1}). Honesty required to unlock.`
    );
    setTimeout(() => {
      setWrongChoiceIndex(null);
    }, 450);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderVal(val);
    if (val >= 100) {
      onPick(EXCUSES[3], 3);
    }
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative min-h-[140px]">
          {EXCUSES.map((item, idx) => {
            const isWrong = wrongChoiceIndex === idx;
            const isCorrect = correctChoiceIndex === idx;
            const offset = evasionOffset[idx] || { x: 0, y: 0 };

            return (
              <motion.button
                key={item}
                animate={{ x: offset.x, y: offset.y }}
                onMouseEnter={() => handleEvasion(idx)}
                onClick={() => onPick(item, idx)}
                className={`text-left border border-[#30363d] rounded-md px-3 py-2.5 text-xs font-mono text-[#c9d1d9] hover:border-[#58a6ff] hover:bg-[#58a6ff14] transition-all duration-200 flex items-center justify-between ${
                  isWrong ? "captcha-shake" : ""
                } ${isCorrect ? "captcha-success" : ""}`}
              >
                <span>{item}</span>
                {isCorrect && (
                  <span className="text-[#3fb950] font-bold text-sm">✓</span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Drag to Unlock Slider */}
        <div className="mt-5 border-t border-[#21262d] pt-4 text-left font-mono">
          <p className="text-[11px] text-[#8b949e] mb-2 flex items-center justify-between">
            <span>Or Drag to Unlock Honesty Mode:</span>
            <span className="text-[#58a6ff]">{sliderVal}%</span>
          </p>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderVal}
            onChange={handleSliderChange}
            className="w-full accent-[#58a6ff] cursor-pointer"
          />
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
  const [activeMemoryIndex, setActiveMemoryIndex] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("All");
  const [heartCounts, setHeartCounts] = useState<Record<number, number>>({
    0: 12,
    1: 8,
    2: 15,
    3: 19,
    4: 7,
    5: 11,
  });
  const [burstingCardIndex, setBurstingCardIndex] = useState<number | null>(null);

  const markFailed = (index: number) => {
    setFailedImages((prev) => (prev.includes(index) ? prev : [...prev, index]));
  };

  const handleHeartClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    playClick();
    setHeartCounts((prev) => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
    setBurstingCardIndex(index);
    setTimeout(() => setBurstingCardIndex(null), 1000);
  };

  const filteredMemories = MEMORIES.filter(
    (m) => category === "All" || m.category === category
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeMemoryIndex === null) return;
      if (e.key === "Escape") {
        setActiveMemoryIndex(null);
      } else if (e.key === "ArrowLeft") {
        setActiveMemoryIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : MEMORIES.length - 1));
      } else if (e.key === "ArrowRight") {
        setActiveMemoryIndex((prev) => (prev !== null && prev < MEMORIES.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMemoryIndex]);

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

      <p className="text-[#8b949e] text-xs font-mono mb-4 max-w-2xl leading-7">
        A tiny museum of us, where every photo is proof that we are better
        together than apart.
      </p>

      {/* Category Filter Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap justify-center font-mono">
        {["All", "Laughs", "Food", "Cute", "Vibes"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              playClick();
              setCategory(cat);
            }}
            className={`text-xs px-3 py-1 rounded-full border transition-all ${
              category === cat
                ? "bg-[#58a6ff22] border-[#58a6ff] text-[#58a6ff]"
                : "border-[#30363d] text-[#8b949e] hover:border-[#8b949e]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMemories.map((memory, index) => {
          const origIdx = MEMORIES.findIndex((m) => m.title === memory.title);
          const isFailed = failedImages.includes(origIdx);
          const tilt = [-2, 2, -1, 3, -3, 1][origIdx % 6];
          const isBursting = burstingCardIndex === origIdx;

          return (
            <motion.div
              key={memory.title}
              initial={{ opacity: 0, y: 24, rotate: tilt * 2 }}
              animate={{ opacity: 1, y: 0, rotate: tilt }}
              whileHover={{ rotate: 0, scale: 1.03, transition: { duration: 0.2 } }}
              onClick={() => {
                playClick();
                setActiveMemoryIndex(origIdx);
              }}
              className="bg-[#0d1117] border border-[#30363d] rounded-xl p-3 text-left hover:border-[#58a6ff66] hover:shadow-[0_8px_30px_#58a6ff22] transition-all duration-300 cursor-pointer relative"
            >
              {isBursting && (
                <span className="card-heart-particle left-1/2 text-2xl">💖</span>
              )}

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
                    className="w-full h-full object-cover object-center pointer-events-none"
                    onError={() => markFailed(origIdx)}
                  />
                )}
              </div>

              <div className="flex items-center justify-between mt-3">
                <p className="text-[#58a6ff] text-xs font-mono">{memory.title}</p>
                <button
                  onClick={(e) => handleHeartClick(e, origIdx)}
                  className="text-xs font-mono text-[#ff6b9d] bg-[#ff6b9d15] border border-[#ff6b9d33] px-2 py-0.5 rounded hover:bg-[#ff6b9d33] transition-colors flex items-center gap-1"
                >
                  ❤ {heartCounts[origIdx] || 0}
                </button>
              </div>

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

      {/* Lightbox Slideshow Modal */}
      <AnimatePresence>
        {activeMemoryIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMemoryIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0d1117] border border-[#30363d] rounded-2xl p-4 sm:p-6 max-w-2xl w-full text-left relative shadow-2xl cursor-default"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[#8b949e]">
                  Memory {activeMemoryIndex + 1} of {MEMORIES.length}
                </span>
                <button
                  onClick={() => setActiveMemoryIndex(null)}
                  className="text-[#8b949e] hover:text-white font-mono text-lg transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="relative w-full max-h-[65vh] h-[360px] sm:h-[420px] rounded-lg overflow-hidden border border-[#21262d] bg-[#050508] mb-4">
                <img
                  src={MEMORIES[activeMemoryIndex].src}
                  alt={MEMORIES[activeMemoryIndex].title}
                  className="w-full h-full object-contain object-center"
                />

                {/* Slideshow Arrows */}
                <button
                  onClick={() =>
                    setActiveMemoryIndex((prev) =>
                      prev !== null && prev > 0 ? prev - 1 : MEMORIES.length - 1
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#0d1117]/80 text-[#58a6ff] hover:text-white p-2 rounded-full border border-[#30363d]"
                >
                  ←
                </button>
                <button
                  onClick={() =>
                    setActiveMemoryIndex((prev) =>
                      prev !== null && prev < MEMORIES.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0d1117]/80 text-[#58a6ff] hover:text-white p-2 rounded-full border border-[#30363d]"
                >
                  →
                </button>
              </div>

              <h3 className="neon-blue text-lg font-mono font-bold mb-1">
                {MEMORIES[activeMemoryIndex].title}
              </h3>
              <p className="text-[#8b949e] text-xs font-mono leading-6">
                {MEMORIES[activeMemoryIndex].note}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Stage6({ onRetry }: { onRetry: () => void }) {
  const [forgiven, setForgiven] = useState<boolean | null>(null);
  const [showHugModal, setShowHugModal] = useState(false);

  const triggerFireworks = () => {
    playSuccessChime();
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ["#ff6b9d", "#ffffff"],
    });
    fire(0.2, {
      spread: 60,
      colors: ["#6bb3ff", "#6bffb3"],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ["#ff6b9d", "#6bb3ff", "#6bffb3"],
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      triggerFireworks();
    }, (0.2 + CHECKLIST.length * 0.4 + 0.3) * 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleForgive = () => {
    playClick();
    setForgiven(true);
    triggerFireworks();
  };

  const handleHug = () => {
    playClick();
    setShowHugModal(true);
    playFireworkPop();
  };

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
        className="neon-pink text-xs mt-6 font-mono blink-text"
      >
        System status: Waiting for your forgiveness... 🤍
      </motion.p>

      {/* Interactive Forgiveness Choice Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 + CHECKLIST.length * 0.4 + 1.0 }}
        className="mt-6 flex gap-3 flex-wrap justify-center"
      >
        <AppButton onClick={handleForgive} variant="pink">
          💖 YES, I Forgive You
        </AppButton>
        <AppButton onClick={handleHug} variant="blue">
          🤗 Need A Hug First
        </AppButton>
      </motion.div>

      {/* Forgiveness Certificate Card */}
      <AnimatePresence>
        {forgiven && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-[#0d1117] certificate-glow rounded-xl p-5 max-w-md w-full text-center font-mono"
          >
            <h3 className="neon-green text-base font-bold mb-1">
              OFFICIAL FORGIVENESS CERTIFICATE 🏆
            </h3>
            <p className="text-xs text-[#c9c9ff] my-2">
              Granted by {HER_NAME} • Boyfriend v2.0 Activated
            </p>
            <p className="text-[11px] text-[#8b949e]">
              Love Uptime: Infinite ♾ | Regret Level: 0%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Virtual Hug Modal */}
      <AnimatePresence>
        {showHugModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHugModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0d1117] border border-[#ff6b9d66] rounded-2xl p-6 max-w-sm w-full text-center font-mono relative shadow-2xl"
            >
              <button
                onClick={() => setShowHugModal(false)}
                className="absolute top-3 right-4 text-[#8b949e] hover:text-white"
              >
                ✕
              </button>
              <div className="text-5xl mb-3 animate-bounce">🫂</div>
              <h3 className="neon-pink text-lg font-bold mb-2">
                Virtual Hug Dispatched!
              </h3>
              <p className="text-xs text-[#c9c9ff] mb-4 leading-6">
                A big warm tight hug has been queued & delivered.
              </p>
              <AppButton
                onClick={() => {
                  setShowHugModal(false);
                  handleForgive();
                }}
                variant="pink"
              >
                Okay, Forgiven Now! ❤
              </AppButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.2 + CHECKLIST.length * 0.4 + 1.4,
          duration: 0.6,
        }}
        className="mt-6"
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stage]);

  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key >= "1" && e.key <= "6") {
        const num = Number(e.key) as 1 | 2 | 3 | 4 | 5 | 6;
        setStage(num);
        playClick();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  return (
    <main className="relative scanline-overlay bg-grid-pattern bg-gradient-to-br from-[#0a0a0f] via-[#0d0d1a] to-[#0a0f1a] min-h-screen overflow-hidden">
      <GlowCursor />
      <StageIndicator stage={stage} />
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


