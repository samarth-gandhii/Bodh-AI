import { Upload, Link as LinkIcon, ClipboardPaste, Mic } from "lucide-react";

export default function ActionCards({ showGuide }: { showGuide: boolean }) {
  const cards = [
    { icon: Upload, title: "Upload", desc: "File, audio, video", guide: "Upload external files here" },
    { icon: LinkIcon, title: "Link", desc: "YouTube, Website", guide: "Paste web links to analyze" },
    { icon: ClipboardPaste, title: "Paste", desc: "Copied Text", guide: "Paste raw text directly" },
    { icon: Mic, title: "Record", desc: "Record Lecture", guide: "Use your mic to dictate" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
      {cards.map((card, idx) => (
        <div key={idx} className="relative">
          <button className="w-full h-full flex flex-col items-start p-4 border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-sm transition-all bg-white text-left">
            <card.icon className="mb-3 text-gray-600" size={24} />
            <span className="font-medium text-gray-900">{card.title}</span>
            <span className="text-xs text-gray-500 mt-1">{card.desc}</span>
          </button>
          
          {/* Quick Guide Tooltip */}
          {showGuide && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap z-10 animate-bounce">
              {card.guide}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-blue-600"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}