"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  property_interest: string;
  source: string;
  utm_campaign: string;
  leasingvoice_synced: boolean;
  created_at: string;
  message?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_content?: string;
  referrer?: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    source: "all",
    search: "",
  });

  useEffect(() => {
    const doFetch = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          startDate: filters.startDate,
          endDate: filters.endDate,
          source: filters.source,
          ...(filters.search && { search: filters.search }),
        });

        const res = await fetch(`/api/admin/leads?${params}`);
        const data = await res.json();
        setLeads(data.leads || []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error("Failed to fetch leads:", err);
      } finally {
        setIsLoading(false);
      }
    };
    doFetch();
  }, [filters]);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        startDate: filters.startDate,
        endDate: filters.endDate,
        source: filters.source,
        ...(filters.search && { search: filters.search }),
      });

      const res = await fetch(`/api/admin/leads?${params}`);
      const data = await res.json();
      setLeads(data.leads || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const params = new URLSearchParams({
        startDate: filters.startDate,
        endDate: filters.endDate,
        source: filters.source,
        ...(filters.search && { search: filters.search }),
      });

      const res = await fetch(`/api/admin/leads/export?${params}`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Failed to export:", err);
      alert("Failed to export leads");
    }
  };

  const handleRetrySync = async () => {
    if (!confirm("Retry syncing all failed leads to LeasingVoice?")) return;

    try {
      const res = await fetch("/api/admin/leads/retry-sync", { method: "POST" });
      const data = await res.json();
      alert(`Synced: ${data.synced}, Failed: ${data.failed}`);
      fetchLeads();
    } catch (err) {
      console.error("Failed to retry sync:", err);
      alert("Failed to retry sync");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900">Leads</h1>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Export CSV
            </button>
            <button
              onClick={handleRetrySync}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Retry Failed Syncs
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Source
              </label>
              <select
                value={filters.source}
                onChange={(e) => setFilters({ ...filters, source: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white"
              >
                <option value="all">All Sources</option>
                <option value="facebook">Facebook</option>
                <option value="google">Google</option>
                <option value="direct">Direct</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder="Name or phone..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-slate-600">
          Showing {leads.length} of {total} leads
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="text-center text-slate-600 py-12">Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Property Interest
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      UTM Campaign
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Synced
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {leads.length > 0 ? (
                    leads.map((lead) => (
                      <React.Fragment key={lead.id}>
                        <tr
                          className="hover:bg-slate-50 cursor-pointer"
                          onClick={() =>
                            setExpandedId(expandedId === lead.id ? null : lead.id)
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                            {lead.first_name} {lead.last_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                            {lead.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                            {lead.email || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                            {lead.property_interest || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 capitalize">
                            {lead.source || "direct"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                            {lead.utm_campaign || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {lead.leasingvoice_synced ? (
                              <span className="text-green-600">✓</span>
                            ) : (
                              <span className="text-red-600">✗</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-500">
                            {expandedId === lead.id ? "Hide" : "Show"}
                          </td>
                        </tr>
                        {expandedId === lead.id && (
                          <tr>
                            <td colSpan={9} className="px-6 py-4 bg-slate-50">
                              <div className="space-y-2 text-sm">
                                <div>
                                  <strong>Message:</strong> {lead.message || "None"}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <strong>UTM Source:</strong> {lead.utm_source || "None"}
                                  </div>
                                  <div>
                                    <strong>UTM Medium:</strong> {lead.utm_medium || "None"}
                                  </div>
                                  <div>
                                    <strong>UTM Content:</strong> {lead.utm_content || "None"}
                                  </div>
                                  <div>
                                    <strong>Referrer:</strong>{" "}
                                    {lead.referrer ? (
                                      <a
                                        href={lead.referrer}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-amber-500 hover:underline"
                                      >
                                        {lead.referrer}
                                      </a>
                                    ) : (
                                      "None"
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <strong>Timestamp:</strong>{" "}
                                  {new Date(lead.created_at).toLocaleString()}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-6 py-12 text-center text-slate-500">
                        No leads found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

