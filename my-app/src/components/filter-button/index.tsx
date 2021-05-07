import { useState } from 'react';
import { Button } from 'react-bootstrap';

interface FilterButtonProps {
  variantActive: string;
  variantInActive: string;
  title: string;
  value: string;
  className?: string;
  onClickButton(title: string, value: string): void;
}

export const FilterButton = ({
  variantActive,
  variantInActive,
  title,
  value,
  className,
  onClickButton,
}: FilterButtonProps) => {
  const [isActive, setIsActive] = useState(true);

  const handleClickButton = () => {
    setIsActive(!isActive);
    onClickButton(title, String(!isActive));
  };

  return (
    <Button
      className={className}
      variant={`${isActive ? variantActive : variantInActive}`}
      value={value}
      onClick={handleClickButton}
    >
      {title}
    </Button>
  );
};
