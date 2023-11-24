type TextFieldProps = {
  defaultText: string;
  value: string;
  type?: string;
  onChange?: (value: string) => void;
};

export function TextField({ onChange, defaultText: defaultText, value: value, type: type }: TextFieldProps) {
  return (
    <input
      placeholder={defaultText}
      value={value}
      type={type}
      onChange={(event) => onChange(event.target.value)}
      className="border rounded-lg outline-none focus:border-[#EF0092] py-1 px-2 my-4 flex h-8 w-full"
    />
  );
}
