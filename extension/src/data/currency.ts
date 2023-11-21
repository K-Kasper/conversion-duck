import { CurrencyData, RateData } from "../App";
import { DataObject } from "../pages/GenericPage";

export const currency = (
	currencies: CurrencyData,
	rates: RateData | undefined,
	updatedAt: Date | undefined
): DataObject => {
	return {
		name: "Currency",
		units: currencies,
		calculate: ([fromUnit, toUnit], amount) => {
			if (typeof rates !== "undefined" && rates[fromUnit] && rates[toUnit]) {
				const conversionRate = Number(rates[toUnit]) / Number(rates[fromUnit]);
				return String(amount * conversionRate);
			}
			return "0";
		},
		updatedAt,
	};
};
