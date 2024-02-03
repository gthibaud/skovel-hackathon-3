import { useTheme } from '@emotion/react';
import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '.';
import { VerticalContainer } from '../Container/Vertical';
import { Typography } from '../Typography';

export const QUICKLINK_HEIGHT = 80;

interface QuickLinkProps {
    label: string;
    link: string;
    icon: FC<any>;
    background?: string;
    columns?: number; // Number of columns in the quicklink grid. Defaults to 2 (2 quicklinks per row)
    onClick?: () => void; // Override the default link behavior
    fullWidth?: boolean;
}

export const Quicklink: FC<QuickLinkProps> = (props) => {
    const theme = useTheme();
    const {
        label,
        link,
        icon: Icon,
        background = theme.colors.surface.primary,
        columns = 2,
        onClick,
        fullWidth = false,
    } = props;
    const navigate = useNavigate();

    const handleClick = () => {
        // If the onClick prop is defined, call it
        if (onClick) {
            onClick();
            return;
        }

        // If the link is an external link, open it in a new tab
        if (link.startsWith('http')) {
            window.open(link, '_blank');
        } else {
            navigate(link);
        }
    };

    return (
        <Button
            key={label}
            style={{
                background,
                borderRadius: 16,
                padding: '12px 16px',
                height: QUICKLINK_HEIGHT,
                width: fullWidth ? '100%' : `calc(100%  / ${columns} - 5px)`,
                minWidth: 160,
            }}
            disableTitling
            onClick={handleClick}
        >
            <VerticalContainer
                spaceBetween
                height={'100%'}
            >
                <Icon
                    color="white"
                    size={28}
                    style={{
                        margin: 0,
                    }}
                />
                <Typography
                    variant="h1"
                    size={16}
                    weight={600}
                    color="white"
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                        minWidth: '-webkit-fill-available',
                        textAlign: 'start',
                    }}
                >
                    {label}
                </Typography>
            </VerticalContainer>
        </Button>
    );
};
