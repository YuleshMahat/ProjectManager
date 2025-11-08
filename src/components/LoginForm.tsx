"use client";

import React from "react";
import styles from "./LoginForm.module.css";
import { Button } from "react-bootstrap";
import useForm from "@/hooks/useForm";
import { handleLoginAction } from "@/features/auth/authAction";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await handleLoginAction(form);
    if (result.status === "success") {
      router.push("/dashboard");
    }
  };

  type LoginFormValues = {
    email: string;
    password: string;
  };

  const { form, setForm, handleChange } = useForm<LoginFormValues>({
    email: "",
    password: "",
  });

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
      <label>Email</label>
      <input
        type="email"
        required
        className={styles.inputField}
        onChange={handleChange}
        name="email"
      />
      <label>Password</label>
      <input
        type="password"
        required
        className={styles.inputField}
        onChange={handleChange}
        name="password"
      />

      <Button className="btn" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default LoginForm;
