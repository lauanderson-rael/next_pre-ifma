

// export default function TopTitle({title}: {title: string}){
//     return (
//         <div className="bg-green-900 w-full text-center text-white font-semibold py-2">
//             {title}
//         </div>
//     )
// }
import { ReactNode } from 'react';

interface TopTitleProps {
  title: string;
  children?: ReactNode; // <- opcional
}

export default function TopTitle({ title, children }: TopTitleProps){
    return (
        <div className="bg-green-900 w-full text-center text-white font-semibold py-2">
            {title}
            {children && <div className="text-sm text-gray-300">{children}</div>}
        </div>
    )
}
