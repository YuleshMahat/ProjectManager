// app/dashboard/personal-info/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/app/dashboard/layout";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Github, Linkedin, Mail, User, Briefcase, Edit3 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import EditPersonalInfoModal from "@/components/EditPersonalinfoModal";
import { fetchPersonalInfo } from "@/features/personalInfo/personalInfoAction";

const PersonalInfoPage = () => {
  const info = useAppSelector((state) => state.personalInfoStore);
  const [showEditModal, setShowEditModal] = useState(false);

  const { user } = useAppSelector((state) => state.userStore);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchPersonalInfo(user._id));
    }
  }, [dispatch, user?._id]);

  const fields = [
    {
      icon: <User size={20} />,
      label: "Full Name",
      value: info.name || "—",
      bg: "primary",
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: info.email || "—",
      bg: "info",
      copyable: true,
    },
    {
      icon: <Briefcase size={20} />,
      label: "Title",
      value: info.title || "—",
      bg: "success",
    },
    {
      icon: <Github size={20} />,
      label: "GitHub",
      value: info.github || "—",
      link: info.github || null,
      bg: "dark",
    },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      value: info.linkedin || "—",
      link: info.linkedin || null,
      bg: "primary",
    },
  ];

  return (
    <DashboardLayout>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-primary">Personal Info</h1>
          <p className="lead text-muted">
            Your public brand — live on your portfolio
          </p>
        </div>

        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            <Card className="shadow-lg border-0 rounded-4">
              {/* Gradient Header */}
              <div
                className="p-5 text-white text-center rounded-top-4"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
              >
                <div className="d-inline-block">
                  <div
                    className="rounded-circle bg-white d-flex align-items-center justify-content-center shadow"
                    style={{ width: 100, height: 100 }}
                  >
                    <User size={50} className="text-primary" />
                  </div>
                </div>
                <h2 className="mt-3 mb-1">{info.name || "Your Name"}</h2>
                <p className="mb-0 fs-5 opacity-90">
                  {info.title || "Full-Stack Developer"}
                </p>
              </div>

              <Card.Body className="p-5">
                <Row className="g-4">
                  {fields.map((field) => (
                    <Col md={6} key={field.label}>
                      <div className="d-flex gap-3 p-4 rounded-4 bg-light">
                        <div
                          className={`d-flex align-items-center justify-content-center rounded-circle text-white bg-${field.bg}`}
                          style={{ width: 50, height: 50, flexShrink: 0 }}
                        >
                          {field.icon}
                        </div>

                        <div className="flex-grow-1">
                          <small className="text-muted fw-bold d-block">
                            {field.label}
                          </small>

                          {field.link ? (
                            <a
                              href={field.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-decoration-none fw-semibold text-dark hover-text-primary d-block mt-1"
                              style={{ wordBreak: "break-all" }}
                            >
                              {field.value}
                            </a>
                          ) : field.copyable ? (
                            <span className="fw-semibold text-primary d-block mt-1">
                              {field.value}
                            </span>
                          ) : (
                            <span className="fw-semibold d-block mt-1">
                              {field.value}
                            </span>
                          )}
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>

                {/* EDIT BUTTON — OPENS MODAL */}
                <div className="text-center mt-5">
                  <Button
                    size="lg"
                    variant="primary"
                    className="px-5 shadow-lg d-flex align-items-center gap-3 mx-auto"
                    style={{ borderRadius: "50px" }}
                    onClick={() => setShowEditModal(true)}
                  >
                    <Edit3 size={24} />
                    Edit Personal Info
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* MODAL — OPENS ON BUTTON CLICK */}
      <EditPersonalInfoModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
      />
    </DashboardLayout>
  );
};

export default PersonalInfoPage;
