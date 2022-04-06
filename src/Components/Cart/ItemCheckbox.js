import React from "react";
import { Box } from "@mui/material";
import { Checkbox } from "@mui/material";
import {
  getCurrentUser,
  deleteCheckoutItem,
} from "../../Utils/helpers";
import { useCart } from "../../Hooks";

function ItemCheckbox({ itemKey }) {
  // ===========================================================================
  // Context
  // ===========================================================================

  const { selectedCheckbox, setSelectedCheckbox } = useCart();

  // ===========================================================================
  // Var
  // ===========================================================================

  const userEmail = getCurrentUser();
  const checkedItems = selectedCheckbox.includes(itemKey);

  // ===========================================================================
  // Handlers
  // ===========================================================================
  
  const handleSelectCheckbox = (event) => {
    const value = event.target.value;
    const selectedItems = [...selectedCheckbox];
    const index = selectedItems.indexOf(value);
    index === -1 ? selectedItems.push(value) : selectedItems.splice(index, 1);
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
