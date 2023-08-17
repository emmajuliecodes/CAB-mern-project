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
					<b>{user.username}</b> - {user.email}
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
