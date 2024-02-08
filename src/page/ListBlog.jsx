import PropTypes from 'prop-types';
import Card from '../components/Card';
function ListBlog({ data, onClickCard, onDelete, onEdit }) {
  return (
    <div className='grid grid-cols-2 xl:grid-cols-4 gap-4 p-9 '>
      {
        // Looping data untuk membuat Card
        // menggunakan Array map
        // https://www.w3schools.com/jsref/jsref_map.asp
        data.map((item) => (
          <button key={item.id} className='text-left' onClick={onClickCard}>
            <Card
              id={item.id}
              onDelete={onDelete}
              onEdit={onEdit}
              image={item.image}
              title={item.title}
              description={item.description}
            />
          </button>
        ))
      }
    </div>
  );
}

ListBlog.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClickCard: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ListBlog;
