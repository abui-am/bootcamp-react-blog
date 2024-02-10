import PropTypes from 'prop-types';
import Card from '../components/Card';
import Header from '../components/Header';
function ListBlog({
  data,
  onClickCard,
  onDelete,
  onEdit,
  onClickBuatBlog,
  onClickTitle,
}) {
  return (
    <>
      <Header onClickBuatBlog={onClickBuatBlog} onClickTitle={onClickTitle} />

      <section id='head' className='my-16  text-center'>
        <h1 className='text-4xl font-bold mb-2'>
          Selamat Datang di Blog Saya!
        </h1>
        <p>Ini adalah tempat saya menulis blog.</p>
      </section>
      <div className='grid grid-cols-2 xl:grid-cols-4 gap-4 p-9 '>
        {
          // Looping data untuk membuat Card
          // menggunakan Array map
          // https://www.w3schools.com/jsref/jsref_map.asp
          data.map((item) => (
            <button
              key={item.id}
              className='text-left'
              onClick={() => {
                onClickCard(item.id);
              }}
            >
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
    </>
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
  onClickBuatBlog: PropTypes.func.isRequired,
  onClickTitle: PropTypes.func.isRequired,
};

export default ListBlog;
