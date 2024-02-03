import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import { FC } from 'react';
import { Card } from '../../Card/Card';
import { VerticalContainer } from '../../Container/Vertical';
import { WidgetWrapperProps } from './props';

export const WidgetWrapper: FC<WidgetWrapperProps> = (props) => {
    const {
        title,
        seeMoreKey,
        children,
        style,
        type,
        disableCorners = false,
        disableBorders = false,
    } = props;

    const theme = useTheme();

    if (type === 'map')
        return (
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: disableCorners ? 0 : theme.radius.large,
                    border: disableBorders ? 'none' : theme.divider.primary,
                    overflow: 'hidden',
                }}
            >
                {children}
            </Box>
        );

    return (
        <Card
            title={title}
            seeMoreKey={seeMoreKey}
            innerRef={props.innerRef}
            style={{
                borderRadius: disableCorners ? 0 : theme.radius.large,
            }}
            {...props}
        >
            <VerticalContainer
                px={20}
                pb={16}
                style={style}
            >
                {children}
            </VerticalContainer>
        </Card>
    );
};
