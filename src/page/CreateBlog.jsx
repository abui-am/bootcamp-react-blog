import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { doc, getDoc } from 'firebase/firestore';
import { db, storage } from '../config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { uuidv4 } from '@firebase/util';
function CreateBlog({
  handleCreate,
  handleClickBack,
  defaultData,
  handleEdit,
}) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  // convert url to image
  const [image, setImage] = useState();
  const [imageUrlPreview, setImageUrlPreview] = useState(
    'https://source.unsplash.com/random'
  );

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, 'posts', defaultData.id);
      const docSnap = await getDoc(docRef);

      const data = { id: docSnap.id, ...docSnap.data() };
      setTitle(data.title);
      setDescription(data.description);
      setImageUrlPreview(data.image);
    };
    if (defaultData) {
      getData();
    }
  }, [defaultData]);

  async function handleConfirmCreate() {
    let imageUrl = imageUrlPreview;
    if (image) {
      try {
        const file = await uploadBytes(
          ref(storage, `posts/image/${uuidv4()}`),
          image
        );
        const imageUrlPreview = await getDownloadURL(file.ref);
        imageUrl = imageUrlPreview;
      } catch (error) {
        console.error('Error upload image', error);
      }
    }
    if (isEdit) {
      handleEdit({
        title,
        description,
        image: imageUrl,
        id: defaultData.id,
      });
    } else {
      handleCreate({
        title,
        description,
        image: imageUrl,
      });
    }
  }

  // Cek apakah sedang dalam mode edit dengan melihat apakah ada data default id atau tidak
  const isEdit = defaultData?.id;
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
          onClick={handleConfirmCreate}
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
    id: PropTypes.number,
  }),
  handleEdit: PropTypes.func,
};

export default CreateBlog;
