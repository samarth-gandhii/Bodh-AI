"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Space from "@/components/Space";

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ChatPageContent />
    </Suspense>
  );
}

function ChatPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userName] = useState("New User");

  const initialPrompt = searchParams.get("prompt") ?? "";
  const initialContentType = searchParams.get("type") ?? "Text";

  const remountKey = useMemo(
    () => `${initialPrompt}-${initialContentType}`,
    [initialPrompt, initialContentType]
  );

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
        <Space
          key={remountKey}
          initialPrompt={initialPrompt}
          initialContentType={initialContentType}
        />
      </main>
    </div>
  );
}
