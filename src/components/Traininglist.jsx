import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import dayjs from 'dayjs';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";


function Taraininglist () {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const [columnDefs] = useState([
        {field: 'date', sortable: true, filter: true, valueFormatter: params => dayjs(params.value).format("DD.MM.YYYY")},
        {field: 'duration', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},
        {headerName: "Customer", field: "customer.firstname", valueGetter: (params) => `${params.data.customer.firstname} ${params.data.customer.lastname}`,sortable: true, filter: true}
    ])

    const fetchTrainings = () => {
        fetch(import.meta.env.VITE_API_URL + '/gettrainings')
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error("Error in fetch:" + response.statusText)
        })
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    return(
    <>
        <div className="ag-theme-material" style={{width: '80%', height: 400, textAlign: 'left'}}>
            <h3>Trainings</h3>
            <AgGridReact 
            rowData={trainings}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={5}
        />
     </div>
     </>
    )
}

export default Taraininglist;