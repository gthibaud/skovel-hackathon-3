import { FC } from 'react';
import { IconButton, IconButtonProps } from './Icon';

export const IconButtonRaw: FC<IconButtonProps> = (props) => (
    <IconButton
        {...props}
        raw
    />
);
