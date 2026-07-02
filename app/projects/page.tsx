import type { Metadata } from "next";
import type { FC } from "react";
import ProjectsList from "@/common/ProjectsList";
import { title } from "@/data/config";

export const metadata: Metadata = {
  title: `Projects ­— ${title}`,
  description: "List of crowdsourcing open data and citizen science projects",
  openGraph: {
    title: `Projects ­— ${title}`,
    description: "List of crowdsourcing open data and citizen science projects",
    url: "/projects/",
    type: "website",
    locale: "en_US",
    siteName: title,
  },
  alternates: {
    canonical: "/projects/",
  },
};

const Projects: FC = () => {
  return <ProjectsList />;
};

export default Projects;
