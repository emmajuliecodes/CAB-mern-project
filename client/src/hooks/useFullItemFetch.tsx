import { useEffect, useState } from "react";

import { Items, NotOk } from "../@types";

function useFullItemFetch(_id: string) {
	const [fullItem, setFullItem] = useState<Items>();
	const fetchFullItem = async () => {
		const baseURL = import.meta.env.VITE_SERVER_BASE as string;
		try {
			const response = await fetch(`${baseURL}api/items/itemById/${_id}`);
			if (!response.ok) {
				const result = (await response.json()) as NotOk;
				console.log(result.error, response.status);
			}
			if (response.ok) {
				const result = (await response.json()) as Items;
				setFullItem(result);
				console.log(result, "result");
			}
		} catch (error) {
			console.log("error :>> ", error);
		}
	};
	useEffect(() => {
		fetchFullItem();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [_id]);
	return { fullItem };
}

export default useFullItemFetch;
