import { Badge } from 'react-bootstrap';

interface StatusProps {
  variant: string;
  children: string;
}

export const Status = ({ variant, children }: StatusProps) => {
  return <Badge variant={variant}>{children}</Badge>;
};
