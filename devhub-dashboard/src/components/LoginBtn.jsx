import { auth, provider, signInWithPopup } from "../../firebase";
import { useState } from "react";

export default function LoginButton() {
    const [user, setUser] = useState(null);

    const loginWithGitHub = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user);
        } catch (error) {
            console.error("Login Error", error);
        }
    }


    return (
        <button
            onClick={loginWithGitHub}
            className='h-7 w-34 text-[14px] bg-black text-white mr-20 rounded-full font-inter'>
            Connect GitHub
        </button>

    )

}