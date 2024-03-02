export const Balance = ({ value }) => {
  return (
    <div className='flex text-white items-center justify-center'>
      <div className='font-bold text-lg'>Your balance</div>
      <div className='font-semibold ml-4 text-lg bg-blue-900 px-8 py-3 rounded-xl'>
        Rs {value}
      </div>
    </div>
  );
};
