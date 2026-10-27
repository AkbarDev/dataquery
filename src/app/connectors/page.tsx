"use client";

import React, { useState } from "react";
import { PublicNav } from "@/components/layout/PublicNav";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { CONNECTORS } from "@/lib/sampleData";
import { ConnectorItem } from "@/lib/types";
import { toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Stepper } from "@/components/ui/Stepper";
import {
  FileSpreadsheet,
  HardDrive,
  Table as TableIcon,
  Database,
  Boxes,
  ShoppingBag,
  Activity,
  Globe,
  Cloud,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function ConnectorsPage() {
  const [connectorsList, setConnectorsList] = useState<ConnectorItem[]>(CONNECTORS);
  const [selectedConnector, setSelectedConnector] = useState<ConnectorItem | null>(null);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0: Choose, 1: Authorise, 2: Pick Data
  const [authApiKey, setAuthApiKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getConnectorIcon = (iconName: string) => {
    switch (iconName) {
      case "FileSpreadsheet":
        return <FileSpreadsheet className="w-6 h-6 text-emerald-400" />;
      case "HardDrive":
        return <HardDrive className="w-6 h-6 text-blue-400" />;
      case "Table":
        return <TableIcon className="w-6 h-6 text-emerald-400" />;
      case "Database":
        return <Database className="w-6 h-6 text-sky-400" />;
      case "Boxes":
        return <Boxes className="w-6 h-6 text-green-400" />;
      case "ShoppingBag":
        return <ShoppingBag className="w-6 h-6 text-purple-400" />;
      case "Activity":
        return <Activity className="w-6 h-6 text-amber-400" />;
      case "Globe":
        return <Globe className="w-6 h-6 text-sky-400" />;
      default:
        return <Cloud className="w-6 h-6 text-slate-400" />;
    }
  };

  const handleOpenConnect = (connector: ConnectorItem) => {
    if (connector.status === "Coming soon") {
      toast.info("Coming Soon", `${connector.name} connector is currently in active development for Q1.`);
      return;
    }
    setSelectedConnector(connector);
    setCurrentStep(0);
    setConnectModalOpen(true);
  };

  const handleFinishConnection = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      if (selectedConnector) {
        setConnectorsList((prev) =>
          prev.map((c) => (c.id === selectedConnector.id ? { ...c, status: "Connected" } : c))
        );
      }
      setIsSubmitting(false);
      setConnectModalOpen(false);
      toast.success(
        "Connector Linked",
        `Successfully authorized and synced ${selectedConnector?.name} with your workspace.`
      );
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 font-sans">
      <PublicNav />

      <main className="flex-1 py-14 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <Badge variant="info" size="md">Data Ecosystem</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            Connect Any Data Source in Seconds
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Stream raw records from local files, relational databases, cloud drives, or REST API webhooks directly into your in-browser playground.
          </p>
        </div>

        {/* Connectors Tile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {connectorsList.map((conn) => {
            const isConnected = conn.status === "Connected";
            const isComingSoon = conn.status === "Coming soon";

            return (
              <div
                key={conn.id}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                      {getConnectorIcon(conn.icon)}
                    </div>
                    <Badge
                      variant={
                        isConnected
                          ? "success"
                          : isComingSoon
                          ? "outline"
                          : "warning"
                      }
                      size="sm"
                    >
                      {conn.status}
                    </Badge>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                      {conn.category}
                    </span>
                    <h3 className="font-bold text-base text-slate-100 group-hover:text-sky-400 transition-colors">
                      {conn.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {conn.description}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between">
                  {isConnected ? (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Ready to Query</span>
                    </div>
                  ) : isComingSoon ? (
                    <span className="text-xs text-slate-500 font-mono">
                      Q1 Roadmap
                    </span>
                  ) : (
                    <span className="text-xs text-amber-400 font-mono flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Action Required</span>
                    </span>
                  )}

                  <Button
                    variant={isConnected ? "outline" : "glow"}
                    size="xs"
                    disabled={isComingSoon}
                    onClick={() => handleOpenConnect(conn)}
                  >
                    {isConnected ? "Configure" : isComingSoon ? "Coming Soon" : "Connect"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* 3-Step Connection Modal */}
      <Modal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
        maxWidth="lg"
        title={`Connect ${selectedConnector?.name || "Data Source"}`}
        description="Follow the 3-step wizard to authorize and stream your datasets."
      >
        <div className="space-y-6">
          {/* Stepper Header */}
          <Stepper
            currentStep={currentStep}
            steps={[
              { id: 0, label: "Choose Source" },
              { id: 1, label: "Authorize" },
              { id: 2, label: "Select Data" },
            ]}
          />

          {/* Step 0: Choose / Confirmation */}
          {currentStep === 0 && (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs text-slate-300">
              <p>
                You are connecting <strong>{selectedConnector?.name}</strong> to your DataQuery workspace.
              </p>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                <div>• Read-only access requested</div>
                <div>• Zero raw records stored on external servers</div>
                <div>• Instant schema profiling with DuckDB</div>
              </div>
            </div>
          )}

          {/* Step 1: Authorise */}
          {currentStep === 1 && (
            <div className="space-y-3 text-xs">
              <label className="block text-slate-300 font-medium">
                Enter API Key / Connection String
              </label>
              <input
                type="password"
                value={authApiKey}
                onChange={(e) => setAuthApiKey(e.target.value)}
                placeholder="mock_sk_live_9482910482910..."
                className="w-full bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-100 font-mono focus:outline-none focus:border-sky-400"
              />
              <p className="text-[11px] text-slate-500">
                Mock mode active: Any sample string will successfully simulate authorization.
              </p>
            </div>
          )}

          {/* Step 2: Pick Data Tables */}
          {currentStep === 2 && (
            <div className="space-y-3 text-xs">
              <span className="block text-slate-300 font-medium">
                Discovered Tables (Select to Import):
              </span>
              <div className="space-y-2">
                {[
                  { name: "sales_orders_q3", rows: "14,200 rows" },
                  { name: "customers_master", rows: "3,400 rows" },
                  { name: "product_catalog", rows: "520 rows" },
                ].map((tbl, idx) => (
                  <label
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="accent-sky-500" />
                      <span className="font-mono text-slate-200">{tbl.name}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">{tbl.rows}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step Navigation Buttons */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((s) => s - 1)}
            >
              Back
            </Button>
            {currentStep < 2 ? (
              <Button
                variant="glow"
                size="sm"
                onClick={() => setCurrentStep((s) => s + 1)}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Next Step
              </Button>
            ) : (
              <Button
                variant="glow"
                size="sm"
                isLoading={isSubmitting}
                onClick={handleFinishConnection}
                leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
              >
                Confirm &amp; Sync
              </Button>
            )}
          </div>
        </div>
      </Modal>

      <PublicFooter />
    </div>
  );
}
