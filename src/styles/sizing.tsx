import { StyleTypes } from "src/types";

// mark as partial so we can programmatically build up colors
const sizing = {};

// finalize colors into a non-Partial type
const sizingFinal = sizing as StyleTypes.Sizing;
export { sizingFinal as sizing };
