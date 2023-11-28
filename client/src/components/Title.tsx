interface TitleProps {
  children?: React.ReactNode;
  className?: string;
}

export function Title(props: TitleProps) {
  return <h1 className="text-2xl font-bold mt-2 ">{props.children}</h1>;
}
