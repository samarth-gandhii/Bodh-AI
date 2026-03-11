import React, { useState, useEffect } from "react";
import { Bot, X, Code, Loader2 } from "lucide-react";
import SearchBar from "./SearchBar";

interface SpaceProps {
    initialPrompt: string;
}

export default function Space({ initialPrompt }: SpaceProps) {
    const [prompt, setPrompt] = useState("");
    const [isCanvasOpen, setIsCanvasOpen] = useState(false);

    // Dynamic states for your Backend data
    const [isLoading, setIsLoading] = useState(false);
    const [aiText, setAiText] = useState("");
    const [aiCode, setAiCode] = useState<string | null>(null);

    // The function that talks to your FastAPI backend
    const generateContent = async (userPrompt: string) => {
        setIsLoading(true);
        setAiText("");
        setAiCode(null);
        setIsCanvasOpen(false); // Close canvas while loading

        try {
            const response = await fetch("http://localhost:8000/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: userPrompt,
                    model_choice: "Auto",
                    context_type: "3D_simulation"
                }),
            });

            const data = await response.json();
            setAiText(data.text_explanation);

            if (data.canvas_code) {
                setAiCode(data.canvas_code);
            }
        } catch (error) {
            console.error("Engine Connection Error:", error);
            setAiText("Failed to connect to the Akriti backend. Is the FastAPI server running?");
        } finally {
            setIsLoading(false);
        }
    };

    // Run automatically when the Space mounts with the prompt from the Home screen
    useEffect(() => {
        if (initialPrompt) {
            generateContent(initialPrompt);
        }
    }, [initialPrompt]);

    // Run when user types a follow-up question in the Space view
    const handleGenerate = () => {
        if (!prompt.trim()) return;
        generateContent(prompt);
        setPrompt("");
    };

    return (
        <div className="flex h-full w-full bg-white relative overflow-hidden">

            {/* LEFT SIDE: Chat Interface */}
            <div className={`flex flex-col h-full transition-all duration-300 ease-in-out ${isCanvasOpen ? 'w-1/2 border-r border-gray-200' : 'w-full max-w-4xl mx-auto'}`}>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">

                    {/* User Message */}
                    <div className="flex justify-end">
                        <div className="bg-gray-100 text-gray-900 px-5 py-3 rounded-3xl max-w-[80%] shadow-sm">
                            {initialPrompt}
                        </div>
                    </div>

                    {/* AI Response Block */}
                    <div className="flex items-start gap-4 max-w-[90%]">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-1">
                            <Bot size={18} className="text-blue-600" />
                        </div>

                        <div className="space-y-4 text-gray-800 leading-relaxed w-full">
                            {isLoading ? (
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Loader2 className="animate-spin" size={20} />
                                    <span>Akriti Engine is reasoning...</span>
                                </div>
                            ) : (
                                <>
                                    <p>{aiText}</p>

                                    {/* Only show the Open button if code was actually generated */}
                                    {aiCode && (
                                        <div className="border border-gray-200 rounded-2xl p-4 flex items-center justify-between bg-[#fbfbfb] hover:bg-gray-50 transition-colors w-full max-w-md">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-white border border-gray-200 p-2 rounded-lg">
                                                    <Code size={18} className="text-gray-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-900">3D Simulation Generated</h4>
                                                    <p className="text-xs text-gray-500">Three.js Canvas Ready</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setIsCanvasOpen(true)}
                                                className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium px-4 py-1.5 rounded-full text-sm transition-colors"
                                            >
                                                Open
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                </div>

                {/* Input Bar pinned to bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent">
                    <div className={`${isCanvasOpen ? 'w-full' : 'max-w-3xl mx-auto'}`}>
                        <SearchBar
                            prompt={prompt}
                            setPrompt={setPrompt}
                            onGenerate={handleGenerate}
                        />
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: Sliding Canvas Panel */}
            <div className={`bg-[#fbfbfb] h-full transition-all duration-300 ease-in-out flex flex-col ${isCanvasOpen ? 'w-1/2 translate-x-0' : 'w-0 translate-x-full overflow-hidden'}`}>

                {/* Canvas Header */}
                <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-white shrink-0">
                    <span className="font-medium text-sm text-gray-800">Akriti 3D Sandbox</span>
                    <button
                        onClick={() => setIsCanvasOpen(false)}
                        className="text-gray-400 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Canvas Body (Live Iframe Renderer) */}
                <div className="flex-1 p-4">
                    <div className="w-full h-full bg-black rounded-xl border border-gray-200 overflow-hidden relative shadow-inner">
                        {aiCode ? (
                            <iframe
                                title="3D Canvas"
                                srcDoc={`
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <style>body { margin: 0; overflow: hidden; background-color: #000; }</style>
                      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
                      <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
                    </head>
                    <body>
                      <script>
                        try {
                          ${aiCode}
                        } catch(e) {
                          document.body.innerHTML = '<div style="color:red; padding:20px; font-family:sans-serif;">Error running 3D code: ' + e.message + '</div>';
                        }
                      </script>
                    </body>
                  </html>
                `}
                                className="w-full h-full border-0"
                                sandbox="allow-scripts"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-gray-500 text-sm">No simulation generated yet.</span>
                            </div>
                        )}
                    </div>
                </div>

            </div>

        </div>
    );
}