"use client";

import { useState } from "react";

export default function Analytics() {
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setInsights(null);

    try {
      if (file) {
        // CSV upload path
        const text = await file.text();
        const res = await fetch("/.netlify/functions/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ csvData: text }),
        });

        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();
        setInsights(data.insights || "No insights returned.");
      } else {
        // Original sample data path
        const sampleData = `
          Product,Sales,Region
          Widget A,100,North
          Widget B,150,South
          Widget C,200,East
        `;

        const res = await fetch("/.netlify/functions/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ csvData: sampleData }),
        });

        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();
        setInsights(data.insights || "No insights returned.");
      }
    } catch (err: any) {
      setInsights(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Data Insights</h1>
      <p>
        Upload a CSV file for analysis, or leave it blank to use the built-in
        sample dataset.
      </p>

      <input type="file" accept=".csv" onChange={handleFileChange} />

      <button onClick={handleAnalyze} disabled={loading} style={{ marginTop: "10px" }}>
        {loading ? "Analyzing..." : "Get Insights"}
      </button>

      {insights && (
        <div style={{ marginTop: "20px" }}>
          <h2>Insights</h2>
          <pre>{insights}</pre>
        </div>
      )}
    </div>
  );
}
