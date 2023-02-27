/* eslint-disable no-loop-func */

// Data Specification
// const process = ['p1', 'p2', 'p3', 'p4']
// const Bt = [5, 4, 2, 1]
// const At = [0, 1, 2, 4]
// const Priority = [10, 20, 30, 40]

// // Data Creation
// var processData = [];

// const createData = () => {
//     for (var i = 0; i < process.length; i++) {
//         let data = {
//             process: process[i],
//             At: At[i],
//             Bt: Bt[i],
//             Priority: Priority[i],
//             first_time: null,
//             Ct: null,
//             Tat: null,
//             Wt: null,
//             Rt: null,
//         };
//         processData.push(data);
//     }
// }
// createData()
// console.log("Given Data")
// console.table(processData);
// console.log("\n\n")


// First Come First Serve Command
const FCFS = (total_data) => {
    console.log("First Come First Serve")

    total_data.sort((a, b) => {
        return a.At < b.At ? -1 : 1;
    })

    var processinc = 0;
    var time = 0;

    while (processinc < total_data.length) {
        if (total_data[processinc].At > time) {
            time++;
        }
        else {
            total_data[processinc].first_time = time
            for (let i = 0; i < total_data[processinc].Bt; i++) {
                time++;
            }
            total_data[processinc].Ct = time;
            total_data[processinc].Tat = total_data[processinc].Ct - total_data[processinc].At
            total_data[processinc].Rt = total_data[processinc].first_time - total_data[processinc].At
            total_data[processinc].Wt = total_data[processinc].Tat - total_data[processinc].Bt
            processinc++;
        }
    }

    // console.table(total_data)
    // console.log("Avg Wt = " + total_data.reduce((n, { Wt }) => n + Wt, 0) / total_data.length)
    // console.log("Avg Rt = " + total_data.reduce((n, { Rt }) => n + Rt, 0) / total_data.length)
    // console.log("\n")
    return total_data
}

// FCFS(processData)


const SJF = (total_data) => {
    console.log("Shortest Job First")
    var arive_chart = []
    var rem_data = total_data
    var time = 0;

    total_data = total_data.map((ele, ind) => { return { ...ele, index: ind, }; })

    total_data.sort((a, b) => {
        return a.At < b.At ? -1 : 1;
    })
    // while (rem_data > 0) {
    for (let i = 0; i < total_data.length + 1; i++) {
        rem_data.map(a => {
            if (a.At <= time) {
                arive_chart.push(a)
                rem_data = rem_data.filter(b => b !== a)
            }
        })
        if (arive_chart.length > 0) {
            arive_chart.sort((a, b) => {
                if (a.Bt === b.Bt) {
                    return a.At < b.At ? -1 : 1;
                }
                return a.Bt < b.Bt ? -1 : 1;
            })
            total_data.map(data => {
                if (data.process === arive_chart[0].process) {
                    data.first_time = time
                    for (var i = 0; i < arive_chart[0].Bt; i++) { time++ }
                    data.Ct = time;
                    data.Tat = data.Ct - data.At
                    data.Rt = data.first_time - data.At
                    data.Wt = data.Tat - data.Bt
                }
            })

            for (let i = 1; i < arive_chart.length; i++) {
                rem_data.push(arive_chart[i])
            }
            arive_chart = [];
        }
        else {
            time++
        }
    }
    total_data.sort((a, b) => {
        return a.index < b.index ? -1 : 1;
    })
    total_data.map(function (item) {
        delete item.index;
        return item;
    });

    // console.table(total_data);
    // console.log("Avg Wt = " + total_data.reduce((n, { Wt }) => n + Wt, 0) / total_data.length)
    // console.log("Avg Rt = " + total_data.reduce((n, { Rt }) => n + Rt, 0) / total_data.length)
    // console.log("\n")
    return total_data

}

// SJF(processData)



const SRTF = (total_data) => {
    console.log("Shortest Remainng Time First")
    var update_data = total_data.map(ele => { return { ...ele, decrease: false, useBt: ele.Bt }; })
    var arive_chart = []

    var start_time = total_data.reduce((prev, curr) => { return prev.At < curr.At ? prev : curr; }).At;
    var end_time = total_data.reduce((n, { Bt }) => n + Bt, 0)

    for (let i = start_time; i < end_time + 1; i++) {
        update_data.map(a => {
            if (a.At <= i && a.useBt !== 0) {
                arive_chart.push(a)
            }
        })
        if (arive_chart.length > 0) {
            arive_chart.sort((a, b) => {
                return a.useBt < b.useBt ? -1 : 1;
            })
            update_data.map(data => {
                if (data.process === arive_chart[0].process) {
                    if (data.useBt > 0) {
                        if (data.decrease === false) {
                            data.decrease = true
                            data.first_time = i
                            if (data.useBt === 1) {
                                data.Ct = i + 1
                                data.Tat = data.Ct - data.At
                                data.Rt = data.first_time - data.At
                                data.Wt = data.Tat - data.useBt
                            }
                        }
                        else if (data.useBt === 1) {
                            data.Ct = i + 1
                            data.Tat = data.Ct - data.At
                            data.Rt = data.first_time - data.At
                            data.Wt = data.Tat - data.useBt
                        }
                        data.useBt--
                    }
                }
            })
            arive_chart = []
        }
    }


    update_data.map(function (item) {
        delete item.decrease;
        delete item.useBt;
        return item;
    });
    // console.table(update_data);
    // console.log("Avg Wt = " + update_data.reduce((n, { Wt }) => n + Wt, 0) / update_data.length)
    // console.log("Avg Rt = " + update_data.reduce((n, { Rt }) => n + Rt, 0) / update_data.length)
    // console.log("\n")
    return update_data
}

