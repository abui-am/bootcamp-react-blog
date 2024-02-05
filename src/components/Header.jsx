import PropTypes from 'prop-types';

function Header({ onClickBuatBlog }) {
  return (
    <div className='flex justify-between pt-6 pb-6 pr-9 pl-9 border-b-[rgba(0,0,0,0.3)] border-b'>
      <h1 className='text-2xl font-semibold'>Blog GDSC Telyu</h1>
      <button
        className='px-6 py-2 bg-blue-500 text-white rounded'
        onClick={onClickBuatBlog}
      >
        Buat Blog
      </button>
    </div>
  );
}

Header.propTypes = {
  onClickBuatBlog: PropTypes.func.isRequired,
};

export default Header;
