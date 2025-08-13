import type { TransportName } from "./types";

const emailAccounts: Array<{
  name: string;
  address: string;
  transportName: TransportName;
}> = [
  {
    name: "E.K. Murray - Contact",
    address: "contact@eileenkatherinemurray.com",
    transportName: "contact",
  },
  {
    name: "E.K. Murray - Finance",
    address: "finance@eileenkatherinemurray.com",
    transportName: "finance",
  },
];

export default emailAccounts;
