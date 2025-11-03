import { Map } from "./components/map";
import { ToastProvider } from "./contexts/toast";
import { SessionProvider } from "./contexts/session";
import { LookupList } from "./components/lookupList";
import { Queryer } from "./components/queryer";
import { Navbar } from "./components/navbar";
import { DrawerContextProvider } from "./contexts/drawer";
import { SessionDrawer } from "./components/sessions";
import { ThemeProvider } from "./contexts/theme";

function App() {
	return (
		<ThemeProvider>
			<ToastProvider>
				<SessionProvider>
					<DrawerContextProvider drawerContent={<SessionDrawer />}>
						<div className="flex w-full min-h-screen h-full lg:h-screen flex-col 2xl:px-32 py-4 gap-4">
							<Navbar />
							<div className="flex flex-col lg:flex-row-reverse w-full h-full gap-4 min-h-0">
								<Map />
								<div className="flex flex-col gap-4 w-full h-full flex-1">
									<Queryer />
									<LookupList />
								</div>
							</div>
						</div>
					</DrawerContextProvider>
				</SessionProvider>
			</ToastProvider>
		</ThemeProvider>
	);
}

export default App;
