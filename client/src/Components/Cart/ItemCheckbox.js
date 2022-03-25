import { Box } from "@mui/material";
import { Checkbox } from "@mui/material";

function ItemCheckbox({ itemKey, selectCheckbox, checkedItems }) {
  return (
    <Box pr={1}>
      <Checkbox
        sx={{ width: 20, height: 20 }}
        value={itemKey}
        onChange={selectCheckbox}
        checked={checkedItems}
      />
    </Box>
  );
}

export default ItemCheckbox;
