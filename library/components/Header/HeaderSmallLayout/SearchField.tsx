import { FC } from 'react';
import { Container } from '../../Container';
import { SearchField } from '../../SearchField';
import { usePageContext } from '../context';

interface HeaderSearchFieldProps {
    height: number;
}

export const HeaderSearchField: FC<HeaderSearchFieldProps> = (props) => {
    const { height } = props;
    const { pageContext } = usePageContext();

    if (!pageContext.searchField) {
        return null;
    }

    return (
        <Container
            height={height}
            paddingTop={4}
        >
            <SearchField {...pageContext.searchField} />
        </Container>
    );
};
