import { Map } from "./components/map";
import { ToastContextProvider } from "./contexts/toast";
import { IPLookupContextProvider } from "./contexts/ipLookup";
import { LookupList } from "./components/lookupList";
import { Queryer } from "./components/queryer";
import { Navbar } from "./components/navbar";

function App() {
	return (
		<IPLookupContextProvider>
			<ToastContextProvider>
				<div className="flex w-screen h-screen flex-col 2xl:px-32 py-4 gap-4">
					<Navbar />
					<div className="flex flex-col-reverse md:flex-row w-full h-full gap-4 min-h-0">
						<div className="flex flex-col gap-4 w-full">
							<div className="flex w-full gap-4">
								<Queryer />
							</div>
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
