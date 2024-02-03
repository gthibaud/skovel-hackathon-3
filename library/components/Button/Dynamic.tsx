import { Box, Button, CircularProgress } from '@mui/material';
import { UseQueryResult } from '@tanstack/react-query';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface DynamicButtonProps {
    to?: string;
    onClick?: () => void;
    labelKey?: string;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
    dynamicObject: UseQueryResult<any, unknown>;
    sx?: any;
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
    isLoading?: boolean;
}

export const DynamicButton: FC<DynamicButtonProps> = ({
    to,
    onClick,
    labelKey = 'common.actions.viewSource',
    disabled = false,
    size = 'medium',
    dynamicObject,
    sx,
    endIcon,
    startIcon,
    isLoading,
}) => {
    const { t } = useTranslation();
    return isLoading ? (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress
                size={22}
                thickness={8}
                sx={{ my: 1 }}
            />
        </Box>
    ) : (
        <Button
            endIcon={endIcon}
            startIcon={startIcon}
            size={size}
            onClick={onClick || (() => window.open(to, '_blank'))}
            variant="contained"
            disabled={!dynamicObject.isSuccess || disabled}
            sx={{ ...sx }}
        >
            {t(labelKey)}
        </Button>
    );
};
