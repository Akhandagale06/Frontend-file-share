import { CreditCard } from "lucide-react";

const CreditDisplay = ({credits}) => {
  return (
    <div className="flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full text-blue-700">
           <CreditCard size={16}/>
           <span className="font-semibold">{credits}</span>
           <span className="text-xs font-bold">Credits</span>
         </div>
  );
};

export default CreditDisplay;