import PropTypes from 'prop-types';

function Card({ title, description }) {
  return (
    <article
      className='rounded-md h-[336px] w-full bg-cover relative shadow-lg'
      style={{
        backgroundImage: 'url(https://source.unsplash.com/random/800x600)',
      }}
    >
      <div className='absolute bottom-0 bg-white w-full p-6'>
        <div className='border-b'>
          <h2 className='text-xl font-bold mb-1'>{title}</h2>
          <p className='text-sm line-clamp-2 mb-3'>{description}</p>
        </div>
        <div className='flex justify-between pt-3'>
          <button className='underline'>Edit</button>
          <button className='underline'>Hapus</button>
        </div>
      </div>
    </article>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card;
