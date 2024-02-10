import { useEffect, useState } from 'react';
import CreateBlog from './page/CreateBlog';
import ViewBlog from './page/ViewBlog';
import ListBlog from './page/ListBlog';
import { db } from './services/firebase';
import { collection, getDocs } from 'firebase/firestore';

function App() {
  const [page, setPage] = useState('home');
  const [editId, setEditId] = useState(null);
  const [viewId, setViewId] = useState(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = [];
      const querySnapshot = await getDocs(collection(db, 'posts'));
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setData(data);
    };
    getData();
  }, []);

  function handleClickBack() {
    // Kembalikan ke halaman home
    setPage('home');
  }

  function handleCreate({ title, description, image }) {
    // Data yang baru ditambahkan harus memiliki id yang unik
    // id yang baru adalah id dari data terakhir ditambah 1
    const newId = data.length >= 1 ? data[data.length - 1].id + 1 : 0;
    const newData = {
      id: newId,
      title,
      description,
      image,
    };
    setData([...data, newData]);

    // Kembali ke halaman home
    setPage('home');
  }

  function handleOnClickDeleteCard(id) {
    // Hapus data dari state
    setData(data.filter((data) => data.id !== id));
  }

  function handleOnClickEditCard({ id }) {
    setEditId(id);
    setPage('edit');
  }

  const handleEdit = ({ title, description, image, id }) => {
    // Cari data yang akan diubah
    const dataToEdit = data.find((item) => item.id === id);

    // Ubah data yang ditemukan
    dataToEdit.title = title;
    dataToEdit.description = description;
    dataToEdit.image = image;

    const newData = data.map((item) => {
      if (item.id === id) {
        return dataToEdit;
      }
      return item;
    });

    // Update state
    setData(newData);
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
