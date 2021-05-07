import { Spinner } from 'react-bootstrap';

export const Loading = () => {
  return (
    <div className='vh-100'>
      <Spinner className='d-flex m-auto' animation='border' role='status'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  );
};
