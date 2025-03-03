
import React from "react";
import { PortalTransactionForm } from "./PortalTransactionForm";

// This component is designed to be used within an existing AgentPortal component
export function AgentPortalTransactionForm() {
  return (
    <div className="w-full min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Transaction Intake Form</h1>
      <div className="bg-white rounded-lg shadow-xl p-4 overflow-hidden">
        <PortalTransactionForm />
      </div>
    </div>
  );
}
