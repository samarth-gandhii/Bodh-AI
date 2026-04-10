"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cards from "@/components/Cards";
import Sidebar from "@/components/Sidebar";

interface TopicPageProps {
  params: { id: string } | Promise<{ id: string }>;
}

export default function TopicPage({ params }: TopicPageProps) {
  const router = useRouter();
  const [topicId, setTopicId] = useState<string | null>(null);

  useEffect(() => {
    Promise.resolve(params).then((resolved) => {
      setTopicId(resolved.id);
    });
  }, [params]);

  return (
    <div className="flex min-h-screen bg-[#fafafa] text-gray-900 font-sans">
      <Sidebar
        userName="New User"
        onHomeClick={() => router.push("/")}
        onSearchClick={() => router.push("/search")}
        onChatClick={() => router.push("/chat")}
        onHistoryClick={() => router.push("/history")}
        onHistoryItemClick={(id) => router.push(`/topic/${id}`)}
      />
      <main className="flex-1 overflow-y-auto bg-white relative flex flex-col min-w-0">
        {topicId ? (
          <Cards topicId={topicId} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
          </div>
        )}
      </main>
    </div>
  );
}
