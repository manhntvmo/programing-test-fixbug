import { Alert } from 'react-bootstrap';

interface MessageBoxProps {
  variant: string;
  children: string;
}

export const MessageBox = ({ variant, children }: MessageBoxProps) => {
  return <Alert variant={variant}>{children}</Alert>;
};
