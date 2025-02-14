import React, { useEffect, useState } from "react";
import {
  PlasmicComponent,
  PlasmicRootProvider,
} from "@plasmicapp/loader-nextjs";
import { useRouter } from "next/router";
import { PLASMIC } from "../plasmic-init";
import LoadingScreen from "@/components/LoadingScreen";

export default function CatchallPage() {
  const router = useRouter();
  const { catchall } = router.query;

  const [plasmicData, setPlasmicData] = useState(null);
  const [queryCache, setQueryCache] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    const fetchPlasmicData = async () => {
      const plasmicPath =
        typeof catchall === "string"
          ? catchall
          : Array.isArray(catchall)
          ? `/${catchall.join("/")}`
          : "/";

      const plasmicData = await PLASMIC.maybeFetchComponentData(
        plasmicPath,
        "AppShell"
      );

      if (!plasmicData || plasmicData.entryCompMetas.length === 0) {
        router.push("/auth/login");
        return;
      }

      const pageMeta = plasmicData.entryCompMetas[0];

      const queryCache = await import("@plasmicapp/loader-nextjs").then(
        ({ extractPlasmicQueryData }) =>
          extractPlasmicQueryData(
            <PlasmicRootProvider
              loader={PLASMIC}
              prefetchedData={plasmicData}
              pageRoute={pageMeta.path}
              pageParams={pageMeta.params}
            >
              <PlasmicComponent component={pageMeta.displayName} />
            </PlasmicRootProvider>
          )
      );

      setPlasmicData(plasmicData);
      setQueryCache(queryCache);
    };

    fetchPlasmicData();
  }, [catchall, router]);

  if (!plasmicData || !queryCache) {
    return;
  }

  const pageMeta = plasmicData.entryCompMetas[0];

  return (
    <PlasmicRootProvider
      loader={PLASMIC}
      prefetchedData={plasmicData}
      prefetchedQueryData={queryCache}
      pageRoute={pageMeta.path}
      pageParams={pageMeta.params}
    >
      <PlasmicComponent
        component={pageMeta.displayName}
      />
    </PlasmicRootProvider>
  );
}