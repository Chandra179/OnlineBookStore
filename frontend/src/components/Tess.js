import * as React from 'react';
import { Checkbox } from "@material-ui/core";
import { useState } from "react";
import { useCart } from "../hooks/useCart";


export default function MyCheckbox() {
    const { cartItem } = useCart();
    const [selected, setSelected] = useState([]);
    const options = Object.keys(cartItem);
    const isAllSelected =
        options.length > 0 && selected.length === options.length;

    const handleChange = (event) => {
        const value = event.target.value;
        console.log(value);
        if (value === "all") {
            setSelected(selected.length === options.length ? [] : options);
            return;
        }
        // added below code to update selected options
        const list = [...selected];
        const index = list.indexOf(value);
        index === -1 ? list.push(value) : list.splice(index, 1);
        setSelected(list);
    };

    // console.log(selected)

    const listItem = Object.keys(cartItem).map(function (key) {
        return (
            <div key={key}>
                <Checkbox
                    value={key}
                    onChange={handleChange}
                    checked={selected.includes(key)}
                />
                <span>{key}</span>
            </div>
        );
    });

    return (
        <div style={{ display: "flex", alignItems: "center", margin: 10 }}>
            <Checkbox value="all" onChange={handleChange} checked={isAllSelected} />
            <span> Select All</span>
            {listItem}
        </div>
    );
}
