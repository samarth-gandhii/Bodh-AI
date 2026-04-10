"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Clock3, ArrowRight } from "lucide-react";

const HISTORY_ITEMS = [
  { id: "1", topicId: "dijkstra", title: "Dijkstra's Algorithm", excerpt: "Shortest path walkthrough with visual hints" },
  { id: "2", topicId: "greedy", title: "Greedy Algorithms", excerpt: "When local choices lead to global solutions" },
  { id: "3", topicId: "a-star", title: "A* Search Algorithm", excerpt: "Heuristic pathfinding in action" },
  { id: "4", topicId: "solar-system", title: "Solar System Basics", excerpt: "Planetary motion and orbital intuition" },
];

export default function HistoryPage() {
  const router = useRouter();
  const [userName] = useState("New User");

  return (
    <div className="flex min-h-screen bg-[#fafafa] text-gray-900 font-sans">
      <Sidebar
        userName={userName}
        onHomeClick={() => router.push("/")}
        onSearchClick={() => router.push("/search")}
        onChatClick={() => router.push("/chat")}
        onHistoryClick={() => router.push("/history")}
        onHistoryItemClick={(topicId) => router.push(`/topic/${topicId}`)}
      />

      <main className="flex-1 overflow-y-auto bg-white relative flex flex-col min-w-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-14 sm:pt-16 md:pt-20 pb-10 md:pb-12 w-full">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">History</h1>
            <p className="mt-2 text-sm text-gray-500">Recent learning sessions and topic chats.</p>
          </div>

          <div className="space-y-3">
            {HISTORY_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => router.push(`/topic/${item.topicId}`)}
                className="w-full text-left border border-gray-200 rounded-xl p-4 sm:p-5 bg-white hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <Clock3 size={14} />
                      <span>Recent session</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 truncate">{item.excerpt}</p>
                  </div>
                  <ArrowRight size={18} className="text-gray-400 shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
