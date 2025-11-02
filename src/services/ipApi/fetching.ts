import type { IpLookupFail, IpLookupSuccess, IpApiResponse } from "./types";

const IP_API_URL = "http://ip-api.com/json/";
const IP_API_FIELDS = 57933823; // All fields except currency and district

// Construct the full URL with the given IP
function constructURL(ip: string): string {
	return `${IP_API_URL}${ip}?fields=${IP_API_FIELDS}`;
}

// Fetch data from the IP API and return the parsed response
export async function FetchIpLookup(ip: string): Promise<IpApiResponse> {
	const url = constructURL(ip);

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Error fetching IP data: ${response.statusText}`);
	}

	const data = (await response.json()) as { status: string };
	// Ensures that the response body always has a 'status' field or else things are really wrong
	if (!("status" in data)) {
		throw new Error("Invalid response from IP API");
	}

	if (data.status === "fail") {
		return data as IpLookupFail;
	}

	return data as IpLookupSuccess;
}
