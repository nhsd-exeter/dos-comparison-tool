import {
	DateTimePicker,
	LocalizationProvider,
	enUS,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export function DateTimeSelector() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} locale={enUS}>
			<DateTimePicker
				format="DD/MM/YYYY HH:mm"
				views={["day", "hours"]}
				minDate={dayjs("2020-01-01")}
				maxDate={dayjs("2030-12-31")}
			/>
		</LocalizationProvider>
	);
}
