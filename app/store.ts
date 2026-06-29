import { persistentJSON } from "@nanostores/persistent";
import { computed } from "nanostores";

export const $categoriesFilter = persistentJSON<Array<string>>(
  "categoriesFilter",
  [],
);
export const $hardwareFilter = persistentJSON<Array<string>>(
  "hardwareFilter",
  [],
);
export const $projectsFilter = persistentJSON<Array<string>>(
  "projectsFilter",
  [],
);
export const $platformFilter = persistentJSON<Array<string>>(
  "platformFilter",
  [],
);

export const $projectsCombinedFilters = computed(
  [$categoriesFilter, $hardwareFilter],
  (categories, hardware) => ({
    categories,
    hardware,
  }),
);

export const $toolsCombinedFilters = computed(
  [$projectsFilter, $platformFilter, $hardwareFilter],
  (projects, platform, hardware) => ({
    projects,
    platform,
    hardware,
  }),
);
