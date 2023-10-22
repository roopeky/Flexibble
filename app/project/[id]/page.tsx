import { getCurrentUser } from "@/lib/session";
import React from "react";

const Project = async () => {
  const session = await getCurrentUser();
  return (
    <div>
      <p>project</p>
    </div>
  );
};

export default Project;
