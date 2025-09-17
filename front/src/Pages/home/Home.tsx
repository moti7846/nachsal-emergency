import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./home.css";
import { useNavigate } from "react-router";
import { usePushNotifications } from "../../hooks/usePushNotifications";

export default function Home() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isSubscribed, handleSubscription } = usePushNotifications();

  useEffect(() => {
    if (!auth?.soldier?.name) {
      navigate("/login");
    } else if (auth?.soldier?.name && auth?.soldier?.role === "commander") {
      navigate(`/soldier_page/${auth.soldier.personalNumber}`);
    } else if (auth?.soldier?.name && auth?.soldier?.role === "soldier") {
      navigate("/report_soldier_place");
    }

    // Check notification permission after login/redirect
    if (auth?.soldier?.name && Notification.permission !== 'granted' && !isSubscribed) {
      handleSubscription();
    }
  }, [auth, navigate, isSubscribed, handleSubscription]);

  return (
    <main>
    </main>
  );
}
