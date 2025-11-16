import React, { useState, useRef } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const BeforeAfterContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  cursor: 'ew-resize',
});

const BeforeImage = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const AfterImage = styled('div')<{ clip: number }>(({ clip }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  clipPath: `polygon(0 0, ${clip}% 0, ${clip}% 100%, 0 100%)`,
}));

const ResizeHandle = styled('div')<{ left: number }>(({ theme, left }) => ({
  position: 'absolute',
  top: 0,
  left: `${left}%`,
  transform: 'translateX(-50%)',
  width: '4px',
  height: '100%',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    border: '3px solid white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
  },
}));

const HandleIconContainer = styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '100%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    zIndex: 1,
});


interface BeforeAfterSliderProps {
  before: string;
  after: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ before, after }) => {
  const [sliderValue, setSliderValue] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      const clampedPercentage = Math.max(0, Math.min(100, percentage));
      setSliderValue(clampedPercentage);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <BeforeAfterContainer
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      <BeforeImage style={{ backgroundImage: `url(${before})` }} />
      <AfterImage style={{ backgroundImage: `url(${after})` }} clip={sliderValue} />
      <ResizeHandle left={sliderValue}>
        <HandleIconContainer>
            <ArrowBackIos sx={{mr: -0.5}}/>
            <ArrowForwardIos sx={{ml: -0.5}}/>
        </HandleIconContainer>
      </ResizeHandle>
    </BeforeAfterContainer>
  );
};
