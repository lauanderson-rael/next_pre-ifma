
import { ReactNode } from 'react';

interface TopTitleProps {
  title: string;
  children?: ReactNode; // <- opcional
}

export default function TopTitle({ title, children }: TopTitleProps){
    return (
        <div className="flex gap-2 justify-center items-center bg-green-900 w-full text-center text-white font-semibold py-1">
            {title}
            {children && <div className="text-sm text-gray-300">{children}</div>}
        </div>
    )
}
