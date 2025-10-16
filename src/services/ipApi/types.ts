// The data we do care about
export type IpLookupData = {
	continent: string;
	continentCode: string;
	country: string;
	countryCode: string;
	region: string;
	regionName: string;
	city: string;
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
};

// Successful response always has all the data
export type IpLookupSuccess = {
	status: "success";
} & IpLookupData;

// Failed response only has a subset of the data
export type IpLookupFail = {
	status: "fail";
	message: "private range" | "reserved range" | "invalid query";
} & Pick<IpLookupData, "query">;

// Union type of both possible responses
export type IpApiResponse = IpLookupSuccess | IpLookupFail;
