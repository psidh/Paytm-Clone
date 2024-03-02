import { Appbar } from '../components/Appbar';
import { Balance } from '../components/Balance';
import { Users } from '../components/Users';

export const Dashboard = () => {
  return (
    <div className='bg-[#212121] text-white h-screen'>
      <Appbar />
      <div className='m-8  text-white'>
        <Balance value={'10,000'} />
        <Users />
      </div>
    </div>
  );
};
