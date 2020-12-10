import { ThemeType } from "grommet"; // eslint-disable-line import/named
import { range } from "lodash";
import { colors } from "./colors";

const grommetTheme: ThemeType = {
  global: {
    colors: {
      brand: colors.brand,
    },
  },
  heading: {
    level: {},
  },
};

// remove all max-widths on headings
const sizes = ["small", "medium", "large", "xlarge"];
range(1, 7).forEach((i) => {
  const iStr = String(i);
  grommetTheme.heading.level[iStr] = grommetTheme.heading.level[iStr] ?? {};

  sizes.forEach((size) => {
    grommetTheme.heading.level[iStr][size] =
      grommetTheme.heading.level[iStr][size] ?? {};
    grommetTheme.heading.level[iStr][size].maxWidth = "none";
  });
});

export { grommetTheme };
