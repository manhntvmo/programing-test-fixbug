import { Col, Form } from 'react-bootstrap';

interface MenusParam {
  value: string;
  title: string;
}

interface FilterListProps {
  variant: string;
  title: string;
  menus: MenusParam[];
  className?: string;
  onChangeDropdown(title: string, e: string): void;
}

export const FilterLists = ({ variant, title, menus, className, onChangeDropdown }: FilterListProps) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeDropdown(title, e.target.value);
  };

  return (
    <Form>
      <Form.Row>
        <p className="mt-2 ml-4">Launch Date</p>
        <Col xs='auto' className='my-1'>
          <Form.Label className='mr-sm-2' htmlFor='inlineFormCustomSelect' srOnly>
            Preference
          </Form.Label>
          <Form.Control
            as='select'
            className={className}
            id='inlineFormCustomSelect'
            custom
            onChange={handleSelectChange}
          >
            <option key={1} value={'all'}>
              All
            </option>
            {menus.map((menu, index) => (
              <option key={index + 1} value={menu.value}>
                {menu.title}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Form.Row>
    </Form>
  );
};
