import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const TileGroup = styled.div`
    color: rgba(138, 138, 138, 0.95);
    font-family: "Black Ops One";
    background-color: ${props =>
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
    color: ${props =>
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
const upArrow = <FontAwesomeIcon icon={faArrowUp} beatFade style={{ color: "#ff0606" }} />;
const downArrow = <FontAwesomeIcon icon={faArrowDown} beatFade style={{ color: "#00f024" }} />;

const MapTile = ({ gridData, mapName, previousGridData }) => {
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

    const victoryPoints = mapData.mapItems.filter(vp => {
        return [45, 46, 47, 56, 57, 58].includes(vp.iconType);
    });
    const colonialVictoryPoints = victoryPoints.filter(vp => {
        return vp.teamId === "COLONIALS";
    });
    const colonialOwned = victoryPoints.filter(position => {
        return position.teamId === "COLONIALS";
    });
    const wardenOwned = victoryPoints.filter(position => {
        return position.teamId === "WARDENS";
    });

    const isColonialOwned = colonialOwned.length > 0 && wardenOwned.length === 0;
    const isWardenOwned = colonialOwned.length === 0 && wardenOwned.length > 0;

    const MapName = gridData.currentMap.replaceAll("Hex", "");

    const colonialQueue =
        gridData.colonialQueueSize == 0 ? 1 : gridData.colonialQueueSize < 5 ? 2 : gridData.colonialQueueSize < 10 ? 3 : 4;

    const wardenQueue = gridData.wardenQueueSize == 0 ? 1 : gridData.wardenQueueSize < 5 ? 2 : gridData.wardenQueueSize < 10 ? 3 : 4;
    let wardenQueueUp = "nochange";
    let colonialQueueUp = "nochange";
    if (previousGridData?.[0]) {
        wardenQueueUp =
            gridData.wardenQueueSize > previousGridData[0].wardenQueueSize
                ? "up"
                : gridData.wardenQueueSize < previousGridData[0].wardenQueueSize
                ? "down"
                : "nochange";

        colonialQueueUp =
            gridData.colonialQueueSize > previousGridData[0].colonialQueueSize
                ? "up"
                : gridData.colonialQueueSize < previousGridData[0].colonialQueueSize
                ? "down"
                : "nochange";
    }

    if (!gridData) {
        return "Loading";
    }

    return (
        <TileGroup iscolonialowned={isColonialOwned.toString()} iswardenowned={isWardenOwned.toString()}>
            <TileName>{MapName}</TileName>
            <QueueName queue={wardenQueue}>
                Warden Queue: {gridData.wardenQueueSize} {wardenQueueUp === "up" ? upArrow : wardenQueueUp === "down" ? downArrow : null}
            </QueueName>
            <QueueName queue={colonialQueue}>
                Colonial Queue: {gridData.colonialQueueSize}{" "}
                {colonialQueueUp === "up" ? upArrow : colonialQueueUp === "down" ? downArrow : null}
            </QueueName>
            <p>
                Colonials Control {colonialVictoryPoints.length}/{victoryPoints.length}
            </p>
        </TileGroup>
    );
};

export default MapTile;
