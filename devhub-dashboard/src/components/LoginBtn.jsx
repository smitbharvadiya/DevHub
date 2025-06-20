import { auth, provider } from "../../firebase";
import { useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

export default function LoginButton() {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const loginWithGitHub = async () => {
        try {
            await signInWithPopup(auth, provider);
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
                    disabled={authLoading}
                    className='h-7 w-34 text-[14px] bg-black text-white mr-20 rounded-full font-inter cursor-pointer'>
                    Connect GitHub
                </button>
            ) :
                (<button
                    onClick={logout}
                    disabled={authLoading}
                    className='h-7 w-34 text-[14px] bg-black text-white mr-20 rounded-full font-inter cursor-pointer'>
                    LogOut
                </button>)}
        </>

    )

}