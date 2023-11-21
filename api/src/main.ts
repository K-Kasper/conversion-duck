import cors from "cors";
import { CronJob } from "cron";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

type Currency = {
	[key: string]: string;
};

type Latest = {
	disclaimer: string;
	license: string;
	timestamp: number;
	base: string;
	rates: {
		[key: string]: number;
	};
};

type ErrorResponse = {
	error: boolean;
	status: number;
	message: string;
	description: string;
};

type Data = { [key: string]: { name: string; rate: number } };

type KeyValueObject = { [key: string]: string | number | { [key: string]: number } | boolean };

const isObject = (possibleObject: unknown): possibleObject is KeyValueObject => {
	return typeof possibleObject === "object" && possibleObject ? true : false;
};

const isValidCurrencies = (currencies: unknown): currencies is Currency => {
	return (
		isObject(currencies) &&
		Object.entries(currencies).every(
			([symbol, description]) => typeof symbol === "string" && typeof description === "string"
		)
	);
};

const isValidLatest = (latest: unknown): latest is Latest => {
	return (
		isObject(latest) &&
		Object.prototype.hasOwnProperty.call(latest, "rates") &&
		Object.entries(latest.rates).every(([symbol, rate]) => typeof symbol === "string" && typeof rate === "number")
	);
};

async function updateData() {
	try {
		const d = new Date();
		console.log("Updating at:", d);
		const newData: Data = {};
		const rateResponse = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${process.env.API_KEY}`);
		const latest: Latest | ErrorResponse = await rateResponse.json();
		const currenciesResponse = await fetch("https://openexchangerates.org/api/currencies.json");
		const currenciesData: Currency | ErrorResponse = await currenciesResponse.json();
		if (isValidLatest(latest) && isValidCurrencies(currenciesData)) {
			Object.entries(currenciesData).forEach(([symbol, description]) => {
				const name = `${description} (${symbol})`;
				const rate = latest["rates"][symbol];
				if (rate) newData[symbol] = { rate, name };
			});
			data = { ...newData };
			updatedAt = `${d}`;
			return true;
		}
		console.error(
			`Rate update failed: Currencies was ${JSON.stringify(currenciesData)} | Latest was ${JSON.stringify(latest)}}`
		);
		return false;
	} catch (err) {
		console.error(`Update error: ${err}`);
		return false;
	}
}

dotenv.config();

export const app = express();
app.use(helmet());
app.use(morgan("combined"));
app.use(cors());

let data = {};
let updatedAt = "";

const exchangeRatesUpdateJob = new CronJob(
	"0 * * * *",
	async () => {
		const updateStatus = await updateData();
		updateStatus ? console.log("Cron update success") : console.error("Cron update failed");
	},
	null,
	true
);

updateData().then((result) =>
	result ? console.log("Startup update success") : console.error("Startup update failed")
);
console.info(`System TZ next 5 update times: ${exchangeRatesUpdateJob.nextDates(5)}`);

app.get("/", (_req, res) => {
	return res.send({ data, updatedAt });
});

app.get("/update", async (_req, res) => {
	(await updateData()) ? (res.statusCode = 200) : (res.statusCode = 300);
	return res.send();
});

app.listen(process.env.PORT, () => {
	console.log(`API listening on port ${process.env.PORT}`);
});
