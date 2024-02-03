import type { ButtonProps } from '@mui/material';
import { Button, Menu, MenuItem } from '@mui/material';
import type { FC } from 'react';
import { ChevronDown } from '../../icons/chevron-down';

interface Action {
    label: string;
    onClick: () => void;
}

interface ActionsMenuProps extends ButtonProps {
    actions: Action[];
    label?: string;
}

export const ActionsMenu: FC<ActionsMenuProps> = (props) => {
    const { actions, label, ...other } = props;
    const [anchorRef, open, handleOpen, handleClose] = usePopover();

    return (
        <>
            <Button
                color="primary"
                endIcon={<ChevronDown fontSize="small" />}
                onClick={handleOpen}
                size="large"
                variant="contained"
                ref={anchorRef}
                {...other}
            >
                {label}
            </Button>
            <Menu
                anchorEl={anchorRef.current}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {actions.map((item) => (
                    <MenuItem
                        key={item.label}
                        onClick={() => {
                            if (item.onClick) {
                                item.onClick();
                            }

                            handleClose();
                        }}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};
function usePopover(): [any, any, any, any] {
    throw new Error('Function not implemented.');
}
