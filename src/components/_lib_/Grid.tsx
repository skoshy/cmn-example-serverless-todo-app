import "twin.macro"; // include when using tw prop

export const Grid = ({ ...props }) => {
  return <div tw="grid items-start gap-3" {...props} />;
};
