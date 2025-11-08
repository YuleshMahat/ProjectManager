"use client";
import React from "react";

const MainDetailForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-1 width-50">
      <label>Title Heading</label>
      <input type="text" name="mainTitle"></input>
      <label>Secondary Info</label>
      <input type="text" name="description"></input>
      <button>Update</button>
    </form>
  );
};

export default MainDetailForm;
