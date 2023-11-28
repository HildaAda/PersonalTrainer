import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CustomerDialog from './CustomerDialog';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

export default function EditCustomer({ fetchCustomers, data}) {
    const [open, setOpen] = useState(false);
    
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const handleOpen = () => {
        setOpen(true);
        setCustomer({
            firstname: data.firstname,
            lastname: data.lastname,
            streetaddress: data.streetaddress,
            postcode: data.postcode,
            city: data.city,
            email: data.email,
            phone: data.phone
        })
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveCustomer = () => {
        fetch(data.links[0].href, {
            method: 'PUT',
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
        <IconButton size='small' onClick={handleOpen}>
            <EditIcon color="primary"/>
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Customer</DialogTitle>
            <CustomerDialog customer={customer} handleChange={handleChange}/>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={saveCustomer}>Save</Button>
            </DialogActions>
        </Dialog>
    </div>
    );
};