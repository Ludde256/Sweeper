import { ToastContextProvider } from "./contexts/toast";
import { Map } from "./components/map";

function App() {
	return (
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
	);
}

export default App;
