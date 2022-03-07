import React, { useState } from "react";
// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BasicAlerts from "../../../components/Alert";
// SERVICE
import AddressService from "../../../services/address.service";
import AuthService from "../../../services/auth.service";
// HELPER
import InputValidatorHelper from "../../../helper/inputValidator.helper";


/**
 * 
 * @param {obj} setDefaultAddress 
 */

export default function InputNewAddress({ setDefaultAddress }) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [addressName, setAddressName] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState(0);
  const [addressAlert, setAddressAlert] = useState("");
  const [inputSuccess, setInputSuccess] = useState("");
  const [checkedBox, setCheckedBox] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setAddressAlert("");
    setOpen(false);
  };
  const userEmail = AuthService.getCurrentUser();
  const userToken = AuthService.getToken();

  function handleSave() {
    var addressInput = {
      contact_name: fullName,
      phone_number: phoneNumber,
      address_name: addressName,
      city: city,
      province: province,
      state: country,
      zip: zip,
      user: userEmail,
    };

    AddressService.postAddress(userToken, addressInput).then(
      (data) => {
        setInputSuccess("Address has been saved.");
        setAddressAlert('');
        if (checkedBox) {
          var item = {
            'default': addressName
          }
          localStorage.setItem(userEmail+'Address', JSON.stringify(item))
          setDefaultAddress(addressName)
        }
        window.location.reload('/cart/checkout')
      },
      (error) => {
        if (error.response.status === 400) {
          setAddressAlert("Invalid format");
          setInputSuccess('');
          return;
        }
        if (error.response.status === 500) {
          setAddressAlert(
            "Your can only have 5 address! try to edit or remove one of your address"
          );
          setInputSuccess('');
          return;
        }
      }
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start", marginTop: 3 }}>
        <Button
          onClick={handleOpen}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add new address
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container component="main" maxWidth="sm" sx={{ mt: 5 }}>
          {inputSuccess ? (
            <Box sx={{ mb: 1 }}>
              <BasicAlerts name={inputSuccess} severity="success" />
            </Box>
          ) : (
            <div />
          )}
          {addressAlert ? (
            <Box sx={{ mb: 1 }}>
              <BasicAlerts name={addressAlert} severity="error" />
            </Box>
          ) : (
            <div />
          )}
          <Box sx={{ padding: 2, borderRadius: 2, backgroundColor: "white" }}>
            <Typography variant="h6" gutterBottom>
              Shipping address
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  value={fullName}
                  onInput={(e) => setFullName(e.target.value)}
                  onKeyPress={(event) => InputValidatorHelper.textOnly(event)}
                  inputProps={{ maxLength: 20 }}
                  id="fullname"
                  name="fullname"
                  label="Full name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyPress={(event) => InputValidatorHelper.numberOnly(event)}
                  inputProps={{ maxLength: 12 }}
                  id="phone"
                  name="phone"
                  label="phone"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  value={addressName}
                  onInput={(e) => setAddressName(e.target.value)}
                  inputProps={{ maxLength: 40 }}
                  id="address"
                  name="address"
                  label="Address"
                  fullWidth
                  autoComplete="shipping address-line"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  value={city}
                  onInput={(e) => setCity(e.target.value)}
                  onKeyPress={(event) => InputValidatorHelper.textOnly(event)}
                  inputProps={{ maxLength: 20 }}
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  value={province}
                  inputProps={{ maxLength: 20 }}
                  onInput={(e) => setProvince(e.target.value)}
                  onKeyPress={(event) => InputValidatorHelper.textOnly(event)}
                  id="Province"
                  name="Province"
                  label="Province"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  value={zip}
                  inputProps={{ maxLength: 7 }}
                  onInput={(e) => setZip(e.target.value)}
                  onKeyPress={(event) => InputValidatorHelper.numberOnly(event)}
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  value={country}
                  inputProps={{ maxLength: 20 }}
                  onInput={(e) => setCountry(e.target.value)}
                  onKeyPress={(event) => InputValidatorHelper.textOnly(event)}
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  autoComplete="shipping country"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      name="saveAddress"
                      value={checkedBox}
                      onChange={(e) => {setCheckedBox(true)}}
                    />
                  }
                  label="Use this address for payment details"
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                onClick={handleSave}
                variant="contained"
                sx={{ width: 80 }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Container>
      </Modal>
    </Box>
  );
}
