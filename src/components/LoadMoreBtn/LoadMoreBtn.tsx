import s from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onLoadMore, isLoading }) => {
  return (
    <button className={s.LoadMoreBtn} onClick={onLoadMore} disabled={isLoading}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
