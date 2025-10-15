import type { IpApiResponse, IpLookupSuccess } from "./types";

export function IsLookupSuccess(data: IpApiResponse): data is IpLookupSuccess {
  return data.status === "success";
}
