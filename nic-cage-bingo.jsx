import { useState, useEffect, useCallback } from "react";

const ALL_SQUARES = [
  { id: 1, text: "Whispers instead of yells" },
  { id: 2, text: "Inexplicable historical knowledge" },
  { id: 3, text: "Steals something priceless" },
  { id: 4, text: "Conspiracy board moment" },
  { id: 5, text: "Chest-puffing determined walk" },
  { id: 6, text: "\"I'm gonna steal the Declaration of Independence\"" },
  { id: 7, text: "Someone says he's crazy" },
  { id: 8, text: "Outsmarts the FBI" },
  { id: 9, text: "Uses a random object as a tool" },
  { id: 10, text: "Translates something cryptic immediately" },
  { id: 11, text: "Suspicious leather jacket" },
  { id: 12, text: "Dramatic pause before revelation" },
  { id: 13, text: "Riley makes a joke nobody laughs at" },
  { id: 14, text: "Smells/licks a historical artifact" },
  { id: 15, text: "Car chase in a city" },
  { id: 16, text: "Villain has impeccable taste" },
  { id: 17, text: "Mentions the Freemasons" },
  { id: 18, text: "Hidden message behind obvious thing" },
  { id: 19, text: "Sean Bean being menacing" },
  { id: 20, text: "Nicolas Cage stares into distance" },
  { id: 21, text: "The map was the clue all along" },
  { id: 22, text: "Unlikely alliance with a stranger" },
  { id: 23, text: "Security system bypassed by genius" },
  { id: 24, text: "Sudden gunfire in a museum" },
  { id: 25, text: "\"It's on the back of the dollar bill!\"" },
  { id: 26, text: "Stolen vehicle driven flawlessly" },
  { id: 27, text: "Glasses used as a deduction device" },
  { id: 28, text: "A clue hidden for 200 years found instantly" },
  { id: 29, text: "Ben Gates monologues about history" },
  { id: 30, text: "Trust nobody, trust everyone" },
  { id: 31, text: "Hairline acting" },
  { id: 32, text: "Love interest skeptical then dazzled" },
  { id: 33, text: "Last-second escape from enclosed space" },
  { id: 34, text: "Secret door in famous landmark" },
  { id: 35, text: "Underground tunnel reveal" },
];

const FREE_SQUARE = { id: 0, text: "🎬 FREE\nNic Cage\nFace", isFree: true };

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateCard() {
  const picked = shuffle(ALL_SQUARES).slice(0, 24);
  const grid = [...picked.slice(0, 12), FREE_SQUARE, ...picked.slice(12)];
  return grid;
}

function checkBingo(marked, card) {
  const size = 5;
  const rows = [];
  for (let r = 0; r < size; r++) {
    rows.push(card.slice(r * size, r * size + size).map((_, ci) => r * size + ci));
  }
  const cols = [];
  for (let c = 0; c < size; c++) {
    cols.push([0,1,2,3,4].map(r => r * size + c));
  }
  const diags = [
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ];
  const lines = [...rows, ...cols, ...diags];
  return lines.filter(line => line.every(i => marked.has(card[i]?.id)));
}

