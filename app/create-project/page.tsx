import ProjectForm from "@/components/ProjectForm";
import Modal from "@/components/Modal";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const CreateProject = async () => {
  const session = await getCurrentUser();

  if (!session?.user) {
    redirect("/");
  }
  return (
    <Modal>
      <h3 className="modal-head-text">Create Project</h3>

      <ProjectForm type="create" session={getCurrentUser} />
    </Modal>
  );
};

export default CreateProject;
