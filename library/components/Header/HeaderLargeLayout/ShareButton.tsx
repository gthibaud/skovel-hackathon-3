import { Share } from 'gthibaud-icons-react';
import { FC } from 'react';
import { share } from '../../../utils/share';
import { Button } from '../../Button';
import { usePageContext } from '../context';

export const HeaderShareButton: FC = () => {
    const { pageContext } = usePageContext();

    // If there is no action, return null
    if (!pageContext.share) {
        return null;
    }

    const handleClick = () => {
        share(
            pageContext.share?.link || window.location.href,
            pageContext.share?.label || pageContext.title?.toString() || '',
        );
    };

    return (
        <Button
            background="transparent"
            color="primary"
            endIcon={Share}
            textStyle={{
                fontSize: '16px',
                fontWeight: 500,
            }}
            style={{
                padding: '6px 4px',
            }}
            iconPadding={4}
            iconSize={18}
            onClick={handleClick}
        >
            Share
        </Button>
    );
};
