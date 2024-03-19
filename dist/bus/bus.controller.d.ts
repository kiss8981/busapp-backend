import { BackgroundBusLocationUpdate } from 'src/resource/dtos/bus.dto';
import { BusService } from './bus.service';
import { BusGateway } from './bus.gateway';
export declare class BusController {
    private readonly busService;
    private readonly busGateway;
    constructor(busService: BusService, busGateway: BusGateway);
    login(locationDto: BackgroundBusLocationUpdate, authorization: string): Promise<boolean>;
}
