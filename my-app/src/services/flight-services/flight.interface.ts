export interface IFlight {
  flight_number: number;
  mission_name: string;
  launch_year: string;
  launch_date_utc: string;
  rocket: {
    rocket_id: string;
    rocket_name: string;
  };
  launch_success: boolean;
  links: {
    mission_patch: string;
  };
  details: string;
  upcoming: boolean;
}
