"use client";

// src/components/ProjectCard.tsx
import React from "react";
import Image from "next/image";
import { Badge, Card } from "react-bootstrap";
import { Github, ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
  name: string;
  image: string;
  skills: string[];
  github: string;
  live: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  image,
  skills,
  github,
  live,
}) => {
  const [copiedGit, setCopiedGit] = useState(false);
  const [copiedLive, setCopiedLive] = useState(false);

  const copyToClipboard = (text: string, type: "git" | "live") => {
    navigator.clipboard.writeText(text);
    if (type === "git") {
      setCopiedGit(true);
      setTimeout(() => setCopiedGit(false), 2000);
    } else {
      setCopiedLive(true);
      setTimeout(() => setCopiedLive(false), 2000);
    }
  };

  return (
    <Card className="h-100 shadow-sm border-0 overflow-hidden">
      <div className="position-relative">
        <Image
          src={image || "/fallback-project.jpg"}
          alt={name}
          width={400}
          height={200}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="position-absolute top-0 end-0 m-2">
          <Badge bg="dark">Project</Badge>
        </div>
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold fs-5">{name}</Card.Title>

        {/* Skills */}
        <div className="d-flex flex-wrap gap-2 my-3">
          {skills.map((skill) => (
            <Badge key={skill} bg="secondary" pill>
              {skill}
            </Badge>
          ))}
        </div>

        {/* GitHub URL - Visible + Copyable */}
        <div className="mt-3">
          <div className="d-flex align-items-center gap-2 mb-2">
            <Github size={18} className="text-muted" />
            <span className="text-muted small">GitHub</span>
          </div>
          <div className="bg-light border rounded p-2 d-flex align-items-center justify-content-between">
            <code
              className="text-truncate small me-2"
              style={{ maxWidth: "220px" }}
            >
              {github || "Not provided"}
            </code>
            {github && (
              <button
                onClick={() => copyToClipboard(github, "git")}
                className="btn btn-sm btn-outline-secondary p-1"
                title="Copy GitHub URL"
              >
                {copiedGit ? (
                  <Check size={16} className="text-success" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Live URL - Visible + Copyable */}
        <div className="mt-3">
          <div className="d-flex align-items-center gap-2 mb-2">
            <ExternalLink size={18} className="text-muted" />
            <span className="text-muted small">Live Demo</span>
          </div>
          <div className="bg-light border rounded p-2 d-flex align-items-center justify-content-between">
            <code
              className="text-truncate small me-2"
              style={{ maxWidth: "220px" }}
            >
              {live || "Not deployed"}
            </code>
            {live && (
              <button
                onClick={() => copyToClipboard(live, "live")}
                className="btn btn-sm btn-outline-secondary p-1"
                title="Copy Live URL"
              >
                {copiedLive ? (
                  <Check size={16} className="text-success" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Optional: Edit button for CMS */}
        <div className="mt-4">
          <button className="btn btn-outline-primary w-100">
            Edit Project
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
