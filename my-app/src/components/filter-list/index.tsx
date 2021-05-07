import { useState } from 'react';
import { DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';

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
  const [value, setValue] = useState('');

  const handleSelectChange = (e: any) => {
    setValue(e);
    onChangeDropdown(title, e);
  };

  return (
    <DropdownButton
      as={ButtonGroup}
      key={variant}
      id={`dropdown-variants-${variant}`}
      className={className}
      variant={variant.toLowerCase()}
      title={title}
      value={value}
      onSelect={handleSelectChange}
    >
      {menus.map((menu, index) => (
        <Dropdown.Item key={index} eventKey={menu.value} active={menu.value === value ? true : false}>
          {menu.title}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};
