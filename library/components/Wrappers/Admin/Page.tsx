import { useTheme } from '@emotion/react';
import { ArrowOut } from 'gthibaud-icons-react';
import { FC } from 'react';
import { auth } from '../../../../src/api/firebase';
import { generateGravatarUrl } from '../../../api/gravatar';
import { Avatar } from '../../Avatar';
import { IconButton } from '../../Button/Icon';
import { HorizontalContainer } from '../../Container/Horizontal';
import { VerticalContainer } from '../../Container/Vertical';
import { Typography } from '../../Typography';

interface AdminPageWrapperProps {
    children: string | JSX.Element | JSX.Element[];
    title?: string | JSX.Element | null;
}

export const AdminPageWrapper: FC<AdminPageWrapperProps> = ({ children, title = 'Admin' }) => {
    const theme = useTheme();

    return (
        <VerticalContainer
            maxWidth="lg"
            gap={14}
            paddingTop={16}
            paddingBottom={22}
            paddingX={16}
            style={{
                [theme.breakpoints.down('sm')]: {
                    paddingBottom: '70px', // Add a padding to avoid the navbar to hide the content
                    paddingLeft: '12px',
                    paddingRight: '12px',
                },
            }}
        >
            <HorizontalContainer spaceBetween>
                <Typography
                    variant="h1"
                    fontWeight={700}
                    style={{
                        flexGrow: 1,
                    }}
                >
                    {title}
                </Typography>
                <HorizontalContainer
                    gap={8}
                    width={'min-content'}
                >
                    {auth.currentUser && (
                        <Avatar
                            src={generateGravatarUrl(auth.currentUser.email || '')}
                            alt={
                                auth.currentUser.displayName ||
                                auth.currentUser.email ||
                                'Connected'
                            }
                        />
                    )}
                    <IconButton
                        icon={ArrowOut}
                        background="secondary"
                        title="Log out"
                        onClick={() => auth.signOut()}
                    />
                </HorizontalContainer>
            </HorizontalContainer>
            {children}
        </VerticalContainer>
    );
};
