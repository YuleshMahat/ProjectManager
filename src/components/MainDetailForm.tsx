"use client";
import React, { useEffect, useState } from "react";
import style from "./MainDetailForm.module.css";
import useForm from "@/hooks/useForm";
import {
  getMainInfoAction,
  updateMainInfoAction,
} from "@/features/mainInfo/mainInfoAction";
import { useAppSelector } from "@/hooks/reduxHooks";

const MainDetailForm = () => {
  const { user } = useAppSelector((state) => state.userStore);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMainInfoAction(form);
  };

  const { form, setForm, handleChange } = useForm<FormValues>({
    userId: user?._id || "",
    primaryInfo: "",
    secondaryInfo: "",
  });
  useEffect(() => {
    const getInfo = async () => {
      const result = await getMainInfoAction(user._id);
      setForm({
        userId: user._id,
        primaryInfo: result.result?.primaryInfo || "",
        secondaryInfo: result.result?.secondaryInfo || "",
        infoId: result.result?._id,
      });
    };
    getInfo();
  }, []);

  interface FormValues {
    userId: string;
    primaryInfo: string;
    secondaryInfo: string;
    infoId?: string;
  }

  return (
    <form onSubmit={handleSubmit} className={style.gridLayout}>
      <label>Title Heading</label>
      <label>Secondary Info</label>
      <input
        name="primaryInfo"
        onChange={handleChange}
        value={form.primaryInfo}
        required
      />
      <input
        name="secondaryInfo"
        onChange={handleChange}
        value={form.secondaryInfo}
        required
      />
      <button className="btn btn-primary">Update</button>
    </form>
  );
};

export default MainDetailForm;
