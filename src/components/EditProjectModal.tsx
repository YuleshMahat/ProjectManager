// src/components/EditProjectModal.tsx
"use client";

import React, { useEffect } from "react";
import { Modal, Button, Form, Image, Badge } from "react-bootstrap";
import { X, Trash2, AlertCircle } from "lucide-react";
import {
  updateProjectAction,
  deleteProjectAction,
} from "@/features/projects/projectsAction";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import useForm from "@/hooks/useForm";

interface ProjectData {
  _id: string;
  name: string;
  image: string;
  skills: string[];
  github: string;
  live: string;
  featured?: boolean;
}

interface EditProjectModalProps {
  show: boolean;
  onHide: () => void;
  project: ProjectData;
  onSuccess?: () => void;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({
  show,
  onHide,
  project,
  onSuccess,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userStore);

  const { form, setForm, handleChange } = useForm<ProjectData>({
    _id: "",
    name: "",
    image: "",
    skills: [],
    github: "",
    live: "",
    featured: false,
  });

  const [skillsInput, setSkillsInput] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState("");
  const [deleting, setDeleting] = React.useState(false);

  useEffect(() => {
    if (show && project) {
      setForm(project);
      setImagePreview(project.image);
    }
  }, [show, project, setForm]);

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

  const handleSubmit = async () => {
    const result = dispatch(
      updateProjectAction(form._id, {
        name: form.name,
        image: form.image,
        skills: form.skills,
        github: form.github,
        live: form.live,
      })
    );
    if ((result as any).then) await result;
    onSuccess?.();
    onHide();
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `⚠️ DELETE "${form.name}"?\n\nThis action cannot be undone.\n\nAre you absolutely sure?`
    );

    if (!confirmed) return;

    setDeleting(true);
    try {
      await dispatch(deleteProjectAction(form._id));
      onSuccess?.();
      onHide();
    } catch (err) {
      alert("Failed to delete project. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold d-flex align-items-center gap-2">
          <AlertCircle size={24} className="text-warning" />
          Edit Project
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-4">
        <Form>
          {/* === SAME FORM AS BEFORE === */}
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              name="image"
              value={form.image}
              onChange={(e) => {
                handleChange(e);
                setImagePreview(e.target.value);
              }}
            />
            {imagePreview && (
              <Image
                src={imagePreview}
                rounded
                fluid
                className="mt-3 shadow-sm"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
            )}
          </Form.Group>

          <div className="row g-3">
            <div className="col-md-6">
              <Form.Label>GitHub</Form.Label>
              <Form.Control
                name="github"
                value={form.github}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <Form.Label>Live URL</Form.Label>
              <Form.Control
                name="live"
                value={form.live}
                onChange={handleChange}
              />
            </div>
          </div>

          <Form.Group className="mt-4">
            <Form.Label>Skills (Press Enter)</Form.Label>
            <Form.Control
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              onKeyDown={addSkill}
              placeholder="React, Node.js, MongoDB..."
            />
            <div className="mt-2">
              {form.skills.map((s) => (
                <Badge key={s} bg="primary" className="me-2 mb-2 fs-6">
                  {s}
                  <X
                    size={16}
                    className="ms-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeSkill(s)}
                  />
                </Badge>
              ))}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-3 justify-content-between">
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>

        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={deleting}
          className="d-flex align-items-center gap-2 px-4"
        >
          <Trash2 size={18} />
          {deleting ? "Deleting..." : "Delete Forever"}
        </Button>

        <Button variant="success" onClick={handleSubmit} className="px-4">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProjectModal;
