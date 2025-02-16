import React, { useEffect, useState } from "react";

import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2, AlertCircle, BarChart } from "lucide-react";
import axiosInstance from "../../helper/axiosInstance";

const TopicAnalytics: React.FC = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [analytics, setAnalytics] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch topics on mount
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axiosInstance.get("/api/topics", {
          withCredentials: true,
        });
        setTopics(response.data);
        if (response.data.length > 0) setSelectedTopic(response.data[0]);
      } catch (err) {
        setError("Failed to fetch topics.");
      }
    };
    fetchTopics();
  }, []);

  // Fetch analytics when topic changes
  useEffect(() => {
    if (!selectedTopic) return;

    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(
          `/api/analytics/topic/${selectedTopic}`,
          { withCredentials: true }
        );
        setAnalytics(response.data);
      } catch (err) {
        setError("Failed to fetch topic analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [selectedTopic]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6 text-gray-100">
      <div className="w-full max-w-4xl bg-gray-800 shadow-md rounded-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-4">
          <h2 className="text-2xl font-bold flex items-center text-gray-100">
            <BarChart className="w-6 h-6 text-blue-400 mr-2" /> Topic Analytics
          </h2>
          <button
            onClick={() => {
              if (selectedTopic) {
                setLoading(true);
                setError(null);
                axiosInstance
                  .get(
                    `/api/analytics/topic/${selectedTopic}`,
                    {
                      withCredentials: true,
                    }
                  )
                  .then((response) => setAnalytics(response.data))
                  .catch(() => setError("Failed to fetch topic analytics."))
                  .finally(() => setLoading(false));
              }
            }}
            className={`px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md flex items-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
            ) : (
              "Refresh"
            )}
          </button>
        </div>

        {/* Topic Selector */}
        <div className="mt-4">
          <label
            htmlFor="topic-select"
            className="block text-gray-300 font-medium"
          >
            Select Topic:
          </label>
          <select
            id="topic-select"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="mt-2 w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-gray-100 focus:ring-2 focus:ring-blue-500"
          >
            {topics.map((topic) => (
              <option
                key={topic}
                value={topic}
                className="bg-gray-800 text-gray-100"
              >
                {topic}
              </option>
            ))}
          </select>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center p-6">
            <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-800 text-red-200 rounded-md flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {/* Analytics Data */}
        {analytics && !loading && (
          <div className="space-y-6 mt-4">
            {/* Overview Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-blue-800 text-blue-200 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Total Clicks</h3>
                <p className="text-3xl font-bold">{analytics.totalClicks}</p>
              </div>
              <div className="p-4 bg-green-800 text-green-200 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Unique Users</h3>
                <p className="text-3xl font-bold">{analytics.uniqueUsers}</p>
              </div>
            </div>

            {/* Clicks Over Time Chart */}
            <div className="bg-gray-700 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-200">
                Clicks Over Time
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <ReBarChart data={analytics.clicksByDate}>
                  <XAxis dataKey="date" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Bar dataKey="totalClicks" fill="#3b82f6" />
                </ReBarChart>
              </ResponsiveContainer>
            </div>

            {/* URL Performance Table */}
            <div className="bg-gray-700 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-200">
                URL Performance
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-600">
                  <thead className="bg-gray-800 text-gray-200">
                    <tr>
                      <th className="p-2 border border-gray-600">Short URL</th>
                      <th className="p-2 border border-gray-600">
                        Total Clicks
                      </th>
                      <th className="p-2 border border-gray-600">
                        Unique Users
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.urls.map((url: any, index: number) => (
                      <tr key={index} className="border border-gray-600">
                        <td className="p-2 text-blue-400 underline">
                          <a
                            href={`hhttps://url-shortner-aeg8.onrender.com/api/shorten/${url.shortUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {url.shortUrl}
                          </a>
                        </td>
                        <td className="p-2 text-center">{url.totalClicks}</td>
                        <td className="p-2 text-center">{url.uniqueUsers}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicAnalytics;
