import React from "react";
import MapTile from "../components/MapTile";
import styled from "styled-components";

const FlexTape = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PlayerRatio = styled.div`
    display: flex;
    justify-content: center;
    color: rgba(138, 138, 138, 0.95);
    font-family: "Black Ops One";
    font-size: 2rem;
`;

const mapsData = [
    ["OarbreakerHex", "FishermansRowHex", "StemaLandingHex"],
    ["NevishLineHex", "FarranacCoastHex", "WestgateHex", "OriginHex"],
    ["CallumsCapeHex", "StonecradleHex", "KingsCageHex", "SableportHex", "AshFieldsHex"],
    ["SpeakingWoodsHex", "MooringCountyHex", "LinnMercyHex", "LochMorHex", "HeartlandsHex", "RedRiverHex"],
    ["BasinSionnachHex", "ReachingTrailHex", "CallahansPassageHex", "DeadLandsHex", "UmbralWildwoodHex", "GreatMarchHex", "KalokaiHex"],
    ["HowlCountyHex", "ViperPitHex", "MarbanHollow", "DrownedValeHex", "ShackledChasmHex", "AcrithiaHex"],
    ["ClansheadValleyHex", "WeatheredExpanseHex", "ClahstraHex", "AllodsBightHex", "TerminusHex"],
    ["MorgensCrossingHex", "StlicanShelfHex", "EndlessShoreHex", "ReaversPassHex"],
    ["GodcroftsHex", "TempestIslandHex", "TheFingersHex"],
];

const MapContainer = ({ queueData }) => {
    const queueMap = queueData.serverConnectionInfoList.map(grid => grid);
    const totalWardenQueue = queueMap.reduce((total, grid) => total + grid.wardenQueueSize, 0);
    const totalColonialQueue = queueMap.reduce((total, grid) => total + grid.colonialQueueSize, 0);

    return (
        <>
            <PlayerRatio>
                Wardens : {(queueData.normalizedGlobalPopulation * 100).toPrecision(4)}% - Total Wardens in Queues: {totalWardenQueue}
            </PlayerRatio>
            <PlayerRatio>
                Colonials : {((1 - queueData.normalizedGlobalPopulation) * 100).toPrecision(4)}% - Total Colonials in Queues:
                {totalColonialQueue}
            </PlayerRatio>
            <FlexTape>
                {mapsData.map((row, rowIndex) => (
                    <div key={rowIndex}>
                        {row.map((mapName, mapIndex) => (
                            <MapTile
                                key={mapIndex}
                                gridData={queueData.serverConnectionInfoList.find(grid => grid.currentMap === mapName)}
                                mapName={mapName}
                            />
                        ))}
                    </div>
                ))}
            </FlexTape>
        </>
    );
};

export default MapContainer;
