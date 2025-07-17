// components/LoadingScreen.tsx
import HeaderTitle from '../../../components/headerTitle';
import { FaArrowLeft } from 'react-icons/fa';

interface LoadingScreenProps {
  title: string;
  message: string;
}

export default function LoadingScreen({ title, message }: LoadingScreenProps) {
  return (
    <div>
      <HeaderTitle
        href={`/filters?option=simulado`}
        title={title}
        icon={<FaArrowLeft size={20} />}
      />
      <p className="text-center text-xl mt-36 animate-bounce text-green-700 font-bold">
        {message}
      </p>
    </div>
  );
}