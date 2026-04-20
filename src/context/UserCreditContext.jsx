import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { Children, createContext, useCallback, useEffect, useState } from "react";
import apiEndpoint from "../util/apiEndpoint";
import toast from "react-hot-toast";

export const UserCreditsContext =createContext();

export const UserCreditsProvider= ({children})=>{
    const [credits,setCredits]=useState(10);
    const [loading,setLoading]=useState(false);
    const { getToken, isSignedIn, isLoaded } = useAuth();

    // function to fetch user crdits 
    const fetchUserCredits = useCallback(async () => {
        if (!isLoaded || !isSignedIn) return;
        setLoading(true);

        try {
            const token = await getToken();
            if (!token) return;
            const response = await axios.get(apiEndpoint.GET_CREDITS, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.status === 200) {
                setCredits(response.data.credits);
            }
            else {
                toast.error("Error fetching credits");
            }


        } catch (error) {
            console.error("Error fetching credits", error);

        }
        finally {
            setLoading(false);
        }

    }, [isLoaded, isSignedIn, getToken])

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            fetchUserCredits();
        }
    }, [isLoaded, isSignedIn, fetchUserCredits])

    const updateCredits =useCallback( newCredits =>{
        console.log("Updating the credits",newCredits);
        setCredits(newCredits);
    },[])

    const contextValue= {
         credits,
         setCredits,
         updateCredits,
         fetchUserCredits
    }

    return (
        <UserCreditsContext.Provider value={contextValue}>
            {children}
        </UserCreditsContext.Provider>
    )
}
