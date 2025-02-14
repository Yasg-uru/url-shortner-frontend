import React, { useState } from "react";
import axios from "axios";

import { CheckCircle, Loader2, Copy, BarChart2 } from "lucide-react";
import { useAuth } from "../../context/authcontext";

const CreateUrl = () => {
  const { user } = useAuth();
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [topic, setTopic] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [analytics, setAnalytics] = useState<any | null>(null);
  const [isFetchingAnalytics, setIsFetchingAnalytics] = useState(false);

  const topics = ["Marketing", "Personal", "Business", "Acquisition", "Social"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setShortUrl(null);
    setCopied(false);

    if (!longUrl) {
      setError("Long URL is required!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/shorten",
        { longUrl, customAlias, topic },
        { withCredentials: true }
      );

      setShortUrl(response.data.shortUrl);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    if (!shortUrl) return;

    setIsFetchingAnalytics(true);
    try {
      const alias = shortUrl.split("/").pop(); // Extract alias from short URL
      const response = await axios.get(`http://localhost:8000/api/analytics/${alias}`, { withCredentials: true });

      setAnalytics(response.data);
    } catch (err: any) {
      setError("Failed to fetch analytics.");
    } finally {
      setIsFetchingAnalytics(false);
    }
  };

  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center mb-6">
          🔗 Create Short URL
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Long URL</label>
            <input
              type="url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the long URL..."
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Custom Alias (Optional)</label>
            <input
              type="text"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. my-custom-link"
            />
          </div>

          <div>
            <label className="block font-semibold">Select Topic</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a topic...</option>
              {topics.map((t) => (
                <option key={t} value={t.toLowerCase()}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Shorten URL"}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-green-600 font-semibold flex items-center justify-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Short URL Created!
            </p>
            <div className="mt-2 flex items-center justify-center space-x-2">
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {shortUrl}
              </a>
              <button onClick={copyToClipboard} className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                {copied ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>

            {/* Fetch Analytics Button */}
            <button
              onClick={fetchAnalytics}
              className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center w-full"
              disabled={isFetchingAnalytics}
            >
              {isFetchingAnalytics ? <Loader2 className="animate-spin h-5 w-5" /> : <BarChart2 className="h-5 w-5 mr-2" />}
              Get URL Analysis
            </button>
          </div>
        )}

        {/* Display Analytics */}
        {analytics && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-center mb-3">📊 URL Analytics</h3>
            <p><strong>Total Clicks:</strong> {analytics.totalClicks}</p>
            <p><strong>Unique Users:</strong> {analytics.uniqueUsers}</p>

            <h4 className="font-semibold mt-3">Clicks By Date</h4>
            <ul className="list-disc pl-5">
              {analytics.clicksByDate.map((entry: any) => (
                <li key={entry._id}>
                  {entry.date}: {entry.clickCount} clicks
                </li>
              ))}
            </ul>

            <h4 className="font-semibold mt-3">OS Statistics</h4>
            <ul className="list-disc pl-5">
              {analytics.osTypeStats.map((entry: any) => (
                <li key={entry._id}>
                  {entry.osName}: {entry.uniqueClicks} clicks ({entry.uniqueUsers} users)
                </li>
              ))}
            </ul>

            <h4 className="font-semibold mt-3">Device Type Statistics</h4>
            <ul className="list-disc pl-5">
              {analytics.deviceTypeStats.map((entry: any) => (
                <li key={entry._id}>
                  {entry.deviceName}: {entry.uniqueClicks} clicks ({entry.uniqueUsers} users)
                </li>
              ))}
            </ul>
          </div>
        )}

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default CreateUrl;
