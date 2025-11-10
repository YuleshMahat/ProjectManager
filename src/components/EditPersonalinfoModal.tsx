// src/components/EditPersonalInfoModal.tsx
"use client";

import React, { useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import {
  X,
  Save,
  Github,
  Linkedin,
  Mail,
  User,
  Briefcase,
  Edit3,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import useForm from "@/hooks/useForm";
import { updatePersonalInfo } from "@/features/personalInfo/personalInfoSlice";
import { handlePersonalInfoUpdate } from "@/features/personalInfo/personalInfoAction";

interface EditPersonalInfoModalProps {
  show: boolean;
  onHide: () => void;
}

const EditPersonalInfoModal: React.FC<EditPersonalInfoModalProps> = ({
  show,
  onHide,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userStore);
  const info = useAppSelector((state) => state.personalInfoStore);

  const { form, setForm, handleChange } = useForm({
    name: "",
    email: "",
    title: "",
    github: "",
    linkedin: "",
  });

  useEffect(() => {
    if (show) {
      setForm({
        name: info.name || "",
        email: info.email || "",
        title: info.title || "",
        github: info.github || "",
        linkedin: info.linkedin || "",
      });
    }
  }, [show, info, setForm]);

  const handleSave = () => {
    dispatch(handlePersonalInfoUpdate(user._id, form));
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold d-flex align-items-center gap-2">
          <Edit3 size={24} />
          Edit Personal Info
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-4">
        <Form>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="d-flex align-items-center gap-2">
                  <User size={16} />
                  Full Name
                </Form.Label>
                <Form.Control
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="d-flex align-items-center gap-2">
                  <Mail size={16} />
                  Email
                </Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label className="d-flex align-items-center gap-2">
                  <Briefcase size={16} />
                  Title / Position
                </Form.Label>
                <Form.Control
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Senior Full-Stack Engineer"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="d-flex align-items-center gap-2">
                  <Github size={16} />
                  GitHub URL
                </Form.Label>
                <Form.Control
                  name="github"
                  value={form.github}
                  onChange={handleChange}
                  placeholder="https://github.com/johndoe"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="d-flex align-items-center gap-2">
                  <Linkedin size={16} />
                  LinkedIn URL
                </Form.Label>
                <Form.Control
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-3">
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          className="d-flex align-items-center gap-2 px-4"
        >
          <Save size={18} />
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPersonalInfoModal;
