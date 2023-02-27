import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import * as Algo from "./Algo.js"

import "./Scheduling.scss"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const Scheduling = () => {
    const [addRow, setAddRow] = useState([])
    const [algo, setAlgo] = React.useState('');
    const [tq, setTq] = useState(2);

    const [showData, setShowData] = useState(false)
    const [showTable, setShowTable] = useState([])

    var processData = []

    const data = <>
        <td>
            <input type="text" name="" id="process_input" />
        </td>
        <td>
            <input type="number" min={0} name="" id="at_input" />
        </td>
        <td>
            <input type="number" min={0} name="" id="bt_input" />
        </td>
        <td>
            <input type="number" min={0} name="" id="pr_input" />
        </td>
    </>

    const process = []
    const At = []
    const Bt = []
    const Priority = []

    // Data Creation
    // var processData = [];

    const createData = () => {
        for (var i = 0; i < process.length; i++) {
            let data = {
                process: process[i],
                At: At[i],
                Bt: Bt[i],
                Priority: Priority[i],
                first_time: null,
                Ct: null,
                Tat: null,
                Wt: null,
                Rt: null,
            };
            processData.push(data)
        }
    }

    useEffect(() => {
        setAddRow([data, data, data, data])
        createData();
    }, [])


    const UploadData = async () => {
        let process_input = document.querySelectorAll('#process_input')
        let at_input = document.querySelectorAll('#at_input')
        let bt_input = document.querySelectorAll('#bt_input')
        let priority = document.querySelectorAll('#pr_input')

        for (let i = 0; i < process_input.length; i++) {
            if (process_input[i].value === '' || at_input[i].value === '' || bt_input[i].value === '' || priority[i].value === '' || algo === '' || tq === '') {
                alert("Enter Details");
                return;
            }
        }

        process_input.forEach((a, i) => { process[i] = (a.value) })
        at_input.forEach((a, i) => { At[i] = Number(a.value) })
        bt_input.forEach((a, i) => { Bt[i] = Number(a.value) })
        priority.forEach((a, i) => { Priority[i] = Number(a.value) })

        console.log(process, At, Bt, Priority, algo)
        createData()
        console.table(processData);
        try {
            if (algo === 'FCFS') {
                processData = await Algo.FCFS(processData)
            }
            else if (algo === 'SJF') {
                processData = await Algo.SJF(processData)
            }
            else if (algo === 'SRTF') {
                processData = await Algo.SRTF(processData)
            }
            else if (algo === 'RR') {
                processData = await Algo.RR(processData,tq)
            }
            else if (algo === 'PS') {
                processData = await Algo.PS(processData)
            }
        } catch (e) {
            alert(e)
        }
        setShowTable(processData)
        console.table(showTable);
        setShowData(true)
    }

    const ShowData = (props) => {
        console.table(showTable);
        console.log(tq)
        return (
            <>
                <div className="Nav">
                    <IconButton color="primary" className="icon_button" aria-label="" onClick={() => { setShowData(false) }} size="large">
                        <ArrowBackIcon fontSize="inherit" />
                    </IconButton>
                    Scdeluing Algorithm
                </div>
                <div className="Scheduling">
                    <div className="table_wrapper">
                        <div className="Heading">{algo}</div>
                        <table>
                            <thead>
                                <tr className="thead">
                                    <th>Pros</th>
                                    <th>AT</th>
                                    <th>BT</th>
                                    <th>Prio</th>
                                    <th>Ct</th>
                                    <th>Tat</th>
                                    <th>Rt</th>
                                    <th>Wt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showTable.map((a, i) => {
                                    return (
                                        <>
                                            <tr key={i}>
                                                <td>{a.process}</td>
                                                <td>{a.At}</td>
                                                <td>{a.Bt}</td>
                                                <td>{a.Priority}</td>
                                                <td>{a.Ct}</td>
                                                <td>{a.Tat}</td>
                                                <td>{a.Rt}</td>
                                                <td>{a.Wt}</td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }

    return (!showData ?
        <>
            <div className="Nav">
                <Link to="/">
                    <IconButton color="primary" className="icon_button" aria-label="" onClick={() => { Algo.FCFS() }} size="large">
                        <ArrowBackIcon fontSize="inherit" />
                    </IconButton>
                </Link>
                Scdeluing Algorithm
            </div>
            <div className="Scheduling">
                <div className="table_wrapper">
                    <div className="Buttons">
                        <Button variant="contained" className="subBtn" component="label" onClick={() => {
                            setAddRow([...addRow, data]);
                        }}>
                            Add
                        </Button>
                        <Button variant="contained" color="error" className="subBtn" component="label" onClick={() => {
                            let len = addRow.length
                            setAddRow([
                                ...addRow.slice(0, len - 1)
                            ]);
                        }}>
                            Remove
                        </Button>
                    </div>
                    <table>
                        <thead>
                            <tr className="thead">
                                <th>Process</th>
                                <th>AT</th>
                                <th>BT</th>
                                <th>Priority</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addRow.map((a, i) => {
                                return <tr key={i}>
                                    {a}
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <div className="Algo">
                        <FormControl className='select'>
                            <InputLabel id="demo-simple-select-label">Algo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                value={algo}
                                label="Algo"
                                onChange={event => setAlgo(event.target.value)}
                            >
                                <MenuItem value={"FCFS"}>FCFS</MenuItem>
                                <MenuItem value={"SJF"}>SJF</MenuItem>
                                <MenuItem value={"SRTF"}>SRTF</MenuItem>
                                <MenuItem value={"RR"}>RR</MenuItem>
                                <MenuItem value={"PS"}>PS</MenuItem>
                            </Select>
                        </FormControl>
                        <input type="number" name="" placeholder='Tq' min="0" max="10" id="" onChange={(e) => setTq(e.target.value)} />
                    </div>
                    <Button variant="contained" className="subBtn" component="label" onClick={() => UploadData()}>
                        Upload
                    </Button>
                </div>
            </div>
        </> : <ShowData data={processData}/>
    )
}
export default Scheduling