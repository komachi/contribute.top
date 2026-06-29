import fs from "node:fs/promises";
import path from "node:path";
import data from "../app/data/data.json" with { type: "json" };

const api = "https://www.wikidata.org/w/api.php";

async function populateWikipediaLinks(items) {
  const QIDS = items.reduce((acc, value) => {
    if (value.wikidata) {
      acc.push(value.wikidata);
    }
    return acc;
  }, []);

  const params = new URLSearchParams({
    origin: "*",
    action: "wbgetentities",
    format: "json",
    props: "sitelinks",
    sitefilter: "enwiki",
    ids: QIDS.join("|"),
  });
  const res = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: params.toString(),
  });
  const json = await res.json();
  const links = {};
  for (const [qid, ent] of Object.entries(json.entities ?? {})) {
    links[qid] = ent?.sitelinks?.enwiki?.title ?? null;
  }

  return items.map((item) => {
    if (item.wikidata && links[item.wikidata]) {
      return {
        ...item,
        enwiki: links[item.wikidata],
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
