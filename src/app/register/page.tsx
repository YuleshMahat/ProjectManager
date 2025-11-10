// app/register/page.tsx
"use client";

import React, { useState } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!form.fname || !form.lname || !form.email || !form.password) {
      toast.error("All fields are required, mate!");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status === "success") {
        toast.success("Welcome aboard! You’re officially a legend.");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        toast.error(data.message || "Something went wrong, try again");
      }
    } catch (error) {
      toast.error("Network error. Check your connection, king.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
      <Row className="w-100 justify-content-center">
        <Col lg={5} md={7} sm={10}>
          <Card className="shadow-xl border-0 rounded-4 overflow-hidden">
            {/* Gradient Header */}
            <div
              className="p-5 text-white text-center"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <h1 className="display-5 fw-bold mb-2">Join the Crew</h1>
              <p className="lead opacity-90">
                Create your account in 30 seconds
              </p>
            </div>

            <Card.Body className="p-5">
              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center gap-2">
                        <User size={18} />
                        First Name
                      </Form.Label>
                      <Form.Control
                        name="fname"
                        value={form.fname}
                        onChange={handleChange}
                        placeholder="John"
                        required
                        disabled={loading}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        name="lname"
                        value={form.lname}
                        onChange={handleChange}
                        placeholder="Doe"
                        required
                        disabled={loading}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center gap-2">
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
                        disabled={loading}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="d-flex align-items-center gap-2">
                        <Lock size={18} />
                        Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        minLength={6}
                        required
                        disabled={loading}
                      />
                      <Form.Text className="text-muted">
                        Minimum 6 characters, mate
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  type="submit"
                  size="lg"
                  className="w-100 mt-4 d-flex align-items-center justify-content-center gap-3"
                  disabled={loading}
                  style={{ borderRadius: "50px" }}
                >
                  {loading ? (
                    <>Creating Account...</>
                  ) : (
                    <>
                      Create Account <ArrowRight size={20} />
                    </>
                  )}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <p className="text-muted">
                  Already have an account?
                  <a
                    href="/login"
                    className="text-primary fw-bold text-decoration-none"
                  >
                    Log in here
                  </a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
