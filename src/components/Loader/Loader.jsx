import s from './Loader.module.css';
import { ThreeDots } from 'react-loader-spinner';

const Loader = ({ isLoading }) => {
  return (
    <div className={s.loader}>
      <ThreeDots
        visible={isLoading}
        height='80'
        width='80'
        color='lightgrey'
        radius='9'
        ariaLabel='three-dots-loading'
        wrapperStyle={{}}
        wrapperClass=''
      />
    </div>
  );
};

export default Loader;
