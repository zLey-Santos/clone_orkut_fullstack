type TextFieldProps = {
  defaultText: string;
  value: string;
  type?: string;
  whenChanges?: (value: string) => void;
};

export function TextField({ whenChanges, defaultText: defaultText, value: value, type: type }: TextFieldProps) {
  return (
    <input
      placeholder={defaultText}
      value={value}
      type={type}
      onChange={(event) => whenChanges(event.target.value)}
      className="border rounded-lg outline-none focus:border-[#EF0092] py-1 px-2 my-4 flex h-8 w-full"
    />
  );
}
