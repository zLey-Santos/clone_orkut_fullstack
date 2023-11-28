import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type TextFieldProps = {
  defaultText: string;
  value: string;
  type?: string;
  onChange?: (value: string) => void;
};

export function PasswordField({ onChange, defaultText, value }: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        placeholder={defaultText}
        value={value}
        type={showPassword ? "text" : "password"}
        onChange={(event) => onChange && onChange(event.target.value)}
        className="border rounded-lg outline-none focus:border-[#EF0092] py-1 px-2 my-4 flex h-8 w-full"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 flex items-center pr-2">
        {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
      </button>
    </div>
  );
}
