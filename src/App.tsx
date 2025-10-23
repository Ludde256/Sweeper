import { Map } from "./components/map";
import { ToastContextProvider } from "./contexts/toast";
import { IPLookupContextProvider } from "./contexts/ipLookup";

function App() {
	return (
		<IPLookupContextProvider>
			<ToastContextProvider>
				<div className="flex flex-col w-screen h-screen">
					<div className="flex w-full">
						<h2>title</h2>
					</div>
					<div className="flex w-full h-full p-4 gap-4">
						<Map />
						<Map />
					</div>
				</div>
			</ToastContextProvider>
		</IPLookupContextProvider>
	);
}

export default App;
