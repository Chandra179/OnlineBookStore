import React from "react";
import { Box } from "@mui/material";
import { Checkbox } from "@mui/material";
import {
  getCurrentUser,
  setCheckoutItem,
  deleteCheckoutItem,
} from "../../Utils/helpers";
import { useCart } from "../../Hooks"

function ItemCheckbox({ itemKey }) {
  const userEmail = getCurrentUser();
  const { selectedCheckbox, setSelectedCheckbox } = useCart();
  const checkedItems = selectedCheckbox.includes(itemKey);

  /**
   * Handle select checkbox
   */
  const handleSelectCheckbox = (event) => {
    const value = event.target.value;
    const selectedItems = [...selectedCheckbox];
    const index = selectedItems.indexOf(value);
    index === -1 ? selectedItems.push(value) : selectedItems.splice(index, 1);
    setCheckoutItem(userEmail, selectedItems);
    setSelectedCheckbox(selectedItems);

    // if no item is selected, then remove localstorage
    if (selectedItems.length === 0) {
      deleteCheckoutItem(userEmail);
      return;
    }
  };
  return (
    <Box pr={1}>
      <Checkbox
        sx={{ width: 20, height: 20 }}
        value={itemKey}
        onChange={handleSelectCheckbox}
        checked={checkedItems}
      />
    </Box>
  );
}

export default ItemCheckbox;
