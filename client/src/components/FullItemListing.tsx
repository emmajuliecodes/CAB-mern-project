import { Item } from "../@types";

type Props = {
	item: Item;
};

function ItemListing({ item }: Props) {
	return (
		item && (
			<div
				style={{ border: "solid 1px black", padding: "0 1em", width: "500px" }}>
				<p>
					{item.item}
					<br></br>
					<img
						src={item.images}
						alt={"item image"}
						style={{ height: "50px", width: "50px" }}
					/>
					<br></br>
					{item.short_description}
					<br></br>
					<label>{item.category}</label>

					<button>View item</button>
				</p>
			</div>
		)
	);
}

export default ItemListing;
