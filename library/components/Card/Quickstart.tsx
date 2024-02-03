import styled from '@emotion/styled';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { ArrowRight } from '../../icons/arrow-right';
import { getZIndex } from '../../utils/z-index';

interface BrandCardProps {
    title: string;
    description: string;
    logo: JSX.Element;
    to: string;
}

const CardIcon = styled.div`
    width: 32px;
    height: 40px;
    margin: 0px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Content = styled.div`
    height: 40px;
    flex-grow: 1;
`;

export const QuickstartCard: FC<BrandCardProps> = ({ title, description, logo, to }) => {
    const router = useRouter();

    return (
        <Card
            variant="outlined"
            sx={{ p: 0, m: 0, zIndex: getZIndex('1') }}
        >
            <CardActionArea
                onClick={() => router.push(to)}
                sx={{ py: '20px', px: 0, m: 0 }}
            >
                <CardContent
                    sx={{
                        p: 0,
                        m: 0,
                        display: 'flex',
                        flexDirection: 'row',
                        width: '280px',
                        color: 'icon.default',
                    }}
                >
                    <CardIcon>{logo}</CardIcon>
                    <Content>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: '14px',
                                fontWeight: '500',
                                color: 'text.primary',
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: '12px',
                                color: 'text.secondary',
                            }}
                        >
                            {description}
                        </Typography>
                    </Content>
                    <CardIcon>
                        <ArrowRight sx={{ width: 20, color: 'icon.default' }} />
                    </CardIcon>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
