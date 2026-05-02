"use client";

import React, { useEffect, useState } from "react";
import Cards from "@/components/Cards";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";

interface SpacePageProps {
  params: { id: string } | Promise<{ id: string }>;
}

export default function SpacePage({ params }: SpacePageProps) {
  const router = useRouter();
  const [topicId, setTopicId] = useState<string | null>(null);

  useEffect(() => {
    Promise.resolve(params).then((resolved) => {
      setTopicId(resolved.id);
    });
  }, [params]);

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-[#fafafa] text-gray-900 font-sans">
      <Sidebar 
        userName="New User"
        onSearchClick={() => router.push("/")}
        onGuideToggle={() => {}}
        onHomeClick={handleHomeClick}
      />
      <main className="flex-1 overflow-y-auto bg-white relative flex flex-col min-w-0">
        {topicId ? (
          <Cards topicId={topicId} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        )}
      </main>
    </div>
  );
}
