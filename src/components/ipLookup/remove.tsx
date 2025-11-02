import { useLookups } from "@/hooks/lookups";
import { Trash2 } from "lucide-react";

interface RemoveButtonProps {
	parentIp: string;
}

export function RemoveButton({ parentIp }: RemoveButtonProps) {
	const { removeLookup } = useLookups();

	const handleClick = () => {
		removeLookup(parentIp);
	};

	return (
		<button onClick={handleClick} className="btn btn-square btn-soft btn-error p-2">
			<Trash2 className="w-full h-full" />
		</button>
	);
}
