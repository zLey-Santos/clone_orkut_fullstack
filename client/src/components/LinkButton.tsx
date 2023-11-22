import { Link } from "react-router-dom";

type LinkButtonProps = {
  children: React.ReactNode;
  to: string;
  className?: string;
  onClick?: () => void;
};

export function LinkButton({ children, to, className, onClick }: LinkButtonProps) {
  return (
    <Link
      onClick={onClick}
      to={to}
      className={`bg-[#EF0092] hover:[#ef0093a5] text-white font-bold uppercase mr-3 p-2
      px-3 rounded-md hover:text-black ${className}`}>
      {children}
    </Link>
  );
}
