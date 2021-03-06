import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { useCart } from "../../Hooks";
import {
  getCurrentUser,
  deleteCheckoutItem,
} from "../../Utils/helpers";

function CartHeader() {
  // ===========================================================================
  // Context
  // ===========================================================================

  const {
    selectedCheckbox,
    cartItemKeys,
    isAllCheckboxSelected,
    setSelectedCheckbox,
  } = useCart();

  // ===========================================================================
  // Var
  // ===========================================================================

  const userEmail = getCurrentUser();

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const selectAllCheckbox = (event) => {
    const value = event.target.value;
    if (value === "all") {
      // unselect all checkbox
      if (selectedCheckbox.length === cartItemKeys.length) {
        deleteCheckoutItem(userEmail);
        setSelectedCheckbox([]);
        return;
      }
      // select all checkbox
      if (selectedCheckbox.length !== cartItemKeys.length) {
        setSelectedCheckbox(cartItemKeys);
        return;
      }
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      sx={{
        marginLeft: {
          lg: 5,
          md: 5,
          sm: 5,
          xs: 2,
        },
        marginTop: 6,
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: {
              lg: 18,
              md: 18,
              sm: 16,
              xs: 14,
            },
          }}
        >
          Shopping cart
        </Typography>
      </Box>
      <Box width={90} display="flex">
        <Box>
          <Typography
            sx={{
              fontSize: {
                lg: 16,
                md: 16,
                sm: 16,
                xs: 15,
              },
            }}
          >
            Select all
          </Typography>
        </Box>
        <Box sx={{ marginLeft: "auto" }}>
          <Checkbox
            sx={{ width: 0, height: 0 }}
            value="all"
            onChange={selectAllCheckbox}
            checked={isAllCheckboxSelected}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default CartHeader;