export default function NicCageBingo() {
  const [card, setCard] = useState(() => generateCard());
  const [marked, setMarked] = useState(() => new Set([0]));
  const [bingoLines, setBingoLines] = useState([]);
  const [newBingo, setNewBingo] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);

  const winningIndices = new Set(bingoLines.flat());

  const toggle = useCallback((id) => {
    if (id === 0) return;
    setMarked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  useEffect(() => {
    const lines = checkBingo(marked, card);
    const prevCount = bingoLines.length;
    setBingoLines(lines);
    if (lines.length > prevCount && lines.length > 0) {
      setNewBingo(true);
      const pieces = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.8,
        color: ["#d4af37","#c9a227","#f5e27a","#8B0000","#fff"][Math.floor(Math.random()*5)],
        size: 6 + Math.random() * 8,
      }));
      setConfettiPieces(pieces);
      setTimeout(() => { setNewBingo(false); setConfettiPieces([]); }, 3000);
    }
  }, [marked]);

  const reset = () => {
    setCard(generateCard());
    setMarked(new Set([0]));
    setBingoLines([]);
    setNewBingo(false);
    setConfettiPieces([]);
  };

  const cardIndices = (id) => card.findIndex(s => s?.id === id);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0804",
      backgroundImage: `
        radial-gradient(ellipse at 20% 20%, rgba(212,175,55,0.08) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 80%, rgba(139,0,0,0.12) 0%, transparent 60%),
        url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Ccircle cx='30' cy='30' r='1' fill='rgba(212,175,55,0.04)'/%3E%3C/svg%3E")
      `,
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#e8d5a0",
      padding: "16px",
      boxSizing: "border-box",
    }}>
      {/* Confetti */}
      {confettiPieces.map(p => (
        <div key={p.id} style={{
          position: "fixed",
          top: "-20px",
          left: `${p.x}%`,
          width: p.size,
          height: p.size,
          background: p.color,
          borderRadius: "2px",
          animation: `fall 2.5s ${p.delay}s ease-in forwards`,
          zIndex: 1000,
          transform: `rotate(${Math.random()*360}deg)`,
        }} />
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        @keyframes fall { to { transform: translateY(110vh) rotate(720deg); opacity: 0; } }
        @keyframes stamped { 0% { transform: scale(2) rotate(-15deg); opacity:0; } 60% { transform: scale(0.92) rotate(3deg); } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
        @keyframes glow-pulse { 0%,100% { box-shadow: 0 0 8px rgba(212,175,55,0.6); } 50% { box-shadow: 0 0 24px rgba(212,175,55,1), 0 0 40px rgba(212,175,55,0.4); } }
        @keyframes bingo-flash { 0%,100% { background: rgba(212,175,55,0.15); } 50% { background: rgba(212,175,55,0.35); } }
        .sq { transition: all 0.15s ease; cursor: pointer; user-select: none; -webkit-tap-highlight-color: transparent; }
        .sq:active { transform: scale(0.94); }
        .sq.winning { animation: bingo-flash 1s ease infinite; }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "12px" }}>
        <div style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(22px, 6vw, 36px)",
          fontWeight: 900,
          color: "#d4af37",
          letterSpacing: "0.12em",
          textShadow: "0 0 20px rgba(212,175,55,0.5), 2px 2px 0 rgba(0,0,0,0.8)",
          lineHeight: 1.1,
        }}>
          NATIONAL TREASURE
        </div>
        <div style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(14px, 4vw, 22px)",
          fontWeight: 400,
          color: "#c9a227",
          letterSpacing: "0.3em",
          marginTop: "2px",
          textTransform: "uppercase",
        }}>
          Nic Cage Bingo
        </div>
        <div style={{
          width: "80px",
          height: "2px",
          background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
          margin: "8px auto",
        }} />
        {bingoLines.length > 0 && (
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(18px, 5vw, 28px)",
            color: "#fff",
            fontWeight: 700,
            textShadow: "0 0 20px #d4af37, 0 0 40px #d4af37",
            animation: newBingo ? "stamped 0.5s ease forwards" : "glow-pulse 2s infinite",
          }}>
            🏆 BINGO! × {bingoLines.length}
          </div>
        )}
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "clamp(3px, 1vw, 6px)",
        maxWidth: "520px",
        margin: "0 auto",
        width: "100%",
      }}>
        {/* Column headers */}
        {["B","I","N","G","O"].map(l => (
          <div key={l} style={{
            textAlign: "center",
            fontFamily: "'Cinzel', serif",
            fontWeight: 900,
            fontSize: "clamp(16px, 4vw, 24px)",
            color: "#d4af37",
            textShadow: "0 0 10px rgba(212,175,55,0.6)",
            paddingBottom: "4px",
            letterSpacing: "0.1em",
          }}>{l}</div>
        ))}

        {/* Squares */}
        {card.map((sq, i) => {
          const isMarked = marked.has(sq.id);
          const isWinning = winningIndices.has(i);
          const isFree = sq.isFree;

          return (
            <div
              key={sq.id}
              className={`sq${isWinning ? " winning" : ""}`}
              onClick={() => toggle(sq.id)}
              style={{
                aspectRatio: "1",
                borderRadius: "4px",
                border: isMarked
                  ? `2px solid ${isFree ? "#d4af37" : "#d4af37"}`
                  : "1px solid rgba(212,175,55,0.25)",
                background: isFree
                  ? "linear-gradient(135deg, #8B0000 0%, #5a0000 100%)"
                  : isMarked
                  ? "linear-gradient(135deg, rgba(212,175,55,0.22) 0%, rgba(139,0,0,0.18) 100%)"
                  : "rgba(255,255,255,0.03)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "clamp(4px, 1.5vw, 9px)",
                position: "relative",
                overflow: "hidden",
                boxShadow: isMarked ? "inset 0 0 10px rgba(212,175,55,0.15)" : "none",
              }}
            >
              {/* Stamp overlay */}
              {isMarked && !isFree && (
                <div style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                }}>
                  <div style={{
                    width: "70%",
                    height: "70%",
                    border: "3px solid rgba(212,175,55,0.7)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(139,0,0,0.5)",
                    animation: "stamped 0.3s ease",
                  }}>
                    <span style={{ fontSize: "clamp(14px,3.5vw,22px)" }}>✓</span>
                  </div>
                </div>
              )}

              <div style={{
                fontFamily: isFree ? "'Cinzel', serif" : "'Crimson Text', serif",
                fontSize: isFree ? "clamp(12px,2.8vw,16px)" : "clamp(10px,2.4vw,14px)",
                fontWeight: isFree ? 700 : isMarked ? 600 : 400,
                textAlign: "center",
                lineHeight: 1.25,
                color: isFree ? "#d4af37" : isMarked ? "rgba(232,213,160,0.5)" : "#e8d5a0",
                zIndex: 1,
                whiteSpace: "pre-line",
                letterSpacing: isFree ? "0.05em" : "0",
              }}>
                {sq.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <button
          onClick={reset}
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(11px, 3vw, 14px)",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "#0a0804",
            background: "linear-gradient(135deg, #d4af37 0%, #c9a227 50%, #d4af37 100%)",
            border: "none",
            borderRadius: "3px",
            padding: "10px 24px",
            cursor: "pointer",
            textTransform: "uppercase",
            boxShadow: "0 0 20px rgba(212,175,55,0.4), 0 4px 12px rgba(0,0,0,0.5)",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => e.target.style.boxShadow = "0 0 30px rgba(212,175,55,0.7), 0 4px 12px rgba(0,0,0,0.5)"}
          onMouseLeave={e => e.target.style.boxShadow = "0 0 20px rgba(212,175,55,0.4), 0 4px 12px rgba(0,0,0,0.5)"}
        >
          🎲 New Card
        </button>
        <div style={{
          marginTop: "8px",
          fontFamily: "'Crimson Text', serif",
          fontSize: "clamp(10px, 2.5vw, 13px)",
          color: "rgba(212,175,55,0.4)",
          fontStyle: "italic",
        }}>
          Tap to mark · New Card reshuffles
        </div>
      </div>
    </div>
  );
}
