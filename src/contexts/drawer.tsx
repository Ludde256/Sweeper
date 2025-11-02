import { createContext, useCallback, useContext, useRef, type ReactNode } from "react";

interface DrawerContextValues {
	openDrawer: () => void;
	closeDrawer: () => void;
	toggleDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextValues | undefined>(undefined);

interface DrawerContextProviderProps {
	children: ReactNode;
	drawerContent: ReactNode;
}

export function DrawerContextProvider({ children, drawerContent }: DrawerContextProviderProps) {
	const checkboxRef = useRef<HTMLInputElement>(null);

	const drawerId = "app-drawer";

	const openDrawer = useCallback(() => {
		if (checkboxRef.current) checkboxRef.current.checked = true;
	}, [checkboxRef]);

	const closeDrawer = useCallback(() => {
		if (checkboxRef.current) checkboxRef.current.checked = false;
	}, [checkboxRef]);

	const toggleDrawer = useCallback(() => {
		if (checkboxRef.current) checkboxRef.current.checked = !checkboxRef.current.checked;
	}, [checkboxRef]);

	return (
		<DrawerContext.Provider value={{ openDrawer, closeDrawer, toggleDrawer }}>
			<div className="drawer">
				<input ref={checkboxRef} id={drawerId} type="checkbox" className="drawer-toggle" />
				<div className="drawer-content">{children}</div>
				<div className="drawer-side">
					<label htmlFor={drawerId} className="drawer-overlay"></label>
					{drawerContent}
				</div>
			</div>
		</DrawerContext.Provider>
	);
}

export function useDrawer() {
	const context = useContext(DrawerContext);
	if (!context) {
		throw new Error("useDrawer must be used within DrawerContextProvider");
	}
	return context;
}
