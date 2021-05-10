import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchListFlights } from '../../state/slices/spacex';
import { Loading } from '../../components/loading';
import { MessageBox } from '../../components/message-box';
import { CardList } from './components/card-list';
import { Button, Container, Row } from 'react-bootstrap';
import { SearchBox } from '../../components/search-box';
import { menusLaunchDate, menusLaunchStatus } from './constants/menu';
import { FilterLists } from '../../components/filter-list';
import { getLastMonthStartEnd, getLastWeekStartEnd, getLastYearStartEnd } from '../../helpers/date.util';
import { paginate } from '../../helpers/paginate.util';
import { IFlight } from '../../services/flight-services/flight.interface';

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState({
    launchDate: 'all',
    launchSuccess: 'all',
  });
  const [listFlight, setListFlight] = useState<IFlight[] | null>(null);
  const [page, setPage] = useState(0);
  const [totalPage, setTotagPage] = useState<any>([]);
  
  const {
    spacex: { flights, status, error },
  } = useAppSelector(state => state);
  const dispatch = useAppDispatch();

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (title: string, value?: string) => {
    const titleFilter = title === 'Launch Date' ? 'launchDate' : 'launchSuccess';

    setFilterBy(prevState => ({
      ...prevState,
      [titleFilter]: value,
    }));
  };

  const getListParamsUrl = useCallback(() => {
    let listParams = '';
    listParams += searchTerm ? `?rocket_name=${searchTerm}` : '';

    const launchSuccessValue =
      filterBy.launchSuccess === 'success' ? 'true' : filterBy.launchSuccess === 'failure' ? 'false' : 'all';
    listParams +=
      filterBy.launchSuccess === 'all'
        ? ''
        : listParams
        ? `&launch_success=${launchSuccessValue}`
        : `?launch_success=${launchSuccessValue}`;

    const launchDateFromTo =
      filterBy.launchDate === 'last_week'
        ? getLastWeekStartEnd()
        : filterBy.launchDate === 'last_month'
        ? getLastMonthStartEnd()
        : filterBy.launchDate === 'last_year'
        ? getLastYearStartEnd()
        : { start: '', end: '' };
    listParams +=
      filterBy.launchDate === 'all'
        ? ''
        : listParams
        ? `&start=${launchDateFromTo.start}&end=${launchDateFromTo.end}`
        : `?start=${launchDateFromTo.start}&end=${launchDateFromTo.end}`;

    return listParams;
  }, [searchTerm, filterBy.launchSuccess, filterBy.launchDate]);

  useEffect(() => {
    const listParamsUrl = getListParamsUrl();
    dispatch(fetchListFlights(listParamsUrl));
    setPage(0);
  }, [dispatch, getListParamsUrl]);

  useEffect(() => {
    if (status === 'success') {
      const listFlightPagination = paginate(flights, 12);
      setTotagPage(listFlightPagination);
      setListFlight(listFlightPagination.length > 0 ? listFlightPagination[page] : []);
    }
  }, [flights, page, status]);

  return (
    <Container fluid className='fluid min-vh-100 bg-light p-4'>
      <SearchBox placeholder='Search' onSearchChange={handleInputChange} />
      <div className='d-md-flex d-sm-block justify-content-center mb-4'>
        <FilterLists
          variant='secondary'
          title='Launch Date'
          menus={menusLaunchDate}
          onChangeDropdown={handleFilterChange}
        />
        <FilterLists
          variant='secondary'
          title='Launch Status'
          menus={menusLaunchStatus}
          onChangeDropdown={handleFilterChange}
        />
      </div>
      {status === 'loading' ? (
        <Loading />
      ) : status === 'failed' ? (
        <MessageBox variant='warning'>{error}</MessageBox>
      ) : listFlight ? (
        listFlight.length > 0 ? (
          <>
            <Row className='mb-4'>
              <CardList flights={listFlight} />
            </Row>
          </>
        ) : (
          <MessageBox variant='warning'>Results not found!</MessageBox>
        )
      ) : null}
      {listFlight && listFlight.length > 0 ? (
        <div className='d-flex justify-content-center'>
          {totalPage.map((_: any, index: number) => (
            <Button
              key={index}
              className='rounded mx-1'
              variant={`${index === page ? 'primary' : 'secondary'}`}
              onClick={() => setPage(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      ) : null}
    </Container>
  );
};
