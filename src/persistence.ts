// Handles saving and loading of values into the cookie store

import {DEFAULT_STAT, STATS} from "./content";

export async function loadStats() {
    console.log('Starting to load cookies');
    for (let the_stat of STATS.stats) {
        let result = await cookieStore.get(the_stat.name);
        if (result) {
            console.log(`Got ${result.value} for ${the_stat.name}`);
            the_stat.value = Number(result.value) ?? DEFAULT_STAT;
        } else {
            the_stat.value = DEFAULT_STAT;
        }
    }
}

export async function storeStats() {
    for (let the_stat of STATS.stats) {
        await cookieStore.set(the_stat.name, the_stat.value.toString());
    }
}
