import { useTheme } from '@emotion/react';
import { SearchNotFound } from 'gthibaud-icons-react';
import { FC } from 'react';
import { VerticalContainer } from '../Container/Vertical';
import { Typography } from '../Typography';

interface ErrorLoadingImagePlaceholderProps {
    height: number;
}

export const ErrorLoadingImagePlaceholder: FC<ErrorLoadingImagePlaceholderProps> = (props) => {
    const theme = useTheme();

    return (
        <VerticalContainer
            gap={18}
            align="center"
        >
            <SearchNotFound
                size={32}
                color={theme.colors.text.link}
                style={{
                    margin: 0,
                }}
            />
            <Typography
                color="link"
                weight={500}
                textAlign="center"
            >
                Image not found
            </Typography>
            {/* <Button onClick={() => navigate(0)}>Refresh page</Button> */}
        </VerticalContainer>
    );
};
