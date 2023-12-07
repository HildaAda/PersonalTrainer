import { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { red } from "@mui/material/colors";
import Button from '@mui/material/Button';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";

export default function Customerlist () {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const [columnDefs] = useState([
        {headerName: "First name", field: 'firstname', sortable: true, filter: true, width: 130},
        {headerName: "Last name", field: 'lastname', sortable: true, filter: true, width: 150},
        {headerName: "Address", field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true, width: 125},
        {field: 'city', sortable: true, filter: true, width: 145},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true, width: 130},
        {
            cellRenderer: params => <EditCustomer fetchCustomers={fetchCustomers} data={params.data}/>,
            width: 60
        },
        {
            cellRenderer: params => <AddTraining fetchCustomers={fetchCustomers} data={params.data} />,
            width: 100
        },
        {
            cellRenderer: params => <IconButton size="small" onClick={() => deleteCustomer(params.data.links[0].href)}><DeleteIcon sx={{ color: red[500] }}/></IconButton>,
            width: 60
        }
    ]);

    const fetchCustomers = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error("Error in fetch:" + response.statusText)
        })
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    };

    const deleteCustomer = (url) => {
        if(window.confirm("Are you sure you want to delete this customer?")) {
            fetch(url , {method: 'DELETE'})
            .then(response => {
                if (response.ok)
                fetchCustomers();
                else
                throw new Error("Error in DELETE: " + response.statusText);
            })
            .catch(err => console.error(err));
        }
    };

    const gridRef = useRef(null);

    const exportToCSV = () => {
        if (gridRef.current) {
        gridRef.current.api.exportDataAsCsv();
        }
    };

    return(
    <>
    <div className="ag-theme-material" style={{width: '95%', height: 400, textAlign: 'left'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', outline: 'none' }}>
            <h3>Customers</h3>
            <div style={{display: 'flex', textAlign: 'left', padding: '10px'}}>
            <AddCustomer fetchCustomers={fetchCustomers}/> 
            <Button size="small" onClick={exportToCSV} style={{ marginLeft: '20px' }}>
              Export to CSV
            </Button>
            </div>
        </div>
        <AgGridReact
        ref={gridRef} 
        rowData={customers}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={5}
        />
     </div>
     </>
    );
};