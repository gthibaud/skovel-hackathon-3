import { Skeleton } from '@mui/material';
import { UseQueryResult } from '@tanstack/react-query';
import { ChevronRight, HomeFill } from 'gthibaud-icons-react';
import type { FC } from 'react';
import React from 'react';
import toast from 'react-hot-toast';
import { generateUri } from '../../../src/routes/uriMapping';
import { Refresh } from '../../icons/refresh';
import { Button } from '../Button';
import { IconButton } from '../Button/Icon';
import { HorizontalContainer } from '../Container/Horizontal';
import { VerticalContainer } from '../Container/Vertical';
import { Divider } from '../Divider';
import { Typography } from '../Typography';

export interface CardHeaderProps {
    title?: string | React.ReactNode;
    seeMoreKey?: string;
    action?: React.ReactNode;
    isLoading?: boolean;
    refreshable?: boolean;
    dynamicObject?: UseQueryResult<any, unknown>;
    divider?: boolean;
}

export const CardHeader: FC<CardHeaderProps> = (props) => {
    const {
        title,
        action,
        seeMoreKey,
        isLoading = false,
        refreshable = false,
        dynamicObject,
        divider = false,
    } = props;

    if (title || refreshable) {
        return (
            <VerticalContainer fullWidth>
                <HorizontalContainer
                    pl={20}
                    pr={6}
                    pt={10}
                    pb={8}
                    spaceBetween
                >
                    {isLoading || (dynamicObject && dynamicObject.isFetching) ? (
                        <Skeleton
                            height={36}
                            animation="wave"
                            sx={{ maxWidth: 200, my: -1 }}
                        />
                    ) : (
                        <Typography
                            variant="h6"
                            fontSize={17}
                            color="body"
                        >
                            {title}
                        </Typography>
                    )}
                    {refreshable ? (
                        <>
                            {action}
                            {isLoading || (dynamicObject && dynamicObject.isFetching) ? (
                                <IconButton
                                    isLoading
                                    icon={HomeFill}
                                    title="Loading"
                                />
                            ) : (
                                //     <CircularProgress
                                //         thickness={6}
                                //         size={24}
                                //     />
                                // </IconButton>
                                <IconButton
                                    onClick={() => {
                                        // Refetch dynamic object
                                        dynamicObject &&
                                            dynamicObject
                                                .refetch()
                                                .then(() =>
                                                    toast.success(
                                                        `Refreshed at ${new Date().toLocaleTimeString()}`,
                                                    ),
                                                );
                                    }}
                                    icon={Refresh}
                                    title="Refresh"
                                />
                            )}
                        </>
                    ) : seeMoreKey ? (
                        <Button
                            to={generateUri(seeMoreKey)}
                            endIcon={ChevronRight}
                            color="link"
                            iconSize={11}
                            iconPadding={4}
                            background="transparent"
                            style={{
                                fontWeight: '500',
                                fontSize: '13px',
                            }}
                        >
                            See more
                        </Button>
                    ) : (
                        action
                    )}
                </HorizontalContainer>
                {divider && <Divider />}
            </VerticalContainer>
        );
    }

    return null;
};
