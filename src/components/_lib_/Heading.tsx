import tw, { styled } from "twin.macro"; // include when using tw prop
import { Text } from 'src/components/_lib_';

const H = {
  1: tw.h1`text-6xl leading-tight`,
  2: tw.h2`text-5xl leading-tight`,
  3: tw.h3`text-4xl`,
  4: tw.h4`text-3xl`,
  5: tw.h5`text-2xl`,
  6: tw.h6`text-xl`,
};


export const Heading = styled(({ level = '1', ...props }) => {
  const Component = H[level];

  return <Component {...props} />;
})`

`;
