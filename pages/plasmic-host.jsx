import * as React from "react";
import { PlasmicCanvasHost } from "@plasmicapp/loader-nextjs";
import { PLASMIC } from "@/plasmic-init";

import { registerAll } from "inprodi-design-system";

registerAll();

export default function PlasmicHost() {
  return PLASMIC && <PlasmicCanvasHost />;
}
