import { useTheme } from '@emotion/react';
import { FC } from 'react';
import { isUnderBreakpoint } from '../../hooks/useParentWidth';
import { EmojiButton } from '../Button/Emoji';
import { HorizontalContainer } from '../Container/Horizontal';
import { Surface } from '../Surface';
import { Tooltip } from '../Tooltip';
import { Typography } from '../Typography';

export type QuickReaction = {
    emoji: string;
    label: string;
};

export const defaultReactions: QuickReaction[] = [
    {
        emoji: '👏🏻',
        label: 'Bravo',
    },
    {
        emoji: '😮',
        label: 'Wow',
    },
    {
        emoji: '🔥',
        label: 'Fire',
    },
    {
        emoji: '🐐',
        label: 'Goat',
    },
    {
        emoji: '😍',
        label: 'Happy',
    },
    {
        emoji: '💪🏻',
        label: 'Force',
    },
];

interface QuickReactionsProps {
    floating?: boolean;
    open: boolean;
    onClick: (quickReaction: QuickReaction) => void;
    displayQuickReactionsText?: boolean;
    available?: boolean;
}

export const QuickReactions: FC<QuickReactionsProps> = (props) => {
    const {
        floating = true,
        open,
        onClick,
        displayQuickReactionsText = true,
        available = true,
    } = props;
    const theme = useTheme();
    const smallLayout = isUnderBreakpoint(undefined, 'sm');

    return (
        <Surface
            variant={floating ? 'default' : 'transparent'}
            paddingX={16}
            paddingY={8}
            gap={16}
            width={'min-content'}
            style={{
                marginRight: displayQuickReactionsText && !smallLayout ? 0 : 'auto',
                marginLeft: displayQuickReactionsText && !smallLayout ? 0 : 'auto',
            }}
        >
            <Tooltip title={available ? '' : 'Fill your name to send quick reactions'}>
                <HorizontalContainer
                    gap={16}
                    align="center"
                    width={'-webkit-max-content'}
                >
                    <Typography
                        w={500}
                        s={13}
                        color="link"
                        style={{
                            minWidth: 'max-content',
                            display: displayQuickReactionsText ? 'block' : 'none',
                            [theme.breakpoints.down('sm')]: {
                                display: 'none',
                            },
                        }}
                    >
                        Send a quick reaction:
                    </Typography>
                    <HorizontalContainer
                        gap={18}
                        width={'-webkit-max-content'}
                    >
                        {defaultReactions.map((quickReaction) => (
                            <EmojiButton
                                key={quickReaction.label}
                                emoji={quickReaction.emoji}
                                alt={quickReaction.label}
                                onClick={() => onClick(quickReaction)}
                                size={28}
                            />
                        ))}
                    </HorizontalContainer>
                </HorizontalContainer>
            </Tooltip>
        </Surface>
    );
};
