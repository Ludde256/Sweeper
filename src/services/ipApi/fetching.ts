import type { IpLookupFail, IpLookupSuccess, IpApiResponse } from "./types";

const IP_API_URL = "http://ip-api.com/json/";
const IP_API_FIELDS = 58458111; // All fields except currency

function constructURL(ip: string): string {
  return `${IP_API_URL}${ip}?fields=${IP_API_FIELDS}`;
}

export async function Lookup(ip: string): Promise<IpApiResponse> {
  const url = constructURL(ip);

  const response = await fetch(url);
  const data = await response.json() as { status: string }

  if (data.status === "fail") {
    return data as IpLookupFail;
  }

  return data as IpLookupSuccess;
} 