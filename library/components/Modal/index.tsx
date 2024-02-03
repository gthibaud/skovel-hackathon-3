import { Modal as ModalMUI } from '@mui/material';
import { CloseColor } from 'gthibaud-icons-react';
import { FC, ReactElement } from 'react';
import { generateHeight, HeightProps } from '../../props/height';
import { IconButtonRaw } from '../Button/IconRaw';
import { HorizontalContainer } from '../Container/Horizontal';
import { Surface } from '../Surface';
import { Typography } from '../Typography';

interface ModalProps extends HeightProps {
    open: boolean;
    onClose: () => void;
    children: ReactElement;
    closeButton?: boolean;
    title?: string | null;
    ghost?: boolean; // If true, the modal will be transparent
}

export const Modal: FC<ModalProps> = (props): JSX.Element => {
    const { children, open, onClose, closeButton, title, ghost = false } = props;
    return (
        <ModalMUI
            open={open}
            onClose={onClose}
        >
            <div
                style={{
                    width: 'fit-content',
                    margin: 0,
                    position: 'relative',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    outline: 'none',
                }}
            >
                {ghost ? (
                    children
                ) : (
                    <Surface
                        px={22}
                        pt={18}
                        pb={22}
                        maxWidth={500}
                        height={generateHeight(props, 'auto')}
                        margin={16}
                        style={{
                            flexDirection: closeButton ? 'column' : 'row',
                        }}
                    >
                        {title ? (
                            <HorizontalContainer
                                fullWidth
                                spaceBetween
                                mb={12}
                            >
                                <Typography variant="h3">{title}</Typography>
                                <IconButtonRaw
                                    onClick={onClose}
                                    size={28}
                                    icon={CloseColor}
                                    title="Close"
                                    style={{
                                        margin: 0,
                                        height: 28,
                                    }}
                                />
                                {/* <IconButtonRaw
                                    icon={CrossCircleFill}
                                    color="link"
                                    size={18}
                                    style={{
                                        margin: 0,
                                        height: 18,
                                    }}
                                    title="Close"
                                    onClick={onClose}
                                /> */}
                            </HorizontalContainer>
                        ) : null}
                        {children}
                        {/* {closeButton ? (
                            <HorizontalContainer
                                fullWidth
                                justifyContent="end"
                                mt={22}
                            >
                                <Button
                                    onClick={onClose}
                                    background="accent"
                                    color="light"
                                    startIcon={CrossCircleFill}
                                >
                                    Close
                                </Button>
                            </HorizontalContainer>
                        ) : null} */}
                    </Surface>
                )}
            </div>
        </ModalMUI>
    );
};
