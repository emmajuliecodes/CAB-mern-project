import { User } from "../@types";

type Props = {
	user: User;
};

function UserCard({ user }: Props) {
	return (
		user && (
			<div
				style={{ border: "solid 1px black", padding: "0 1em", width: "300px" }}>
				<p>
					<b>{user.username}</b> - {user.email} <b>{user.username}</b> -{" "}
					<img
						src={user.avatar}
						alt={`${user.username}'s avatar`}
						style={{ height: "50px", width: "50px" }}
					/>
				</p>
				{user.items.length === 0 ? (
					<p>User has no items</p>
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

export default UserCard;
