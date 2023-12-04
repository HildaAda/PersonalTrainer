import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TrainingDialog from "./TrainingDialog";
import dayjs from 'dayjs';

export default function AddTraining ({ data, fetchCustomers }) {
    
    const [open, setOpen] = useState(false);

    const emptyTraining = {
        date: '',
        duration: '',
        activity: '',
        customer: data.links.find(link => link.rel  === "self").href
    };

    const [training, setTraining] = useState (emptyTraining);

    const handleOpen = () => {
        setOpen(true);
        
    };

    const resetForm = () => {
        setTraining(emptyTraining);
    };

    const handleClose = () => {
        resetForm();
        setOpen(false);
    };

    const saveTraining = () => {
        const formattedDate = dayjs(training.date).toISOString();
        const updatedTraining = {...training, date: formattedDate};
        
        fetch(import.meta.env.VITE_API_URL + '/api/trainings', {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(updatedTraining)
        })
        .then(response => {
            if(!response.ok)
            throw new Error("Error when saving training: " + response.statusText);
        })
        .catch(err => console.error(err));
        handleClose();
    };

    const handleChange = (e) => {
        setTraining({
            ...training, [e.target.name]: e.target.value
        })
    };

    const handleDateChange = (date) => {
        setTraining({
          ...training,
          date: date,
        });
      };

    return (
    <div>
        <Button size='small' onClick={handleOpen}>Add<br />Training</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Training</DialogTitle>
            <TrainingDialog training={training} handleChange={handleChange} handleDateChange={handleDateChange}/>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={saveTraining}>Save</Button>
            </DialogActions>
        </Dialog>
    </div>
    );
};