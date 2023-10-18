import { ProjectInterface } from "@/common.types";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

const Home = async () => {
  const data = (await fetchAllProjects()) as ProjectSearch;

  const projectsToDisplay = data?.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flex-start flex col paddings mb-16">
        Categories
        <p className="no-result-text text-center">
          No projects found, go create some first!
        </p>
      </section>
    );
  }

  return (
    <section className="flex-start flex col paddings mb-16">
      <h1>Categories</h1>

      <section className="projects-grid">
        {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard />
        ))}
      </section>

      <h1>LoadMore</h1>
    </section>
  );
};

export default Home;
