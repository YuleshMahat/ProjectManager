// src/components/AddProjectModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Image, Badge } from "react-bootstrap";
import { Plus, X, Upload, Github, Link45deg } from "react-bootstrap-icons";
import { addProjectAction } from "@/features/projects/projectsAction";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";

interface AddProjectModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess?: () => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({
  show,
  onHide,
  onSuccess,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userStore.user);

  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [skillsInput, setSkillsInput] = useState("");

  // FORM STATE — 1:1 with your Mongoose schema
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    skills: [] as string[],
    github: "",
    live: "",
    featured: false,
    order: 0,
  });

  // Reset form when modal opens
  useEffect(() => {
    if (show) {
      setFormData({
        name: "",
        image: "",
        skills: [],
        github: "",
        live: "",
        featured: false,
        order: 0,
      });
      setSkillsInput("");
      setImagePreview("");
    }
  }, [show]);

  // Add skill
  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && skillsInput.trim()) {
      e.preventDefault();
      const skill = skillsInput.trim();
      if (!formData.skills.includes(skill)) {
        setFormData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
      }
      setSkillsInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleImageChange = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
    setImagePreview(url);
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.image ||
      !formData.github ||
      !formData.live
    ) {
      return;
    }

    setSaving(true);

    try {
      // THIS WORKS NO MATTER WHAT addProjectAction RETURNS
      const actionResult = dispatch(
        addProjectAction({
          userId: user!._id,
          ...formData,
        })
      );

      // If it's a thunk, wait for it
      if (actionResult && typeof (actionResult as any).then === "function") {
        await actionResult;
      }

      // SUCCESS!
      onSuccess?.();
      onHide();
    } catch (err: any) {
      console.error("Failed to save project:", err);
      alert(err?.message || "Failed to save project. Check console.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold d-flex align-items-center">
          <Plus className="text-success me-2" size={28} />
          Add New Project
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-4">
        <Form>
          {/* Project Name */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Project Name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="My Awesome App"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              autoFocus
            />
          </Form.Group>

          {/* Image URL */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold d-flex align-items-center">
              <Upload className="me-2" /> Project Image URL *
            </Form.Label>
            <Form.Control
              type="url"
              placeholder="https://..."
              value={formData.image}
              onChange={(e) => handleImageChange(e.target.value)}
            />
            {imagePreview && (
              <div className="mt-3 rounded overflow-hidden shadow-sm">
                <Image src={imagePreview} alt="Preview" fluid rounded />
              </div>
            )}
          </Form.Group>

          {/* URLs */}
          <div className="row g-3">
            <Form.Group className="col-md-6">
              <Form.Label className="fw-semibold d-flex align-items-center">
                <Github className="me-2" /> GitHub URL *
              </Form.Label>
              <Form.Control
                type="url"
                placeholder="https://github.com/username/repo"
                value={formData.github}
                onChange={(e) =>
                  setFormData({ ...formData, github: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="col-md-6">
              <Form.Label className="fw-semibold d-flex align-items-center">
                <Link45deg className="me-2" /> Live Demo URL *
              </Form.Label>
              <Form.Control
                type="url"
                placeholder="https://myapp.vercel.app"
                value={formData.live}
                onChange={(e) =>
                  setFormData({ ...formData, live: e.target.value })
                }
              />
            </Form.Group>
          </div>

          {/* Skills */}
          <Form.Group className="mt-4">
            <Form.Label className="fw-semibold">
              Skills / Tech Stack (Press Enter)
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Next.js, TypeScript, Tailwind..."
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              onKeyDown={addSkill}
            />
            <div className="mt-3">
              {formData.skills.map((skill) => (
                <Badge
                  key={skill}
                  bg="info"
                  className="me-2 mb-2 fs-6 py-2 px-3"
                >
                  {skill}
                  <X
                    className="ms-2"
                    size={18}
                    style={{ cursor: "pointer" }}
                    onClick={() => removeSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
          </Form.Group>

          {/* Featured Toggle */}
          <Form.Group className="mt-4">
            <Form.Check
              type="checkbox"
              label="Pin as Featured Project (appears first)"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={onHide} disabled={saving}>
          Cancel
        </Button>
        <Button
          variant="success"
          size="lg"
          onClick={handleSubmit}
          disabled={
            saving ||
            !formData.name ||
            !formData.image ||
            !formData.github ||
            !formData.live
          }
        >
          {saving ? (
            <div
              className="spinner-border spinner-border-sm me-2"
              role="status"
            >
              <span className="visually-hidden">Saving...</span>
            </div>
          ) : (
            "Save Project"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProjectModal;
