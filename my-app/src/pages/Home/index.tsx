import { SearchBox } from '../../components/search-box';

interface HomeProps {
  history: any;
}

export const Home = ({ history }: HomeProps) => {
  return (
    <>
      <SearchBox placeholder='Search' history={history} />
    </>
  );
};
