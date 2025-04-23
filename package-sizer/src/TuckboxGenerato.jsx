import React, { useState } from "react";

export default function TuckboxGenerator() {
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(70);
  const [depth, setDepth] = useState(30);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://www.pacdora.com/tools/box-template-maker?width=${width}&height=${height}&depth=${depth}&unit=mm&utm_source=chatgpt.com`;
    window.open(url, "_blank");
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-xl font-bold">Pacdora Box Template Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Width (mm)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Height (mm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium">Depth (mm)</label>
          <input
            type="number"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Generate Template
        </button>
      </form>
    </div>
  );
}
