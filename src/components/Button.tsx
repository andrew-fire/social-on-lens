import { ReactNode } from "react";

export function Button({
  children,
  color,
  disabled,
  onClick,
  ...props
}: {
  children: ReactNode;
  color?: string;
  disabled?: boolean;
  onClick: any;
}) {
  const colorMap: any = {
    primary: "bg-blue-100 border-blue-400 hover:bg-blue-200",
    success: "bg-green-100 border-green-400 hover:bg-green-200",
    danger: "bg-red-100 border-red-400 hover:bg-red-200",
    secondary: "bg-gray-100 border-gray-400 hover:bg-gray-200",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      {...props}
      className={`w-full border text-black rounded-full flex justify-center ${
        colorMap[color ?? "primary"]
      } px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:${
        colorMap[color ?? "primary"]
      } disabled:opacity-75`}
    >
      {children}
    </button>
  );
}

export function ButtonAlt({ children, ...props }: { children: ReactNode }) {
  return (
    <button
      {...props}
      className="flex justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:opacity-75"
    >
      {children}
    </button>
  );
}
