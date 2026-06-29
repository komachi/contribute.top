import { Box, CloseButton, Drawer, IconButton, Portal } from "@chakra-ui/react";
import type { WritableAtom } from "nanostores";
import { type FC, useState } from "react";
import { LuFilter } from "react-icons/lu";
import type { MultiSelectOption } from "./MultiSelectionFilter";
import MultiSelectionFilter from "./MultiSelectionFilter";

export interface Filter {
  id: string;
  type: "multiselect";
  label: string;
  options: Array<MultiSelectOption>;
  $store: WritableAtom<Array<string>>;
}

const FiltersContent: FC<{
  filters: Array<Filter>;
}> = ({ filters, ...rest }) => {
  return (
    <Box gap="16px" display="flex" flexDirection="column" {...rest}>
      {filters.map((filter) => {
        switch (filter.type) {
          case "multiselect": {
            return (
              <MultiSelectionFilter
                key={filter.id}
                label={filter.label}
                $store={filter.$store}
                options={filter.options}
              />
            );
          }
          default: {
            return null;
          }
        }
      })}
    </Box>
  );
};

const Filters: FC<{
  filters: Array<Filter>;
}> = ({ filters }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box display={{ base: "none", lg: "block" }}>
        <FiltersContent filters={filters} />
      </Box>
      <Box display={{ base: "block", lg: "none" }}>
        <IconButton
          onClick={() => setOpen(true)}
          position="fixed"
          bottom="16px"
          right="16px"
          zIndex={1000}
          borderRadius="full"
          boxShadow="lg"
          aria-label="Open filters"
        >
          <LuFilter />
        </IconButton>
        <Drawer.Root
          open={open}
          onOpenChange={(details) => setOpen(details.open)}
          size="md"
        >
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>Filters</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                  <FiltersContent filters={filters} />
                </Drawer.Body>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </Box>
    </>
  );
};

export default Filters;
