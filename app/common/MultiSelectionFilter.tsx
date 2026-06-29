import { Input, Listbox, useFilter, useListCollection } from "@chakra-ui/react";
import { useStore } from "@nanostores/react";
import type { WritableAtom } from "nanostores";
import type { FC } from "react";

export interface MultiSelectOption {
  label: string;
  value: string;
}

const MultiSelectionFilter: FC<{
  options: Array<MultiSelectOption>;
  label: string;
  $store: WritableAtom<Array<string>>;
}> = ({ options, label, $store }) => {
  const selected = useStore($store);
  const { contains } = useFilter({ sensitivity: "base" });
  const { collection, filter } = useListCollection({
    initialItems: options,
    filter: contains,
  });

  return (
    <Listbox.Root
      key={options.map((o) => o.value).join("|")}
      collection={collection}
      selectionMode="multiple"
      value={selected}
      onValueChange={({ value }) => {
        $store.set(value);
      }}
    >
      <Listbox.Label>{label}</Listbox.Label>
      <Listbox.Input
        as={Input}
        placeholder="Type to filter..."
        onChange={(e) => filter(e.target.value)}
      />
      <Listbox.ValueText display="none" />
      <Listbox.Content>
        {collection.items.map((item) => (
          <Listbox.Item item={item} key={item.value}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
        <Listbox.Empty>No results found</Listbox.Empty>
      </Listbox.Content>
    </Listbox.Root>
  );
};

export default MultiSelectionFilter;
