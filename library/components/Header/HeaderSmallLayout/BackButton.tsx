import { useTheme } from '@emotion/react';
import { ChevronLeft } from 'gthibaud-icons-react';
import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../Button';
import { usePageContext } from '../context';

export const HeaderBackButton: FC = () => {
    const { pageContext } = usePageContext();
    const theme = useTheme();
    const navigate = useNavigate();

    const handleClick = () => {
        // TODO If the user started the session, we redirect him to the home page
        navigate(-1);
    };

    if (pageContext.showBackButtonSmall || pageContext.showBackButton) {
        return (
            <Button
                background="transparent"
                color="primary"
                startIcon={ChevronLeft}
                textStyle={{
                    fontSize: '16px',
                    fontWeight: 500,
                }}
                style={{
                    padding: 0,
                    margin: 0,
                }}
                iconStyle={{
                    color: theme.colors.text.primary,
                }}
                iconPadding={2}
                iconSize={16}
                onClick={handleClick}
            >
                Back
            </Button>
        );
    }

    return null;
};
