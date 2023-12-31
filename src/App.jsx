import axios from "axios";
import MapContainer from "./containers/MapContainer";
import { useQuery, useQueryClient } from "react-query";

const fetchQueueData = async () => {
    const res = await axios.get("https://war-service-live.foxholeservices.com/external/shardStatus");
    return res.data;
};

function App() {
    const queryClient = useQueryClient();
    const {
        data: queueData,
        error: queueError,
        isLoading: queueLoading,
    } = useQuery("queues", fetchQueueData, {
        refetchInterval: 30000,
        refetchOnMount: false, // Don't refetch when the component mounts
    });

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
