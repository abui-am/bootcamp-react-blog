import { useEffect, useState } from 'react';
import CreateBlog from './page/CreateBlog';
import ViewBlog from './page/ViewBlog';
import ListBlog from './page/ListBlog';
import { db } from './configs/firebase';
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore';

function App() {
  const [page, setPage] = useState('home');
  const [editId, setEditId] = useState(null);
  const [viewId, setViewId] = useState(null);

  const postsRef = collection(db, 'posts');

  const [data, setData] = useState([]);
  const getData = async () => {
    const data = [];
    const querySnapshot = await getDocs(postsRef);
    querySnapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data()?.createdAt?.toDate(),
      });
    });
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  function handleClickBack() {
    // Kembalikan ke halaman home
    setPage('home');
  }

  async function handleCreate({ title, description, image }) {
    const newData = {
      title,
      description,
      image,
      createdAt: Timestamp.now(),
    };

    try {
      await addDoc(postsRef, newData);
      getData();
    } catch (e) {
      console.error('Error adding document: ', e);
    }

    // Kembali ke halaman home
    setPage('home');
  }

  async function handleOnClickDeleteCard(id) {
    const docRef = doc(db, 'posts', id);
    try {
      await deleteDoc(docRef);
      getData();
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  }

  function handleOnClickEditCard({ id }) {
    setEditId(id);
    setPage('edit');
  }

  async function handleEdit({ title, description, image, id }) {
    const dataToEdit = {
      title,
      description,
      image,
    };

    try {
      const docRef = doc(db, 'posts', id);
      await setDoc(docRef, dataToEdit);
      setEditId(null);
      getData();
    } catch (e) {
      console.error('Error updating document: ', e);
    }

    // Kembali ke halaman home
    setPage('home');
  }

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
          defaultData={data.find((item) => item.id === editId)}
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
            data={{
              id: viewId,
            }}
            onEdit={handleOnClickEditCard}
            onDelete={(id) => {
              handleOnClickDeleteCard(id);
              setPage('home');
            }}
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
