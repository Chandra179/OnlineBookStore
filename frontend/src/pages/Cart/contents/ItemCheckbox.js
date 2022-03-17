import { Box } from "@mui/material";
import { Checkbox } from "@mui/material";
//
import CheckoutHelper from "../../../helper/checkout.helper";
import AuthService from "../../../services/auth.service";
import { useCart } from "../../../hooks/useCart";

function ItemCheckbox({ itemKey, selectCheckBox, items }) {
  return (
    <Box pr={1}>
      <Checkbox
        sx={{ width: 20, height: 20 }}
        value={itemKey}
        onChange={selectCheckBox}
        checked={items}
      />
    </Box>
  );
}

export default ItemCheckbox;
