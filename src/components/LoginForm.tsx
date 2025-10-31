"use client";

import React from "react";
import styles from "./LoginForm.module.css";
import { Button } from "react-bootstrap";

const LoginForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
      <label>Email</label>
      <input type="email" required className={styles.inputField} />
      <label>Password</label>
      <input type="password" required className={styles.inputField} />

      <Button className="btn" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default LoginForm;
