"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Nav = () => {
  const router = useRouter();
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
        <li>Login</li>
        <li>Get Started</li>
      </ul>
    </div>
  );
};

export default Nav;
