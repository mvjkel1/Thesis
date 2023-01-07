
import { Box } from "@mui/material";
import { useLayoutEffect } from "react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import configData from '../../../../config.json';

function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

export const Moodboard = () => {
    const drawing = useRef(false);
    const board = useRef({color: "black"});
    const canvasRef = useRef(null);
    const socketRef = useRef(null);
    const containerRef = useRef(null);
    const offset = useRef(null);

    const onResize = () => {
        const container = containerRef.current.getBoundingClientRect()
        canvasRef.current.width = container.width;
        canvasRef.current.height = window.innerHeight;
        offset.current = canvasRef.current.getBoundingClientRect();
      }

    const drawLine = (x0, y0, x1, y1, color, canvas, context, emit) => {
        context.beginPath();
        context.moveTo(x0-offset.current.left, y0-offset.current.top);
        context.lineTo(x1-offset.current.left, y1-offset.current.top); 
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.stroke();
        context.closePath();
    
        if (!emit) { return; }
        var w = canvas.width;
        var h = canvas.height;
    
        socketRef.current.emit('drawing', {
          x0: x0 / w,
          y0: y0 / h,
          x1: x1 / w,
          y1: y1 / h,
          color: color
        });
      }

    const onDrawing = (data, canvas, context) => {
        var w = canvasRef.current.width;
        var h = canvasRef.current.height;
        drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color, canvas, context);
    }

    useEffect(() => {
        socketRef.current = io(configData.MOODBOARD_SOCKET_SERVER_URL);
        const canvas = canvasRef.current
        const context = canvas.getContext('2d');
        socketRef.current.on('drawing', (data) => onDrawing(data, canvas, context));

        function onMouseDown(e){
            drawing.current = true;
            board.current.x = e.clientX||e.touches[0].clientX
            board.current.y = e.clientY||e.touches[0].clientY;
        }
        
        function onMouseUp(e){
            if (!drawing.current) { return; }
            drawing.current = false;
            drawLine(board.current.x, board.current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, board.current.color, canvas, context, true);
        }
        
        function onMouseMove(e){
            if (!drawing.current) { return; }
            drawLine(board.current.x, board.current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, board.current.color, canvas, context, true);
            board.current.x = e.clientX||e.touches[0].clientX
            board.current.y = e.clientY||e.touches[0].clientY
        }

        // Mouse listeners
        canvas.addEventListener('mousedown', onMouseDown, false);
        canvas.addEventListener('mouseup', onMouseUp, false);
        canvas.addEventListener('mouseout', onMouseUp, false);
        canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

        // Touch support for mobile devices
        canvas.addEventListener('touchstart', onMouseDown, false);
        canvas.addEventListener('touchend', onMouseUp, false);
        canvas.addEventListener('touchcancel', onMouseUp, false);
        canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

        window.addEventListener('resize', onResize, false);

      }, [])

      useLayoutEffect(() => {
        if (canvasRef.current) {
            setTimeout(() => {
                offset.current = canvasRef.current.getBoundingClientRect();
                canvasRef.current.width = containerRef.current.getBoundingClientRect().width;
                canvasRef.current.height = 1200;
            }, 1500)
        }
    }, []);

    return (
        <Box ref={containerRef}>
            <canvas className="moodboard" ref={canvasRef}></canvas>
        </Box>
    )
}