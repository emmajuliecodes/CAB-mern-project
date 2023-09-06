/* eslint-disable react-hooks/exhaustive-deps */

import { useParams } from "react-router-dom";

// import ItemListing from "../components/FullItemListing";

import useFullItemFetch from "../hooks/useFullItemFetch";

function FullItemView() {
	const { _id } = useParams();
	// const baseURL = import.meta.env.VITE_SERVER_BASE as string;
	const { fullItem } = useFullItemFetch(_id!);

	return (
		fullItem && (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "1em",
					backgroundColor: "honeydew",
				}}>
				<>
					<h2>{fullItem.item}</h2>
					<h4>{fullItem.short_description}</h4>
					<img
						src={fullItem.images}
						alt="item images"
						style={{ height: "100px", width: "100px" }}></img>
					<p>About this item:</p>

					<p>{fullItem.long_description}</p>
					<p>{fullItem.owner}</p>
				</>
			</div>
		)
	);
}

export default FullItemView;
