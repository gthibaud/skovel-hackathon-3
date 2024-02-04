import { Box, IconButton, ListItem, ListItemProps, ListItemText, Skeleton } from '@mui/material';
import { TypographyTypeMap } from '@mui/material/Typography';
import { Copy } from 'gthibaud-icons-react';
import type { ElementType, FC, ReactNode } from 'react';
import { share } from '../../utils/share';
import { CodeBlock } from '../CodeBlock';
import { Typography } from '../Typography';

interface PropertyListItemProps extends ListItemProps {
    align?: string;
    children?: ReactNode;
    component?: ElementType;
    label: string;
    value?: ListItemProps['value'];
    valueJSX?: JSX.Element;
    type?: 'string' | 'code' | 'link';
    linkValue?: string;
    alignValue?: 'start' | 'end';
    valueStyle?: TypographyTypeMap['props']['variant'];
    isLoading?: boolean;
    errorWhileLoading?: boolean;
    disablePaddingX?: boolean;
    disablePaddingY?: boolean;
    errorPlaceholder?: string;
    isCodeBlock?: boolean;
    allowCopy?: boolean;
}

export const PropertyListItem: FC<PropertyListItemProps> = (props) => {
    const {
        align,
        children,
        component,
        value = '',
        valueJSX,
        label,
        type,
        valueStyle = type === 'code' ? 'code' : 'body1',
        alignValue = 'start',
        isLoading = false,
        errorWhileLoading = false,
        disablePaddingX = false,
        disablePaddingY = false,
        errorPlaceholder = '-',
        linkValue,
        isCodeBlock = false,
        allowCopy = false,
        ...other
    } = props;

    const renderValue = (): ReactNode => {
        switch (type) {
            case 'link':
                return <a href={linkValue}>{value}</a>;
            default:
                return value;
        }
    };

    return (
        <ListItem
            // component={component}
            disableGutters
            sx={{
                px: disablePaddingX ? 0 : 3,
                py: disablePaddingY ? 0 : 1.5,
            }}
            {...other}
        >
            <ListItemText
                disableTypography
                primary={
                    <Typography
                        color="textPrimary"
                        style={{ minWidth: align === 'vertical' ? 'inherit' : 180 }}
                        variant="subtitle2"
                    >
                        {label}
                    </Typography>
                }
                secondary={
                    <Box
                        sx={{
                            flex: 1,
                            mt: align === 'vertical' ? 0.5 : 0,
                            display: 'flex',
                            justifyContent: alignValue === 'start' ? 'flex-start' : 'flex-end',
                            my: 'auto',
                            mr: allowCopy ? '36px' : 'auto',
                        }}
                    >
                        {allowCopy && !isLoading && (
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    top: '5px',
                                    right: '24px',
                                    zIndex: 1,
                                    transition: 'all 0.1s ease-in-out',
                                }}
                                onClick={() => {
                                    const v = value
                                        ? value.toString()
                                        : valueJSX
                                          ? valueJSX?.toString()
                                          : '';
                                    share(v);
                                }}
                            >
                                <Copy
                                    sx={{
                                        width: 18,
                                    }}
                                />
                            </IconButton>
                        )}
                        {isLoading && (
                            <Skeleton
                                height={24}
                                width={'100%'}
                            />
                        )}
                        {errorWhileLoading && (
                            <Typography
                                errorWhileLoading={true}
                                errorPlaceholder={errorPlaceholder}
                                children={undefined}
                            />
                        )}
                        {isCodeBlock ? (
                            <CodeBlock>{value}</CodeBlock>
                        ) : (
                            children ||
                            (value && !isLoading && (
                                <Typography
                                    color={'inherit'}
                                    // variant={valueStyle}
                                >
                                    {renderValue()}
                                </Typography>
                            )) ||
                            (!isLoading && valueJSX && valueJSX)
                        )}
                    </Box>
                }
                sx={{
                    alignItems: 'baseline',
                    display: 'flex',
                    flexDirection: align === 'vertical' ? 'column' : 'row',
                    my: 0,
                }}
            />
        </ListItem>
    );
};
