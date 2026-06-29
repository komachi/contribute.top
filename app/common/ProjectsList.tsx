import { useStore } from "@nanostores/react";
import jsonata from "jsonata";
import type { FC } from "react";
import useSWRImmutable from "swr/immutable";
import { categoriesDict, hardwareDict } from "@/data/filters";
import {
  $categoriesFilter,
  $hardwareFilter,
  $projectsCombinedFilters,
} from "@/store";
import type { Category, Hardware, Project } from "@/types";
import type { Filter } from "./Filters";
import ProjectCard from "./ProjectCard";
import SearchPage from "./SearchPage";

const filters: Array<Filter> = [
  {
    id: "categories",
    type: "multiselect",
    label: "Category",
    options: Object.keys(categoriesDict).map((value) => ({
      label: categoriesDict[value as Category],
      value,
    })),
    $store: $categoriesFilter,
  },
  {
    id: "hardware",
    type: "multiselect",
    label: "Required hardware",
    options: Object.keys(hardwareDict).map((value) => ({
      label: hardwareDict[value as Hardware],
      value,
    })),
    $store: $hardwareFilter,
  },
];
const ProjectsList: FC<{ projects?: Array<Project> }> = ({ projects }) => {
  const filtersData = useStore($projectsCombinedFilters);
  const { data: results, isLoading } = useSWRImmutable(
    ["projects", filtersData],
    async () => {
      const expression = jsonata(
        `$append([], $[
        ${
          filtersData.categories.length === 0
            ? "true"
            : `categories[$ in ${JSON.stringify(filtersData.categories)}]`
        }
        and
        ${
          filtersData.hardware.length === 0
            ? "true"
            : `hardware[$ in ${JSON.stringify(filtersData.hardware)}]`
        }
      ])`,
      );
      const result = await expression.evaluate(projects);
      return result as Array<Project>;
    },
  );

  return (
    <SearchPage<Project>
      filters={filters}
      results={results}
      isLoading={isLoading}
      Card={ProjectCard}
    />
  );
};

export default ProjectsList;
