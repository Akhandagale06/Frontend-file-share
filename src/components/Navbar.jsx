import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Menu, MenuIcon, Share2, Wallet, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";
import CreditDisplay from "./CreditDisplay";
import { UserCreditsContext } from "../context/UserCreditContext";

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const {credits,fetchUserCredits}=useContext(UserCreditsContext);

    useEffect(()=>{
        fetchUserCredits();
    },[fetchUserCredits])

    return (
        <div className="flex items-center justify-between gap-5 bg-white border-b border-gray-200/50 backdrop:backdrop-blur-[2px] py-4 sm:px-7 sticky top-0 z-30">
            {/**left side */}

            <div className="flex items-center gap-5">
                <button onClick={() => setOpenSideMenu(!openSideMenu)}
                    className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors">
                    {openSideMenu ? (
                        <X className="text-2xl" />
                    ) : (
                        <Menu className="text-2xl" />
                    )}


                </button>
                <div className="flex items-center gap-2">
                    <img src="/src/assets/logo3.png" alt="logo" className="w-18 h-18" />
                    {/* <Share2 className="text-blue-600"/> */}
                    <span className=" text-xl font-bold text-black truncate">FileShare</span>
                </div>
            </div>

            {/**right side */}
            <SignedIn>
                <div className="flex items-center gap-5">
                    <Link to="/subscription">
                       <CreditDisplay credits={credits}/>
                    </Link>
                    <div className="relative">
                        <UserButton />
                    </div>
                </div>
            </SignedIn>


            {/**mobile side  menu */}

         {openSideMenu && (
            <div className="fixed top-24 left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20">
                {/**side menu */}
               <SideMenu  activeMenu={activeMenu}/>
            </div>
         )}


        </div>
    )
}
export default Navbar;