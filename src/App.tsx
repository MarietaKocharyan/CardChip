import { useState, useRef, useEffect } from 'react';
import { Box } from '@mui/material';

import Card from './components/card';
import { ReactComponent as AsanaLogo } from "./svg/AsanaLogo.svg";
import { ReactComponent as JiraLogo } from "./svg/JiraLogo.svg";
import { ReactComponent as TrelloLogo } from "./svg/TrelloLogo.svg";
import './App.css';


const connectors = [
    { label: 'Asana', icon: <AsanaLogo /> },
    { label: 'Jira', icon: <JiraLogo /> },
    { label: 'Trello 1', icon: <TrelloLogo /> },
    { label: 'Trello 2', icon: <TrelloLogo /> },
    { label: 'Trello 3', icon: <TrelloLogo /> },
    { label: 'Trello 4', icon: <TrelloLogo /> },
    { label: 'Trello 5', icon: <TrelloLogo /> },
];

function App() {
    const [width, setWidth] = useState(window.innerWidth / 2);
    const isDragging = useRef(false);
    
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        isDragging.current = true;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging.current) {
            const newWidth = Math.max(0, Math.min(window.innerWidth, e.clientX));
            setWidth(newWidth);
        }
    };
    
    const handleMouseUp = () => {
        isDragging.current = false;
    };
    
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);
    
    useEffect(() => {
        setWidth(prevWidth => Math.max(0, Math.min(window.innerWidth, prevWidth)));
    }, [width]);
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
            <Box
                style={{ width, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Card
                    chips={connectors}
                    subtitle="Intercom Fin"
                    title="Internal support helper"
                />

            </Box>
            <div
                className="divider"
                onMouseDown={handleMouseDown}
                style={{ cursor: 'ew-resize', width: '5px', backgroundColor: '#ccc' }}
            />
            <div
                className="right-section"
                style={{ width: `calc(100vw - ${width}px)`, backgroundColor: '#f0f0f0' }}
            />
        </Box>
    );
}

export default App;
