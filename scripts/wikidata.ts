import fs from "node:fs/promises";
import path from "node:path";
import type { Entity, EntityId, Site, Sitelinks } from "wikibase-sdk";
import wdk from "wikibase-sdk/wikidata.org";
import data from "../app/data/data.json" with { type: "json" };

function hasSitelinks(
  wiki: Site,
  entity?: Entity,
): entity is Extract<Entity, { sitelinks?: Sitelinks }> {
  if (!entity) {
    return false;
  }
  return (
    "sitelinks" in entity && !!entity.sitelinks && wiki in entity.sitelinks
  );
}

async function populateWikipediaLinks(
  items: Array<{
    wikidata?: string;
  }>,
) {
  const QIDS = items.reduce<Array<EntityId>>((acc, value) => {
    if (value.wikidata) {
      acc.push(value.wikidata as EntityId);
    }
    return acc;
  }, []);

  const { entities } = await wdk.client.getManyEntities({
    ids: QIDS,
    props: "sitelinks",
  });

  return items.map((item) => {
    const entity = item.wikidata
      ? entities[item.wikidata as EntityId]
      : undefined;

    const enwiki = hasSitelinks("enwiki", entity)
      ? entity?.sitelinks?.enwiki?.title
      : null;
    if (enwiki) {
      return {
        ...item,
        enwiki,
      };
    }
    return item;
  });
}

const [tools, projects] = await Promise.all([
  populateWikipediaLinks(data.tools),
  populateWikipediaLinks(data.projects),
]);

const result = {
  ...data,
  tools,
  projects,
};

const scriptDir = path.dirname(new URL(import.meta.url).pathname);
const filename = path.join(scriptDir, "..", "app", "data", "data.json");

await fs.writeFile(filename, JSON.stringify(result, null, 2), "utf8");
