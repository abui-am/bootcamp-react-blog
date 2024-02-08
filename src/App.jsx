import { useState } from 'react';
import Header from './components/Header';
import CreateBlog from './page/CreateBlog';
import ViewBlog from './page/ViewBlog';
import ListBlog from './page/ListBlog';

function App() {
  const [page, setPage] = useState('home');
  const [editId, setEditId] = useState(null);
  const [viewId, setViewId] = useState(null);

  const [data, setData] = useState([
    {
      id: 1,
      title: 'ini title 2',
      description: 'ini deskripsi',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: 'ini title 2',

      image: 'https://via.placeholder.com/150',
      description:
        'ini deskripsi dengan panjang yang lebih banyak, sehingga akan terlihat lebih banyak teksnya. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus nec nunc tincidunt aliquam',
    },
  ]);

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
          <Header
            onClickBuatBlog={() => {
              setPage('create');
            }}
            onClickTitle={() => {
              setPage('home');
            }}
          />
          <ViewBlog
            data={data.find((item) => item.id === viewId)}
            onEdit={handleOnClickEditCard}
            onDelete={handleOnClickDeleteCard}
          />
        </>
      )}
      {page === 'home' && (
        <>
          <Header
            // Pass props ke Header
            // Props onClickBuatBlog adalah fungsi yang akan dijalankan
            // di dalam Component Header
            // Namun pembuatan fungsi tersebut dilakukan di dalam Component App
            // karena di dalam state yang akan diubah berada di dalam Component App
            onClickBuatBlog={() => {
              setPage('create');
            }}
            onClickTitle={() => {
              setPage('home');
            }}
          />

          <ListBlog
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
