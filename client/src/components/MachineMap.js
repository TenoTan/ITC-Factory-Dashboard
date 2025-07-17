import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bg from '../cartographer.png';

export default function MachineMap() {
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:5000/api/machine-map")
        .then((res) => res.json())
        .then((data) => setMapData(data))
        .catch((err) => console.error("Failed to fetch machine map:", err));
    };

    //pooling to auto-refresh

    fetchData(); 
    const interval = setInterval(fetchData, 1000); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/machine-map")
      .then((res) => res.json())
      .then((data) => setMapData(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    // <div 
    //     className="absolute bg-black/30 -z-0"
    //     style={{
    //       backgroundImage: `url(${bg})`,
    //       backgroundAttachment: "fixed",
    //     }}
      // >
    <div className="min-h-screen w-screen bg-transparent text-black font-sans flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6 tracking-widest">
        ALLOTTED MACHINES
      </h1>
      <Link to="/" className=" mb-4 text-gray-700 underline">
        ← Back to Dashboard
      </Link>
      <div className="w-full">
        <div className="grid grid-cols-2 text-gray-800 text-lg border-b border-gray-800 pb-2 mb-2 uppercase">
          <div>Employee No.</div>
          <div>Machine No.</div>
        </div>
        <div className="space-y-2">
          {mapData.map((item, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-2 px-4 py-2 rounded-md tracking-wider ${
                idx % 2 === 0 ? "bg-gray-200" : "bg-gray-400"
              }`}
            >
              <div>{item.empno}</div>
              <div>{item.machinenumber}</div>
            </div>
          ))}
        </div>
      </div>

      {/* <Link to="/" className="mt-8 text-yellow-600 underline">
        ← Back to Dashboard
      </Link> */}
    </div>
    // </div>
  );
}
