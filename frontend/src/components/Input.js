"use client";

import { Label, TextInput } from "flowbite-react";
import { LuFileQuestion } from "react-icons/lu";

export default function Component({
    id = "input",
    label = "Label",
    type = "text",
    icon = LuFileQuestion,
    placeholder = "input anything",
    value = "",
    onChange,
    errorMessage = "",
    readOnly = ""
}) {

  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor={id} value={label} className="text-cyan-600"/>
      </div>
      <TextInput id={id} type={type} value={value} onChange={onChange} icon={icon} placeholder={placeholder}
      color={errorMessage ? "failure" : "gray"} readOnly={readOnly}
      />
      {errorMessage ? (
          <p className="font-medium text-xs text-red-600 animate__animated animate__fadeInDown">{errorMessage}</p>
      ):
          <p className="font-medium text-xs text-red-600">&ensp;</p>
      }
    </div>
  );
}
