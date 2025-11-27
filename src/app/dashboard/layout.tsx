"use client";

import { ReactNode, useEffect } from "react";
import Nav from "@/components/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getCustomerDetail } from "@/features/auth/authAction";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.userStore);

  useEffect(() => {
    dispatch(getCustomerDetail());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (!user?._id) {
        toast.info("Please log in to continue");
        router.replace("/");
      }
    }
  }, [user]);

  return (
    <div className="dashboard-layout d-flex flex-column p-3 min-vh-100">
      <Nav />
      <div className="dashboard-content mt-5 mb-2 ms-5 flex-grow-1">
        {children}
      </div>
    </div>
  );
}
