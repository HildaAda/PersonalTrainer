import React from 'react';
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';
import _ from 'lodash';

export default function ActivityChart () {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

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
    };

    const activityData = trainings.reduce((acc, training) => {
        const existingActivity = acc.find(item => item.activity === training.activity);
    
        if (existingActivity) {
          existingActivity.duration += training.duration;
        } else {
          acc.push({ activity: training.activity, duration: training.duration });
        }
    
        return acc;
      }, []);


    return (
        <div style={{padding: '30px'}}>
            <BarChart width={800} height={400} data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="activity" />
                <YAxis tickFormatter={(value) => `${value} min`} />
                <Tooltip />
                <Legend />
                <Bar dataKey="duration" fill="#8884d8" name="Duration">
                    <LabelList dataKey="activity" position="top" />
                </Bar>
            </BarChart>
        </div>
    );
};