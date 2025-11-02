import { useIPLookupContext } from "@/contexts/ipLookup";
import { useToastContext } from "@/contexts/toast";
import { useState } from "react";
import { IsLookupSuccess, Lookup } from "@/services/ipApi";

export function Queryer() {
	const { addLookup } = useIPLookupContext();
	const { showToast } = useToastContext();

	const [ipInput, setIpInput] = useState("");

	const handleQuery = async () => {
		const response = await Lookup(ipInput);

		if (IsLookupSuccess(response)) {
			addLookup(response);
		} else {
			console.error(response);
			showToast("error", `Lookup Failed. See console.`);
		}

		// Reset IpInput state
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
