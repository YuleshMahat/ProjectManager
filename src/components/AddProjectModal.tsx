// src/components/AddProjectModal.tsx
"use client";

import React, { useState, useEffect, ReactEventHandler } from "react";
import { Modal, Button, Form, Image, Badge } from "react-bootstrap";
import { Plus, X, Upload, Github, Link45deg } from "react-bootstrap-icons";
import { addProjectAction } from "@/features/projects/projectsAction";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import useForm from "@/hooks/useForm";

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [skillsInput, setSkillsInput] = useState("");

  const initialData = {
    name: "",
    image: "",
    skills: [] as string[],
    github: "",
    live: "",
    featured: false,
    order: 0,
  };

  const { form, setForm } = useForm(initialData);

  // Reset form when modal opens
  useEffect(() => {
    if (show) {
      setForm(initialData);
      setSkillsInput("");
      setImagePreview("");
      setImageFile(null);
    }
  }, [show]);

  // Add skill
  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && skillsInput.trim()) {
      e.preventDefault();
      const skill = skillsInput.trim();
      if (!form.skills.includes(skill)) {
        setForm((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
      }
      setSkillsInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleImageChange = (url: string) => {
    setForm((prev) => ({ ...prev, image: url }));
    setImagePreview(url);
  };

  const handleImageUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
    setImageFile(file);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.github || !form.live) {
      return;
    }

    setSaving(true);

    try {
      const formData = new FormData(); //form data variable to send the data as form data to the backend instead of usual URL encoded data.

      for (const key in form) {
        formData.append(key, form[key]);
      }
      formData.append("imageFile", imageFile);

      const actionResult = await dispatch(addProjectAction(formData));

      if (actionResult.status === "success") setImageFile(null);
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
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
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
              value={form.image}
              onChange={(e) => handleImageChange(e.target.value)}
            />
            {imagePreview && (
              <div className="mt-3 rounded overflow-hidden shadow-sm">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fluid
                  rounded
                  style={{ maxWidth: "200px", objectFit: "contain" }}
                />
              </div>
            )}
          </Form.Group>

          {/*  Image upload feature  */}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload project image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageUploadChange}
            />
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
                value={form.github}
                onChange={(e) => setForm({ ...form, github: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="col-md-6">
              <Form.Label className="fw-semibold d-flex align-items-center">
                <Link45deg className="me-2" /> Live Demo URL *
              </Form.Label>
              <Form.Control
                type="url"
                placeholder="https://myapp.vercel.app"
                value={form.live}
                onChange={(e) => setForm({ ...form, live: e.target.value })}
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
              {form.skills.map((skill) => (
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
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
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
          disabled={saving || !form.name || !form.github || !form.live}
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
