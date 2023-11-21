import { Length, Mass, Temperature } from "convert";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import numbro from "numbro";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import StyleIcon from "@mui/icons-material/Style";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Autocomplete, Box, Button, IconButton, InputAdornment, Stack, TextField, Tooltip } from "@mui/material";

import LogoButton from "../components/LogoButton";

dayjs.extend(relativeTime);

export type Calculate = (units: Temperature[] | Mass[] | Length[] | string[], amount: number) => string;

export interface DataObject {
	name: string;
	units: { [key: string]: string };
	calculate: Calculate;
	updatedAt?: Date;
}

const formatResult = (isFormatted: boolean, result: string) => {
	if (isFormatted)
		return numbro(result).format({
			thousandSeparated: true,
			trimMantissa: true,
			mantissa: 2,
		});
	return result;
};

export default function GenericPage({ dataObject }: { dataObject: DataObject }) {
	const [amount, setAmount] = useState(1);
	const [result, setResult] = useState("0");
	const [fromUnit, setFromUnit] = useState({ name: "", symbol: "" });
	const [toUnit, setToUnit] = useState({ name: "", symbol: "" });
	const [isFormatted, setIsFormatted] = useState(true);

	const options = Object.entries(dataObject.units).map(([name, symbol]) => ({
		name,
		symbol,
	}));

	useEffect(() => {
		!!amount && isFinite(amount)
			? setResult(dataObject.calculate([fromUnit.symbol, toUnit.symbol], amount))
			: setResult("0");
	}, [dataObject.calculate, fromUnit, toUnit, amount]);

	return (
		<Stack spacing={2}>
			<TextField
				label="Amount"
				onChange={(e) => {
					const newValue = e.target.value.replace(/,/g, ".");
					let numString: string[] | RegExpMatchArray | null = newValue.match(/[.]|\d/g);
					if (numString?.length && numString.indexOf(".") !== numString.lastIndexOf(".")) {
						numString = numString.filter((item) => item !== ".");
					}
					if (numString?.length) {
						const symbol = newValue.includes("+") ? "+" : newValue.includes("-") ? "-" : "";
						setAmount(Number(symbol + numString.join("")));
					} else {
						setAmount(0);
					}
				}}
				value={numbro(amount).format()}
				InputLabelProps={{
					shrink: true,
				}}
				variant="outlined"
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<Box position="relative" right={-14}>
								<Stack spacing={-2}>
									<Tooltip title="Increase by one" placement="top" disableInteractive>
										<IconButton aria-label="Increase by one" onClick={() => setAmount((prevAmount) => prevAmount + 1)}>
											<ArrowDropUpIcon fontSize="inherit" />
										</IconButton>
									</Tooltip>
									<Tooltip title="Decrease by one" placement="bottom" disableInteractive>
										<IconButton aria-label="Decrease by one" onClick={() => setAmount((prevAmount) => prevAmount - 1)}>
											<ArrowDropDownIcon fontSize="inherit" />
										</IconButton>
									</Tooltip>
								</Stack>
							</Box>
						</InputAdornment>
					),
				}}
			/>
			<Autocomplete
				disablePortal
				disableClearable
				autoComplete
				autoHighlight
				autoSelect
				options={options}
				getOptionLabel={(option) => option.name}
				value={fromUnit}
				renderInput={(params) => <TextField {...params} label={dataObject.name} />}
				onChange={(_, newValue) => setFromUnit(newValue)}
			/>
			<Button
				fullWidth
				id="reverse"
				color="secondary"
				variant="contained"
				endIcon={<SwapVertIcon />}
				onClick={() => {
					const temp = fromUnit;
					setFromUnit(toUnit);
					setToUnit(temp);
				}}
			>
				Reverse
			</Button>
			<Autocomplete
				disablePortal
				disableClearable
				autoComplete
				autoHighlight
				autoSelect
				options={options}
				getOptionLabel={(option) => option.name}
				value={toUnit}
				renderInput={(params) => <TextField {...params} label={dataObject.name} />}
				onChange={(_, newValue) => setToUnit(newValue)}
			/>
			<Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
				<TextField
					id="result"
					label="Result"
					value={formatResult(isFormatted, result)}
					InputProps={{
						readOnly: true,
						sx: { fontSize: "1.5rem" },
						startAdornment: (
							<Tooltip title="Format" placement="top" disableInteractive>
								<InputAdornment position="start">
									<IconButton
										aria-label="format"
										color={isFormatted ? "success" : "warning"}
										onClick={() => setIsFormatted((prevIsFormatted) => !prevIsFormatted)}
									>
										<StyleIcon />
									</IconButton>
								</InputAdornment>
							</Tooltip>
						),
						endAdornment: (
							<Stack direction="row" spacing={0}>
								{dataObject.updatedAt && (
									<Tooltip
										title={`Rates last updated ${dayjs(dataObject.updatedAt).fromNow()}`}
										placement="top"
										disableInteractive
									>
										<InputAdornment position="end">
											<IconButton aria-label="last updated" color="secondary">
												<AccessTimeIcon />
											</IconButton>
										</InputAdornment>
									</Tooltip>
								)}
								<Tooltip title="Copy to clipboard" placement="top" disableInteractive>
									<InputAdornment position="end">
										<CopyToClipboard text={formatResult(isFormatted, result)}>
											<IconButton aria-label="copy to clipboard" color="secondary">
												<CopyAllIcon />
											</IconButton>
										</CopyToClipboard>
									</InputAdornment>
								</Tooltip>
							</Stack>
						),
					}}
					variant="standard"
					sx={{ width: "100%" }}
				/>
				<LogoButton />
			</Stack>
		</Stack>
	);
}
