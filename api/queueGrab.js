import { sql } from "@vercel/postgres";

export async function queueFunction() {
    const queueResponse = await fetch("https://war-service-live.foxholeservices.com/external/shardStatus")
        .then(res => res.json())
        .then(data => data);

    const pad = function (num) {
        return ("00" + num).slice(-2);
    };
    let date;
    date = new Date();
    date =
        date.getUTCFullYear() +
        "-" +
        pad(date.getUTCMonth() + 1) +
        "-" +
        pad(date.getUTCDate()) +
        " " +
        pad(date.getUTCHours()) +
        ":" +
        pad(date.getUTCMinutes()) +
        ":" +
        pad(date.getUTCSeconds());

    const queueMap = await queueResponse.serverConnectionInfoList.map(grid => grid);
    const totalWardenQueue = await queueMap.reduce((total, grid) => total + grid.wardenQueueSize, 0);
    const totalColonialQueue = await queueMap.reduce((total, grid) => total + grid.colonialQueueSize, 0);

    await sql`INSERT INTO queuelengths (Datetime, Colqueue, Warqueue) VALUES (${date}, ${totalColonialQueue}, ${totalWardenQueue})`;
}
