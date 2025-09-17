import { useState, useEffect } from "react";
import { URL } from "../App";

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function usePushNotifications() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSubscription = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready;
          const subscription = await registration.pushManager.getSubscription();
          setIsSubscribed(!!subscription);
        } catch (e) {
          console.error("Error checking push subscription:", e);
        }
      }
      setIsLoading(false);
    };
    checkSubscription();
  }, []);

  const handleSubscription = async () => {
    if (!("serviceWorker" in navigator)) {
      setError("Push notifications are not supported by this browser.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const registration = await navigator.serviceWorker.register("/sw.ts");
      const existingSubscription =
        await registration.pushManager.getSubscription();

      if (existingSubscription) {
      } else {
        // Subscribe logic
        const vapidRes = await fetch(`${URL}/push/vapid-key`);
        if (!vapidRes.ok)
          throw new Error("Failed to get VAPID key from server.");
        const { vapidPublicKey } = await vapidRes.json();

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        });

        await fetch(`${URL}/push/subscribe`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(subscription),
          credentials: "include",
        });
        setIsSubscribed(true);
        console.log("Subscribed successfully.");
      }
    } catch (err: any) {
      console.error("Subscription failed:", err);
      setError(err.message || "Failed to process subscription.");
    }

    setIsLoading(false);
  };

  return {
    isSubscribed,
    isLoading,
    error,
    handleSubscription,
  };
}
