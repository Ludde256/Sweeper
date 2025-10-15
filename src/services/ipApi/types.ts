export type IpLookupData = {
  continent: string;
  continentCode: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  district: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  offset: number;
  isp: string;
  org: string;
  as: string;
  asname: string;
  reverse: string;
  mobile: boolean;
  proxy: boolean;
  hosting: boolean;
  query: string;
}

export type IpLookupSuccess = {
  status: "success";
} & IpLookupData;

export type IpLookupFail = {
  status: "fail";
  message: "private range" | "reserved range" | "invalid query";
} & Pick<IpLookupData, "query">;

export type IpApiResponse = IpLookupSuccess | IpLookupFail;