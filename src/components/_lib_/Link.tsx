import React from "react";
import NextLink, { LinkProps } from "next/link"; // eslint-disable-line no-restricted-imports
import { Anchor } from "grommet";

interface Props extends React.PropsWithChildren<LinkProps> {
  wrapWithAnchor?: boolean;
  anchorProps?: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >;
}

export const Link = ({
  children,
  href,
  wrapWithAnchor = true,
  anchorProps = {},
  ...props
}: Props) => {
  return (
    <NextLink href={href} {...props}>
      {wrapWithAnchor ? (
        <Anchor href={href as string} {...anchorProps}>
          {children}
        </Anchor>
      ) : (
        children
      )}
    </NextLink>
  );
};
