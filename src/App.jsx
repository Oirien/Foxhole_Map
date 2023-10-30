// import './App.css'
import axios from "axios";
import MapContainer from "./containers/MapContainer";

import { useQuery } from "react-query";

const fetchQueueData = async () => {
	const res = await axios.get("https://war-service-live.foxholeservices.com/external/shardStatus");
	return res.data;
};

// https://war-service-live.foxholeservices.com/external/shardStatus

// https://war-service-live.foxholeservices.com/api/worldconquest/maps/RedRiverHex/dynamic/public

function App() {
	const { data: queueData, error: queueError, isLoading: queueLoading } = useQuery("queues", fetchQueueData);
	if (queueLoading) {
		return <div>Loading...</div>;
	}

	if (queueError) {
		console.error("Database Error:", queueError);
		return <div>Error fetching queue data. Please try again later.</div>;
	}
	return (
		<>
			<MapContainer queueData={queueData} />
		</>
	);
}

export default App;
