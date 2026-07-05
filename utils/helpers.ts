import { Vehicle, VehicleStatus } from '@/types/vehicle';

export const getStatusColor = (status: VehicleStatus): string => {
  switch (status) {
    case VehicleStatus.HEALTHY:
      return 'text-green-400';
    case VehicleStatus.DEGRADING:
      return 'text-yellow-400';
    case VehicleStatus.WARNING:
      return 'text-orange-400';
    case VehicleStatus.CRITICAL:
      return 'text-red-500';
    case VehicleStatus.MAINTENANCE:
      return 'text-blue-400';
    default:
      return 'text-gray-400';
  }
};

export const getStatusBgColor = (status: VehicleStatus): string => {
  switch (status) {
    case VehicleStatus.HEALTHY:
      return 'bg-green-500/20';
    case VehicleStatus.DEGRADING:
      return 'bg-yellow-500/20';
    case VehicleStatus.WARNING:
      return 'bg-orange-500/20';
    case VehicleStatus.CRITICAL:
      return 'bg-red-500/20';
    case VehicleStatus.MAINTENANCE:
      return 'bg-blue-500/20';
    default:
      return 'bg-gray-500/20';
  }
};

export const getStatusLabel = (status: VehicleStatus): string => {
  return status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');
};

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const formatTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export const formatDateTime = (date: Date | string): string => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

export const getHealthScoreColor = (score: number): string => {
  if (score >= 80) return 'text-green-400';
  if (score >= 60) return 'text-yellow-400';
  if (score >= 40) return 'text-orange-400';
  return 'text-red-500';
};

export const getHealthScoreBgColor = (score: number): string => {
  if (score >= 80) return 'bg-green-500/20';
  if (score >= 60) return 'bg-yellow-500/20';
  if (score >= 40) return 'bg-orange-500/20';
  return 'bg-red-500/20';
};

export const clsx = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const truncate = (str: string, length: number): string => {
  return str.length > length ? str.substring(0, length) + '...' : str;
};

export const sortVehicles = (vehicles: Vehicle[], sortBy: string): Vehicle[] => {
  const sorted = [...vehicles];
  switch (sortBy) {
    case 'health':
      return sorted.sort((a, b) => b.healthScore - a.healthScore);
    case 'mileage':
      return sorted.sort((a, b) => b.mileage - a.mileage);
    case 'status':
      return sorted.sort((a, b) => a.status.localeCompare(b.status));
    case 'name':
      return sorted.sort((a, b) => `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`));
    default:
      return sorted;
  }
};

export const filterVehicles = (vehicles: Vehicle[], filters: { status?: VehicleStatus; searchQuery?: string }): Vehicle[] => {
  return vehicles.filter(vehicle => {
    if (filters.status && vehicle.status !== filters.status) {
      return false;
    }
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        vehicle.id.toLowerCase().includes(query) ||
        vehicle.licensePlate.toLowerCase().includes(query) ||
        vehicle.make.toLowerCase().includes(query) ||
        vehicle.model.toLowerCase().includes(query)
      );
    }
    return true;
  });
};
