"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/app/dashboard/layout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAppSelector } from "@/hooks/reduxHooks";
import {
  handleGetSkillsAction,
  updateSkillsAction,
} from "@/features/skills/skillsAction";
import SkillCard from "@/components/SkillCard";
import AddSkillModal from "@/components/AddSkillModal";

const Page = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAppSelector((state) => state.userStore);
  const userId = user?._id;

  const handleAddSkill = async (skill: string) => {
    const result = await updateSkillsAction(userId, [...skills, skill]);
    setSkills(result.skills);
  };

  useEffect(() => {
    const load = async () => {
      const result = await handleGetSkillsAction(userId);
      if (result.status === "success") {
        setSkills(result.data.skills);
      }
    };
    load();
  }, [userId]);

  // -------------------------------------------------
  // Delete handler (optimistic UI)
  // -------------------------------------------------
  const deleteSkill = async (skillToDelete: string) => {
    // 1. Optimistically remove from UI
    setSkills((prev) => prev.filter((s) => s !== skillToDelete));
    const tempSkills = skills.filter((s) => s !== skillToDelete);
    // 2. Call API
    const res = await updateSkillsAction(userId, tempSkills);

    // 3. Re-add if API failed
    if (res.status === "error") {
      alert(`Failed to delete "${skillToDelete}": ${res.message}`);
      setSkills((prev) => [...prev, skillToDelete].sort());
    }

    setSkills(res.skills);
  };

  const openAddSkillModal = () => {
    setShowModal(true);
  };

  return (
    <DashboardLayout>
      <Container>
        <h1 className="mb-2">Manage Your Skills Displayed on Your Portfolio</h1>

        <Row className="g-4 flex-grow-1">
          <Col xs={12} sm={6} md={4} lg={3}>
            <div
              onClick={openAddSkillModal}
              className="h-100 d-flex align-items-center justify-content-center border border-dashed rounded bg-light text-muted"
              style={{
                cursor: "pointer",
                minHeight: "80px",
                fontSize: "2rem",
                userSelect: "none",
              }}
              role="button"
              tabIndex={0}
              aria-label="Add new skill"
            >
              Add
            </div>
          </Col>
          {skills?.map((skill, idx) => (
            <Col
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={idx} // you could use skill itself if unique
              className="text-white"
            >
              <SkillCard
                skill={skill}
                onDelete={() => deleteSkill(skill)}
                // onEdit can be added later
              />
            </Col>
          ))}
        </Row>

        {/* Optional empty-state */}
        {skills?.length === 0 && (
          <p className="text-center text-muted mt-4">
            No skills yet – add some in your profile!
          </p>
        )}
        <AddSkillModal
          show={showModal}
          onHide={() => setShowModal(false)}
          onAdd={handleAddSkill}
        />
      </Container>
    </DashboardLayout>
  );
};

export default Page;
