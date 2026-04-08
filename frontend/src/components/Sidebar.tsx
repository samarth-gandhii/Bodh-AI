import { useState, useEffect, useRef } from "react";
import {
  Search, Clock, Plus, Box, MessageSquare,
  BookOpen, MoreHorizontal, Menu, Upload, Link as LinkIcon,
  ClipboardPaste, Mic, LogOut, X, ChevronDown, ChevronRight
} from "lucide-react";

interface SidebarProps {
  userName: string;
  onSearchClick: () => void;
  onGuideToggle: () => void;
  onHomeClick: () => void;
}

export default function Sidebar({ userName, onSearchClick, onGuideToggle, onHomeClick }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAddContent, setShowAddContent] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const dummyHistory = [
    { id: 1, title: "K-Means Clustering 3D Plot" },
    { id: 2, title: "Time Series: Stock Market Trends" },
    { id: 3, title: "Decision Tree Architecture" },
    { id: 4, title: "Neural Network Layers" },
    { id: 5, title: "PCA Dimensionality Reduction" },
    { id: 6, title: "Linear Regression Plane" },
    { id: 7, title: "Cloud Data Pipeline Structure" },
  ];

  // References for the click-outside logic
  const addContentRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Close Add Content if clicked outside
      if (addContentRef.current && !addContentRef.current.contains(event.target as Node)) {
        setShowAddContent(false);
      }
      // Close User Menu if clicked outside
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <aside className={`${isCollapsed ? 'md:w-20' : 'md:w-64'} hidden md:flex transition-all duration-300 bg-[#fbfbfb] border-r border-gray-200 flex-col justify-between h-full relative z-20`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 flex items-center justify-between shrink-0">
            {!isCollapsed && (
              <div onClick={onHomeClick} className="flex items-center space-x-2 font-bold text-xl cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-bold text-lg">P</div>
                <span>Pragnya AI</span>
              </div>
            )}
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-gray-400 hover:text-gray-600 mx-auto">
              <Menu size={20} />
            </button>
          </div>

          {/* Add Content Button & Popup */}
          <div className="px-3 pb-2 relative shrink-0" ref={addContentRef}>
            <button
              onClick={() => setShowAddContent(!showAddContent)}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2'} bg-gray-100 hover:bg-gray-200 py-2 px-3 rounded-full text-sm font-medium transition-colors`}
            >
              <Plus size={16} />
              {!isCollapsed && <span>Add content</span>}
            </button>

            {/* Add Content Popup */}
            {showAddContent && (
              <div className="absolute top-0 left-full ml-2 w-48 bg-white border border-gray-200 shadow-lg rounded-xl p-2 z-50">
                <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg text-sm"><Upload size={16} /> Upload</button>
                <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg text-sm"><LinkIcon size={16} /> Link</button>
                <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg text-sm"><ClipboardPaste size={16} /> Paste</button>
                <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg text-sm"><Mic size={16} /> Record</button>
              </div>
            )}
          </div>

          {/* Scrollable Middle Section */}
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {/* Main Nav */}
            <nav className="px-3 space-y-1 mt-2 text-sm text-gray-600 relative">
              <button onClick={onSearchClick} className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-3 py-2 hover:bg-gray-100 rounded-lg`}>
                <Search size={18} /> {!isCollapsed && <span>Search</span>}
              </button>

              {/* History Toggle Button */}
              <button
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2 hover:bg-gray-100 rounded-lg ${isHistoryOpen && !isCollapsed ? 'bg-gray-100' : ''}`}
              >
                <div className={`flex items-center ${isCollapsed ? 'space-x-0' : 'space-x-3'}`}>
                  <Clock size={18} />
                  {!isCollapsed && <span>History</span>}
                </div>
                {!isCollapsed && (
                  isHistoryOpen ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />
                )}
              </button>

              {/* Scrollable History List (Accordion) */}
              {!isCollapsed && isHistoryOpen && (
                <div className="mt-1 mb-2 pl-2 pr-1 max-h-40 overflow-y-auto space-y-1">
                  {dummyHistory.map((item) => (
                    <button
                      key={item.id}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg truncate text-left transition-colors"
                    >
                      <MessageSquare size={12} className="shrink-0 opacity-50" />
                      <span className="truncate">{item.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </nav>

            {!isCollapsed && <div className="px-6 py-2 mt-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Spaces</div>}
            <nav className="px-3 space-y-1 text-sm text-gray-600">
              <button className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-3 py-2 hover:bg-gray-100 rounded-lg`}>
                <Box size={18} /> {!isCollapsed && <span>{userName}&apos;s Space</span>}
              </button>
            </nav>

            {!isCollapsed && <div className="px-6 mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Help & Tools</div>}
            <nav className="px-3 space-y-1 text-sm text-gray-600 pb-4">
              <button onClick={() => setShowFeedback(true)} className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-3 py-2 hover:bg-gray-100 rounded-lg`}>
                <MessageSquare size={18} /> {!isCollapsed && <span>Feedback</span>}
              </button>
              <button onClick={onGuideToggle} className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-3 py-2 hover:bg-gray-100 rounded-lg`}>
                <BookOpen size={18} /> {!isCollapsed && <span>Quick Guide</span>}
              </button>
            </nav>
          </div>

          {/* User Profile Footer */}
          <div className="p-4 shrink-0 relative" ref={userMenuRef}>
            {!isCollapsed && (
              <div className="border border-green-200 bg-green-50 text-green-700 text-xs text-center py-1 rounded-t-lg">
                {/* Free Plan */}
              </div>
            )}
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center p-2 rounded-lg' : 'justify-between border border-gray-200 border-t-0 bg-white p-2 rounded-b-lg'} hover:bg-gray-50`}
            >
              <div className="flex items-center space-x-2 text-sm font-medium">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">{userName.charAt(0)}</div>
                {!isCollapsed && <span className="truncate">{userName}</span>}
              </div>
              {!isCollapsed && <MoreHorizontal size={16} className="text-gray-400 shrink-0" />}
            </button>

            {/* Logout Popup */}
            {showUserMenu && (
              <div className={`absolute bottom-full mb-2 ${isCollapsed ? 'left-4' : 'right-4 w-48'} bg-white border border-gray-200 shadow-lg rounded-xl p-2 z-50`}>
                <button className="w-full flex items-center gap-2 p-2 hover:bg-red-50 text-red-600 rounded-lg text-sm font-medium transition-colors">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Feedback Modal (Fixed to screen center) */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl w-96 p-6 relative">
            <button onClick={() => setShowFeedback(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"><X size={20} /></button>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Send Feedback</h2>
            <textarea
              className="w-full h-32 border border-gray-300 rounded-lg p-3 resize-none outline-none focus:border-blue-500 text-sm text-gray-800"
              placeholder="Tell us what you think about Akriti..."
            ></textarea>
            <button
              onClick={() => setShowFeedback(false)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      )}
    </>
  );
}