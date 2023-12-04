import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CustomerDialog from './CustomerDialog';

export default function AddCustomer({ fetchCustomers }) {
    
    const [open, setOpen] = useState(false);

    const emptyCustomer = {
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    }
    
    const [customer, setCustomer] = useState(emptyCustomer);

    const handleOpen = () => {
        setOpen(true);
    };

    const resetForm = () => {
        setCustomer(emptyCustomer);
    };

    const handleClose = () => {
        resetForm(); 
        setOpen(false);
    };

    const saveCustomer = () => {
        fetch(import.meta.env.VITE_API_URL + '/api/customers', {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if(!response.ok)
            throw new Error("Error when saving customer: " + response.statusText);

            fetchCustomers();
        })
        .catch(err => console.error(err));
        handleClose();
    };

    const handleChange = (e) => {
        setCustomer({...customer, [e.target.name]: e.target.value});
    };

    return (
        <div>
            <Button size='small' onClick={handleOpen}>
                Add Customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Customer</DialogTitle>
                <CustomerDialog customer={customer} handleChange={handleChange}/>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};