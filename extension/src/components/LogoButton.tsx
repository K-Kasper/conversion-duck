import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";

export default function LogoButton() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<IconButton onClick={() => setIsOpen(true)} aria-label="conversion duck logo">
				<img src="./96logo.png" width="32px" height="32px" alt="duck logo" />
			</IconButton>
			<Modal
				open={isOpen}
				onClose={() => setIsOpen(false)}
				aria-labelledby="conversion duck info"
				aria-describedby="information about the extension"
			>
				<Box
					sx={{
						position: "absolute" as const,
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 300,
						bgcolor: "background.paper",
						boxShadow: 24,
						p: 4,
					}}
				>
					<Stack spacing={2}>
						<Stack>
							<Typography variant="h6" component="h1">
								Conversion Duck
							</Typography>
							<IconButton
								aria-label="close"
								onClick={() => setIsOpen(false)}
								sx={{
									position: "absolute",
									right: 8,
									top: 8,
									color: (theme) => theme.palette.grey[500],
								}}
							>
								<CloseIcon />
							</IconButton>
						</Stack>
						<Typography variant="body1">The extension uses dark mode according to your device settings. </Typography>
						<Typography variant="body1">Font size scales depending on your browser&apos;s font size.</Typography>
						<Typography variant="body1">
							Exchange rates used are updated hourly via internet connection. If offline or experiencing outages, older
							information may be used.
						</Typography>
						<Typography variant="body1">Conversion Duck will never collect or sell your data.</Typography>
					</Stack>
				</Box>
			</Modal>
		</>
	);
}
