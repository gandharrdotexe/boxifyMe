import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://sstamp.onrender.com/api/logs";

function KK() {
  const [logs, setLogs] = useState([]);
  const [intervalSec, setIntervalSec] = useState(30);
  const [blockView, setBlockView] = useState(false);

  // Fetch logs periodically
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(API);
        setLogs(res.data);
      } catch (err) {
        console.error("Failed to fetch logs", err);
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, intervalSec * 1000);
    return () => clearInterval(interval);
  }, [intervalSec]);

  // Detect unsafe environments like devtools or screen-sharing
  useEffect(() => {
    const detectUnsafeEnv = () => {
      const screenDiff = window.outerHeight - window.innerHeight;
      const screenWidthDiff = window.outerWidth - window.innerWidth;
      if (screenDiff > 100 || screenWidthDiff > 100) {
        setBlockView(true);
      } else {
        setBlockView(false);
      }
    };

    detectUnsafeEnv();
    window.addEventListener("resize", detectUnsafeEnv);
    const interval = setInterval(detectUnsafeEnv, 2000);
    return () => {
      window.removeEventListener("resize", detectUnsafeEnv);
      clearInterval(interval);
    };
  }, []);

  if (blockView) {
    return (
      <div
        style={{
          height: "100vh",
          backgroundColor: "black",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
        }}
      >
        🔒 Secure View Enabled — Screen recording or debugging detected.
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>🖥️ Live Screenshot Monitor</h2>
      <label>
        Refresh Interval (sec):
        <input
          type="number"
          value={intervalSec}
          min={5}
          style={{ marginLeft: 10 }}
          onChange={async (e) => {
            const newVal = parseInt(e.target.value);
            setIntervalSec(newVal);
            try {
              await axios.post(`${API}/interval`, {
                interval: newVal,
              });
            } catch (err) {
              console.error("Failed to update interval", err);
            }
          }}
        />
      </label>

      {logs.map((log, index) => (
        <div
          key={index}
          style={{ border: "1px solid #ccc", marginTop: 20, padding: 10 }}
        >
          <p>
            <strong>Timestamp:</strong> {log.timestamp}
          </p>
          <img
            src={log.imageUrl}
            alt="Screenshot"
            style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }}
          />
          <h4>App Usage:</h4>
          <ul>
            {Object.entries(log.usage).map(([app, time], idx) => (
              <li key={idx}>
                {app} — {time} sec
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default KK;
