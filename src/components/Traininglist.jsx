import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { red } from "@mui/material/colors";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";


function Taraininglist () {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const [columnDefs] = useState([
        {field: 'date', sortable: true, filter: true, valueFormatter: params => dayjs(params.value).format("DD.MM.YYYY HH:mm"), width: 250},
        {field: 'duration', sortable: true, filter: true, width: 250},
        {field: 'activity', sortable: true, filter: true, width: 250},
        {headerName: "Customer", field: "customer.firstname", valueGetter: (params) => `${params.data.customer.firstname} ${params.data.customer.lastname}`,sortable: true, filter: true, width: 250},
        {
          headerName: "Delete",  cellRenderer: params => <IconButton size="small" onClick={() => deleteTraining(params)}><DeleteIcon sx={{ color: red[500] }}/></IconButton>, width: 250
        }
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

    const deleteTraining = (params) => {
        if(window.confirm("Are you sure you want to delete this training?")) {
            fetch(import.meta.env.VITE_API_URL + `/api/trainings/${params.data.id}`, {method: 'DELETE'})
            .then(response => {
                if (response.ok)
                fetchTrainings();
                else
                throw new Error("Error in DELETE: " + response.statusText);
            })
            .catch(err => console.error(err));
        }
    }

    return(
    <>
        <div className="ag-theme-material" style={{width: '90%', height: 400, textAlign: 'left'}}>
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