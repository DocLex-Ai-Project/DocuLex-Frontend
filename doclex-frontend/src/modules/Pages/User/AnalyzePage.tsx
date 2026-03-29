import { useState } from "react";
import AIResultCard from "./AIResultCard";"
import axios from "axios";

const AnalyzePage = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/ai/analyze", { text });

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Document Analysis</h2>

      <textarea
        rows={10}
        style={{ width: "100%" }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && <AIResultCard {...result} />}
    </div>
  );
};

export default AnalyzePage;