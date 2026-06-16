import { useState, useRef, useEffect } from "react";
import { ChevronLeft, Send, Mic } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type Screen = string;
interface Props { onBack: () => void; onNavigate: (s: Screen) => void; }

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  textBn?: string;
  time: string;
}

const QUICK_PROMPTS = [
  "My father collapsed",
  "Chest pain - what to do?",
  "Road accident nearby",
  "Snake bite first aid",
  "Choking — help!",
  "Stroke symptoms",
];

const RESPONSES: Record<string, { text: string; textBn: string }> = {
  default: {
    text: "I understand you need help. Please stay calm. I'm here to guide you through this emergency step by step. Can you tell me more about the situation?",
    textBn: "আমি বুঝতে পারছি আপনার সাহায্য দরকার। শান্ত থাকুন। আমি আপনাকে সাহায্য করব।",
  },
  collapse: {
    text: "⚡ IMMEDIATE STEPS:\n1. Check if they're responsive — tap their shoulder and shout\n2. If unresponsive — call 108 NOW (already done via SOS)\n3. Check for breathing — look, listen, feel for 10 seconds\n4. If not breathing — start CPR: 30 chest compressions + 2 rescue breaths\n5. Push hard and fast (2 inches deep) at the center of chest\n6. Don't stop until ambulance arrives\n\nAmbulance has been alerted to your location. ETA 7 minutes.",
    textBn: "অবিলম্বে পদক্ষেপ নিন: ১. সাড়া পাওয়া যাচ্ছে কিনা পরীক্ষা করুন। ২. না পেলে CPR শুরু করুন।",
  },
  chest: {
    text: "⚠️ CHEST PAIN PROTOCOL:\n1. Make the person sit or lie down comfortably — DON'T let them walk\n2. Loosen any tight clothing\n3. Ask if they have nitroglycerin prescribed — if yes, give it\n4. If they're conscious, give 300mg aspirin (chew it, don't swallow whole)\n5. Do NOT give food or water\n6. Keep them calm and still\n7. Monitor breathing every 2 minutes\n\nThis could be a cardiac event. Ambulance has been dispatched.",
    textBn: "বুকে ব্যথার ক্ষেত্রে: রোগীকে শুইয়ে দিন, আঁটসাঁট পোশাক আলগা করুন।",
  },
  snake: {
    text: "🐍 SNAKE BITE FIRST AID:\n1. Keep the person STILL — movement spreads venom\n2. Remove jewelry/watches near the bite\n3. Mark the edge of swelling with pen every 15 mins\n4. Do NOT cut, suck, or tourniquet the wound\n5. Keep bitten limb below heart level\n6. Note the snake description if safe to do so\n7. Rush to hospital immediately — anti-venom needed\n\nNearest hospital with anti-venom: SSKM Hospital (0.8 km)",
    textBn: "সাপে কামড়ালে: নড়াচড়া করাবেন না, ক্ষত কাটবেন না।",
  },
  choke: {
    text: "🆘 CHOKING - ACT IMMEDIATELY:\n1. Ask 'Are you choking?' — if they can't speak/cough, act NOW\n2. For adults: Stand behind, wrap arms around waist\n3. Give 5 firm back blows between shoulder blades\n4. Then give 5 abdominal thrusts (Heimlich maneuver)\n5. Alternate back blows and thrusts until object dislodges\n6. If they lose consciousness — begin CPR\n\nFor infants: Face-down 5 back blows + 5 chest thrusts",
    textBn: "শ্বাসরোধ হলে: হেইমলিখ পদ্ধতিতে পেটে চাপ দিন।",
  },
  stroke: {
    text: "🧠 STROKE — FAST TEST:\nF — Face drooping? Ask them to smile\nA — Arm weakness? Ask to raise both arms\nS — Speech difficulty? Ask to repeat a sentence\nT — Time to call 108! Every minute matters!\n\nWHILE WAITING:\n• Don't give food/water/medications\n• Lay them on their side (recovery position)\n• Note the exact time symptoms started\n• Keep them calm and awake\n\nNearest stroke center: Apollo Gleneagles (2.1 km)",
    textBn: "স্ট্রোকের FAST পরীক্ষা করুন। তাৎক্ষণিক হাসপাতালে নিয়ে যান।",
  },
};

