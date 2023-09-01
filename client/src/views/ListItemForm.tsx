/* eslint-disable prefer-const */
import { useState, FormEvent, useEffect } from "react";
import { NotOk, Item, Items } from "../@types";

function ListItemForm({
	setItems,
	items,
}: {
	items: Items;
	setItems: React.Dispatch<React.SetStateAction<Items>>;
}) {
	const baseURL = import.meta.env.VITE_SERVER_BASE as string;
	const [item, setItem] = useState("");
	const [category, setCategory] = useState([]);
	const [short_description, setShort_Description] = useState("");
	const [long_description, setLong_Description] = useState("");
	const [offer_type, setOffer_Type] = useState("");

	const createItem = async () => {
		const formData = new FormData();
		formData.append("item", item);

		// eslint-disable-next-line no-var
		for (var i = 0; i < category.length; i++) {
			formData.append("category[]", category[i]);
		}
		// formData.append("category []", category[i]);
		formData.append("short_description", short_description);
		formData.append("long_description", long_description);
		formData.append("offer_type", offer_type);

		const requestOptions = {
			method: "POST",
			body: formData,
		};

		try {
			const response = await fetch(`${baseURL}api/items/new`, requestOptions);
			console.log(response);
			if (response.ok) {
				const result = (await response.json()) as Item;
				alert("user created!");
				setItems([...items, { ...result }]);
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

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log({ item, short_description, long_description });
		createItem().catch((e) => console.log(e)); // found this as an alternative to disabling eslint rule
	};

	const handleChange = (e: FormEvent<HTMLFormElement>) => {
		if (e.target.checked === true) {
			setCategory([...category, e.target.value]);
		}
		// eslint-disable-next-line prefer-const
		else if (e.target.checked === false) {
			let freshArray = category.filter((val) => val !== e.target.value);
			setCategory([...freshArray]);
		}
	};

	useEffect(() => {
		console.log(category);
	}, [category]);

	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "1em",
				}}>
				<h1>List an item</h1>
			</div>{" "}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={item}
					placeholder="Item title"
					onChange={(e) => setItem(e.target.value)}
				/>{" "}
				<br></br>
				<input
					maxLength={100}
					type="text"
					value={short_description}
					placeholder="Short description"
					onChange={(e) => setShort_Description(e.target.value)}
				/>{" "}
				<br></br>
				<input
					maxLength={500}
					type="text"
					value={long_description}
					placeholder="Long description"
					onChange={(e) => setLong_Description(e.target.value)}
				/>{" "}
				<br></br>
				<p>Offer type:</p>
				<input
					type="radio"
					name="offer_type"
					value={offer_type}
					onChange={(e) => setOffer_Type(e.target.value)}
				/>
				<label htmlFor="radio">Free</label> <br></br>
				<input
					type="radio"
					name="offer_type"
					value={offer_type}
					onChange={(e) => setOffer_Type(e.target.value)}
				/>
				<label htmlFor="radio">Swap</label> <br></br>
				<p>Choose your categories:</p>
				<input
					type="checkbox"
					id="plants"
					value="plants"
					onChange={(e) => handleChange(e)}
				/>
				<label htmlFor="plants">Plants</label> <br></br>
				<input
					type="checkbox"
					id="furniture"
					value="furniture"
					onChange={(e) => handleChange(e)}
				/>
				<label htmlFor="furniture">Furniture</label> <br></br>
				<input
					type="checkbox"
					id="electronics"
					value="electronics"
					onChange={(e) => handleChange(e)}
				/>
				<label htmlFor="electronics">Electronics</label> <br></br>
				<input
					type="checkbox"
					id="decorative"
					value="decorative"
					onChange={(e) => handleChange(e)}
				/>
				<label htmlFor="clothing">Decorative</label> <br></br>
				<input
					type="checkbox"
					id="clothing & accessories"
					value="clothing & accessories"
					onChange={(e) => handleChange(e)}
				/>
				<label htmlFor="clothing & accessories">Clothing & accessories</label>{" "}
				<br></br>
				<input
					type="checkbox"
					id="Toys & games"
					value="toys & games"
					onChange={(e) => handleChange(e)}
				/>
				<label htmlFor="Toys & games">Toys & games</label>
				<br></br>
				<input
					type="checkbox"
					id="Music, films & books"
					value="music, films & books"
					onChange={(e) => handleChange(e)}
				/>
				<label htmlFor="Music, films & books">Music, films & books</label>{" "}
				<br></br>
				<input
					type="checkbox"
					id="pets"
					value="pets"
					onChange={(e) => handleChange(e)}
				/>
				<label htmlFor="pets">Pets</label> <br></br>
				<input
					type="checkbox"
					id="miscellaneous"
					value="miscellaneous"
					onChange={(e) => handleChange(e)}
				/>
				<label htmlFor="other">Miscellaneous</label>
				<br></br>
				<button>List Item!</button>
			</form>
		</>
	);
}

export default ListItemForm;
