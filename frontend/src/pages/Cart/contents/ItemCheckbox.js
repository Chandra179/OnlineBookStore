import { Box } from "@mui/material";
import { useCart } from "../../../hooks/useCart";
import CheckoutHelper from "../../../helper/checkout.helper";
import AuthService from "../../../services/auth.service";
import { Checkbox } from "@mui/material";

function ItemCheckbox({ itemKey }) {
  const { selectedCheckbox, setSelectedCheckbox } = useCart();
  const userEmail = AuthService.getCurrentUser();

  /** checkout items*/
  const checkedItems = selectedCheckbox.includes(itemKey);

  /**
   * Handle select checkbox
   */
  const handleSelectCheckbox = (event) => {
    const value = event.target.value;
    const selectedItems = [...selectedCheckbox];
    const index = selectedItems.indexOf(value);
    index === -1 ? selectedItems.push(value) : selectedItems.splice(index, 1);
    CheckoutHelper.setCheckoutItem(userEmail, selectedItems);
    setSelectedCheckbox(selectedItems);

    // if no item is selected, then remove localstorage
    if (selectedItems.length === 0) {
      CheckoutHelper.deleteCheckoutItem(userEmail);
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
