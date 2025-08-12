"use client";

import { useState } from "react";

export default function AnalyticsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please upload a CSV file.");
      return;
    }
    setError(null);
    setLoading(true);
    setInsights(null);

    try {
      const text = await file.text();

      const response = await fetch("/.netlify/functions/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csvData: text }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      setInsights(result.insights || "No insights generated.");
    } catch (err: any) {
      console.error(err);
      setError("Failed to analyze dataset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Data Analytics</h1>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={handleAnalyze}
        disabled={!file || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze CSV"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {insights && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold mb-2">Insights</h2>
          <p>{insights}</p>
        </div>
      )}
    </div>
  );
}
