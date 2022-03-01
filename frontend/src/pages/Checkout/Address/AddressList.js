import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// MUI
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
// COMPONENT
import InputNewAddress from "./InputNewAddress";
// SERVICE
import AuthService from "../../../services/auth.service";
import AddresService from "../../../services/address.service";


export default function AddressList() {
  const userEmail = AuthService.getCurrentUser();
  const [addressList, setAddressList] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(
    localStorage.getItem(userEmail+'Address')
      ? JSON.parse(localStorage.getItem(userEmail+'Address'))['default']
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

  // select default address to used for delivery
  function selectAddress(address_name) {
    var item = {
      'default': address_name
    }
    localStorage.setItem(userEmail+'Address', JSON.stringify(item))
    setDefaultAddress(address_name)
  }

  return (
    <Box>
      <Box>
        {addressList.map(function (item, i) {
          return (
            <Link to="#" key={i} onClick={(e) => {selectAddress(item.address_name)}}> 
              <Box
                sx={{
                  marginBottom: 1.5,
                  boxShadow: 1,
                  padding: 2,
                  color: 'black',
                  border: 3,
                  borderColor: item.address_name === defaultAddress ? 'green' : 'white'
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
                    {item.address_name},{item.state},{item.province},{item.city}
                    ,{item.zip}
                  </Typography>
                </Box>
              </Box>
            </Link>
          );
        })}
      </Box>
      <InputNewAddress setDefaultAddress={setDefaultAddress} />
    </Box>
  );
}
