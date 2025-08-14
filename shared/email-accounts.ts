import type { TransportName } from "./types";

const emailAccounts: Array<{
  name: string;
  address: string;
  transportName: TransportName;
}> = [
  {
    name: "Eileen Katherine Murray CFA",
    address: "contact@eileenkatherinemurray.com",
    transportName: "contact",
  },
  {
    name: "Finance & Records | Eileen K. Murray Advisory",
    address: "finance@eileenkatherinemurray.com",
    transportName: "finance",
  },
];

export default emailAccounts;
