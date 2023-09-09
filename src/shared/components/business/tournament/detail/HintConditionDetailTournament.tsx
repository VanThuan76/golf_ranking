import { useRouter } from 'next/router';
import { StatusTournamentString } from 'src/schemas/tournament.table.type';
import { URL_SYSTEMS } from 'src/shared/constants';

type Props = {
  status: StatusTournamentString;
};
const HintConditionDetailTournament = ({ status }: Props) => {
  const router = useRouter();
  const RenderComponent = () => {
    switch (status) {
      case 'Hoàn thành':
        return <div className='w-full flex-row-start'>Kết quả</div>;
      case 'Đang tổ chức':
        return <div className='w-full flex-row-start'>Kết quả</div>;
      case 'Sắp bắt đầu':
        return (
          <div className='w-full flex-row-between-start'>
            <p>Danh sách đăng ký</p>
            <button
              onClick={() => router.push(URL_SYSTEMS.MEMBER_REGISTER)}
              className='dark:text-white font-bold py-2 px-4 rounded cursor-pointer hidden lg:block'
            >
              Đăng nhập
            </button>
          </div>
        );
      case 'Đăng ký':
        return <div className='w-full flex-row-start'>Danh sách đăng ký</div>;
      default:
        return <div></div>;
        break;
    }
  };
  return <div className='mt-5 text-2xl font-semibold'>{RenderComponent()}</div>;
};

export default HintConditionDetailTournament;
