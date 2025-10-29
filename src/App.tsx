import { Map } from "./components/map";
import { ToastContextProvider } from "./contexts/toast";
import { IPLookupContextProvider } from "./contexts/ipLookup";
import { LookupList } from "./components/lookupList";
import { Queryer } from "./components/queryer";

function App() {
	return (
		<IPLookupContextProvider>
			<ToastContextProvider>
				<div className="flex w-screen h-screen flex-col 2xl:px-32 py-4 gap-4">
					<div className="flex justify-center items-center w-full box h-12 min-h-0">
						<h2>title</h2>
					</div>
					<div className="flex flex-col-reverse md:flex-row w-full h-full gap-4 min-h-0">
						<div className="flex flex-col gap-4 w-full">
							{/* This is the input box component but just empty div for now */}
							<Queryer />
							<LookupList />
						</div>
						<Map />
					</div>
				</div>
			</ToastContextProvider>
		</IPLookupContextProvider>
	);
}

export default App;
