import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchListFlights } from '../../state/slices/spacex';
import { Loading } from '../../components/loading';
import { MessageBox } from '../../components/message-box';
import { CardList } from './components/card-list';
import { Container, Row } from 'react-bootstrap';

export const Home = () => {
  const {
    spacex: { flights, status, error },
  } = useAppSelector(state => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchListFlights());
  }, [dispatch]);

  return status === 'loading' ? (
    <Loading />
  ) : status === 'failed' ? (
    <MessageBox variant='warning'>{error}</MessageBox>
  ) : (
    <Container fluid className="fluid bg-light">
      <Row>
        <CardList flights={flights} />
      </Row>
    </Container>
  );
};
