import { FetchError } from "ofetch";

export default function normalizeException(err: unknown) {
  let message: string = "";

  if (typeof err === undefined || typeof err === null) message = String(err);
  else if (typeof err === "string" || typeof err === "number")
    message = err.toString();
  else if (Array.isArray(err)) message = "unknown error";
  else
    message =
      (err as any).data?.statusMessage ||
      (err as any).statusMessage ||
      (err as any).statusText ||
      (err as any).message ||
      String(err);

  return new Error(message);
}
