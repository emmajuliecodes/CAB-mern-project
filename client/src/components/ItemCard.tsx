import { Item } from "../@types";
import "../index.css";
type Props = {
	item: Item;
};

function ItemCard({ item }: Props) {
	return (
		item && (
			<div className="item-card">
				<h3>{item.item}</h3>
				<br></br>
				<img
					src={item.images}
					alt={"item image"}
					style={{ height: "100px", width: "100px" }}
				/>
				<br></br>
				{item.short_description}
				<br></br>
				<label style={{ height: "50px", backgroundColor: "green" }}>
					{item.category}
				</label>
				
			</div>
		)
	);
}

export default ItemCard;
