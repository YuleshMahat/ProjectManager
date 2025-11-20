"use client";

import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Mail, Lock, UserPlus, LogIn } from "lucide-react";
import useForm from "@/hooks/useForm";
import { handleLoginAction } from "@/features/auth/authAction";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { form, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(handleLoginAction(form));
    if (result.status === "success") {
      router.push("/dashboard");
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <Card
      className="shadow-xl border-0 rounded-4 overflow-hidden"
      style={{ maxWidth: "420px", width: "100%" }}
    >
      {/* Gradient Header */}
      <div
        className="p-5 text-white text-center"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <h2 className="fw-bold mb-2">Hello!</h2>
        <p className="opacity-90">Login to start managing your portfolio</p>
      </div>

      <Card.Body className="p-5">
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
          {/* Email */}
          <Form.Group>
            <Form.Label className="d-flex align-items-center gap-2 fw-semibold">
              <Mail size={18} />
              Email
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="py-3 rounded-3 border-2"
              style={{ borderColor: "#e2e8f0" }}
            />
          </Form.Group>

          {/* Password */}
          <Form.Group>
            <Form.Label className="d-flex align-items-center gap-2 fw-semibold">
              <Lock size={18} />
              Password
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="py-3 rounded-3 border-2"
              style={{ borderColor: "#e2e8f0" }}
            />
          </Form.Group>

          {/* Login Button */}
          <Button
            type="submit"
            size="lg"
            className="w-100 d-flex align-items-center justify-content-center gap-2 fw-bold"
            style={{
              borderRadius: "50px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
            }}
          >
            <LogIn size={20} />
            Log In
          </Button>
        </Form>

        {/* Divider */}
        <div className="d-flex align-items-center my-4">
          <div className="flex-grow-1 border-top border-2 opacity-50"></div>
          <span className="px-3 text-muted fw-semibold">OR</span>
          <div className="flex-grow-1 border-top border-2 opacity-50"></div>
        </div>

        {/* Register Button — USING ROUTER.PUSH() */}
        <Button
          variant="outline-primary"
          size="lg"
          onClick={handleRegister}
          className="w-100 d-flex align-items-center justify-content-center gap-2 fw-bold border-2"
          style={{
            borderRadius: "50px",
            borderColor: "#667eea",
            color: "#667eea",
          }}
        >
          <UserPlus size={20} />
          Create New Account
        </Button>

        <p className="text-center text-muted mt-4 mb-0">
          New here? Join thousands of devs building epic portfolios!
        </p>
      </Card.Body>
    </Card>
  );
};

export default LoginForm;
