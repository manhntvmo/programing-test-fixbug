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

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState({
    launchDate: '',
    launchSuccess: '',
  });
  const [listFlight, setListFlight] = useState<any>([]);
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

    const launchSuccessValue = filterBy.launchSuccess.toLowerCase() === 'Success' ? 'true' : 'false';
    listParams += filterBy.launchSuccess
      ? listParams
        ? `&launch_success=${launchSuccessValue}`
        : `?launch_success=${launchSuccessValue}`
      : '';

    const launchDateFromTo =
      filterBy.launchDate === 'last_week'
        ? getLastWeekStartEnd()
        : filterBy.launchDate === 'last_month'
        ? getLastMonthStartEnd()
        : getLastYearStartEnd();
    listParams += filterBy.launchDate
      ? listParams
        ? `&start=${launchDateFromTo.start}&end=${launchDateFromTo.end}`
        : `?start=${launchDateFromTo.start}&end=${launchDateFromTo.end}`
      : '';

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
      setListFlight(listFlightPagination[page]);
    }
  }, [flights, page, status]);

  return (
    <Container fluid className='fluid bg-light p-4'>
      <SearchBox placeholder='Search' onSearchChange={handleInputChange} />
      <div className='text-center mb-4'>
        <FilterLists
          variant='secondary'
          title='Launch Date'
          menus={menusLaunchDate}
          onChangeDropdown={handleFilterChange}
          className='mx-2'
        />
        <FilterLists
          variant='secondary'
          title='Launch Status'
          menus={menusLaunchStatus}
          onChangeDropdown={handleFilterChange}
          className='mx-2'
        />
      </div>
      {status === 'loading' ? (
        <Loading />
      ) : status === 'failed' ? (
        <MessageBox variant='warning'>{error}</MessageBox>
      ) : (
        <>
          <Row className="mb-4">
            <CardList flights={listFlight} />
          </Row>
        </>
      )}
      {listFlight && (
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
      )}
    </Container>
  );
};
