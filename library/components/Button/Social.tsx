import { useTheme } from '@emotion/react';
import {
    EmailFill,
    Facebook,
    Instagram,
    Komoot,
    Link,
    Linkedin,
    Mapprogress,
    SkovelSquare,
    Spotify,
    Strava,
    Whatsapp,
} from 'gthibaud-icons-react';
import { ElementType, FC } from 'react';
import { Button, ButtonProps } from '.';

interface ButtonSocialProps {
    to?: string;
    social?:
        | 'instagram'
        | 'strava'
        | 'spotify'
        | 'linkedin'
        | 'whatsapp'
        | 'external'
        | 'komoot'
        | 'skovel'
        | 'email'
        | 'facebook'
        | 'mapprogress';
    label?: ButtonProps['children'];
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
    title?: ButtonProps['title'];
}

export const ButtonSocial: FC<ButtonSocialProps> = ({
    to = '/',
    social = 'instagram',
    disabled = false,
    size = 'medium',
    label = 'External link',
    title = '',
}) => {
    const theme = useTheme();

    const generateIcon = (): ElementType => {
        switch (social) {
            case 'instagram':
                return Instagram;
            case 'strava':
                return Strava;
            case 'spotify':
                return Spotify;
            case 'linkedin':
                return Linkedin;
            case 'whatsapp':
                return Whatsapp;
            case 'komoot':
                return Komoot;
            case 'mapprogress':
                return Mapprogress;
            case 'external':
                return Link;
            case 'skovel':
                return SkovelSquare;
            case 'email':
                return EmailFill;
            case 'facebook':
                return Facebook;
            default:
                return Link;
        }
    };

    const generateLabel = () => {
        switch (social) {
            case 'instagram':
                return 'Instagram';
            case 'strava':
                return 'Strava';
            case 'spotify':
                return 'Spotify';
            case 'linkedin':
                return 'Linkedin';
            case 'whatsapp':
                return 'Whatsapp';
            case 'komoot':
                return 'Komoot';
            case 'mapprogress':
                return 'MAProgress';
            case 'skovel':
                return 'Skovel';
            case 'external':
                return label;
            case 'email':
                return 'Email';
            case 'facebook':
                return 'Facebook';
            default:
                return label;
        }
    };

    const generateBackgroundColor = () => {
        switch (social) {
            case 'instagram':
                return '#D82F7E';
            case 'strava':
                return 'rgb(252, 82, 0)';
            case 'spotify':
                return '#1DB954';
            case 'linkedin':
                return 'rgb(10,102,194)';
            case 'whatsapp':
                return '#25D366';
            case 'external':
                return 'rgb(56,56,56)';
            case 'komoot':
                return 'rgb(156,222,78)';
            case 'email':
                return '#04AA6D';
            case 'mapprogress':
                return '#CB3631';
            case 'facebook':
                return '#4267B2';
            default:
                return 'rgb(56,56,56)';
        }
    };

    const generateFontColor = () => {
        switch (social) {
            case 'komoot':
                return 'rgb(56,56,56)';
            default:
                return 'white';
        }
    };

    return (
        <Button
            endIcon={generateIcon()}
            to={to}
            size={size}
            disabled={disabled}
            background={generateBackgroundColor()}
            color={generateFontColor()}
            title={title}
        >
            {generateLabel()}
        </Button>
    );
};
