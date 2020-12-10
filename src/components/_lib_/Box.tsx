import "twin.macro"; // include when using tw prop

export const Box = ({ ...props }) => {
  return <div tw="flex flex-col" {...props} />;
};
