import { t } from 'i18next';
import { FC } from 'react';
import { Tooltip } from '../Tooltip';

interface TooltipProps {
    message?: string | JSX.Element;
    children: JSX.Element;
    voteLabel?: string;
    featureName: string;
    disabled?: boolean;
}

export const NotAvailableTooltip: FC<TooltipProps> = ({
    message = t('base.feedbacks.notAvailable'),
    voteLabel = 'Vote for this feature',
    featureName: voteFeatureName,
    disabled = false,
    children,
}) => {
    return (
        <Tooltip
            title={message}
            buttonLabel={voteLabel}
            buttonTo={`mailto:support@skovel.com?subject=Feature request +1&body=${voteFeatureName}`}
            disabled={disabled}
        >
            {children}
        </Tooltip>
    );
};
