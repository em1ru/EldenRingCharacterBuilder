// src/services/erdbService.js
import axios from 'axios';

const API_BASE_URL = 'https://eldenring.fanapis.com/api';

async function fetchAllItems(endpoint) {
  let allItems = [];
  let page = 0;
  let total = 1;

  while (allItems.length < total) {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}?limit=100&page=${page}`);
    const data = response.data;
    if (data.success) {
      total = data.total;
      allItems = [...allItems, ...data.data];
      page++;
    } else {
      break;
    }
  }

  return allItems;
}

export async function fetchWeapons() {
  const weapons = await fetchAllItems('weapons');
  console.log('Fetched weapons data structure:', weapons);
  return weapons;
}

export async function fetchArmors() {
  const armors = await fetchAllItems('armors');
  console.log('Fetched armors data structure:', armors);
  return armors;
}

export async function fetchTalismans() {
  const talismans = await fetchAllItems('talismans');
  console.log('Fetched talismans data structure:', talismans);
  return talismans;
}
