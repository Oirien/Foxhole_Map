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

function usePrevious(previousData) {
    const ref = React.useRef();
    React.useEffect(() => {
        ref.current = previousData;
    }, [previousData]);
    return ref.current;
}

const MapContainer = ({ queueData }) => {
    const queueMap = queueData.serverConnectionInfoList.map(grid => grid);
    const totalWardenQueue = queueMap.reduce((total, grid) => total + grid.wardenQueueSize, 0);
    const totalColonialQueue = queueMap.reduce((total, grid) => total + grid.colonialQueueSize, 0);
    const previousQueueData = usePrevious(queueMap);

    return (
        <>
            <PlayerRatio>Total Wardens in Queues: {totalWardenQueue}</PlayerRatio>
            <PlayerRatio>Total Colonials in Queues: {totalColonialQueue}</PlayerRatio>
            <FlexTape>
                {mapsData.map((row, rowIndex) => (
                    <div key={rowIndex}>
                        {row.map((mapName, mapIndex) => {
                            const currentGridData = queueData.serverConnectionInfoList.find(grid => grid.currentMap === mapName);
                            let previousGridData = [{ wardenQueueSize: 0, colonialQueueSize: 0 }];
                            if (previousQueueData) {
                                previousGridData = previousQueueData
                                    .map(grid => {
                                        if (grid.currentMap === mapName) {
                                            return grid;
                                        }
                                    })
                                    .filter(Boolean);
                            }

                            return previousGridData ? (
                                <MapTile key={mapIndex} gridData={currentGridData} previousGridData={previousGridData} mapName={mapName} />
                            ) : (
                                <div>Loading...</div> // Or a default value
                            );
                        })}
                    </div>
                ))}
            </FlexTape>
        </>
    );
};

export default MapContainer;
