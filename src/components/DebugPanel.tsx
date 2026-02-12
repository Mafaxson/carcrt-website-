import React from "react";

export default function DebugPanel({ data, onClose }: { data: any; onClose?: () => void }) {
  if (!data) return null;
  return (
    <div className="mt-4 p-3 border rounded bg-gray-50">
      <div className="flex justify-between items-start">
        <strong>Debug</strong>
        {onClose && (
          <button onClick={onClose} className="text-sm text-gray-600">Close</button>
        )}
      </div>
      <pre className="text-xs mt-2 overflow-auto" style={{ maxHeight: 240 }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
