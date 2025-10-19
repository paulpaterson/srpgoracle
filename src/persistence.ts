// Handles saving and loading of values into the cookie store

import {DEFAULT_STAT, STATS} from "./content";
import {Stats} from "./choices";

export async function loadStats(stats_list: Stats[]) {
    console.log('Starting to load cookies');
    for (let stats of stats_list) {
        for (let the_stat of stats.stats) {
            let result = await cookieStore.get(the_stat.name);
            if (result) {
                console.log(`Got ${result.value} for ${the_stat.name}`);
                the_stat.value = Number(result.value) ?? DEFAULT_STAT;
            } else {
                the_stat.value = DEFAULT_STAT;
            }
        }
    }
}

export async function storeStats(stats: Stats) {
    for (let the_stat of stats.stats) {
        await cookieStore.set(the_stat.name, the_stat.value.toString());
    }
}
