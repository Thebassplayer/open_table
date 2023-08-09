import React from "react";
import Header from "./components/Header";

const Loading = () => {
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => (
          <div
            key={item}
            className="bg-slate-200 w-64 h-72 m-3 rounded overflow-hidden cursor-pointer"
          >
            <div className="animate-pulse flex-1 space-y-4">
              <div className="w-full h-36 bg-slate-700" id="image"></div>
              <div className="flex-1 mx-2 space-y-3">
                <div className="h-6 bg-slate-700 rounded"></div>
                <div className="h-4 w-1/2 bg-slate-700 rounded"></div>
                <div className="h-4 w-4/6 bg-slate-700 rounded"></div>
                <div className="h-4 w-4/6 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Loading;
