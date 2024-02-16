import PropTypes from 'prop-types';

function Card({ id, title, description, image, onEdit, onDelete }) {
  return (
    <article
      className='rounded-md h-[336px] w-full bg-cover relative shadow-lg bg-center '
      style={{
        backgroundImage: `url('${image}')`,
      }}
    >
      <div
        className='absolute bottom-0 bg-white w-full p-6 cursor-default select-text'
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <div className='border-b'>
          <h2 className='text-xl font-bold mb-1'>{title}</h2>
          <p className='text-sm line-clamp-2 mb-3'>{description}</p>
        </div>
        <div className='flex justify-between pt-3'>
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
      </div>
    </article>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Card;
