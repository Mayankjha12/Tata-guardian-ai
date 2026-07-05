'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '@/services/vehicle';
import { VehicleCard } from '@/components/dashboard/VehicleCard';
import { VehicleDrawer } from '@/components/dashboard/VehicleDrawer';
import { Drawer } from '@/components/common/Drawer';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Vehicle, VehicleStatus } from '@/types/vehicle';
import { filterVehicles, sortVehicles } from '@/utils/helpers';
import { Search, Filter, Grid3x3 } from 'lucide-react';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<VehicleStatus | undefined>();
  const [sortBy, setSortBy] = useState('health');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Fetch fleet data
  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ['fleet'],
    queryFn: () => vehicleService.getFleet(),
    staleTime: 30000,
  });

  const { data: fleetStats } = useQuery({
    queryKey: ['fleetStats'],
    queryFn: () => vehicleService.getFleetStats(),
    staleTime: 30000,
  });

  // Filter and sort vehicles
  const filteredVehicles = useMemo(() => {
    let result = filterVehicles(vehicles, { status: statusFilter, searchQuery });
    return sortVehicles(result, sortBy);
  }, [vehicles, statusFilter, searchQuery, sortBy]);

  const statusOptions = [
    { status: VehicleStatus.HEALTHY, count: fleetStats?.healthyVehicles ?? 0 },
    { status: VehicleStatus.DEGRADING, count: fleetStats?.degradingVehicles ?? 0 },
    { status: VehicleStatus.WARNING, count: fleetStats?.warningVehicles ?? 0 },
    { status: VehicleStatus.CRITICAL, count: fleetStats?.criticalVehicles ?? 0 },
  ];

  return (
    <>
    <div className="space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Fleet Dashboard</h1>
        <p className="text-neutral-400 text-sm">Real-time monitoring of Tata Motors fleet</p>
      </div>

      {/* Stats Bar */}
      {fleetStats && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-2">
          <Card className="p-3">
            <div className="space-y-0.5">
              <p className="text-xs text-neutral-500 uppercase font-semibold">Total Vehicles</p>
              <p className="text-2xl font-bold text-primary">{fleetStats.totalVehicles}</p>
            </div>
          </Card>
          <Card className="p-3">
            <div className="space-y-0.5">
              <p className="text-xs text-neutral-500 uppercase font-semibold">Healthy</p>
              <p className="text-2xl font-bold text-status-healthy">{fleetStats.healthyVehicles}</p>
            </div>
          </Card>
          <Card className="p-3">
            <div className="space-y-0.5">
              <p className="text-xs text-neutral-500 uppercase font-semibold">Degrading</p>
              <p className="text-2xl font-bold text-yellow-400">{fleetStats.degradingVehicles}</p>
            </div>
          </Card>
          <Card className="p-3">
            <div className="space-y-0.5">
              <p className="text-xs text-neutral-500 uppercase font-semibold">Warning</p>
              <p className="text-2xl font-bold text-orange-400">{fleetStats.warningVehicles}</p>
            </div>
          </Card>
          <Card className="p-3">
            <div className="space-y-0.5">
              <p className="text-xs text-neutral-500 uppercase font-semibold">Critical</p>
              <p className="text-2xl font-bold text-status-critical">{fleetStats.criticalVehicles}</p>
            </div>
          </Card>
          <Card className="p-3">
            <div className="space-y-0.5">
              <p className="text-xs text-neutral-500 uppercase font-semibold">Avg Health</p>
              <p className="text-2xl font-bold text-accent-cyan">{fleetStats.averageHealthScore}%</p>
            </div>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card className="space-y-3 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-500" />
            <input
              type="text"
              placeholder="Search by ID, plate, make, or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-neutral-500 focus:border-primary focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-5 w-5 text-neutral-500" />
            {statusOptions.map(({ status, count }) => (
              <button
                key={status}
                onClick={() => setStatusFilter(statusFilter === status ? undefined : status)}
                className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                  statusFilter === status
                    ? 'bg-primary text-white'
                    : 'bg-neutral-800 text-neutral-400 hover:text-foreground'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
          >
            <Grid3x3 className="h-5 w-5 text-neutral-400" />
          </button>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-neutral-500">Sort by:</span>
          {['health', 'mileage', 'status', 'name'].map((option) => (
            <button
              key={option}
              onClick={() => setSortBy(option)}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                sortBy === option
                  ? 'bg-primary/20 text-primary'
                  : 'bg-neutral-800 text-neutral-400 hover:text-foreground'
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </Card>

      {/* Results */}
      <div>
        <p className="text-xs text-neutral-500 mb-3 uppercase font-semibold tracking-wide">
          {filteredVehicles.length} vehicle{filteredVehicles.length !== 1 ? 's' : ''} found
        </p>

        {isLoading ? (
          <div className="text-center py-8 text-neutral-400 text-sm">Loading fleet data...</div>
        ) : filteredVehicles.length === 0 ? (
          <div className="text-center py-8 text-neutral-400 text-sm">No vehicles match your filters</div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'
                : 'space-y-3'
            }
          >
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} onClick={setSelectedVehicle} />
            ))}
          </div>
        )}
      </div>
    </div>

    {/* Vehicle Detail Drawer */}
    <Drawer
      isOpen={!!selectedVehicle}
      onClose={() => setSelectedVehicle(null)}
      title={selectedVehicle ? `${selectedVehicle.make} ${selectedVehicle.model}` : 'Vehicle Details'}
    >
      {selectedVehicle && <VehicleDrawer vehicle={selectedVehicle} />}
    </Drawer>
    </>
  );
}
