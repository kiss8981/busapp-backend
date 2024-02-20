export declare class BusAuthenticateDto {
    provider: string;
    token: string;
}
export declare class Location {
    latitude: string;
    longitude: string;
}
export declare class BusLocationUpdateDto {
    busId: string;
    location: Location;
}
export declare class BusProviderLocationUpdateJoinDto {
    providerId: string;
}
