import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { uuidv4 } from '@firebase/util';
import { storage } from '../services/firebase';

function CreateBlog({
  handleCreate,
  handleClickBack,
  defaultData,
  handleEdit,
}) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  // convert url to image
  const [imageFile, setImage] = useState();
  const [imageUrlPreview, setImageUrlPreview] = useState(
    'https://source.unsplash.com/random'
  );

  useEffect(() => {
    const setData = async () => {
      setTitle(defaultData.title);
      setDescription(defaultData.description);
      setImageUrlPreview(defaultData.image);
    };
    if (defaultData) {
      setData();
    }
  }, [defaultData]);

  // Cek apakah sedang dalam mode edit dengan melihat apakah ada data default id atau tidak
  const isEdit = defaultData?.id;

  async function handleOnClickConfirm() {
    let image = imageUrlPreview;
    if (imageFile) {
      try {
        const file = await uploadBytes(
          ref(storage, `posts/image/${uuidv4()}`),
          imageFile
        );
        image = await getDownloadURL(file.ref);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }

    if (isEdit) {
      handleEdit({
        title,
        description,
        image: image,
        id: defaultData.id,
      });
    } else {
      handleCreate({
        title,
        description,
        image: image,
      });
    }
  }
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
          onClick={handleOnClickConfirm}
        >
          Confirm & {isEdit ? 'Edit' : 'Create'}
        </button>
      </div>
      <section className='max-w-[591px] w-full mx-auto'>
        <div className='pb-4 mb-10 border-b border-b-[rgba(0,0,0,0.3)]'>
          <h1 className='text-4xl font-bold mt-16'>Tambah Blog</h1>
        </div>
        <div>
          <label className='text-base font-semibold mb-2 block'>Judul</label>
          <input
            placeholder='Masukkan judul blog'
            onChange={(ev) => setTitle(ev.target.value)}
            value={title}
            className='border w-full h-10 rounded py-1 px-3'
          />
        </div>
        <div className='mt-6'>
          <label className='text-base font-semibold mb-2 block'>Isi</label>
          <textarea
            placeholder='Masukkan isi blog'
            rows={4}
            onChange={(ev) => setDescription(ev.target.value)}
            value={description}
            className='border w-full rounded py-1 px-3'
          />
        </div>
        <div className='mt-6'>
          <label className='text-base font-semibold mb-2 block'>Gambar</label>

          <img
            src={imageUrlPreview}
            className='aspect-video object-cover rounded mb-3'
            alt='preview'
          />

          <input
            type='file'
            accept='image/*'
            onChange={(ev) => {
              setImageUrlPreview(convertImageToUrl(ev.target.files[0]));
              setImage(ev.target.files[0]);
            }}
          />
        </div>
      </section>
    </>
  );
}

function convertImageToUrl(image) {
  return image
    ? URL.createObjectURL(image)
    : 'https://source.unsplash.com/random';
}

CreateBlog.propTypes = {
  handleCreate: PropTypes.func,
  handleClickBack: PropTypes.func.isRequired,
  defaultData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.number,
  }),
  handleEdit: PropTypes.func,
};

export default CreateBlog;
