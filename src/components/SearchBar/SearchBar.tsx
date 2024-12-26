import s from './SearchBar.module.css';
import { Formik, Form, Field } from 'formik';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const initialValues = {
    query: '',
  };

  return (
    <div className={s.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values.query)}
      >
        <Form className={s.form}>
          <Field
            name='query'
            type='text'
            placeholder='Search images and photos'
          />
          <button type='submit'>Search</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
