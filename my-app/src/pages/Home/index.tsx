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
import { getPageSize } from '../../helpers/paginate.util';
import { NUMBER_ITEM_PER_PAGES } from '../../constants/pagination';

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState({
    launchDate: 'all',
    launchSuccess: 'all',
  });
  const [pageIndex, setPageIndex] = useState(0);
  const [isNextPage, setIsNextPage] = useState(true);
  const {
    spacex: {
      data: { flights, pageSize },
      status,
      error,
    },
  } = useAppSelector(state => state);

  const dispatch = useAppDispatch();

  const handleInputChange = (value: string) => {
    setIsNextPage(false);
    setSearchTerm(value);
  };

  const handleFilterChange = (title: string, value?: string) => {
    const titleFilter = title === 'Launch Date' ? 'launchDate' : 'launchSuccess';

    setFilterBy(prevState => ({
      ...prevState,
      [titleFilter]: value,
    }));
    setIsNextPage(false);
  };

  const handlePageIndexChange = (index: number) => {
    setIsNextPage(true);
    setPageIndex(index);
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

    /**
     * When user is using pagination then isNextPage is true
     * When user is using search or filter then isNextPage is false
     */
    let nextPage = pageIndex;
    // Reset to first page when search or filter
    if (!isNextPage) {
      nextPage = 0;
      setPageIndex(0);
    }
    listParams += listParams
      ? `&limit=${NUMBER_ITEM_PER_PAGES}&offset=${10 * nextPage}`
      : `?limit=${NUMBER_ITEM_PER_PAGES}&offset=${10 * nextPage}`;

    return listParams;
  }, [searchTerm, filterBy.launchSuccess, filterBy.launchDate, pageIndex, isNextPage]);

  useEffect(() => {
    const listParamsUrl = getListParamsUrl();
    dispatch(fetchListFlights(listParamsUrl));
  }, [dispatch, getListParamsUrl]);

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
      ) : flights ? (
        flights.length > 0 ? (
          <>
            <Row className='mb-4'>
              <CardList flights={flights} />
            </Row>
          </>
        ) : (
          <MessageBox variant='warning'>Results not found!</MessageBox>
        )
      ) : null}
      <div className='d-flex justify-content-center'>
        {[...Array(getPageSize(pageSize, NUMBER_ITEM_PER_PAGES))].map((_: any, index: number) => (
          <Button
            key={index}
            className='rounded mx-1'
            variant={`${index === pageIndex ? 'primary' : 'secondary'}`}
            onClick={() => handlePageIndexChange(index)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </Container>
  );
};
