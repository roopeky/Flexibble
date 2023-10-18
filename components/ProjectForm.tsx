"use client";

import { SessionInterface } from "@/common.types";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";

type Props = {
  type: string;
  session: SessionInterface;
};

const handleFormSubmit = (e: React.FormEvent) => {};

const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
  e.preventDefault();
  const file = e.target.files?.[0];

  if (!file) return;

  if (!file.type.includes("image")) {
    return alert("Please upload an image file");
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    const result = reader.result as string;
    handleStateChange("image", result);
  };
};

const handleStateChange = (fieldname: string, value: string) => {
  setForm((prevState) => ({ ...prevState, [fieldname]: value }));
};

const [isSubmitting, setIsSubmitting] = useState(false);
const [form, setForm] = useState({
  title: "",
  description: "",
  image: "",
  liveSiteUrl: "",
  githubUrl: "",
  category: "",
});

const ProjectForm = ({ type, session }: Props) => {
  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
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

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