function getResponse(text: string) {
  const lower = text.toLowerCase();
  if (lower.includes("collapse") || lower.includes("faint") || lower.includes("unconscious")) return RESPONSES.collapse;
  if (lower.includes("chest") || lower.includes("heart")) return RESPONSES.chest;
  if (lower.includes("snake") || lower.includes("bite")) return RESPONSES.snake;
  if (lower.includes("chok")) return RESPONSES.choke;
  if (lower.includes("stroke")) return RESPONSES.stroke;
  return RESPONSES.default;
}

export function AIAssistantScreen({ onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Hello! I'm your JibonSetu Emergency AI Assistant. I'm here 24/7 to guide you through any medical emergency. How can I help you right now?",
      textBn: "নমস্কার! আমি আপনার জরুরি সহায়তা সহকারী। যেকোনো জরুরি অবস্থায় আমি আপনাকে সাহায্য করব।",
      time: "Now",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const resp = getResponse(text);
      setMessages((m) => [...m, { id: Date.now() + 1, role: "assistant", text: resp.text, textBn: resp.textBn, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="size-full flex flex-col bg-[#f8f8fa]">
      {/* Header */}
      <div className="shrink-0 pt-14 pb-4 px-5" style={{ background: "linear-gradient(135deg, #f67e49 0%, #ff3b30 100%)" }}>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-white/80 p-1 -ml-1"><ChevronLeft size={24} /></button>
          <div className="size-10 rounded-2xl bg-white/25 flex items-center justify-center text-xl">🤖</div>
          <div>
            <h1 className="text-white text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>Emergency AI Assistant</h1>
            <div className="flex items-center gap-1.5">
              <div className="size-2 rounded-full bg-green-300" />
              <p className="text-white/70 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>Online · Available 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {/* Quick prompts */}
        {messages.length <= 1 && (
          <div className="space-y-2">
            <p className="text-xs text-gray-400 text-center" style={{ fontFamily: "Inter, sans-serif" }}>Quick emergency situations:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  className="text-xs px-3 py-2 rounded-2xl border border-orange-200 text-orange-700 bg-orange-50"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}
            >
              {msg.role === "assistant" && (
                <div className="size-7 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xs shrink-0 mt-1">🤖</div>
              )}
              <div
                className="max-w-[82%] rounded-3xl px-4 py-3"
                style={{
                  background: msg.role === "user" ? "#f67e49" : "white",
                  borderRadius: msg.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                }}
              >
                <p
                  className="text-sm whitespace-pre-line"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    color: msg.role === "user" ? "white" : "#1a1a2e",
                    lineHeight: 1.6,
                  }}
                >
                  {msg.text}
                </p>
                {msg.textBn && msg.role === "assistant" && (
                  <p className="text-xs text-gray-400 mt-1.5" style={{ fontFamily: "Inter, sans-serif" }}>{msg.textBn}</p>
                )}
                <p className="text-xs mt-1 opacity-60" style={{ fontFamily: "Inter, sans-serif", textAlign: msg.role === "user" ? "right" : "left", color: msg.role === "user" ? "white" : "#9ca3af" }}>{msg.time}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <div className="flex justify-start gap-2">
            <div className="size-7 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xs shrink-0">🤖</div>
            <div className="bg-white rounded-3xl px-4 py-3 shadow-sm flex items-center gap-1">
              {[0, 0.2, 0.4].map((d, i) => (
                <motion.div key={i} className="size-2 bg-gray-300 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: d, repeat: Infinity }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 bg-white px-4 pt-3 pb-8 border-t border-gray-100">
        <div className="flex gap-2 items-end">
          <div className="flex-1 bg-gray-50 rounded-2xl px-4 py-3 flex items-center gap-2 border border-gray-100">
            <input
              className="flex-1 bg-transparent outline-none text-sm"
              placeholder="Describe the emergency..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            <button className="text-gray-400"><Mic size={16} /></button>
          </div>
          <button
            onClick={() => sendMessage(input)}
            className="size-11 rounded-2xl flex items-center justify-center text-white"
            style={{ background: input.trim() ? "#f67e49" : "#e5e7eb" }}
          >
            <Send size={16} color={input.trim() ? "white" : "#9ca3af"} />
          </button>
        </div>
      </div>
    </div>
  );
}
