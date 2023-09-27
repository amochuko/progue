import { Input, InputProps } from '../../input/input';

interface SearchProps extends InputProps {}

export const SearchForm = (props: SearchProps) => {
  return (
    <Input btnTitle={props.btnTitle} placeholderText={props.placeholderText} />
  );
};
