import { useTheme } from '@emotion/react';
import { CloseColor, CloseColorDark } from 'gthibaud-icons-react';
import { FC } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { isUnderBreakpoint } from '../../hooks/useParentWidth';
import { IconButton } from '../Button/Icon';
import { HorizontalContainer } from '../Container/Horizontal';
import { VerticalContainer } from '../Container/Vertical';
import { Modal } from '../Modal';
import { Typography } from '../Typography';
import './react-spring-bottom-sheet.css';

interface ActionOverlayProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children?: JSX.Element | JSX.Element[];
    snapPoints?: (props: { maxHeight: number }) => number[];
}

/**
 * A modal that is used to display actions to the user.
 * Depending on the screen size, it will either be a modal (desktop) or a bottom sheet (mobile).
 */
export const ActionOverlay: FC<ActionOverlayProps> = (props) => {
    const { open, onClose, title, children, snapPoints } = props;
    const theme = useTheme();

    const smallLayout = isUnderBreakpoint(undefined, 'sm');

    if (smallLayout) {
        return (
            <BottomSheet
                open={open}
                onDismiss={onClose}
                snapPoints={snapPoints}
                defaultSnap={({ maxHeight }) => maxHeight / 2}
                expandOnContentDrag
                header={
                    <HorizontalContainer
                        spaceBetween
                        align="start"
                    >
                        <Typography
                            size={22}
                            weight={700}
                        >
                            {title}
                        </Typography>
                        <IconButton
                            raw
                            onClick={onClose}
                            size={30}
                            icon={theme.isLightTheme ? CloseColor : CloseColorDark}
                            title="Close"
                            padding={0}
                        />
                    </HorizontalContainer>
                }
            >
                <VerticalContainer
                    px={20}
                    pb={16}
                    gap={4}
                >
                    {children}
                </VerticalContainer>
            </BottomSheet>
        );
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeButton
            title={title}
        >
            <VerticalContainer
                gap={12}
                justifyContent="start"
            >
                {children}
            </VerticalContainer>
        </Modal>
    );
};
