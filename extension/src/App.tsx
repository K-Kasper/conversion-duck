import { ReactNode, useEffect, useMemo, useState } from "react";

import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import ScaleIcon from "@mui/icons-material/Scale";
import StraightenIcon from "@mui/icons-material/Straighten";
import { AppBar, Box, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { currency } from "./data/currency";
import { length } from "./data/length";
import { mass } from "./data/mass";
import { temperature } from "./data/temperature";
import GenericPage from "./pages/GenericPage";

interface TabPanelProps {
	children?: ReactNode;
	dir?: string;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `tab-${index}`,
		"aria-controls": `tabpanel-${index}`,
	};
}

export interface CurrencyData {
	[key: string]: string;
}

export interface RateData {
	[key: string]: number;
}

interface CurrencyRateData {
	currencies: CurrencyData;
	rates: RateData;
}

interface Api {
	data: { [key: string]: { name: string; rate: number } };
	updatedAt: string;
}

export default function App() {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const [currencies, setCurrencies] = useState<CurrencyData>({ loading: "loading" });
	const [rates, setRates] = useState<RateData>();
	const [updatedAt, setUpdatedAt] = useState<Date>();
	const [tab, setTab] = useState(0);

	useEffect(() => {
		chrome.storage.local
			.get(["currencies", "rates", "updatedAt"])
			.then((staleData) => {
				if (staleData.currencies) setCurrencies(staleData.currencies);
				if (staleData.rates) setRates(staleData.rates);
				if (staleData.updatedAt) setUpdatedAt(new Date(staleData.updatedAt));
			})
			.catch((error) => console.error("Failed to load stale data:", error));

		fetch("https://api.kerajarvi.com/currencies.json")
			.then((response) => {
				if (!response.ok) console.error("Failed to connect to API server:", response.statusText);
				return response.json();
			})
			.then(({ data, updatedAt }: Api) => {
				try {
					const { currencies, rates } = Object.entries(data).reduce(
						(acc, [symbol, { rate, name }]) => {
							acc["rates"][symbol] = rate;
							acc["currencies"][name] = symbol;
							return acc;
						},
						{ currencies: {}, rates: {} } as CurrencyRateData
					);
					setCurrencies(currencies);
					setRates(rates);
					setUpdatedAt(new Date(updatedAt));
					chrome.storage.local
						.set({ currencies, rates, updatedAt })
						.catch((error) => console.error("Failed to store data:", error));
				} catch (error) {
					console.error("Failed to parse API response:", error);
				}
			})
			.catch((error) => console.error("Failed to fetch API data:", error));
	}, []);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? "dark" : "light",
				},
			}),
		[prefersDarkMode]
	);

	return (
		<ThemeProvider theme={theme}>
			<main>
				<AppBar position="static" color="secondary">
					<Tabs
						variant="fullWidth"
						indicatorColor="secondary"
						textColor="inherit"
						aria-label="tabs for units"
						value={tab}
						onChange={(_, newValue: number) => setTab(newValue)}
					>
						<Tab icon={<CurrencyExchangeIcon />} label="Currency" {...a11yProps(0)} />
						<Tab icon={<StraightenIcon />} label="Length" {...a11yProps(1)} />
						<Tab icon={<ScaleIcon />} label="Mass" {...a11yProps(2)} />
						<Tab icon={<DeviceThermostatIcon />} label="Temperature" {...a11yProps(3)} />
					</Tabs>
				</AppBar>
				<TabPanel value={tab} index={0} dir={theme.direction}>
					<GenericPage dataObject={currency(currencies, rates, updatedAt)} />
				</TabPanel>
				<TabPanel value={tab} index={1} dir={theme.direction}>
					<GenericPage dataObject={length} />
				</TabPanel>
				<TabPanel value={tab} index={2} dir={theme.direction}>
					<GenericPage dataObject={mass} />
				</TabPanel>
				<TabPanel value={tab} index={3} dir={theme.direction}>
					<GenericPage dataObject={temperature} />
				</TabPanel>
			</main>
		</ThemeProvider>
	);
}
