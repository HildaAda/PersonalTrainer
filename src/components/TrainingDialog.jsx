import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function TrainingDialog({training, handleChange, handleDateChange}){

    return(
        <DialogContent style={{ paddingTop: '20px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
            label="Date"
            name="date"
            format="DD-MM-YYYY HH:mm"
            fullWidth
            variant="standard"
            value={training.date}
            onChange={handleDateChange}
        />
        </LocalizationProvider>
        <TextField
            margin="dense"
            label="Duration"
            name="duration"
            fullWidth
            variant="standard"
            value={training.duration}
            onChange={handleChange}
        />
        <TextField
            margin="dense"
            label="Activity"
            name="activity"
            fullWidth
            variant="standard"
            value={training.activity}
            onChange={handleChange}
        />
    </DialogContent>
    );
};