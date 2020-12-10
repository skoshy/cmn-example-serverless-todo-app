import React from "react";
import { cc } from "src/lib";

export const Grid = ({ className = "", children = null }) => {
  return <div className={cc(["grid gap-6", className])}>{children}</div>;
};
