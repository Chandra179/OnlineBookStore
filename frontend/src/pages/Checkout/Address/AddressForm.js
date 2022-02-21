import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import AuthService from "../../../services/auth.service";
import AddresService from "../../../services/address.service";
import InputNewAddress from "./InputNewAddress";

export default function AddressForm() {
  const userEmail = AuthService.getCurrentUser();
  const [addressList, setAddressList] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(
    localStorage.getItem(userEmail) !== null
      ? JSON.parse(localStorage.getItem(userEmail))
      : null
  );

  useEffect(() => {
    const token = AuthService.getToken();
    AddresService.getAddress(token).then(
      (data) => {
        setAddressList(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <Box>
      <Box>
        {addressList.map(function (item, i) {
          return (
            <Box
              key={i}
              sx={{
                marginBottom: 1.5,
                boxShadow: 1,
                padding: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    lg: 18,
                    md: 18,
                    sm: 16,
                    xs: 16,
                  },
                }}
              >
                {item.contact_name}
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    lg: 16,
                    md: 16,
                    sm: 14,
                    xs: 12,
                  },
                }}
              >
                {item.phone_number}
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{
                    fontSize: {
                      lg: 16,
                      md: 16,
                      sm: 14,
                      xs: 12,
                    },
                  }}
                >
                  {item.address_name},{item.state},{item.province},{item.city},
                  {item.zip}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
      <InputNewAddress setDefaultAddress={setDefaultAddress} />
    </Box>
  );
}
