import { useState } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchBoxProps {
  placeholder?: string;
  history: any;
}

export const SearchBox = ({ placeholder, history }: SearchBoxProps) => {
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <FormControl
          placeholder={placeholder}
          aria-label='Amount (to the nearest dollar)'
          onChange={e => setName(e.target.value)}
        />
        <InputGroup.Prepend>
          <Button variant='primary' type='submit'>
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </InputGroup.Prepend>
      </InputGroup>
    </Form>
  );
};
