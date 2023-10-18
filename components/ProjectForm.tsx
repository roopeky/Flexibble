"use client";

import { SessionInterface } from "@/common.types";
import { ChangeEvent } from "react";
import Image from "next/image";
import FormField from "./FormField";

type Props = {
  type: string;
  session: SessionInterface;
};

const handleFormSubmit = (e: React.FormEvent) => {};
const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {};
const handleStateChange = (fieldname: string, value: string) => {};

const form = {
  image: "",
};

const ProjectForm = ({ type, session }: Props) => {
  return (
    <form onSubmit={handleFormSubmit} className="flexStart-form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="project poster"
            fill
          />
        )}
      </div>

      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects."
        setState={(value) => handleStateChange("description", value)}
      />

      <FormField
        type="url"
        title="Website Url"
        state={form.liveSiteUrl}
        placeholder="url"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />

      <FormField
        type="url"
        title="Github Url"
        state={form.githubUrl}
        placeholder="github.com/roopeky"
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      <FormField
        title="Project Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange("title", value)}
      />

      <div className="flexStart w-full">
        <button>Create</button>
      </div>
    </form>
  );
};

export default ProjectForm;
