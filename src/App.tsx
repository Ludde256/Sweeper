import { Map } from "./components/map";
import { ToastProvider } from "./contexts/toast";
import { SessionProvider } from "./contexts/session";
import { LookupList } from "./components/lookupList";
import { Queryer } from "./components/queryer";
import { Navbar } from "./components/navbar";
import { DrawerContextProvider } from "./contexts/drawer";
import { SessionDrawer } from "./components/sessions";

function App() {
	return (
		<ToastProvider>
			<SessionProvider>
				<DrawerContextProvider drawerContent={<SessionDrawer />}>
					<div className="flex w-screen h-screen flex-col 2xl:px-32 py-4 gap-4">
						<Navbar />
						<div className="flex flex-col md:flex-row-reverse w-full h-full gap-4 min-h-0">
							<div className="md:flex-1">
								<Map />
							</div>
							<div className="flex flex-col gap-4 w-full min-h-0 flex-1">
								<div className="flex w-full gap-4">
									<Queryer />
								</div>
								<LookupList />
							</div>
						</div>
					</div>
				</DrawerContextProvider>
			</SessionProvider>
		</ToastProvider>
	);
}

export default App;
