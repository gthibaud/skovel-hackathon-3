import { defaultReactions } from '.';

export const isQuickReaction = (message: string): boolean => {
    const cleanedMessage = message.trim().toLowerCase();

    for (const reaction of defaultReactions) {
        if (cleanedMessage === reaction.emoji) return true;
    }

    return false;
};
