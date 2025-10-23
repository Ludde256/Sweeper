import { Map } from "./components/map";
import { ToastContextProvider } from "./contexts/toast";
import { IPLookupContextProvider } from "./contexts/ipLookup";

function App() {
	return (
		<IPLookupContextProvider>
			<ToastContextProvider>
				<div className="flex flex-col w-screen h-screen">
					<div className="flex justify-center w-full px-4 2xl:px-32 pt-4">
						<h2>title</h2>
					</div>
					<div className="flex flex-col-reverse md:flex-row w-full h-full px-4 2xl:px-32 py-4 gap-4">
						<Map />
						<Map />
					</div>
				</div>
			</ToastContextProvider>
		</IPLookupContextProvider>
	);
}

export default App;
