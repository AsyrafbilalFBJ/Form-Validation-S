"use client";

import { Label, Datepicker } from "flowbite-react";

export default function Component({onSelectedDateChanged}) {
    const today = new Date();

    const endOfYear = new Date(today.getFullYear(), 11, 31);

    return (    
        <div className="max-w-md">
            <div className="mb-2 block text-left">
                <Label htmlFor="datePicker" value="Date" className="text-cyan-600"/>
            </div>
                <Datepicker weekStart={1} minDate={today} maxDate={endOfYear} onSelectedDateChanged={onSelectedDateChanged} className="mb-5"/>
        </div>
    );
}