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

const MapContainer = ({ queueData }) => {
    const queueMap = queueData.serverConnectionInfoList.map(grid => grid);
    const Oarbreaker = queueMap.filter(grid => grid.currentMap === "OarbreakerHex");
    const Fishermans = queueMap.filter(grid => grid.currentMap === "FishermansRowHex");
    const Stema = queueMap.filter(grid => grid.currentMap === "StemaLandingHex");

    const Nevish = queueMap.filter(grid => grid.currentMap === "NevishLineHex");
    const Farranac = queueMap.filter(grid => grid.currentMap === "FarranacCoastHex");
    const Westgate = queueMap.filter(grid => grid.currentMap === "WestgateHex");
    const Origin = queueMap.filter(grid => grid.currentMap === "OriginHex");

    const Callums = queueMap.filter(grid => grid.currentMap === "CallumsCapeHex");
    const Stonecradle = queueMap.filter(grid => grid.currentMap === "StonecradleHex");
    const KingsCage = queueMap.filter(grid => grid.currentMap === "KingsCageHex");
    const Sableport = queueMap.filter(grid => grid.currentMap === "SableportHex");
    const Ashfields = queueMap.filter(grid => grid.currentMap === "AshFieldsHex");

    const Speaking = queueMap.filter(grid => grid.currentMap === "SpeakingWoodsHex");
    const Moors = queueMap.filter(grid => grid.currentMap === "MooringCountyHex");
    const Linn = queueMap.filter(grid => grid.currentMap === "LinnMercyHex");
    const Loch = queueMap.filter(grid => grid.currentMap === "LochMorHex");
    const Heartlands = queueMap.filter(grid => grid.currentMap === "HeartlandsHex");
    const RedRiver = queueMap.filter(grid => grid.currentMap === "RedRiverHex");

    const Sionnach = queueMap.filter(grid => grid.currentMap === "BasinSionnachHex");
    const Reaching = queueMap.filter(grid => grid.currentMap === "ReachingTrailHex");
    const Callahans = queueMap.filter(grid => grid.currentMap === "CallahansPassageHex");
    const Deadlands = queueMap.filter(grid => grid.currentMap === "DeadLandsHex");
    const Umbral = queueMap.filter(grid => grid.currentMap === "UmbralWildwoodHex");
    const GreatMarch = queueMap.filter(grid => grid.currentMap === "GreatMarchHex");
    const Kalokai = queueMap.filter(grid => grid.currentMap === "KalokaiHex");

    const Howl = queueMap.filter(grid => grid.currentMap === "HowlCountyHex");
    const Viper = queueMap.filter(grid => grid.currentMap === "ViperPitHex");
    const Marban = queueMap.filter(grid => grid.currentMap === "MarbanHollow");
    const DrownedVale = queueMap.filter(grid => grid.currentMap === "DrownedValeHex");
    const Shackled = queueMap.filter(grid => grid.currentMap === "ShackledChasmHex");
    const Acrithia = queueMap.filter(grid => grid.currentMap === "AcrithiaHex");

    const Clanshead = queueMap.filter(grid => grid.currentMap === "ClansheadValleyHex");
    const Weathered = queueMap.filter(grid => grid.currentMap === "WeatheredExpanseHex");
    const Clahstra = queueMap.filter(grid => grid.currentMap === "ClahstraHex");
    const Allods = queueMap.filter(grid => grid.currentMap === "AllodsBightHex");
    const Terminus = queueMap.filter(grid => grid.currentMap === "TerminusHex");

    const Morgens = queueMap.filter(grid => grid.currentMap === "MorgensCrossingHex");
    const Stilcan = queueMap.filter(grid => grid.currentMap === "StlicanShelfHex");
    const Endless = queueMap.filter(grid => grid.currentMap === "EndlessShoreHex");
    const Reavers = queueMap.filter(grid => grid.currentMap === "ReaversPassHex");

    const Godcrofts = queueMap.filter(grid => grid.currentMap === "GodcroftsHex");
    const Tempest = queueMap.filter(grid => grid.currentMap === "TempestIslandHex");
    const Fingers = queueMap.filter(grid => grid.currentMap === "TheFingersHex");

    const totalWardenQueue = queueMap.reduce((total, grid) => total + grid.wardenQueueSize, 0);
    const totalColonialQueue = queueMap.reduce((total, grid) => total + grid.colonialQueueSize, 0);

    return (
        <>
            <PlayerRatio>
                Wardens : {(queueData.normalizedGlobalPopulation * 100).toPrecision(4)}% - Total Wardens in Queues: {totalWardenQueue}
            </PlayerRatio>
            <PlayerRatio>
                Colonials : {((1 - queueData.normalizedGlobalPopulation) * 100).toPrecision(4)}% - Total Colonials in Queues:{" "}
                {totalColonialQueue}
            </PlayerRatio>
            <FlexTape>
                <div>
                    <MapTile gridData={Oarbreaker[0]} mapName={"OarbreakerHex"} />
                    <MapTile gridData={Fishermans[0]} mapName={"FishermansRowHex"} />
                    <MapTile gridData={Stema[0]} mapName={"StemaLandingHex"} />
                </div>
                <div>
                    <MapTile gridData={Nevish[0]} mapName={"NevishLineHex"} />
                    <MapTile gridData={Farranac[0]} mapName={"FarranacCoastHex"} />
                    <MapTile gridData={Westgate[0]} mapName={"WestgateHex"} />
                    <MapTile gridData={Origin[0]} mapName={"OriginHex"} />
                </div>
                <div>
                    <MapTile gridData={Callums[0]} mapName={"CallumsCapeHex"} />
                    <MapTile gridData={Stonecradle[0]} mapName={"StonecradleHex"} />
                    <MapTile gridData={KingsCage[0]} mapName={"KingsCageHex"} />
                    <MapTile gridData={Sableport[0]} mapName={"SableportHex"} />
                    <MapTile gridData={Ashfields[0]} mapName={"AshFieldsHex"} />
                </div>
                <div>
                    <MapTile gridData={Speaking[0]} mapName={"SpeakingWoodsHex"} />
                    <MapTile gridData={Moors[0]} mapName={"MooringCountyHex"} />
                    <MapTile gridData={Linn[0]} mapName={"LinnMercyHex"} />
                    <MapTile gridData={Loch[0]} mapName={"LochMorHex"} />
                    <MapTile gridData={Heartlands[0]} mapName={"HeartlandsHex"} />
                    <MapTile gridData={RedRiver[0]} mapName={"RedRiverHex"} />
                </div>
                <div>
                    <MapTile gridData={Sionnach[0]} mapName={"BasinSionnachHex"} />
                    <MapTile gridData={Reaching[0]} mapName={"ReachingTrailHex"} />
                    <MapTile gridData={Callahans[0]} mapName={"CallahansPassageHex"} />
                    <MapTile gridData={Deadlands[0]} mapName={"DeadLandsHex"} />
                    <MapTile gridData={Umbral[0]} mapName={"UmbralWildwoodHex"} />
                    <MapTile gridData={GreatMarch[0]} mapName={"GreatMarchHex"} />
                    <MapTile gridData={Kalokai[0]} mapName={"KalokaiHex"} />
                </div>
                <div>
                    <MapTile gridData={Howl[0]} mapName={"HowlCountyHex"} />
                    <MapTile gridData={Viper[0]} mapName={"ViperPitHex"} />
                    <MapTile gridData={Marban[0]} mapName={"MarbanHollow"} />
                    <MapTile gridData={DrownedVale[0]} mapName={"DrownedValeHex"} />
                    <MapTile gridData={Shackled[0]} mapName={"ShackledChasmHex"} />
                    <MapTile gridData={Acrithia[0]} mapName={"AcrithiaHex"} />
                </div>
                <div>
                    <MapTile gridData={Clanshead[0]} mapName={"ClansheadValleyHex"} />
                    <MapTile gridData={Weathered[0]} mapName={"WeatheredExpanseHex"} />
                    <MapTile gridData={Clahstra[0]} mapName={"ClahstraHex"} />
                    <MapTile gridData={Allods[0]} mapName={"AllodsBightHex"} />
                    <MapTile gridData={Terminus[0]} mapName={"TerminusHex"} />
                </div>
                <div>
                    <MapTile gridData={Morgens[0]} mapName={"MorgensCrossingHex"} />
                    <MapTile gridData={Stilcan[0]} mapName={"StlicanShelfHex"} />
                    <MapTile gridData={Endless[0]} mapName={"EndlessShoreHex"} />
                    <MapTile gridData={Reavers[0]} mapName={"ReaversPassHex"} />
                </div>
                <div>
                    <MapTile gridData={Godcrofts[0]} mapName={"GodcroftsHex"} />
                    <MapTile gridData={Tempest[0]} mapName={"TempestIslandHex"} />
                    <MapTile gridData={Fingers[0]} mapName={"TheFingersHex"} />
                </div>
            </FlexTape>
        </>
    );
};

export default MapContainer;
