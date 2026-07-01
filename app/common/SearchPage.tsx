import {
  Box,
  ClientOnly,
  GridItem,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import type { FC } from "react";
import Filters, { type Filter } from "./Filters";

interface SearchPageProps<T> {
  filters: Array<Filter>;
  isLoading: boolean;
  results?: Array<T>;
  Card: FC<T>;
}

function SearchPage<T extends { id: string }>({
  filters,
  isLoading,
  results,
  Card,
}: SearchPageProps<T>) {
  return (
    <SimpleGrid
      columns={12}
      gap="16px"
      pt={{ md: "16px" }}
      pb={{ base: "64px", lg: "16px" }}
    >
      <GridItem colSpan={{ base: 12, lg: 3 }}>
        <SimpleGrid gap="16px">
          <Filters filters={filters} />
        </SimpleGrid>
      </GridItem>
      <GridItem colSpan={{ base: 12, lg: 9 }} pt={{ md: "24px" }}>
        <noscript>
          <Box display="flex" alignItems="center" justifyContent="center">
            Filters does not work without JavaScript enabled. Please enable
            JavaScript in your browser.
          </Box>
        </noscript>
        <ClientOnly>
          {isLoading ? (
            <Box display="flex" alignItems="center" justifyContent="center">
              <Spinner size="xl" />
            </Box>
          ) : !results || results?.length < 1 ? (
            <Box display="flex" alignItems="center" justifyContent="center">
              No results.
            </Box>
          ) : (
            <SimpleGrid
              columns={{ base: 1, sm: 2, xl: 3 }}
              gap="8px"
              gridAutoRows="1fr"
            >
              {(results || []).map((result) => (
                <Card key={result.id} {...result} />
              ))}
            </SimpleGrid>
          )}
        </ClientOnly>
      </GridItem>
    </SimpleGrid>
  );
}

export default SearchPage;
