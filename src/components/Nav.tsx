// components/Nav.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { LogOut, User, Home } from "lucide-react";
import { toast } from "react-toastify";
import { handleLogout } from "@/features/auth/authAction";

const Nav = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userStore);

  const onLogout = () => {
    dispatch(handleLogout());
  };

  const goHome = () => {
    router.push("/dashboard");
  };

  return (
    <nav className="bg-white shadow-lg border-bottom border-2 border-primary-subtle px-4 py-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo + Brand */}
        <div
          className="d-flex align-items-center gap-3"
          onClick={goHome}
          style={{ cursor: "pointer" }}
        >
          <img
            src="/logo.png"
            alt="PortfolioManager Logo"
            width={50}
            height={50}
            className="rounded-circle shadow-sm"
          />
          <span className="fw-bold fs-3 text-primary">PortfolioManager</span>
        </div>

        {/* User Info + Logout */}
        <div className="d-flex align-items-center gap-4">
          {/* User Greeting */}
          <div className="d-flex align-items-center gap-2 text-muted">
            <User size={20} className="text-primary" />
            <span className="fw-semibold">
              {user?.fname ? `Hey, ${user.fname}!` : "Guest"}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="btn btn-outline-danger d-flex align-items-center gap-2 px-4 py-2 rounded-pill shadow-sm transition-all hover-shadow-lg"
            style={{
              fontWeight: "600",
              borderWidth: "2px",
            }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
