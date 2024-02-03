export interface SelectProps {
    /** Can be selected / highlighted */
    disableUserSelect?: boolean;
    /** Can be selected / highlighted */
    disableSelect?: boolean;
}

export const generateUserSelect = (props: SelectProps): object => {
    const { disableUserSelect, disableSelect } = props;

    return disableUserSelect || disableSelect ? { userSelect: 'none' } : {};
};
