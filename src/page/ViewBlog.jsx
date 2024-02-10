import PropTypes from 'prop-types';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { doc, getDoc } from '@firebase/firestore';
import { db } from '../services/firebase';

function ViewBlog({
  data: { id } = {},
  onEdit,
  onDelete,
  onClickBuatBlog,
  onClickTitle,
}) {
  const [data, setData] = useState({});
  const { image, title, description } = data || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDoc(doc(db, 'posts', id));
        setData(response.data());
      } catch (e) {
        console.error('Error fetching document: ', e);
      }
    };
    fetchData();
  }, [id]);
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
    id: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClickBuatBlog: PropTypes.func.isRequired,
  onClickTitle: PropTypes.func.isRequired,
};

export default ViewBlog;
