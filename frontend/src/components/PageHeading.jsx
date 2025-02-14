import { Button } from 'antd';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PageHeading = ({ title = 'Page title', className, path = null }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-base-200d relative mb-16 flex items-center justify-center rounded-md py-4 text-slate-700 ${className}`}
    >
      <div className="absolute left-2">
        {path ? (
          <Button type="text" onClick={() => navigate(path)}>
            <FaArrowLeft />
          </Button>
        ) : (
          <Button type="text" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </Button>
        )}
      </div>
      <h1 className="title-font text-base-contentd text-md text-center font-notosanslao font-bold md:text-3xl">
        {title}
      </h1>
    </div>
  );
};

export default PageHeading;
