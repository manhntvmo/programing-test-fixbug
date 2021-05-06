import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchListFlights } from '../../state/slices/spacex';
import { Loading } from '../../components/loading';
import { MessageBox } from '../../components/message-box';
import { CardList } from './components/card-list';
import { Container, Row } from 'react-bootstrap';
import { SearchBox } from '../../components/search-box';
import { useLocation, useParams } from 'react-router';

export const Home = () => {
  const { search } = useLocation();
  const searchTerm = search.split('name=')[1];

  const {
    spacex: { flights, status, error },
  } = useAppSelector(state => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchListFlights({ name: searchTerm }));
  }, [dispatch, searchTerm]);

  return (
    <Container fluid className='fluid bg-light p-4'>
      <SearchBox placeholder='Search' />
      {status === 'loading' ? (
        <Loading />
      ) : status === 'failed' ? (
        <MessageBox variant='warning'>{error}</MessageBox>
      ) : (
        <>
          <Row>
            <CardList flights={flights} />
          </Row>
        </>
      )}
    </Container>
  );
};
