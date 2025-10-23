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
		<div className="flex justify-center items-center">
			<input type="text" value={ipInput} onChange={(e) => setIpInput(e.target.value)} className="input" />
			<button className="btn" onClick={handleQuery}>
				Query
			</button>
		</div>
	);
}
