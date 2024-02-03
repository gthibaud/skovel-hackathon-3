import { Box, Card, CardContent, CardHeader, Collapse, Typography } from '@mui/material';
import { ExclamationCircleFill } from 'gthibaud-icons-react';
import type { FC } from 'react';

interface WarningCardProps {
    title: string;
    description: string;
    visible?: boolean;
}

export const WarningCard: FC<WarningCardProps> = ({
    title = 'Warning',
    description,
    visible = false,
}) => {
    return (
        <Collapse in={visible}>
            <Card
                variant="outlined"
                sx={{
                    background: '#E3F0FF',
                    borderColor: '#BFDCFF',
                    borderWidth: 2,
                    color: '#0A77FF',
                }}
            >
                <CardHeader
                    title={
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <ExclamationCircleFill /> {title}
                        </Box>
                    }
                    sx={{ pb: 1 }}
                />
                <CardContent sx={{ pt: 0, pb: 0, '&:last-child': { pb: 2 } }}>
                    <Typography
                        variant="body2"
                        color="#0A77FF"
                    >
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </Collapse>
    );
};
