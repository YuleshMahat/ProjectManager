// app/dashboard/projects/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/app/dashboard/layout";
import ProjectCard from "@/components/ProjectCard";
import AddProjectModal from "@/components/AddProjectModal";
import { Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { fetchProjectsAction } from "@/features/projects/projectsAction";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";

const ProjectsPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userStore.user);
  const { projects, loading, error } = useAppSelector(
    (state) => state.projectStore
  );

  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch projects on mount
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchProjectsAction(user._id));
    }
  }, [user?._id, dispatch]);

  // Refetch after adding a project
  const handleProjectAdded = () => {
    dispatch(fetchProjectsAction(user!._id));
  };

  return (
    <DashboardLayout>
      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-primary">
            What have you built?
          </h1>
          <p className="text-glow lead">Show them your best works!</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-5">
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading your projects...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-5">
            <p className="text-danger fs-4">Oops! {error}</p>
            <Button
              variant="outline-danger"
              onClick={() => dispatch(fetchProjectsAction(user!._id))}
            >
              Try Again
            </Button>
          </div>
        )}

        {/* No Projects */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-5">
            <p className="text-glow fs-2 mb-4">
              No projects yet. Time to shine!
            </p>
            <Button size="lg" onClick={() => setShowAddModal(true)}>
              <Plus size={28} className="me-2" />
              Add Your First Project
            </Button>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && projects.length > 0 && (
          <>
            <div className="row g-4 justify-content-center">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="col-12 col-sm-10 col-md-6 col-lg-4 col-xl-3"
                >
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>

            {/* Floating Add Button */}
            <div className="text-center mt-5">
              <Button
                size="lg"
                variant="outline-success"
                className="px-5 shadow-lg"
                onClick={() => setShowAddModal(true)}
              >
                <Plus size={24} className="me-2" />
                Add New Project
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Reusable Modal */}
      <AddProjectModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSuccess={handleProjectAdded}
      />
    </DashboardLayout>
  );
};

export default ProjectsPage;
