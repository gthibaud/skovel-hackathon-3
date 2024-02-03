import { Button } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface ButtonGithubProps {
    to?: string;
    labelKey?: string;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
}

export const ButtonGithub: FC<ButtonGithubProps> = ({
    to = '/',
    labelKey = 'common.actions.viewSource',
    disabled = false,
    size = 'medium',
}) => {
    const { t } = useTranslation();
    return (
        <Button
            // endIcon={<GitHub />}
            target="_blank"
            href={to}
            size={size}
            variant="contained"
            disabled={disabled}
            sx={{
                backgroundColor: 'colors.github',
                '&:hover': { backgroundColor: 'colors.githubHover' },
            }}
        >
            {t(labelKey)}
        </Button>
    );
};
