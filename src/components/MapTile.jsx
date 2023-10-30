import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";

const TileGroup = styled.div`
	color: rgba(138, 138, 138, 0.95);
	font-family: "Black Ops One";
	background-color: ${(props) =>
		props.iscolonialowned == "true" ? "#152612FF" : props.iswardenowned == "true" ? "#041739FF" : "rgba(87, 0, 0, 0.5)"};
	width: 200px;
	height: 200px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	border: 1px solid rgba(138, 138, 138, 0.75);
`;

const TileName = styled.h1`
	font-size: 1.25rem;
	text-shadow: 4px 4px 4px black, -4px -4px 4px black, 4px -4px 4px black, -4px 4px 4px black;
`;
const QueueName = styled.p`
	color: ${(props) =>
		props.queue == 1
			? "rgba(138, 138, 138, 0.95)"
			: props.queue == 2
			? "rgba(180, 0, 0, 1)"
			: props.queue == 3
			? "rgba(215, 0, 0, 1)"
			: "rgba(255, 0, 0, 1)"};
	font-size: 1rem;
	text-shadow: 4px 4px 4px black, -4px -4px 4px black, 4px -4px 4px black, -4px 4px 4px black;
`;

const MapTile = ({ gridData, mapName }) => {
	if (!gridData) {
		return <div>Loading...</div>;
	}
	const fetchMapData = async () => {
		const res = await axios.get(`https://war-service-live.foxholeservices.com/api/worldconquest/maps/${mapName}/dynamic/public`);
		return res.data;
	};
	const { data: mapData, error: mapError, isLoading: mapLoading } = useQuery(["maps", mapName], fetchMapData);

	if (mapLoading) {
		return <div>Loading...</div>;
	}

	if (mapError) {
		console.error("Database Error:", mapError);
		return <div>Error fetching map data. Please try again later.</div>;
	}
	const colonialOwned = mapData.mapItems.filter((position) => {
		return position.teamId === "COLONIALS";
	});
	const wardenOwned = mapData.mapItems.filter((position) => {
		return position.teamId === "WARDENS";
	});

	const isColonialOwned = colonialOwned.length > 0 && wardenOwned.length === 0;
	const isWardenOwned = colonialOwned.length === 0 && wardenOwned.length > 0;

	const MapName = gridData.currentMap.replaceAll("Hex", "");
	const colonialQueue =
		gridData.colonialQueueSize == 0 ? 1 : gridData.colonialQueueSize < 5 ? 2 : gridData.colonialQueueSize < 10 ? 3 : 4;
	const wardenQueue = gridData.wardenQueueSize == 0 ? 1 : gridData.wardenQueueSize < 5 ? 2 : gridData.wardenQueueSize < 10 ? 3 : 4;
	if (!gridData) {
		return "Loading";
	}
	return (
		<TileGroup iscolonialowned={isColonialOwned.toString()} iswardenowned={isWardenOwned.toString()}>
			<TileName>{MapName}</TileName>
			<QueueName queue={wardenQueue}>Warden Queue: {gridData.wardenQueueSize}</QueueName>
			<QueueName queue={colonialQueue}>Colonial Queue: {gridData.colonialQueueSize}</QueueName>
		</TileGroup>
	);
};

export default MapTile;
