"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";

interface Stats {
  leadsThisMonth: number;
  totalLeads: number;
  visitsThisMonth: number;
  conversionRate: number;
  pendingSyncs: number;
  leadsBySource: Record<string, number>;
}

interface RecentLead {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  source: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentLeads();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecentLeads = async () => {
    try {
      const res = await fetch("/api/admin/leads?limit=10");
      const data = await res.json();
      setRecentLeads(data.leads || []);
    } catch (err) {
      console.error("Failed to fetch recent leads:", err);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="text-center text-slate-600">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">Leads This Month</div>
            <div className="text-3xl font-bold text-slate-900">
              {stats?.leadsThisMonth || 0}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">Total Leads</div>
            <div className="text-3xl font-bold text-slate-900">
              {stats?.totalLeads || 0}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">Page Visits This Month</div>
            <div className="text-3xl font-bold text-slate-900">
              {stats?.visitsThisMonth || 0}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">Conversion Rate</div>
            <div className="text-3xl font-bold text-slate-900">
              {stats?.conversionRate || 0}%
            </div>
          </div>
        </div>

        {/* Sync Status */}
        {stats && stats.pendingSyncs > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-800">
              {stats.pendingSyncs} leads pending sync to LeasingVoice.{" "}
              <Link href="/admin/leads" className="underline font-semibold">
                View leads
              </Link>
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leads by Source */}
          <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Leads by Source</h2>
            <div className="space-y-2">
              {stats?.leadsBySource && Object.keys(stats.leadsBySource).length > 0 ? (
                Object.entries(stats.leadsBySource).map(([source, count]) => (
                  <div
                    key={source}
                    className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0"
                  >
                    <span className="text-slate-700 capitalize">{source}</span>
                    <span className="font-semibold text-slate-900">{count}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-sm">No leads yet</p>
              )}
            </div>
          </div>

          {/* Recent Leads */}
          <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900">Recent Leads</h2>
              <Link
                href="/admin/leads"
                className="text-sm text-amber-500 hover:text-amber-600 font-semibold"
              >
                View All
              </Link>
            </div>
            <div className="space-y-2">
              {recentLeads.length > 0 ? (
                recentLeads.map((lead) => (
                  <Link
                    key={lead.id}
                    href={`/admin/leads#${lead.id}`}
                    className="block py-2 border-b border-slate-100 last:border-0 hover:bg-slate-50 rounded px-2 -mx-2"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-slate-900">
                          {lead.first_name} {lead.last_name}
                        </div>
                        <div className="text-sm text-slate-600">{lead.phone}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-600 capitalize">
                          {lead.source || "direct"}
                        </div>
                        <div className="text-xs text-slate-500">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-slate-500 text-sm">No leads yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

