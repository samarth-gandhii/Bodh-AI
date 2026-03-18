"use client";

import React, { useState, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import ActionCards from "@/components/ActionCards";
import SearchBar from "@/components/SearchBar";
import ContentGrid from "@/components/ContentGrid";
import Space from "@/components/Space";

export default function Home() {
  const [userName] = useState("Admiral");
  const [prompt, setPrompt] = useState("");
  const [showGuide, setShowGuide] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Gemini 2.5 Flash");
  const [contentType, setContentType] = useState("Text");
  
  // Navigation State
  const [activeView, setActiveView] = useState<"dashboard" | "space">("dashboard");
  const [submittedPrompt, setSubmittedPrompt] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fires when user hits Enter on the Home Screen
  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setSubmittedPrompt(prompt);
    setActiveView("space");
    setPrompt(""); // Clear the home input bar
  };

  // Fires when user clicks "Akriti" in the Sidebar
  const handleHomeClick = () => {
    setActiveView("dashboard");
    setSubmittedPrompt("");
  };

  return (
    <div className="flex h-screen bg-[#fafafa] text-gray-900 font-sans overflow-hidden">
      
      <Sidebar 
        userName={userName}
        onSearchClick={() => {
          if (activeView !== "dashboard") setActiveView("dashboard");
          setTimeout(() => searchInputRef.current?.focus(), 100);
        }}
        onGuideToggle={() => setShowGuide(!showGuide)}
        onHomeClick={handleHomeClick} // Passes the home navigation trigger
      />

      <main className="flex-1 overflow-y-auto bg-white relative flex flex-col">
        
        {/* Only show upgrade button on dashboard */}
        {activeView === "dashboard" && (
          <div className="absolute top-4 right-6 z-10">
            <button className="px-4 py-1.5 rounded-full border border-green-300 text-green-600 text-sm font-medium hover:bg-green-50 transition-colors">
              Upgrade
            </button>
          </div>
        )}

        {/* View Router */}
        {activeView === "dashboard" ? (
          <div className="max-w-5xl mx-auto px-8 pt-20 pb-12 w-full">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-semibold text-gray-900">Hey {userName}, ready to learn?</h1>
            </div>

            <ActionCards showGuide={showGuide} />
            
            <SearchBar 
              ref={searchInputRef}
              prompt={prompt} 
              setPrompt={setPrompt} 
              onGenerate={handleGenerate} 
              selectedModel={selectedModel}       
              setSelectedModel={setSelectedModel} 
              contentType={contentType}           
              setContentType={setContentType}
            />
            
            <ContentGrid />
          </div>
        ) : (
          // Mount the Space environment and pass the prompt
          <Space initialPrompt={submittedPrompt} /> 
        )}

      </main>
    </div>
  );
}