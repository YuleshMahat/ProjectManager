"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import { useRouter } from "next/navigation";
import React from "react";

const Nav = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.userStore);

  return (
    <div className="W-100 d-flex justify-content-between fs-4">
      <div
        className="d-flex gap-3"
        onClick={() => {
          router.push("/dashboard");
        }}
        style={{ cursor: "pointer" }}
      >
        <img
          src="/logo.png"
          alt="logo"
          width="50px"
          style={{ borderRadius: "50%", cursor: "pointer" }}
        />
        <span>PortfolioManager</span>
      </div>
      <ul className="d-flex gap-2" style={{ listStyleType: "none" }}>
        <li>{user?.fname}</li>
        <li>Logout</li>
      </ul>
    </div>
  );
};

export default Nav;
