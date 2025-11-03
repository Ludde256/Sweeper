import { useState } from "react";
import { useLookups } from "@/hooks/useLookups";

export function Queryer() {
	const { addLookup } = useLookups();
	const [ipInput, setIpInput] = useState("");

	const handleQuery = async () => {
		await addLookup(ipInput);
		setIpInput("");
	};

	return (
		<div className="flex w-full justify-center items-center box gap-2 h-32 px-10">
			<input
				type="text"
				placeholder="Lookup on IP or URL"
				value={ipInput}
				onChange={(e) => setIpInput(e.target.value)}
				className="input input-lg w-full"
			/>
			<button className="btn btn-primary btn-lg" onClick={handleQuery}>
				Query
			</button>
		</div>
	);
}
