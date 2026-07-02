"use client";
import { useStore } from "@nanostores/react";
import jsonata from "jsonata";
import type { FC } from "react";
import useSWRImmutable from "swr/immutable";
import type { Filter } from "@/common/Filters";
import SearchPage from "@/common/SearchPage";
import ToolCard from "@/common/ToolCard";
import data from "@/data/data.json";
import { hardwareDict, platformsDict } from "@/data/filters";
import {
  $hardwareFilter,
  $platformFilter,
  $projectsFilter,
  $toolsCombinedFilters,
} from "@/store";
import type { Hardware, Platform, Tool } from "@/types";

const filters: Array<Filter> = [
  {
    id: "project",
    type: "multiselect",
    label: "Project",
    options: (data?.projects || []).map(({ id, title }) => ({
      label: title,
      value: id,
    })),
    $store: $projectsFilter,
  },
  {
    id: "platform",
    type: "multiselect",
    label: "Platform",
    options: Object.keys(platformsDict).map((value) => ({
      label: platformsDict[value as Platform],
      value,
    })),
    $store: $platformFilter,
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
const ToolsList: FC = () => {
  const filtersData = useStore($toolsCombinedFilters);

  const { data: results, isLoading } = useSWRImmutable(
    ["tools", filtersData],
    async () => {
      if (
        filtersData.projects.length === 0 &&
        filtersData.platform.length === 0 &&
        filtersData.hardware.length === 0
      ) {
        return data.tools as Array<Tool>;
      }
      const expression = jsonata(
        `$append([], tools[
        ${
          filtersData.projects.length === 0
            ? "true"
            : `projects[$ in ${JSON.stringify(filtersData.projects)}]`
        }
        and
        ${
          filtersData.platform.length === 0
            ? "true"
            : `platforms[$ in ${JSON.stringify(filtersData.platform)}]`
        }
        and
        ${
          filtersData.hardware.length === 0
            ? "true"
            : `hardware[$ in ${JSON.stringify(filtersData.hardware)}]`
        }
      ])`,
      );
      const result = await expression.evaluate(data);
      return result as Array<Tool>;
    },
  );

  return (
    <SearchPage<Tool>
      filters={filters}
      results={results}
      isLoading={isLoading}
      Card={ToolCard}
    />
  );
};

export default ToolsList;
