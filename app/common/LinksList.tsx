import { Link } from "@chakra-ui/react";
import type { FC } from "react";
import { LuCode, LuGlobe } from "react-icons/lu";
import {
  SiAppstore,
  SiFdroid,
  SiFlathub,
  SiGoogleplay,
  SiWikidata,
  SiWikipedia,
} from "react-icons/si";
import type { Links } from "@/types";

const LinksList: FC<{
  links: Links;
  withTitles?: boolean;
  enwiki?: string;
  wikidata?: string;
}> = ({ links, withTitles, enwiki, wikidata }) => {
  return (
    <>
      {links.website && (
        <Link
          href={links.website}
          target="_blank"
          rel="noopener"
          title="Website"
        >
          <LuGlobe /> {withTitles && "Website"}
        </Link>
      )}
      {links.sourcecode && (
        <Link
          href={links.sourcecode}
          target="_blank"
          rel="noopener"
          title="Source code"
        >
          <LuCode /> {withTitles && "Source code"}
        </Link>
      )}
      {links.fdroid && (
        <Link
          href={`https://f-droid.org/en/packages/${links.fdroid}`}
          target="_blank"
          rel="noopener"
          title="F-Droid"
        >
          <SiFdroid /> {withTitles && "F-Droid"}
        </Link>
      )}
      {links.googleplay && (
        <Link
          href={`https://play.google.com/store/apps/details?id=${links.googleplay}`}
          target="_blank"
          rel="noopener"
          title="Google Play"
        >
          <SiGoogleplay /> {withTitles && "Google Play"}
        </Link>
      )}
      {links.appstore && (
        <Link
          href={`https://apps.apple.com/en/app/id${links.appstore}`}
          target="_blank"
          rel="noopener"
          title="App Store"
        >
          <SiAppstore /> {withTitles && "App Store"}
        </Link>
      )}
      {links.flathub && (
        <Link
          href={`https://flathub.org/en/apps/${links.flathub}`}
          target="_blank"
          rel="noopener"
          title="Flathub"
        >
          <SiFlathub /> {withTitles && "Flathub"}
        </Link>
      )}
      {enwiki && (
        <Link
          href={`https://en.wikipedia.org/wiki/${encodeURIComponent(enwiki.replace(/ /g, "_"))}`}
          target="_blank"
          rel="noopener"
        >
          <SiWikipedia /> {withTitles && "Wikipedia"}
        </Link>
      )}
      {wikidata && (
        <Link
          href={`https://www.wikidata.org/wiki/${wikidata}`}
          target="_blank"
          rel="noopener"
        >
          <SiWikidata /> {withTitles && "Wikidata"}
        </Link>
      )}
    </>
  );
};

export default LinksList;
