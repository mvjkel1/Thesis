import { Avatar, AvatarGroup, Box, Chip, Collapse, IconButton } from '@mui/material';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import configData from '../../config.json';
import { FeatureContainer, HeaderText, HeaderWrapper } from './Moodboard.styles';

function throttle(callback, delay) {
  var previousCall = new Date().getTime();
  return function () {
    var time = new Date().getTime();

    if (time - previousCall >= delay) {
      previousCall = time;
      callback.apply(null, arguments);
    }
  };
}

export const Moodboard = () => {
  const [open, setOpen] = useState(true);
  const drawing = useRef(false);
  const board = useRef({ color: 'black' });
  const canvasRef = useRef(null);
  const socketRef = useRef(null);
  const containerRef = useRef(null);
  const offset = useRef(null);

  const onResize = () => {
    const container = containerRef.current.getBoundingClientRect();
    canvasRef.current.width = container.width;
    offset.current = canvasRef.current.getBoundingClientRect();
    drawPrevious(board.current.state, canvasRef.current, canvasRef.current.getContext('2d'));
  };

  const drawLine = (x0, y0, x1, y1, color, canvas, context, emit) => {
    context.beginPath();
    context.moveTo(x0 - offset.current.left, y0 - offset.current.top);
    context.lineTo(x1 - offset.current.left, y1 - offset.current.top);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    if (!emit) {
      return;
    }
    var w = canvas.width;
    var h = canvas.height;

    socketRef.current.emit('drawing', {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color
    });
  };

  const clearBoard = () => {
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    socketRef.current.emit('clear', {});
  };

  const onDrawing = (data, canvas, context) => {
    var w = canvasRef.current.width;
    var h = canvasRef.current.height;
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color, canvas, context);
  };

  const drawPrevious = (data, canvas, context) => {
    var w = canvasRef.current.width;
    var h = canvasRef.current.height;
    data.forEach((entry) =>
      drawLine(entry.x0 * w, entry.y0 * h, entry.x1 * w, entry.y1 * h, entry.color, canvas, context)
    );
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    socketRef.current = io(configData.MOODBOARD_SOCKET_SERVER_URL);
    socketRef.current.on('previousDrawings', (data) => {
      board.current.state = data;
    });
    socketRef.current.on('drawing', (data) => onDrawing(data, canvas, context));
    socketRef.current.on('clear', () => (board.current.state = []));

    function onMouseDown(e) {
      drawing.current = true;
      board.current.x = e.clientX || e.touches[0].clientX;
      board.current.y = e.clientY || e.touches[0].clientY;
    }

    function onMouseUp(e) {
      if (!drawing.current) {
        return;
      }
      drawing.current = false;
      drawLine(
        board.current.x,
        board.current.y,
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY,
        board.current.color,
        canvas,
        context,
        true
      );
    }

    function onMouseMove(e) {
      if (!drawing.current) {
        return;
      }
      drawLine(
        board.current.x,
        board.current.y,
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY,
        board.current.color,
        canvas,
        context,
        true
      );
      board.current.x = e.clientX || e.touches[0].clientX;
      board.current.y = e.clientY || e.touches[0].clientY;
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

    if (canvas) {
      setTimeout(() => {
        offset.current = canvas.getBoundingClientRect();
        canvas.width = containerRef.current.getBoundingClientRect().width - 32;
        canvas.height = 350;
        drawPrevious(board.current.state, canvas, context);
      }, 350);
    }
  }, []);

  return (
    <FeatureContainer>
      <HeaderWrapper>
        <HeaderText>Moodboard</HeaderText>
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <ExpandLessRoundedIcon /> : <ArrowDropDownCircleIcon />}
        </IconButton>
      </HeaderWrapper>
      <Collapse in={open}>
        <Box mt={1} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <AvatarGroup
            sx={{
              '& .MuiAvatar-root': { width: 32, height: 32, fontSize: 15 }
            }}
            max={4}
          >
            <Avatar
              sx={{ width: 32, height: 32 }}
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
            <Avatar
              sx={{ width: 32, height: 32 }}
              alt="Travis Howard"
              src="/static/images/avatar/2.jpg"
            />
            <Avatar
              sx={{ width: 32, height: 32 }}
              alt="Cindy Baker"
              src="/static/images/avatar/3.jpg"
            />
            <Avatar
              sx={{ width: 32, height: 32 }}
              alt="Agnes Walker"
              src="/static/images/avatar/4.jpg"
            />
            <Avatar
              sx={{ width: 32, height: 32 }}
              alt="Trevor Henderson"
              src="/static/images/avatar/5.jpg"
            />
          </AvatarGroup>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {['red', 'black', 'lightblue'].map((color) => (
              <Chip
                label=""
                sx={{ backgroundColor: color, '&&:hover': { backgroundColor: color }, width: 32 }}
                onClick={() => (board.current.color = color)}
                variant="outlined"
              />
            ))}
          </Box>
          <Chip label="Clear board" onClick={clearBoard} />
        </Box>
        <Box mt={2} sx={{ padding: 2, paddingTop: 0 }} ref={containerRef}>
          <canvas className="moodboard" ref={canvasRef}></canvas>
        </Box>
      </Collapse>
    </FeatureContainer>
  );
};
