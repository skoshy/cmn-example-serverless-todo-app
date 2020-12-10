import { lighten } from "polished";
import { StyleTypes } from "src/types";

// mark as partial so we can programmatically build up colors
const colors = {} as Partial<StyleTypes.Colors>;

colors.brand = "#0066ff";
colors.brandLight = lighten(0.3, colors.brand);
colors.brandLighter = lighten(0.4, colors.brand);
colors.brandLightest = lighten(0.45, colors.brand);

// finalize colors into a non-Partial type
const colorsFinal = colors as StyleTypes.Colors;
export { colorsFinal as colors };
