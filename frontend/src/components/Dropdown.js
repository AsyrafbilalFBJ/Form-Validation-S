"use client";

import { Label, Select } from "flowbite-react";
import { LuFileQuestion } from "react-icons/lu";

export default function Component({ 
    id = "dropdown",
    label = "Label",
    icon = LuFileQuestion,
    selectedValue, 
    setSelectedValue, 
    options, 
    excludeValue,
    errorMessage = "" 
}) {

    return (
        <div className="max-w-md">
            <div className="mb-2 block">
                <Label htmlFor={id} value={label} className="text-cyan-600"/>
            </div>
            
            <Select id={id} 
                icon={icon}
                onChange={(e) => setSelectedValue(e.target.value)}
                value={selectedValue}
                color={errorMessage ? "failure" : "gray"}
                
            >
                {options.length === 1 ? (
                    <option value="">{options[0].text}</option>
                ): (
                    <>
                        <option value="">Select {label}</option>
                        {options
                            .filter((option) => option.text !== excludeValue)
                            .map((option) => (
                                <option key={option.id} value={option.text}>
                                    {option.text}
                                </option>
                            ))}
                    </>
                )
                }
                
            </Select>
            {errorMessage ? (
                <p className="font-medium text-xs text-red-600 animate__animated animate__fadeInDown">{errorMessage}</p>
            ):
                <p className="font-medium text-xs text-red-600">&ensp;</p>
            }
        </div>
    );
}