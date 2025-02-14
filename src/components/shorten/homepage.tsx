import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CheckCircle,
  Loader2,
  Copy,
  BarChart2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import axiosInstance from "../../helper/axiosInstance";
// import { useAuth } from "../../context/authcontext";

const CreateUrl = () => {
  // const { user } = useAuth();
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [topic, setTopic] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [analytics, setAnalytics] = useState<any | null>(null);
  const [_, setIsFetchingAnalytics] = useState(false);
  const [recentUrls, setRecentUrls] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    hasNext: false,
    hasPrevious: false,
  });
  const [isFetchingRecentUrls, setIsFetchingRecentUrls] = useState(false);

  const topics = ["Marketing", "Personal", "Business", "Acquisition", "Social"];

  // Fetch recent URLs
  const fetchRecentUrls = async (page: number, limit: number) => {
    setIsFetchingRecentUrls(true);
    try {
      const response = await axios.get(
        `https://url-shortner-aqh9.onrender.com/api/recent-urls?page=${page}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      setRecentUrls(response.data.data);
      setPagination(response.data.pagination);
    } catch (err: any) {
      setError("Failed to fetch recent URLs.");
    } finally {
      setIsFetchingRecentUrls(false);
    }
  };

  // Fetch recent URLs on component mount and when pagination changes
  useEffect(() => {
    fetchRecentUrls(pagination.page, pagination.limit);
  }, [pagination.page, pagination.limit]);

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
      const response = await axiosInstance.post(
        "/api/shorten",
        { longUrl, customAlias, topic },
        { withCredentials: true }
      );

      setShortUrl(response.data.shortUrl);
      fetchRecentUrls(1, pagination.limit); // Refresh recent URLs after creating a new one
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAnalytics = async (alias: string) => {
    setIsFetchingAnalytics(true);
    try {
      const response = await axiosInstance.get(
        `/api/analytics/${alias}`,
        { withCredentials: true }
      );
      setAnalytics(response.data);
    } catch (err: any) {
      setError("Failed to fetch analytics.");
    } finally {
      setIsFetchingAnalytics(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4 py-8">
      <div className="bg-gray-800 shadow-2xl rounded-2xl p-6 max-w-4xl w-full border border-gray-700">
      {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          🔗 Create Short URL
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-300">
              Long URL
            </label>
            <input
              type="url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
              placeholder="Enter the long URL..."
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-300">
              Custom Alias (Optional)
            </label>
            <input
              type="text"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
              placeholder="e.g. my-custom-link"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-300">
              Select Topic
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            >
              <option value="" className="text-gray-400">
                Choose a topic...
              </option>
              {topics.map((t) => (
                <option key={t} value={t.toLowerCase()} className="text-white">
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
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Shorten URL"
            )}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 bg-gray-700 p-4 rounded-lg text-center border border-gray-600">
            <p className="text-green-400 font-semibold flex items-center justify-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Short URL Created!
            </p>
            <div className="mt-2 flex items-center justify-center space-x-2">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                {shortUrl}
              </a>
              <button
                onClick={() => copyToClipboard(shortUrl)}
                className="p-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition"
              >
                {copied ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <Copy className="h-5 w-5 text-gray-300" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Recent URLs Table */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-center mb-4 text-white">
            📜 Recent URLs
          </h3>
          {isFetchingRecentUrls ? (
            <div className="flex justify-center">
              <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-700 rounded-lg">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-gray-300">
                        Short URL
                      </th>
                      <th className="px-4 py-2 text-left text-gray-300">
                        Long URL
                      </th>
                      <th className="px-4 py-2 text-left text-gray-300">
                        Topic
                      </th>
                      <th className="px-4 py-2 text-left text-gray-300">
                        Clicks
                      </th>
                      <th className="px-4 py-2 text-left text-gray-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUrls.map((url) => (
                      <tr key={url._id} className="border-t border-gray-600">
                        <td className="px-4 py-2 text-blue-400">
                          <a
                            href={`https://url-shortner-aqh9.onrender.com/api/shorten/${url.shortUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {url.shortUrl}
                          </a>
                        </td>
                        <td className="px-4 py-2 text-gray-300 truncate max-w-xs">
                          {url.longUrl}
                        </td>
                        <td className="px-4 py-2 text-gray-300 capitalize">
                          {url.topic}
                        </td>
                        <td className="px-4 py-2 text-gray-300">
                          {url.clicks}
                        </td>
                        <td className="px-4 py-2">
                          <button
                            type="button"
                            onClick={() =>
                              fetchAnalytics(url.shortUrl.split("/").pop())
                            }
                            className="p-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                          >
                            <BarChart2 className="h-5 w-5 text-white" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={!pagination.hasPrevious}
                  className="p-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>
                <span className="text-gray-300">
                  Page {pagination.page} of{" "}
                  {Math.ceil(pagination.total / pagination.limit)}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={!pagination.hasNext}
                  className="p-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition disabled:opacity-50"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Display Analytics */}
        {analytics && (
          <div className="mt-6 bg-gray-700 p-4 rounded-lg border border-gray-600">
            <h3 className="text-xl font-bold text-center mb-3 text-white">
              📊 URL Analytics
            </h3>
            <p className="text-gray-300">
              <strong>Total Clicks:</strong> {analytics.totalClicks}
            </p>
            <p className="text-gray-300">
              <strong>Unique Users:</strong> {analytics.uniqueUsers}
            </p>

            <h4 className="font-semibold mt-3 text-gray-300">Clicks By Date</h4>
            <ul className="list-disc pl-5 text-gray-300">
              {analytics.clicksByDate.map((entry: any) => (
                <li key={entry._id}>
                  {entry.date}: {entry.clickCount} clicks
                </li>
              ))}
            </ul>

            <h4 className="font-semibold mt-3 text-gray-300">OS Statistics</h4>
            <ul className="list-disc pl-5 text-gray-300">
              {analytics.osTypeStats.map((entry: any) => (
                <li key={entry._id}>
                  {entry.osName}: {entry.uniqueClicks} clicks (
                  {entry.uniqueUsers} users)
                </li>
              ))}
            </ul>

            <h4 className="font-semibold mt-3 text-gray-300">
              Device Type Statistics
            </h4>
            <ul className="list-disc pl-5 text-gray-300">
              {analytics.deviceTypeStats.map((entry: any) => (
                <li key={entry._id}>
                  {entry.deviceName}: {entry.uniqueClicks} clicks (
                  {entry.uniqueUsers} users)
                </li>
              ))}
            </ul>
          </div>
        )}

       
      </div>
    </div>
  );
};

export default CreateUrl;
