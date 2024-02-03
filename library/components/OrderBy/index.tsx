import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FC, useState } from 'react';
import { formatOrderBy } from '../../utils/orderBy';

// The default order options (can be overridden by passing a different array of order options)
const defaultOrderOptions: OrderOption[] = [
    {
        label: 'Last update',
        key: 1,
        property: 'updatedAt',
        order: 'desc',
    },
    {
        label: 'Recently created',
        key: 2,
        property: 'createdAt',
        order: 'desc',
    },
    {
        label: 'Name (A-Z)',
        key: 3,
        property: 'name',
        order: 'asc',
    },
    {
        label: 'Name (Z-A)',
        key: 4,
        property: 'name',
        order: 'desc',
    },
];

type OrderOption = {
    label: string;
    key: number;
    property: string;
    order: 'asc' | 'desc';
};

interface OrderDropdownProps {
    onOrderChange: (order: string) => void;
    orderOptions?: OrderOption[];
}

export const OrderDropdown: FC<OrderDropdownProps> = ({
    orderOptions = defaultOrderOptions,
    onOrderChange,
}) => {
    const [currentValue, setCurrentValue] = useState<number>(1);

    // This function is called whenever a new order value is selected.
    // The function sets the current value, and then calls the onOrderChange function.
    const handleChange = (event: any) => {
        // Update the state with the new value in order to update the currentValue displayed in the list.
        setCurrentValue(event.target.value as number);

        // Create the new order string based on the selected order option.
        const orderOption = orderOptions.find((option) => option.key === event.target.value);

        // If the order option is not found, return.
        if (!orderOption) return;

        // Format the order string and call the onOrderChange function.
        const newOrder = formatOrderBy(orderOption?.property, orderOption?.order);

        // Call back the onOrderChange function with the new order string.
        onOrderChange(newOrder);
    };

    return (
        <FormControl
            size="small"
            sx={{ minWidth: '200px' }}
        >
            <InputLabel>Order by</InputLabel>
            <Select
                sx={{ height: '40px', fontSize: '14px' }}
                id="select"
                value={currentValue}
                label="Order by"
                onChange={handleChange}
            >
                {orderOptions.map((option) => (
                    <MenuItem
                        key={option.key}
                        value={option.key}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
