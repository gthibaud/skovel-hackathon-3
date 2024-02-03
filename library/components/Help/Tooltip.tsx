import { QuestionMarkCircleFill } from 'gthibaud-icons-react';
import { FC } from 'react';
import { NotAvailableTooltip } from '../NotAvailable/tooltip';
import { Tooltip } from '../Tooltip';

interface HelpTooltipProps {
    message: string;
    featureName?: string;
    upvoteText?: string;
    sx?: any;
}

export const HelpTooltip: FC<HelpTooltipProps> = ({
    message,
    featureName,
    upvoteText = 'Vote for this feature',
    sx,
}) => {
    return featureName ? (
        <NotAvailableTooltip
            message={message}
            voteLabel={upvoteText}
            featureName={featureName}
        >
            <QuestionMarkCircleFill sx={{ color: 'icon.default', height: 21, ...sx }} />
        </NotAvailableTooltip>
    ) : (
        <Tooltip title={message}>
            <QuestionMarkCircleFill sx={{ color: 'icon.default', height: 21, ...sx }} />
        </Tooltip>
    );
};
