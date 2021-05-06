import { CardFlight } from './card-flight';
import { IFlight } from '../../../../services/flight-services/flight.interface';
import { Col } from 'react-bootstrap';

interface CardListProps {
  flights: IFlight[];
}

export const CardList = ({ flights }: CardListProps) => {
  return (
    <>
      {flights &&
        flights.map(flight => (
          <Col key={`${flight.flight_number}-${flight.launch_date_utc}`} className='text-centerm mb-4' xs={12} sm={6} md={4} lg={3} >
            <CardFlight flight={flight} />
          </Col>
        ))}
    </>
  );
};