// SRTF(processData)



const RR = (total_data, tq=2) => {
    console.log("Round Robbin, Tq = " + tq)
    var update_data = total_data.map(ele => { return { ...ele, decrease: false, useBt: ele.Bt, runed: false }; })
    var arive_chart = []
    var last_data = null;

    var start_time = total_data.reduce((prev, curr) => { return prev.At < curr.At ? prev : curr; }).At;
    var end_time = total_data.reduce((n, { Bt }) => n + Bt, 0)

    const donothing = () => { }

    for (let i = start_time; i < end_time + 1;) {
        // console.table(update_data)
        update_data.map(a => {
            if (a.At <= i && a.useBt > 0 && a.runed != true) {
                arive_chart.push(a.process)
                a.runed = true
            }
        })
        last_data != null ? arive_chart.push(last_data) : donothing()

        if (arive_chart.length > 0) {
            // eslint-disable-next-line no-loop-func
            update_data.map(data => {
                if (data.process === arive_chart[0]) {
                    if (data.useBt > 0) {
                        if (data.decrease === false) {
                            data.decrease = true
                            data.first_time = i
                            if (data.useBt >= tq) {
                                for (let a = 0; a < tq; a++) {
                                    i++
                                }
                                data.Ct = i
                                data.useBt -= tq
                            }
                            else {
                                for (let a = 0; a < data.useBt; a++) {
                                    i++
                                }
                                data.Ct = i
                                data.useBt -= data.useBt
                            }
                        }
                        else if (data.useBt >= tq) {
                            for (let a = 0; a < tq; a++) {
                                i++
                            }
                            data.Ct = i
                            data.useBt -= tq
                        }
                        else {
                            for (let a = 0; a < data.useBt; a++) {
                                i++
                            }
                            data.Ct = i
                            data.useBt -= data.useBt
                        }
                    }
                    if (data.useBt > 0) {
                        last_data = data.process
                    }
                    else {
                        last_data = null
                    }
                }
            })
            arive_chart.shift()
        }
        else {
            i++
        }
    }

    update_data.map(function (item) {
        delete item.decrease;
        delete item.useBt;
        delete item.runed
        item.Tat = item.Ct - item.At
        item.Rt = item.first_time - item.At
        item.Wt = item.Tat - item.Bt
        return item;
    });
    // console.table(update_data);
    // console.log("Avg Wt = " + update_data.reduce((n, { Wt }) => n + Wt, 0) / update_data.length)
    // console.log("Avg Rt = " + update_data.reduce((n, { Rt }) => n + Rt, 0) / update_data.length)
    // console.log("\n")
    return update_data
}

// RR(processData, 2)
// RR(processData, 3)
// RR(processData, 4)




const PS = (total_data) => {
    console.log("Priority Scheduling")
    // console.table(total_data);
    var update_data = total_data.map(ele => { return { ...ele, decrease: false, useBt: ele.Bt }; })
    var arive_chart = []

    var start_time = total_data.reduce((prev, curr) => { return prev.At < curr.At ? prev : curr; }).At;
    var end_time = total_data.reduce((n, { Bt }) => n + Bt, 0)

    for (let i = start_time; i < end_time + 1; i++) {
        // eslint-disable-next-line no-loop-func
        update_data.map(a => {
            if (a.At <= i && a.Bt !== 0) {
                arive_chart.push(a)
            }
        })
        if (arive_chart.length > 0) {
            arive_chart.sort((a, b) => {
                return a.Priority > b.Priority ? -1 : 1;
            })
            // eslint-disable-next-line no-loop-func
            update_data.map(data => {
                if (data.process === arive_chart[0].process) {
                    if (data.Bt > 0) {
                        if (data.decrease === false) {
                            data.decrease = true
                            data.first_time = i
                            if (data.Bt === 1) {
                                data.Ct = i + 1
                                data.Tat = data.Ct - data.At
                                data.Rt = data.first_time - data.At
                                data.Wt = data.Tat - data.Bt
                            }
                        }
                        else if (data.Bt === 1) {
                            data.Ct = i + 1
                            data.Tat = data.Ct - data.At
                            data.Rt = data.first_time - data.At
                            data.Wt = data.Tat - data.useBt
                        }
                        data.Bt--
                    }
                }
            })
            arive_chart = []
        }
    }


    update_data.map(function (item) {
        delete item.decrease;
        delete item.useBt;
        return item;
    });
    // console.table(update_data);
    // console.log("Avg Wt = " + update_data.reduce((n, { Wt }) => n + Wt, 0) / update_data.length)
    // console.log("Avg Rt = " + update_data.reduce((n, { Rt }) => n + Rt, 0) / update_data.length)
    // console.log("\n")

    return update_data
}

// PS(processData)


export {FCFS,SJF,SRTF,RR,PS}


// Calling Algo

// FCFS(processData)
// SJF(processData)
// SRTF(processData)
// RR(processData, 2)
// PS(processData)