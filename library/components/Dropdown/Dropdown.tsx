import { FormControl, Select, Tooltip } from '@mui/material';
import { FC, useState } from 'react';
import { ChevronDownLight } from '../../icons/chevron-down-light';
import React from 'react';

interface DropdownProps {
    disabled?: boolean;
    disabledLabel?: string;
    minWidth?: number;
    maxWidth?: number;
    currentValue: string;
    onChange: (event: any) => void;
    children: React.ReactNode;
    tooltipTitle?: string;
}

export const Dropdown: FC<DropdownProps> = ({
    disabled = false,
    disabledLabel = '',
    minWidth = 100,
    maxWidth = 160,
    currentValue,
    onChange,
    children,
    tooltipTitle = '',
}) => {
    // State containing the focus (hover or selected)
    const [selectOnFocus, setSelectOnFocus] = useState<boolean>(false);

    // Return Dropdown component
    return (
        <Tooltip
            title={(disabled ? disabledLabel : '') || tooltipTitle}
            placement="left"
        >
            <FormControl
                sx={{ maxWidth, minWidth }}
                size="small"
                disabled={disabled}
            >
                <Select
                    disabled={disabled}
                    sx={{
                        height: 34,
                        backgroundColor: 'background.default',
                        borderColor: selectOnFocus ? 'neutral.400' : 'neutral.200',
                        boxShadow: selectOnFocus ? '0px 1px 2px 0px rgba(9, 30, 66, 0.08)' : 'none',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        transition: (theme) =>
                            theme.transitions.create(['border-color', 'box-shadow'], {
                                duration: '0.2s',
                            }),
                        fieldset: {
                            border: 'none',
                        },
                    }}
                    onOpen={() => setSelectOnFocus(true)}
                    onMouseOver={() => setSelectOnFocus(true)}
                    onMouseOut={() => setSelectOnFocus(false)}
                    onClose={() => setSelectOnFocus(false)}
                    id="select"
                    variant="outlined"
                    value={currentValue}
                    onChange={onChange}
                    IconComponent={(e) => {
                        return (
                            <ChevronDownLight
                                fontSize="inherit"
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: '10px',
                                    opacity: '0.8',
                                    transform: `rotate(${
                                        e?.className.includes('Open') ? '180' : '0'
                                    }deg)`,
                                    transition: 'transform 0.1s linear',
                                    pointerEvents: 'none',
                                    position: 'absolute',
                                    right: '14px',
                                }}
                            />
                        );
                    }}
                >
                    {children}
                </Select>
            </FormControl>
        </Tooltip>
    );
};
