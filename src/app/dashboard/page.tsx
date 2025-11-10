"use client";

import React from "react";
import CustomCard from "@/components/CustomCard";
import { TypeAnimation } from "react-type-animation";
import style from "./page.module.css";

const page = () => {
  return (
    <div className="d-flex flex-column gap-3">
      <TypeAnimation
        sequence={[
          "Hello  There",
          1000,
          "Welcome to Portfolio Manager",
          1000,
          "All your portfolio management needs COVERED",
          1000,
        ]}
        wrapper="span"
        speed={50}
        className={style.textAnimation}
        repeat={Infinity}
      />
      <div className="d-flex justify-content-around flex-direction-row">
        <CustomCard
          title="Manage main info"
          image="./mainInfo.png"
          information="Manage the information first displayed on your portfolio landing page"
          navigation="/mainInfo"
        />
        <CustomCard
          title="Manage skills"
          image="/skills.webp"
          information="Manage the skills listed on your portfolio"
          navigation="/skills"
        />
        <CustomCard
          title="Manage projects"
          image="/projects.png"
          information="Manage the projects showcased on your portfolio"
          navigation="/projects"
        />
        <CustomCard
          title="Manage personal info"
          image="/personalInfo.png"
          information="Manage the personal information showed on your portfolio"
          navigation=""
        />
      </div>
    </div>
  );
};

export default page;
