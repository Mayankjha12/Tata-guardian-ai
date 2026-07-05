import { Vehicle, FleetStats } from '@/types/vehicle';
import { MOCK_VEHICLES, generateFleetStats } from '@/utils/constants';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const vehicleService = {
  async getFleet(): Promise<Vehicle[]> {
    await delay(300);
    return MOCK_VEHICLES;
  },

  async getVehicle(id: string): Promise<Vehicle> {
    await delay(200);
    const vehicle = MOCK_VEHICLES.find(v => v.id === id);
    if (!vehicle) {
      throw new Error(`Vehicle ${id} not found`);
    }
    return vehicle;
  },

  async searchVehicles(query: string): Promise<Vehicle[]> {
    await delay(250);
    const q = query.toLowerCase();
    return MOCK_VEHICLES.filter(
      v =>
        v.id.toLowerCase().includes(q) ||
        v.licensePlate.toLowerCase().includes(q) ||
        v.make.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q)
    );
  },

  async getFleetStats(): Promise<FleetStats> {
    await delay(200);
    return generateFleetStats(MOCK_VEHICLES);
  },

  async updateVehicle(id: string, updates: Partial<Vehicle>): Promise<Vehicle> {
    await delay(300);
    const vehicle = MOCK_VEHICLES.find(v => v.id === id);
    if (!vehicle) {
      throw new Error(`Vehicle ${id} not found`);
    }
    Object.assign(vehicle, updates);
    return vehicle;
  },

  async deleteVehicle(id: string): Promise<void> {
    await delay(200);
    const index = MOCK_VEHICLES.findIndex(v => v.id === id);
    if (index === -1) {
      throw new Error(`Vehicle ${id} not found`);
    }
    MOCK_VEHICLES.splice(index, 1);
  },
};
