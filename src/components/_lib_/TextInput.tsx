import tw from "twin.macro"; // include when using tw prop
import { useMemo } from "react";
import { Grid, Text } from "src/components/_lib_";

const textStyle = tw`text-brand-600`

interface TextInputProps {
  label?: React.ReactNode;
  footer?: React.ReactNode;
  name?: string;
  value?: string | number;
  onChange?: React.FormEventHandler<HTMLInputElement>;
  containerProps?: React.ComponentPropsWithoutRef<"div">;
  inputProps?: React.ComponentPropsWithoutRef<"input">;
}

export const TextInput = ({
  label: _label = null,
  footer: _footer = null,
  name = null,
  value = undefined,
  onChange = null,
  containerProps = null,
  inputProps = null
}: TextInputProps) => {
  const label = useMemo(() => {
    if (typeof _label === 'string') return (
      <Text css={textStyle}>{_label}</Text>
    );

    return _label;
  }, [_label]);

  const footer = useMemo(() => {
    if (typeof _footer === 'string') return (
      <Text css={`${textStyle} ${tw`text-sm`}`}>{_footer}</Text>
    );

    return _footer;
  }, [_footer]);

  return (
    <Grid tw="gap-2" {...containerProps}>
      {label && (<label htmlFor={name}>
        {label}
      </label>)}
      <input
        name={name}
        onChange={onChange}
        type="text"
        value={value}
        tw="bg-brand-100 rounded border border-brand-300 focus:border-brand-500 outline-none text-brand-700 py-2 px-2 transition-colors duration-150 ease-in-out"
        {...inputProps}
      />
      {footer}
    </Grid>
  );
};
