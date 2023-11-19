import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Customerlist () {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const [columnDefs] = useState([
        {field: 'firstname', sortable: true, filter: true, width: 125},
        {field: 'lastname', sortable: true, filter: true, width: 150},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true, width: 125},
        {field: 'city', sortable: true, filter: true, width: 145},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true, width: 130}
    ])

    const fetchCustomers = () => {
        fetch(import.meta.env.VITE_API_URL + '/api/customers')
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error("Error in fetch:" + response.statusText)
        })
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    return(
    <>
    <div className="ag-theme-material" style={{width: '80%', height: 400, textAlign: 'left'}}>
        <h3>Customers</h3>
        <AgGridReact 
        rowData={customers}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={5}
        />
     </div>
     </>
    )
}

export default Customerlist;