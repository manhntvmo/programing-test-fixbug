import { Card } from 'react-bootstrap';
import { Status } from '../../../../../components/status';
import { formatDate } from '../../../../../helpers/date.util';
import { IFlight } from '../../../../../services/flight-services/flight.interface';

interface CardFlightProps {
  flight: IFlight;
}

export const CardFlight = ({ flight }: CardFlightProps) => {
  return (
    <Card className='m-auto w-75 h-100 rounded shadow'>
      <Card.Img src={flight.links.mission_patch} />
      <Card.Body>
        <Card.Title>{flight.mission_name}</Card.Title>
        <Card.Text>{flight.rocket.rocket_name}</Card.Text>
        <Card.Text className='text-truncate'>{formatDate(flight.launch_date_utc)}</Card.Text>
        {flight.launch_success ? (
          <h4>
            <Status variant='success'>Success</Status>
          </h4>
        ) : (
          <h4>
            <Status variant='warning'>Fail</Status>
          </h4>
        )}
      </Card.Body>
    </Card>
  );
};
