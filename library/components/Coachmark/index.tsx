import { CrossCircleFill } from 'gthibaud-icons-react';
import React, { useState } from 'react';
import { HorizontalContainer } from '../Container/Horizontal';
import { Tooltip } from '../Tooltip';
import { Typography } from '../Typography';

interface CoachmarkProps {
    isOpen?: boolean; // Whether the Coachmark is visible
    onClose?: () => void; // Callback to close the Coachmark
    children: JSX.Element; // The content of the Coachmark
    title: string; // The title of the Coachmark
}

const Coachmark: React.FC<CoachmarkProps> = ({ isOpen, onClose, children, title }) => {
    const [openState, setOpenState] = useState(isOpen);

    const renderTitle = () => {
        if (!openState) return '';

        return (
            <HorizontalContainer>
                <Typography color="white">{title}</Typography>
                <CrossCircleFill
                    size={20}
                    color="white"
                    style={{
                        marginLeft: '10px',
                        cursor: 'pointer',
                    }}
                    onClick={() => setOpenState(false)}
                />
            </HorizontalContainer>
        );
    };

    return (
        <Tooltip
            title={renderTitle()}
            isOpen={openState}
        >
            {children}
        </Tooltip>
    );
};

export default Coachmark;
