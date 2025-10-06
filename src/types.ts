export type Weather = {
regionId: string;
regionName: string;
temperatureC: number;
humidityPercent: number;
forecast: string; // e.g. "sunny", "rain"
};


export type EpidemicAlert = {
id: string;
regionId: string;
title: string;
severity: 'low' | 'medium' | 'high';
description: string;
};


export type TouristSite = {
id: string;
name: string;
regionId: string;
regionName: string;
summary: string;
details?: string;
activities?: string[];
schedule?: string;
cost?: string;
safety?: string;
image?: string; // relative path under /public/images/
};