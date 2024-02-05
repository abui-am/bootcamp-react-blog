import { useState } from 'react';
import PropTypes from 'prop-types';

function CreateBlog({ handleCreate, handleClickBack }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <>
      <div className='flex justify-between pt-6 pb-6 pr-9 pl-9 border-b border-b-[rgba(0,0,0,0.3)]'>
        <button
          onClick={() => {
            handleClickBack();
          }}
          className='text-2xl font-semibold'
        >
          Kembali
        </button>
        <button
          className='px-6 py-2 bg-blue-500 text-white rounded'
          onClick={() => {
            handleCreate(title, description);
          }}
        >
          Confirm & Create
        </button>
      </div>
      <section className='max-w-[591px] w-full mx-auto'>
        <div className='pb-4 mb-10 border-b border-b-[rgba(0,0,0,0.3)]'>
          <h1 className='text-4xl font-bold mt-16'>Tambah Blog</h1>
        </div>
        <div>
          <label className='text-base font-semibold mb-2 block'>Judul</label>
          <input
            onChange={(ev) => setTitle(ev.target.value)}
            value={title}
            className='border w-full h-10 rounded py-1 px-3'
          />
        </div>
        <div className='mt-6'>
          <label className='text-base font-semibold mb-2 block'>Isi</label>
          <textarea
            rows={4}
            onChange={(ev) => setDescription(ev.target.value)}
            value={description}
            className='border w-full rounded py-1 px-3'
          />
        </div>
      </section>
    </>
  );
}

CreateBlog.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  handleClickBack: PropTypes.func.isRequired,
};

export default CreateBlog;
