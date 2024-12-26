import s from './LoadMoreBtn.module.css';

interface LoadMoreProps {
  onLoadMore: () => void;
  isLoading: boolean;
}

const LoadMoreBtn: React.FC<LoadMoreProps> = ({ onLoadMore, isLoading }) => {
  return (
    <button className={s.LoadMoreBtn} onClick={onLoadMore} disabled={isLoading}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
