import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bg from "../cartographer.png";

// ✅ FIXED: wrap datetime in new Date()
const formatDate = (date) => new Date(date).toLocaleDateString();
const formatTime = (date) =>
  new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

export default function AirportDashboard() {
  const [time, setTime] = useState(new Date());
  const [employees, setEmployees] = useState([]);

  //pooling to auto-refresh

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:5000/api/employees")
        .then((res) => res.json())
        .then((data) => setEmployees(data))
        .catch((err) => console.error("Failed to fetch employees:", err));
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/employees")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setEmployees(data);
      })
      .catch((err) => console.error("Failed to fetch employees:", err));
  }, []);

  return (
    <div
      className="absolute bg-fixed  -z-0"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="min-h-screen w-screen z-10 bg-transparent text-black font-sans flex flex-col items-center p-6">
        <h1 className="text-4xl mb-6 font-bold tracking-widest">
          FACTORY EMPLOYEE ENTRIES
        </h1>
        <Link to="/machine-map">
          <button className="bg-gray-500 text-black font-bold px-4 py-2 rounded hover:bg-gray-600 transition">
            Machine Map
          </button>
        </Link>
        <div className="w-full">
          <div className="grid grid-cols-3 text-gray-800 text-lg border-b border-gray-800 pb-2 mb-2 uppercase">
            <div>Employee No.</div>
            <div>Date</div>
            <div>Time</div>
          </div>
          <div className="space-y-2">
            {employees.map((emp, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 w-full px-4 py-2 rounded-md tracking-wider ${
                  index % 2 === 0 ? "bg-gray-300" : "bg-gray-400"
                }`}
              >
                <div>{emp.empno}</div>
                <div>{formatDate(emp.swipe_date_time)}</div>
                <div>{formatTime(emp.swipe_date_time)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

<Link to="/machine-map" className="mt-8 text-yellow-600 underline">
  View Machine Map →
</Link>;
