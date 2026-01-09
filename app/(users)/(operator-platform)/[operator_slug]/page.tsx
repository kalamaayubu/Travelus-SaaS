import {
  TrendingUp,
  ArrowUpRight,
  MoreVertical,
  Calendar,
  Bell,
  Search,
} from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{ operator_slug: string }>;
};

export default async function OperatorDashboard({ params }: Props) {
  const { operator_slug } = await params; // Await the promise here
  return (
    <div className="min-h-screen space-y-8 max-w-[1600px] mx-auto">
      {/* 1. TOP NAV / HEADER */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase">
            Dashboard <span className="text-secondary"></span>
          </h1>
          <p className="text-gray5 font-medium">
            Thursday, 25 Dec 2025 • Fleet Live Status
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden xl:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray5" />
            <input
              className="bg-soft-dark border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm focus:border-secondary outline-none w-64"
              placeholder="Search vehicle or driver..."
            />
          </div>
          <button className="p-3 rounded-full bg-soft-dark border border-white/5 text-gray4 hover:text-secondary relative">
            <Bell className="size-5" />
            <span className="absolute top-3 right-3 size-2 bg-secondary rounded-full border-2 border-bg-dark"></span>
          </button>
          <div className="h-10 w-[1px] bg-white/10 mx-2" />
          <Link href={`/${operator_slug}/trips`}>
            <button className="secondary-btn flex items-center gap-2">
              <Calendar className="size-4" /> Schedule Trip
            </button>
          </Link>
        </div>
      </header>

      {/* 2. THE BENTO GRID */}
      <div className="grid grid-cols-12 gap-6">
        {/* BIG REVENUE CHART AREA (Visualized as a placeholder) */}
        <div className="col-span-12 lg:col-span-8 p-8 rounded-xl bg-soft-dark border border-white/5 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8">
            <div className="flex items-center gap-2 text-xs font-bold text-green-500 bg-green-500/10 px-3 py-1 rounded-full">
              <TrendingUp className="size-3" /> +24% vs Last Month
            </div>
          </div>
          <div>
            <p className="text-gray5 font-bold text-sm uppercase tracking-widest">
              Total Revenue
            </p>
            <h2 className="text-5xl font-black text-white mt-2">
              KES 1,284,000
            </h2>
          </div>
          <div className="h-48 mt-8 flex items-end gap-2">
            {/* Visualizing a Bar Chart */}
            {[40, 70, 45, 90, 65, 80, 100, 55, 85, 40, 75, 95].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="flex-1 bg-gradient-to-t from-secondary/5 to-secondary/40 rounded-t-sm hover:to-secondary transition-all cursor-pointer relative group/bar"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">
                  {h}k
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FLEET STATUS PIE (Small Bento) */}
        <div className="col-span-12 lg:col-span-4 p-8 rounded-xl bg-gradient-to-br from-secondary/20 to-soft-dark border border-secondary/20">
          <h3 className="text-white font-bold text-xl mb-6">Fleet Pulse</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full bg-secondary shadow-[0_0_10px_#ffb000]" />
                <span className="text-gray3">Active on Road</span>
              </div>
              <span className="font-bold text-white">18</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full bg-gray6" />
                <span className="text-gray3">Idle in Garage</span>
              </div>
              <span className="font-bold text-white">4</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full mt-8 overflow-hidden flex">
              <div className="h-full bg-secondary w-[80%]" />
              <div className="h-full bg-gray6 w-[20%]" />
            </div>
            <p className="text-[10px] text-gray5 text-center uppercase tracking-widest">
              80% Utilization Rate
            </p>
          </div>
        </div>

        {/* RECENT TRIPS TABLE (Density) */}
        <div className="col-span-12 xl:col-span-7 rounded-xl bg-soft-dark border border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Live Operations</h3>
            <button className="text-secondary text-sm font-bold hover:underline">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] text-gray5 uppercase tracking-widest bg-white/5">
                <tr>
                  <th className="px-8 py-4">Vehicle</th>
                  <th className="px-8 py-4">Route</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  {
                    bus: "KCL 450A",
                    route: "NRB → MSA",
                    status: "In Transit",
                    color: "text-green-500",
                    rev: "24,500",
                  },
                  {
                    bus: "KDA 120Z",
                    route: "NRB → KSM",
                    status: "Boarding",
                    color: "text-secondary",
                    rev: "12,200",
                  },
                  {
                    bus: "KCH 889B",
                    route: "MSA → NRB",
                    status: "Arrived",
                    color: "text-blue-500",
                    rev: "28,000",
                  },
                ].map((trip, i) => (
                  <tr
                    key={i}
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-8 py-5 font-bold text-white text-sm">
                      {trip.bus}
                    </td>
                    <td className="px-8 py-5 text-gray4 text-sm">
                      {trip.route}
                    </td>
                    <td className={`px-8 py-5 text-xs font-bold ${trip.color}`}>
                      {trip.status}
                    </td>
                    <td className="px-8 py-5 text-right font-mono text-white">
                      KES {trip.rev}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* QUICK ACTIONS / ALERTS */}
        <div className="col-span-12 xl:col-span-5 space-y-6">
          <div className="p-8 rounded-xl bg-secondary text-black">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-black leading-tight">
                Subscription
                <br />
                Renewal Due
              </h3>
              <ArrowUpRight className="size-6" />
            </div>
            <p className="font-medium text-sm mb-6 opacity-80">
              Your Pro plan expires in 4 days. Renew to avoid fleet service
              interruption.
            </p>
            <button className="w-full py-3 bg-black text-white rounded-xl font-bold hover:scale-[1.02] transition-transform">
              Renew Now — KES 2,500
            </button>
          </div>

          <div className="p-8 rounded-xl bg-soft-dark border border-white/5">
            <h3 className="text-white font-bold mb-6">
              Top Performing Drivers
            </h3>
            <div className="space-y-4">
              {["Peter Maina", "Sarah Juma"].map((name, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-white/10" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">{name}</p>
                    <p className="text-[10px] text-gray5">4.9 ★ • 120 Trips</p>
                  </div>
                  <MoreVertical className="size-4 text-gray5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
