import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';

type Props = {
  url: string;
  title: string;
  className?: string;
};
const Breadcrumb = ({ url, title, className }: Props) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(url)}
      className={`mt-5 w-full flex justify-start items-center gap-3 hover:underline text-xs md:text-base cursor-pointer ${className}`}
    >
      <ChevronLeft size={16} />
      <p>{title}</p>
    </div>
  );
};

export default Breadcrumb;
