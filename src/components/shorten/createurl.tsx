import React, { useState } from "react";
import axios from "axios";

import { CheckCircle, Loader2, Copy } from "lucide-react";
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
          {/* Long URL Input */}
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

          {/* Custom Alias Input */}
          <div>
            <label className="block font-semibold">
              Custom Alias (Optional)
            </label>
            <input
              type="text"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. my-custom-link"
            />
          </div>

          {/* Topic Selection */}
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

          {/* Submit Button */}
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

        {/* Success Message & Copy Button */}
        {shortUrl && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-green-600 font-semibold flex items-center justify-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Short URL Created!
            </p>
            <div className="mt-2 flex items-center justify-center space-x-2">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {shortUrl}
              </a>
              <button
                onClick={copyToClipboard}
                className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                {copied ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default CreateUrl;
