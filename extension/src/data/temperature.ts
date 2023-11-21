import convert, { Temperature } from "convert";

import { DataObject } from "../pages/GenericPage";

type TemperatureSelection = "Celsius (°C)" | "Fahrenheit (°F)" | "Kelvin (K)" | "Rankine (°R)";

const temperatureUnits: { [Unit in TemperatureSelection]: Temperature } = {
	"Celsius (°C)": "C",
	"Fahrenheit (°F)": "F",
	"Kelvin (K)": "K",
	"Rankine (°R)": "R",
};

const temperatureUnitsArr = Object.values(temperatureUnits);

const isTemperature = (unit: string): unit is Temperature => temperatureUnitsArr.includes(unit as Temperature);

export const temperature: DataObject = {
	name: "Temperature",
	units: temperatureUnits,
	calculate: ([fromUnit, toUnit], amount) => {
		if (isTemperature(fromUnit) && isTemperature(toUnit)) return convert(amount, fromUnit).to(toUnit).toString();
		return "0";
	},
};
