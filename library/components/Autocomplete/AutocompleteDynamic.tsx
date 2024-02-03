import { alpha, Autocomplete, Box, IconButton, TextField, Typography } from '@mui/material';
import { UseQueryResult } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { Refresh } from '../../icons/refresh';

interface AutocompleteDynamicProps {
    label: string;
    selectedId?: string;
    onChange: (id: string) => void;
    sx?: any;
    dynamicList: UseQueryResult<any, unknown>;
    required?: boolean;
    placeholder?: string;
    idKey?: string;
    labelKey?: string;
    disabledClearable?: boolean;
    initializeValue?: boolean;
    reloadButton?: boolean;
}

export const AutompleteDynamic: FC<AutocompleteDynamicProps> = ({
    label,
    selectedId,
    onChange,
    dynamicList,
    sx,
    required = false,
    placeholder = label,
    idKey = 'id',
    labelKey = 'label',
    disabledClearable = false,
    initializeValue = false,
    reloadButton = false,
}) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Box sx={{ width: '100%' }}>
            <Typography
                sx={{
                    color: open ? 'primary.main' : 'text.primary',
                    fontSize: 14,
                    fontWeight: 500,
                    mb: 0.5,
                    position: 'relative',
                    transform: 'none',
                    transition: 'color 0.1s ease-in-out',
                }}
            >
                {label}
                {required && ' *'}
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 1 }}>
                <Autocomplete
                    sx={{
                        fieldset: {
                            border: 'none',
                        },
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'background.paper',
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor: 'neutral.300',
                            borderRadius: 1,
                            boxShadow: '0px 1px 2px 0px rgba(9, 30, 66, 0.08)',
                            overflow: 'hidden',
                            p: 0,
                            transition: (theme) =>
                                theme.transitions.create(['border-color', 'box-shadow']),
                            '&:before': {
                                borderBottom: 0,
                            },
                            '&:hover': {
                                backgroundColor: 'background.paper',
                            },
                            '&.Mui-focused': {
                                backgroundColor: 'background.paper',
                                boxShadow: (theme) =>
                                    `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
                            },
                            '&.Mui-disabled': {
                                backgroundColor: 'action.disabledBackground',
                                boxShadow: 'none',
                                borderColor: alpha('#D6DBE1', 0.5),
                            },
                            '.MuiInputAdornment-root.MuiInputAdornment-positionStart.MuiInputAdornment-root:not(.MuiInputAdornment-hiddenLabel)':
                                {
                                    mt: 0,
                                    ml: 1.5,
                                },
                        },
                        ...sx,
                    }}
                    size="small"
                    fullWidth
                    disableClearable={disabledClearable}
                    options={
                        (dynamicList.data &&
                            dynamicList.data?.map((d: any) => {
                                return { label: d[labelKey], id: d[idKey] };
                            })) ||
                        []
                    }
                    onFocus={() => setOpen(true)}
                    onBlur={() => setOpen(false)}
                    onChange={(event, value) => onChange(value.id)}
                    loading={dynamicList.isRefetching}
                    value={dynamicList.data?.find((obj: any) => obj[idKey] === selectedId)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder={placeholder}
                        />
                    )}
                />
                {reloadButton && (
                    <IconButton
                        onClick={() => {
                            // Refetch dynamic object
                            dynamicList.refetch();
                        }}
                    >
                        <Refresh />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
};
