import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the new admin dashboard
    navigate("/admin-new", { replace: true });
  }, [navigate]);

  return null;
}
