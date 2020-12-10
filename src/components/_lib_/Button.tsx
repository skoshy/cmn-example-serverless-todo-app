import tw, { styled } from 'twin.macro';

const _Button = ({ href, className, ...props }) => {
  const Tag = href ? 'a' : 'button';

  return (
    <Tag className={className} href={href} {...props} />
  )
}

export const Button = styled(_Button)`
  ${tw`text-white bg-brand-500 border-0 py-2 px-2 focus:outline-none hover:bg-brand-400 hover:shadow-inner rounded text-lg cursor-pointer transition duration-150 ease-in-out text-center inline-block`}
`;
