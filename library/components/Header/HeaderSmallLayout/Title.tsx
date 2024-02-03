import { FC } from 'react';
import { Typography } from '../../Typography';
import { usePageContext } from '../context';

interface HeaderTitleProps {
    height: number;
}

export const HeaderTitle: FC<HeaderTitleProps> = (props) => {
    const { height } = props;
    const { pageContext } = usePageContext();

    return (
        <Typography
            variant="h1"
            size={24}
            loaderHeight={height}
            style={{
                height,
                lineHeight: `${height}px`,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                minWidth: '100%',
                width: '100%',
            }}
        >
            {pageContext.titleSmall || pageContext.title}
        </Typography>
    );
};
