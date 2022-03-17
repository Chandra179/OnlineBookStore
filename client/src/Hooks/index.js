import { useContext } from "react";
import { AccountContext } from "../Context/account-context";

export const useAccount = () => {
  const accounttx = useContext(AccountContext);
  return {
    ...accounttx,
  };
};
