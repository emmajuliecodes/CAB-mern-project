import "../App.css";

import { useState, useEffect } from "react";
import { NotOk, Items } from "../@types";
import ItemCard from "../components/ItemCard";
import { Link } from "react-router-dom";

function AllItems() {
	const baseURL = import.meta.env.VITE_SERVER_BASE as string;
	console.log(baseURL, "baseurl");
	const [items, setItems] = useState<Items>([]);

	useEffect(() => {
		const fetchAllItems = async () => {
			try {
				const response = await fetch(`${baseURL}api/items/all`);
				if (response.ok) {
					const result = (await response.json()) as Items;
					setItems(result);
					console.log(result);
				} else {
					const result = (await response.json()) as NotOk;
					alert(result.error);
				}
			} catch (e) {
				console.log(e);
				const { message } = e as Error;
				alert(message);
			}
		};
		fetchAllItems().catch((e) => console.log(e));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "1em",
			}}>
			<h1>Items List</h1>
			{items.length === 0 ? (
				<p>Oh no! No items are available. Why not add one now?</p>
			) : (
				<>
					<h2>Available items</h2>
					{items.map((i) => {
						return (
							<>
								<ItemCard key={i._id} item={i} />
								<Link to={`/itemById/${i._id}`}>View item</Link>
							</>
						);
					})}
				</>
			)}
		</div>
	);
}

export default AllItems;
