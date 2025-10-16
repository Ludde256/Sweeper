import { useState } from "react";

import { type IpApiResponse, Lookup } from "@/services/ipApi";

interface dumpObjectProps {
	object: any;
}

function DumpObject({ object }: dumpObjectProps) {
	if (object === undefined) {
		return null;
	}

	const keyVals = Object.entries(object);

	return (
		<div className="py-2">
			{keyVals.map((pair, index) => (
				<div key={index} className="gap-2 flex">
					<p>{pair[0]}:</p>
					<p>{(pair[1] as any).toString()}</p>
				</div>
			))}
		</div>
	);
}

function App() {
	const [ip, setIp] = useState("");
	const [loading, setLoading] = useState(false);
	const [lookup, setLookup] = useState<IpApiResponse | undefined>(undefined);

	const handleSubmit = async () => {
		setLoading(true);
		const lookup = await Lookup(ip);
		console.log(lookup);
		setLookup(lookup);
		setIp("");
		setLoading(false);
	};

	return (
		<div className="flex items-center justify-center h-screen w-screen">
			<div className="flex flex-col gap-2">
				<input type="text" className="input" onChange={(e) => setIp(e.target.value)} value={ip} />
				{loading && <p className="font-bold">Loading...</p>}
				<button onClick={handleSubmit} className="btn">
					Submit
				</button>
				<DumpObject object={lookup} />
			</div>
		</div>
	);
}

export default App;
