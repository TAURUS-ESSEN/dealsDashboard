import { useEffect, useState } from "react"; 
import { Navigate, Link } from "react-router-dom";

export function ErrorPage() {
    const [redirect, setRedirect] = useState(false);
    const [seconds, setSeconds] = useState(10);

    useEffect(()=> {
        if (seconds < 1) {
            setRedirect(true);
            return
        }
        const timer = setInterval(() => setSeconds(s => s - 1), 1000)
        return () => clearInterval(timer)
    }, [seconds])
    
    if (redirect) {
        return <Navigate to='/' replace />
    }

    return (
        <>
            <div className="m-auto flex flex-col justify-center gap-2 items-center text-center py-40">
                <h2>Seite nicht gefunden. </h2>
                <p>Du wirst automatisch in {seconds} Sekunden zur Startseite weitergeleitet.</p> 
                <Link to='/' className="btn max-w-80">Jetzt zur Startseite gehen</Link>
            </div>
        </>
    )
}