import { AlignLeft, Play } from "lucide-react";

export default function ContentGrid() {
  return (
    <>
      {/* Tabs Section */}
      <div className="flex space-x-2 overflow-x-auto pb-4 mb-6 hide-scrollbar">
        {["For You", "Education", "Arts, Design & Media", "Languages & Literature", "History & Archaeology"].map((tab, i) => (
          <button key={i} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border ${i === 0 ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow cursor-pointer">
          <div className="h-32 bg-blue-900 relative">
            <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>
          <div className="p-4 flex gap-3">
            <AlignLeft className="text-gray-400 mt-1 shrink-0" size={18} />
            <div>
              <h3 className="font-medium text-gray-900 leading-tight">The British Empire</h3>
              <p className="text-xs text-gray-500 mt-1">24 days ago</p>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow cursor-pointer">
          <div className="h-32 bg-white flex items-center justify-center border-b border-gray-100">
            <span className="font-serif text-xl font-bold text-gray-800">The Genetic Code</span>
          </div>
          <div className="p-4 flex gap-3">
            <AlignLeft className="text-gray-400 mt-1 shrink-0" size={18} />
            <div>
              <h3 className="font-medium text-gray-900 leading-tight">The Genetic Code and Translation</h3>
              <p className="text-xs text-gray-500 mt-1">24 days ago</p>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow cursor-pointer">
          <div className="h-32 bg-gray-800 relative">
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="p-4 flex gap-3">
            <Play className="text-gray-400 mt-1 shrink-0" size={18} />
            <div>
              <h3 className="font-medium text-gray-900 leading-tight">Black Holes Explained – From Birth to Death</h3>
              <p className="text-xs text-gray-500 mt-1">12 months ago</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center justify-center mx-auto gap-1">
          Show More <span>▼</span>
        </button>
      </div>
    </>
  );
}