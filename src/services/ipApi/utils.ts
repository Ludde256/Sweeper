import type { IpApiResponse, IpLookupSuccess } from "./types";

// This is a type guard function and it tells the TypeScript compiler that
// if this function returns true, then the data is of type IpLookupSuccess
// Useful in conditional checks to narrow down types.
export function IsLookupSuccess(data: IpApiResponse): data is IpLookupSuccess {
  return data.status === "success";
}
