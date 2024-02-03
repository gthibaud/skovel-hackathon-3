import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { addDays, subDays, subHours, subMonths, subWeeks } from 'date-fns';
import { FC, useEffect, useState } from 'react';
import { ReloadButton } from '../Button/Reload';

export interface TimeRangePickerProps {
    refetchCallback: () => void;
    onStartDateChange?: (date: Date) => void;
    onEndDateChange?: (date: Date) => void;
}

const DEFAULT_END_TIME = new Date();
const DEFAULT_START_TIME = subDays(DEFAULT_END_TIME, 1);

export const TimeRangePicker: FC<TimeRangePickerProps> = ({
    refetchCallback,
    onStartDateChange,
    onEndDateChange,
}) => {
    const [timePicker, setTimePicker] = useState<string>('day');
    const [timeZone, setTimeZone] = useState<string>('cet');
    const [startTime, setStartTime] = useState<Date>(DEFAULT_START_TIME);
    const [endTime, setEndTime] = useState<Date>(DEFAULT_END_TIME);

    const handleTimePickerChange = (value: any) => {
        if (!value) return;

        // Extract values
        const startTimeInput = value[0];
        const endTimeInput = value[1];

        // If the times are on a picker time, select the picker
        if (endTimeInput.getTime() === DEFAULT_END_TIME.getTime()) {
            if (startTimeInput.getTime() === subHours(DEFAULT_END_TIME, 1).getTime()) {
                setTimePicker('hour');
            } else if (startTimeInput.getTime() === subDays(DEFAULT_END_TIME, 1).getTime()) {
                setTimePicker('day');
            } else if (startTimeInput.getTime() === subWeeks(DEFAULT_END_TIME, 1).getTime()) {
                setTimePicker('week');
            } else if (startTimeInput.getTime() === subMonths(DEFAULT_END_TIME, 1).getTime()) {
                setTimePicker('month');
            } else {
                // Set the time picker value to custom
                setTimePicker('custom');
            }
        } else {
            // Set the time picker value to custom
            setTimePicker('custom');
        }

        setStartTime(startTimeInput);
        setEndTime(endTimeInput);
    };

    const handleToggleChange = (event: React.MouseEvent<HTMLElement>, value: string) => {
        if (!value) return;

        // Set the time picker value
        setTimePicker(value);

        // Set the start and end time
        switch (value) {
            case 'hour':
                setStartTime(subHours(DEFAULT_END_TIME, 1));
                setEndTime(DEFAULT_END_TIME);
                break;
            case 'day':
                setStartTime(subDays(DEFAULT_END_TIME, 1));
                setEndTime(DEFAULT_END_TIME);
                break;
            case 'week':
                const lastWeek = subWeeks(DEFAULT_END_TIME, 1);
                setStartTime(
                    new Date(lastWeek.getFullYear(), lastWeek.getMonth(), lastWeek.getDate()),
                );
                setEndTime(DEFAULT_END_TIME);
                break;
            case 'month':
                const lastMonth = addDays(subMonths(DEFAULT_END_TIME, 1), 1);
                setStartTime(
                    new Date(lastMonth.getFullYear(), lastMonth.getMonth(), lastMonth.getDate()),
                );
                setEndTime(DEFAULT_END_TIME);
                break;
            case 'custom':
                break;
        }
    };

    // On start and end time change, call the callback
    useEffect(() => {
        // Check that the start time is before the end time to avoid calling the callback with invalid dates
        if (startTime.getTime() >= endTime.getTime()) return;

        // Call the callback
        onStartDateChange?.(startTime);
        onEndDateChange?.(endTime);
    }, [startTime, endTime]);

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'flex-end',
                flexWrap: 'wrap',
            }}
        >
            <ToggleButtonGroup
                color="primary"
                exclusive
                value={timePicker}
                // size='small'
                onChange={handleToggleChange}
                sx={{
                    '.MuiToggleButtonGroup-grouped': {
                        py: 0,
                        fontSize: '13px',
                        color: 'text.secondary',
                    },
                }}
            >
                <ToggleButton value="hour">1h</ToggleButton>
                <ToggleButton value="day">24h</ToggleButton>
                <ToggleButton value="week">Week</ToggleButton>
                <ToggleButton value="month">Month</ToggleButton>
                {/* <ToggleButton value="custom">Custom</ToggleButton> */}
            </ToggleButtonGroup>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                // TODO à remettre
                {/* <MultiInputDateTimeRangeField
                    slotProps={{
                        textField: ({ position }) => ({
                            label: position === 'start' ? 'Start time (UTC+2)' : 'End time (UTC+2)',
                        }),
                    }}
                    disableFuture
                    format="dd/MM/yyyy HH:mm"
                    onChange={handleTimePickerChange}
                    value={[startTime, endTime]}
                    // value={[new Date(startTime.toISOString()), new Date(endTime.toISOString())]}
                    sx={{
                        '.MuiOutlinedInput-input': {
                            py: 1,
                            fontSize: '13px',
                            width: 'auto',
                            fontWeight: 500,
                            color: 'text.secondary',
                        },
                        '.MuiTextField-root': {
                            width: '142px',
                            margin: 0,
                        },
                        '.MuiTypography-body1': {
                            margin: 1,
                        },
                    }}
                /> */}
            </LocalizationProvider>
            {/* <ToggleButtonGroup
                color="primary"
                exclusive
                value={timeZone}
                onChange={() => toast.error('Sorry, only CET time is supported for now')}
                sx={{
                    '.MuiToggleButtonGroup-grouped': {
                        py: 0,
                        fontSize: '13px',
                        color: 'text.secondary',
                    },
                }}
            >
                <ToggleButton value="cet">Local (UTC+2)</ToggleButton>
                <ToggleButton value="utc">UTC</ToggleButton>
            </ToggleButtonGroup> */}
            <ReloadButton
                refetchCallback={refetchCallback}
                sx={{ ml: -1.5 }}
            />
        </Box>
    );
};
