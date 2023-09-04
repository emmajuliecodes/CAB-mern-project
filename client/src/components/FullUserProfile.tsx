import { useEffect, useState } from "react";
import { User, NotOk } from "../@types";
import { useNavigate, useParams } from "react-router-dom";




function UserProfile() {
    const redirect = useNavigate();
    const params = useParams();
    const baseURL = import.meta.env.VITE_SERVER_BASE as string;
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${baseURL}api/users/${params._id}`);
                // console.log("response", response); // will be 'true' if status code is in 200 zone, else 'false'
                if (response.ok) {
                    const result = (await response.json()) as User;
                    setUser(result);
                    console.log(result);
                } else {
                    const result = (await response.json()) as NotOk;
                    alert(result.error);
                }
            } catch (e) {
                console.log(e);
                const { message } = e as Error; //could also use 'instanceof' to check for type
                alert(message);
            }
        };
        fetchUser().catch((e) => console.log(e));
    }, []);
    
        return (
            user && (
                <div
                    style={{ border: "solid 1px black", padding: "0 1em", width: "300px" }}>
                    <p>
                        <b>{user.username}</b> - {user.email} -{" "}
                        <img
                            src={user.avatar}
                            alt={`${user.username}'s avatar`}
                            style={{ height: "50px", width: "50px" }}
                        />
                    </p>
                    {user.items.length === 0 ? (
                        <><p>Oops, you have no items! Let's change that..!</p><button onClick={() => redirect("/listitem")}>List Item</button></>
                    ) : (
                        <>
                            <p>Items available:</p>
                            <ul>
                                {user.items.map((i) => {
                                    return <li key={i._id}>{i.item}</li>;
								
                                })}
                            </ul>
                        </>
                    )}
                </div>
            )
        );
    }
}

export default UserProfile;
