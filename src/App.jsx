import { useEffect, useState } from 'react';
import CreateBlog from './page/CreateBlog';
import ViewBlog from './page/ViewBlog';
import ListBlog from './page/ListBlog';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { db } from './config/firebase';

function App() {
  const [page, setPage] = useState('home');
  const [editId, setEditId] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [data, setData] = useState([]);

  function handleClickBack() {
    // Kembalikan ke halaman home
    setPage('home');
  }

  async function getData() {
    try {
      const postsRef = collection(db, 'posts');
      const snapshot = await getDocs(postsRef);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(data);

      setData(data);
    } catch (error) {
      console.error('Error get data', error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function handleCreate({ title, description, image }) {
    const newData = {
      title,
      description,
      image,
    };

    const postsRef = collection(db, 'posts');
    await addDoc(postsRef, newData);
    getData();

    // Kembali ke halaman home
    setPage('home');
  }

  async function handleOnClickDeleteCard(id) {
    // Hapus data dari state
    await deleteDoc(doc(db, 'posts', id));
    getData();
  }

  function handleOnClickEditCard({ id }) {
    setEditId(id);
    setPage('edit');
  }

  const handleEdit = async ({ title, description, image, id }) => {
    const newData = {
      title,
      description,
      image,
    };
    const docRef = doc(db, 'posts', id);
    await setDoc(docRef, newData);
    getData();
    setEditId(null);

    // Kembali ke halaman home
    setPage('home');
  };

  return (
    <div>
      {page === 'create' && (
        <CreateBlog
          // Pass props ke CreateBlog
          // Props handleCreate dan handleClickBack adalah fungsi
          // yang akan dijalankan di dalam Component CreateBlog
          // Namun pembuatan fungsi tersebut dilakukan di dalam Component App
          //  karena di dalam state yang akan diubah berada di dalam Component App
          handleClickBack={handleClickBack}
          handleCreate={handleCreate}
        />
      )}
      {page === 'edit' && editId && (
        <CreateBlog
          // Pass props ke CreateBlog
          // Props handleCreate dan handleClickBack adalah fungsi
          // yang akan dijalankan di dalam Component CreateBlog
          // Namun pembuatan fungsi tersebut dilakukan di dalam Component App
          // karena di dalam state yang akan diubah berada di dalam Component App
          handleClickBack={handleClickBack}
          handleEdit={handleEdit}
          defaultData={{
            id: editId,
          }}
        />
      )}
      {page === 'view' && (
        <>
          <ViewBlog
            onClickBuatBlog={() => {
              setPage('create');
            }}
            onClickTitle={() => {
              setPage('home');
            }}
            data={data.find((item) => item.id === viewId)}
            onEdit={handleOnClickEditCard}
            onDelete={handleOnClickDeleteCard}
          />
        </>
      )}
      {page === 'home' && (
        <>
          <ListBlog
            onClickBuatBlog={() => {
              setPage('create');
            }}
            onClickTitle={() => {
              setPage('home');
            }}
            data={data}
            onClickCard={(id) => {
              setViewId(id);
              setPage('view');
            }}
            onDelete={handleOnClickDeleteCard}
            onEdit={handleOnClickEditCard}
          />
        </>
      )}
    </div>
  );
}

export default App;
