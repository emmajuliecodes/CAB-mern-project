import { Item } from "../@types";

type Props = {
	item: Item;
};

function ItemCard({ item }: Props) {
	return (
		item && (
			<div
				style={{ border: "solid 1px black", padding: "0 1em", width: "300px" }}>
				<p>
					{item.item}
					<b></b>
					{item.available}
					<b></b>
				</p>
			</div>
		)
	);
}

export default ItemCard;
