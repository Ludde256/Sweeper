import { useState } from "react";
import { useLookups } from "@/hooks/useLookups";

export function Queryer() {
	const { addLookup } = useLookups();
	const [ipInput, setIpInput] = useState("");
	const [loading, setLoading] = useState(false);

	const handleQuery = async () => {
		setLoading(true);
		await addLookup(ipInput);
		setIpInput("");
		setLoading(false);
	};

	return (
		<div className="flex w-full py-4 px-6 justify-center items-center box gap-2 h-32">
			<div className="flex w-full items-start justify-center flex-col gap-2">
				<label className="input input-lg validator w-full">
					<input
						type="text"
						pattern="^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
						placeholder="Lookup on IP"
						value={ipInput}
						onChange={(e) => setIpInput(e.target.value)}
					/>
				</label>
				<p className="validator-hint">IP formatting wrong...</p>
			</div>
			<button className={`btn h-full btn-lg ${loading ? "btn-disabled" : "btn-primary"}`} onClick={handleQuery}>
				{loading ? "Fetching..." : "Lookup"}
			</button>
		</div>
	);
}
