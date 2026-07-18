import type { ChangeEvent } from "react";

export type InputBoxType ={
    placeholder : string,
    label : string
    onchange : (e:ChangeEvent<HTMLInputElement, HTMLInputElement>)=>void
    type? : string
}

export function InputBox({placeholder,label,onchange,type}:InputBoxType) {
  return (
    <div>
      <label
        className="block mb-2.5 text-sm font-medium text-heading"
      >
       {label}
      </label>
      <input
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-500 text-heading text-sm rounded-lg focus:outline-none focus:ring-black focus:ring-1 focus:border-black block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
        onChange={onchange}

        placeholder={placeholder}
        required
      />
    </div>
  );
}
