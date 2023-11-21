import convert, { Length } from "convert";

import { DataObject } from "../pages/GenericPage";

type LengthSelection =
	| "Kilometre (km)"
	| "Metre (m)"
	| "Centimetre (cm)"
	| "Millimetre (mm)"
	| "Micrometre (μm)"
	| "Nanometre (nm)"
	| "Mile (mi)"
	| "Nautical mile (nmi)"
	| "Yard (yd)"
	| "Foot (ft)"
	| "Inch (in)";

const lengthUnits: { [Unit in LengthSelection]: Length } = {
	"Kilometre (km)": "km",
	"Metre (m)": "m",
	"Centimetre (cm)": "cm",
	"Millimetre (mm)": "mm",
	"Micrometre (μm)": "μm",
	"Nanometre (nm)": "nm",
	"Mile (mi)": "mi",
	"Nautical mile (nmi)": "nmi",
	"Yard (yd)": "yd",
	"Foot (ft)": "ft",
	"Inch (in)": "in",
};

const lengthUnitsArr = Object.values(lengthUnits);

const isLength = (unit: string): unit is Length => lengthUnitsArr.includes(unit as Length);

export const length: DataObject = {
	name: "Length",
	units: lengthUnits,
	calculate: ([fromUnit, toUnit], amount) => {
		if (isLength(fromUnit) && isLength(toUnit)) return convert(amount, fromUnit).to(toUnit).toString();
		return "0";
	},
};
