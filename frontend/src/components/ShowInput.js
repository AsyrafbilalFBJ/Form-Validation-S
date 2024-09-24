"use client";

import { Label } from "flowbite-react";

export default function Component({
    id = "input",
    label = "Label",
    data = "No Data Inputed",
}) {

  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor={id} value={label} className="text-cyan-600"/>
      </div>
      <p>
        {data}
      </p>
    </div>
  );
}
