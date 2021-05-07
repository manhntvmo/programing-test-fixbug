import { useState } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';

interface SearchBoxProps {
  placeholder?: string;
  onSearchChange(value: string): void;
}

export const SearchBox = ({ placeholder, onSearchChange }: SearchBoxProps) => {
  const [name, setName] = useState<string>('');
  // const history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // history.push(`search?name=${name}`);
    onSearchChange(name);
  };

  return (
    <Form className='w-50 m-auto' onSubmit={handleSubmit}>
      <InputGroup className='mb-5'>
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
