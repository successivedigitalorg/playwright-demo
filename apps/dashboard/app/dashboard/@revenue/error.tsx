"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Revenue chart error:", error);
  }, [error]);

  return (
    <div className="widget-error">
      <div>
        <h3>Revenue Data Error</h3>
        <p>Failed to load revenue data</p>
        <button
          onClick={reset}
          className="px-4 py-2 mt-4 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
