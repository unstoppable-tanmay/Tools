import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';

import "./Ddalgo.css"

import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Brehensam = () => {

    const [number, setNumber] = useState(20)
    const [screen, setScreen] = useState(false);

    const points = [];

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const brehensam = async (x0, y0, x1, y1) => {
        let dx, dy, p, x, y;
        dx = x1 - x0;
        dy = y1 - y0;
        x = x0;
        y = y0;
        p = 2 * dy - dx;
        while (x < x1) {
            if (p >= 0) {
                setPixel(x, y);
                y = y + 1;
                p = p + 2 * dy - 2 * dx;
            }
            else {
                setPixel(x, y);
                p = p + 2 * dy;
            }
            x = x + 1;
            await sleep(60);
        }
    }
    const clearBoard = () => {
        document.querySelectorAll(".cols").forEach((val) => { val.style.background = "#FF000020" });
        points.shift();
        points.shift();
    }
    const setPixel = (t, s) => {
        const parrentDiv = document.getElementById('parrent');
        parrentDiv.children[t - 1].children[s - 1].style.background = "#000"
    }
    const removePixel = (t, s) => {
        const parrentDiv = document.getElementById('parrent');
        parrentDiv.children[t - 1].children[s - 1].style.background = "#FF000020"
    }

    const setValue = (a, b) => {
        if (points.length < 2) {
            points.push([a, b])
            setPixel(a, b)
        }
        else if (points.length === 2) {
            removePixel(points[0][0], points[0][1])
            points.shift()
            points.push([a, b])
            setPixel(a, b)
        }
        else {
            console.error("not done")
        }
    }

    const RenderGrid = () => {
        function createCols(n, row) {
            var elements = [];
            for (var i = 1; i <= n; i++) {
                elements.push(<li className="cols" key={i} col={i} row={row} onClick={(e) => setValue(e.target.getAttribute("row"), e.target.getAttribute("col"))} style={{ width: `${(100 / n)}%` }}></li>);
            }
            return elements;
        }
        function createRows(n) {
            var elements = [];
            for (var i = 1; i <= n; i++) {
                elements.push(<ul className="rows" key={i} style={{ height: `${100 / n}%` }}>{createCols(n, i)}</ul>);
            }
            return elements;
        }

        return (
            <ul className="parrent" id="parrent">
                {createRows(number)}
            </ul>
        )
    }

    const setSlider = e => {
        setNumber(e.target.value)
    }

    return (
        <div className="Ddalgo">
            {screen ? (
                <div className="after_render">
                    <div className="Nav">
                        <IconButton color="primary" className="icon_button" aria-label="add to shopping cart" onClick={() => { setScreen(false) }} size="large">
                            <ArrowBackIcon fontSize="inherit" />
                        </IconButton>
                        Brehensam Algorthim
                    </div>
                    <div className="Screen">
                        <RenderGrid />
                        <div className="Buttons">
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => {
                                    try {
                                        brehensam(Number(points[0][0]), Number(points[0][1]), Number(points[1][0]), Number(points[1][1]));
                                    } catch (e) {
                                        alert("Select Two Points First!")
                                    }
                                }
                                }
                                fontSize="inherit">
                                Draw
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => clearBoard()}
                                fontSize="inherit">
                                Clear
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="before_render">
                    <div className="Nav">
                        <Link to="/">
                            <IconButton color="primary" className="icon_button" aria-label="add to shopping cart" size="large">
                                <ArrowBackIcon fontSize="inherit" />
                            </IconButton>
                        </Link>
                        Brehensam Algorthim
                    </div>
                    <div className="before_render_screen">
                        <div className="heading">Enter Screen Resolution</div>
                        <div className="form">
                            <Slider
                                className="slider"
                                value={number}
                                aria-label="Screen Size"
                                onChange={setSlider}
                                valueLabelDisplay="auto"
                                step={10}
                                min={10}
                                max={100}
                            />
                            <Button variant="contained" size="large" onClick={() => setScreen(true)} fontSize="inherit">Create</Button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Brehensam