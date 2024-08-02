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
    primary: "bg-blue-600",
    success: "bg-green-600",
    danger: "bg-red-600",
    secondary: "bg-gray-300",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      {...props}
      className={`w-full flex justify-center rounded-md ${
        colorMap[color ?? "primary"]
      } px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:${
        colorMap[color ?? "primary"]
      } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-75`}
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
