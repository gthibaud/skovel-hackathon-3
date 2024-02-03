import { useTheme } from '@emotion/react';
import { SearchNotFound } from 'gthibaud-icons-react';
import { t } from 'i18next';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { generateUri } from '../../../src/routes/uriMapping';
import { Button } from '../Button';
import { VerticalContainer } from '../Container/Vertical';
import { Typography } from '../Typography';

export const EventNotFoundHelper: FC = () => {
    const theme = useTheme();

    const { eventId } = useParams();

    return (
        <VerticalContainer
            gap={18}
            align="center"
            pt={32}
        >
            <SearchNotFound
                size={32}
                color={theme.colors.text.link}
                style={{
                    margin: 0,
                }}
            />
            <Typography
                color="light"
                weight={500}
                textAlign="center"
            >
                {t('components.emptyHelper.eventNotFound.title', { eventId })}
            </Typography>
            <Button to={generateUri('events')}>
                {t('components.emptyHelper.eventNotFound.action') || ''}
            </Button>
        </VerticalContainer>
    );
};
