import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Loader2, AlertCircle, BarChart3 } from "lucide-react";

const COLORS = ["#ff7675", "#fdcb6e", "#00cec9", "#6c5ce7", "#e84393"];

const OverallAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch overall analytics data
  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8000/api/analytics/overall", {
        withCredentials: true,
      });
      setAnalytics(response.data);
    } catch (err) {
      setError("Failed to fetch analytics data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-5xl bg-gray-800 shadow-lg rounded-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-4">
          <h2 className="text-2xl font-bold flex items-center text-white">
            <BarChart3 className="w-6 h-6 text-blue-400 mr-2" /> Overall Analytics
          </h2>
          <button
            onClick={fetchAnalytics}
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md flex items-center"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : "Refresh"}
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center p-6">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-500 text-white rounded-md flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {/* Data Display */}
        {analytics && (
          <div className="space-y-6 mt-4">
            {/* Overview Cards */}
            <div className="grid grid-cols-3 gap-6">
              <div className="p-4 bg-blue-700 text-white rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold">Total URLs</h3>
                <p className="text-3xl font-bold">{analytics.totalUrls}</p>
              </div>
              <div className="p-4 bg-green-700 text-white rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold">Total Clicks</h3>
                <p className="text-3xl font-bold">{analytics.totalClicks}</p>
              </div>
              <div className="p-4 bg-purple-700 text-white rounded-lg shadow-md text-center">
                <h3 className="text-lg font-semibold">Unique Users</h3>
                <p className="text-3xl font-bold">{analytics.uniqueUsers}</p>
              </div>
            </div>

            {/* Clicks Over Time Chart */}
            <div className="bg-gray-700 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-white">Clicks Over Time</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={analytics.clicksByDate}>
                  <XAxis dataKey="date" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip />
                  <Line type="monotone" dataKey="totalClicks" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* OS Type Pie Chart */}
            <div className="bg-gray-700 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-white">OS Type Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={analytics.osType} dataKey="uniqueClicks" nameKey="osName" outerRadius={100}>
                    {analytics.osType.map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Device Type Table */}
            <div className="bg-gray-700 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-white">Device Type Performance</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-600">
                  <thead className="bg-gray-600">
                    <tr>
                      <th className="p-2 border">Device</th>
                      <th className="p-2 border">Unique Clicks</th>
                      <th className="p-2 border">Unique Users</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.deviceType.map((device: any, index: number) => (
                      <tr key={index} className="border">
                        <td className="p-2 text-center">{device.deviceName}</td>
                        <td className="p-2 text-center">{device.uniqueClicks}</td>
                        <td className="p-2 text-center">{device.uniqueUsers}</td>
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

export default OverallAnalytics;
