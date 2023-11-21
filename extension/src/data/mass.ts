import convert, { Mass } from "convert";

import { DataObject } from "../pages/GenericPage";

type MassSelection =
	| "Tonne / Metric ton (t)"
	| "Long ton / Imperial ton (UK t)"
	| "Short ton / US ton (tn)"
	| "Kilogram (kg)"
	| "Gram (g)"
	| "Milligram (mg)"
	| "Microgram (mcg)"
	| "Stone (st)"
	| "Pound (lb)"
	| "Ounce (oz)";

const massUnits: { [Unit in MassSelection]: Mass } = {
	"Tonne / Metric ton (t)": "metric ton",
	"Long ton / Imperial ton (UK t)": "imperial ton",
	"Short ton / US ton (tn)": "US ton",
	"Kilogram (kg)": "kg",
	"Gram (g)": "g",
	"Milligram (mg)": "mg",
	"Microgram (mcg)": "microgram",
	"Stone (st)": "st",
	"Pound (lb)": "lb",
	"Ounce (oz)": "oz",
};

const massUnitsArr = Object.values(massUnits);

const isMass = (unit: string): unit is Mass => massUnitsArr.includes(unit as Mass);

export const mass: DataObject = {
	name: "Mass",
	units: massUnits,
	calculate: ([fromUnit, toUnit], amount) => {
		if (isMass(fromUnit) && isMass(toUnit)) return convert(amount, fromUnit).to(toUnit).toString();
		return "0";
	},
};
