import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';

import "./Ddalgo.css"

import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { gml } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CircleDraw = () => {

    const [radius, setRadius] = useState(5)
    const [screenRes, setScreenRes] = useState(20)
    const [screen, setScreen] = useState(false);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const drawCircle = (xc, yc, x, y) => {
        setPixel(xc + x, yc + y);
        setPixel(xc - x, yc + y);
        setPixel(xc + x, yc - y);
        setPixel(xc - x, yc - y);
        setPixel(xc + y, yc + x);
        setPixel(xc - y, yc + x);
        setPixel(xc + y, yc - x);
        setPixel(xc - y, yc - x);
    }
    const circleBres = async (xc, yc, r) => {
        setPixel(xc,yc)
        var x = 0, y = r;
        var d = 3 - 2 * r;
        drawCircle(xc, yc, x, y);
        while (y >= x) {
            x++;
            if (d > 0) {
                y--;
                d = d + 4 * (x - y) + 10;
            }
            else
                d = d + 4 * x + 6;
            drawCircle(xc, yc, x, y);
            await sleep(100);
        }
    }

    const setPixel = (t, s) => {
        const parrentDiv = document.getElementById('parrent');
        parrentDiv.children[t - 1].children[s - 1].style.background = "#000"
    }
    const clearBoard = () => {
        document.querySelectorAll(".cols").forEach((val) => { val.style.background = "#FF000020" });
    }
    const removePixel = (t, s) => {
        const parrentDiv = document.getElementById('parrent');
        parrentDiv.children[t - 1].children[s - 1].style.background = "#FF000020"
    }

    const RenderGrid = () => {
        function createCols(n, row) {
            var elements = [];
            for (var i = 1; i <= n; i++) {
                elements.push(<li className="cols" key={i} col={i} row={row} style={{ width: `${(100 / n)}%` }}></li>);
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
                {createRows(screenRes+5)}
            </ul>
        )
    }

    const setSliderRadius = e => {
        setRadius(e.target.value)
    }
    const setSliderScreen = e => {
        setScreenRes(e.target.value)
    }


    return (
        <div className="Ddalgo">
            {screen ? (
                <div className="after_render">
                    <div className="Nav">
                        <IconButton color="primary" className="icon_button" aria-label="add to shopping cart" onClick={() => { setScreen(false) }} size="large">
                            <ArrowBackIcon fontSize="inherit" />
                        </IconButton>
                        Circle Draw Algorthim
                    </div>
                    <div className="Screen">
                        <RenderGrid />
                        {/* onClick={circleBres(11,11,radius)} */}
                        <Button variant="contained" size="large" onClick={()=>circleBres(screenRes/2+3,screenRes/2+3,radius)} fontSize="inherit">Draw</Button>
                        <SyntaxHighlighter className="CodeBlock" language="javascript" style={gml} showLineNumbers={true} wrapLines={true} customStyle={{ display: "block", padding: "28px 10px 10px 10px", overFlowX: "scroll" }}>
                            {`void circleBres(int xc, int yc, int r){
    int x = 0, y = r;
    int d = 3 - 2 * r;
    drawCircle(xc, yc, x, y);
    while (y >= x)
    {
        x++;
        if (d > 0){
            y--;
            d = d + 4 * (x - y) + 10;
        }
        else
            d = d + 4 * x + 6;
        drawCircle(xc, yc, x, y);
        delay(50);
    }
}`}
                        </SyntaxHighlighter>
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
                        Circle Draw Algorthim
                    </div>
                    <div className="before_render_screen">
                        <div className="heading">Enter Screen Resolution</div>
                        <div className="form">
                            <Slider
                                className="slider"
                                value={screenRes}
                                aria-label="Screen Size"
                                onChange={setSliderScreen}
                                valueLabelDisplay="auto"
                                step={10}
                                min={20}
                                max={100}
                            />
                            <div className="heading">Enter Radius Of Circle</div>
                            <Slider
                                className="slider"
                                value={radius}
                                aria-label="Screen Size"
                                onChange={setSliderRadius}
                                valueLabelDisplay="auto"
                                step={parseInt((screenRes/2)/10)}
                                min={parseInt((screenRes/2)/10)}
                                max={parseInt(screenRes/2)}
                            />
                            <Button variant="contained" size="large" onClick={() => setScreen(true)} fontSize="inherit">Draw</Button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default CircleDraw