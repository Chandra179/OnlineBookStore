import { Box } from "@mui/material";
import { Checkbox } from "@mui/material";

function ItemCheckbox({ itemKey, selectCheckbox, items }) {
  return (
    <Box pr={1}>
      <Checkbox
        sx={{ width: 20, height: 20 }}
        value={itemKey}
        onChange={selectCheckbox}
        checked={items}
      />
    </Box>
  );
}

export default ItemCheckbox;
