import { alpha, Box } from '@mui/material';
import { UseQueryResult } from '@tanstack/react-query';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { getZIndex } from '../../utils/z-index';
import { Typography } from '../Typography';
import { ContentLayout } from './ContentLayout';
import { TabLayout, TabsLayout } from './Tabs';

interface DetailsLayoutProps {
    children: string | JSX.Element | JSX.Element[];
    actions?: string | JSX.Element | JSX.Element[];
    dynamicObject: UseQueryResult<any, unknown>;
    backTo?: string;
    backLabelKey?: string;
    backLabelValues?: Record<string, string>;
    titleObjectKey?: string;
    subTitleObjectKey?: string;
    titleErrorKey?: string;
    titlePrefix?: string;
    displayDescription?: boolean;
    descriptionObjectKey?: string;
    stickyHeader?: boolean;
    tabs?: TabLayout[];
}

export const DetailsLayout: FC<DetailsLayoutProps> = ({
    children,
    actions = <></>,
    dynamicObject,
    backTo,
    backLabelKey,
    backLabelValues,
    titleObjectKey = 'name',
    subTitleObjectKey = 'id',
    titleErrorKey = 'common.error.unknown',
    titlePrefix = '',
    displayDescription = false,
    descriptionObjectKey = 'description',
    stickyHeader = false,
    tabs,
}) => {
    const { t } = useTranslation();

    return (
        <>
            <Box
                sx={{
                    position: stickyHeader ? 'sticky' : 'relative',
                    top: 0,
                    // pt: stickyHeader ? 8 : 0,
                    pt: 8,
                    mx: stickyHeader ? -3 : 0,
                    px: stickyHeader ? 3 : 0,
                    backgroundColor: (theme) => `${alpha(theme.palette.background.default, 0.7)}`,
                    backdropFilter: 'blur(20px)',
                    boxShadow: (theme) =>
                        stickyHeader
                            ? `0 -12px 0px 12px ${theme.palette.background.default}`
                            : 'none',
                    zIndex: getZIndex('2'),
                }}
            >
                {/* <ButtonNavigationBack
                    to={backTo}
                    labelKey={backLabelKey}
                    labelValues={backLabelValues}
                /> */}
                <Box
                    sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'space-between' }}
                >
                    <Box>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                            mb={0.5}
                            isLoading={dynamicObject.isFetching}
                            loaderLength={200}
                            loaderHeight={42}
                            errorWhileLoading={dynamicObject.isError}
                            errorPlaceholder={t(titleErrorKey)}
                        >
                            {titlePrefix}
                            {dynamicObject.data?.[titleObjectKey]}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <Typography
                                // variant="code"
                                isLoading={dynamicObject.isFetching}
                                loaderLength={200}
                                loaderHeight={42}
                                errorWhileLoading={dynamicObject.isError}
                            >
                                {t('common.id', {
                                    id: dynamicObject.data?.[subTitleObjectKey] || '-',
                                })}
                            </Typography>
                            {displayDescription && ( // Divider
                                <Typography variant="body2">–</Typography>
                            )}
                            {displayDescription && (
                                <Typography
                                    variant="body2"
                                    isLoading={dynamicObject.isFetching}
                                    loaderLength={200}
                                    loaderHeight={42}
                                    errorWhileLoading={dynamicObject.isError}
                                >
                                    {dynamicObject.data?.[descriptionObjectKey]}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                    {actions}
                </Box>
                {tabs && (
                    <TabsLayout
                        tabs={tabs}
                        sx={{
                            mt: 1,
                        }}
                    />
                )}
            </Box>
            <ContentLayout>{children}</ContentLayout>
        </>
    );
};
