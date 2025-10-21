"use client";
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, input.trim()]);
      setInput("");
    }
  };

  const generatePlan = async () => {
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tasks, goal }),
    });
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col dark:text-white items-center py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">🧠 AI Workflow Assistant</h1>

      <div className="w-full max-w-md space-y-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task..."
          className="w-full border rounded-lg p-2"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Task
        </button>

        <ul className="list-disc ml-5 text-gray-700">
          {tasks.map((task, i) => (
            <li key={i}>{task}</li>
          ))}
        </ul>

        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="What's your goal?"
          className="w-full border rounded-lg p-2"
        />

        <button
          onClick={generatePlan}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded-lg w-full"
        >
          {loading ? "Generating..." : "Generate Workflow Plan"}
        </button>

        {result && (
          <div className="mt-6 p-4 border rounded-lg bg-white">
            <h2 className="text-lg font-semibold mb-2">AI Plan:</h2>
            <pre className="whitespace-pre-wrap text-gray-800">{result}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
