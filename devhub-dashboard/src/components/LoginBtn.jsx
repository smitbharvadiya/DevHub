import { auth, provider } from "../../firebase";
import { useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged  } from "firebase/auth";

export default function LoginButton() {
    const [user, setUser] = useState(null);

     useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const loginWithGitHub = async () => {
        try {
            await signInWithPopup(auth, provider);
            // const result = 
            // const user = result.user;
            // setUser(user);
        } catch (error) {
            console.error("Login Error", error);
        }
    }
    
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout Error", error);
        }
    }

    return (
        <>
        {!user ? (
            <button
                onClick={loginWithGitHub}
                className='h-7 w-34 text-[14px] bg-black text-white mr-20 rounded-full font-inter'>
                Connect GitHub
            </button>
        ) :
            (<button
                onClick={logout}
                className='h-7 w-34 text-[14px] bg-black text-white mr-20 rounded-full font-inter'>
                LogOut
            </button>)}
        </>

    )

}