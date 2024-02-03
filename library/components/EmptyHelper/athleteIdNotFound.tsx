import { useTheme } from '@emotion/react';
import { SearchNotFound } from 'gthibaud-icons-react';
import { t } from 'i18next';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { generateUri } from '../../../src/routes/uriMapping';
import { Button } from '../Button';
import { VerticalContainer } from '../Container/Vertical';
import { Typography } from '../Typography';
import { PageWrapper } from '../Wrappers/Page';

export const AthleteNotFoundHelper: FC = () => {
    const theme = useTheme();

    const { athleteId } = useParams<{ athleteId: string | undefined }>();

    return (
        <PageWrapper>
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
                    {t('components.emptyHelper.athleteIdNotFound.title', { athleteId })}
                </Typography>
                <Button to={generateUri('athletes')}>
                    {t('components.emptyHelper.athleteIdNotFound.action') || ''}
                </Button>
            </VerticalContainer>
        </PageWrapper>
    );
};
