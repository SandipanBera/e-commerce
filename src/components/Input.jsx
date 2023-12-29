import React from "react";
import { forwardRef, useId } from "react";
const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full ">
      {label && (
        <label
          className="text-base font-medium text-gray-900"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className="mt-2">
        <input
          className={`flex h-10 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          type={type}
          {...props}
          id={id}
          ref={ref}
        ></input>{" "}
      </div>
    </div>
  );
});

export default Input;
