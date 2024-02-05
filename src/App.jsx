import { useState } from 'react';
import Card from './components/Card';
import Header from './components/Header';
import CreateBlog from './components/CreateBlog';

function App() {
  const [page, setPage] = useState('home');
  const [data, setData] = useState([
    {
      id: 1,
      title: 'ini title 2',
      description: 'ini deskripsi',
    },
    {
      id: 2,
      title: 'ini title 2',
      description:
        'ini deskripsi dengan panjang yang lebih banyak, sehingga akan terlihat lebih banyak teksnya. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus nec nunc tincidunt aliquam',
    },
  ]);

  function handleClickBack() {
    // Kembalikan ke halaman home
    setPage('home');
  }

  function handleCreate(title, description) {
    // Data yang baru ditambahkan harus memiliki id yang unik
    // id yang baru adalah id dari data terakhir ditambah 1
    const newData = { id: data[data.length - 1].id + 1, title, description };
    setData([...data, newData]);

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
          />
          <div className='grid grid-cols-2 xl:grid-cols-4 gap-4 p-9 '>
            {
              // Looping data untuk membuat Card
              // menggunakan Array map
              // https://www.w3schools.com/jsref/jsref_map.asp
              data.map((item) => (
                <Card
                  key={item.id}
                  title={item.title}
                  description={item.description}
                />
              ))
            }
          </div>
        </>
      )}
    </div>
  );
}

export default App;
