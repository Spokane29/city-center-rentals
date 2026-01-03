"use client";

import { useEffect } from "react";

export default function Analytics() {
  useEffect(() => {
    // Generate or get session ID
    let sessionId = sessionStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem("sessionId", sessionId);
    }

    // Get UTM params
    const params = new URLSearchParams(window.location.search);

    // Detect device type
    const deviceType = /Mobile|Android|iPhone/i.test(navigator.userAgent)
      ? "mobile"
      : "desktop";

    // Track page visit
    fetch("/api/visits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        pagePath: window.location.pathname,
        referrer: document.referrer,
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
        utm_content: params.get("utm_content"),
        deviceType,
        userAgent: navigator.userAgent,
      }),
    }).catch(() => {}); // Silently fail
  }, []);

  return null;
}

