import { ReactNode } from "react";
import Nav from "@/components/Nav";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard-layout d-flex flex-column">
      <Nav />
      <div className="dashboard-content mt-5 mb-2 ms-5 flex-grow-1">
        {children}
      </div>
    </div>
  );
}
