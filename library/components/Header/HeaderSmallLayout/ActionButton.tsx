import { FC } from 'react';
import { Button } from '../../Button';
import { usePageContext } from '../context';

export const HeaderActionButton: FC = () => {
    const { pageContext } = usePageContext();

    // If there is no action, return null
    if (!pageContext.action) {
        return null;
    }

    return (
        <Button
            background="transparent"
            color="primary"
            endIcon={pageContext.action?.icon}
            textStyle={{
                fontSize: '16px',
                fontWeight: 500,
            }}
            style={{
                padding: '6px 4px',
            }}
            iconPadding={4}
            iconSize={18}
            onClick={pageContext.action?.onClick}
        >
            {pageContext.action.label}
        </Button>
    );
};
