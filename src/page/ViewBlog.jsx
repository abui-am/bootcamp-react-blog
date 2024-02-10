import PropTypes from 'prop-types';
import Header from '../components/Header';

function ViewBlog({
  data: { id, title, description, image } = {},
  onEdit,
  onDelete,
  onClickBuatBlog,
  onClickTitle,
}) {
  return (
    <>
      <Header onClickBuatBlog={onClickBuatBlog} onClickTitle={onClickTitle} />
      <section className='max-w-[591px] w-full mx-auto mt-9'>
        <img
          src={image}
          alt={title}
          className='aspect-w-16 aspect-h-9 object-cover rounded mb-3'
        />
        <h1 className='text-4xl font-bold mb-6'>{title}</h1>
        <section id='action' className='flex mb-6 justify-between'>
          <div>2 Aug 2023</div>
          <div className='flex gap-6'>
            <button
              className='underline'
              onClick={() => {
                onEdit({
                  title,
                  description,
                  image,
                  id,
                });
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                onDelete(id);
              }}
              className='underline'
            >
              Hapus
            </button>
          </div>
        </section>
        <section id='content' className='text-base'>
          {description}
        </section>
      </section>
    </>
  );
}

ViewBlog.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClickBuatBlog: PropTypes.func.isRequired,
  onClickTitle: PropTypes.func.isRequired,
};

export default ViewBlog;
