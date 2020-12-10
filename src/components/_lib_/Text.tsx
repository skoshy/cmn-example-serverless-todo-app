import "twin.macro"; // include when using tw prop

export const Text = ({ ...props }) => {
  return <span tw="leading-normal" {...props} />;
};
