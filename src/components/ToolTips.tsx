import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InfoIcon from '@mui/icons-material/Info';

interface ToolTipProps {
    open: boolean;
    description: string;
    title: string;
    className: string;
    onOpen?: () => void;  // Callback for when the modal is opened
    onClose?: () => void; // Callback for when the modal is closed
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'black'
  };

const ToolTip: React.FC<ToolTipProps> = ({ open: initialOpen, onOpen, onClose, description, title, className }) => {
    const [open, setOpen] = useState(initialOpen || false);

    const handleOpen = () => {
        setOpen(true);
        if (onOpen) {
            onOpen();  // Notify parent when modal is opened
        }
    };

    const handleClose = () => {
        setOpen(false);
        if (onClose) {
            onClose();  // Notify parent when modal is closed
        }
    };

    return (
        <div className={className}>
            <InfoIcon fontSize='large' sx={{pt: 2}} className="info-icon" onClick={handleOpen}></InfoIcon>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {description}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default ToolTip;
