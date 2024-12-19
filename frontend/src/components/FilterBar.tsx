import React from "react";

interface FilterBarProps {
  onFilterChange: (key: string, value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        onChange={(e) => onFilterChange("search", e.target.value)}
      />
      <select onChange={(e) => onFilterChange("rank", e.target.value)}>
        <option value="">Filter by Rank</option>
        <option value="Private">Private</option>
        <option value="Sergeant">Sergeant</option>
        {/* Add more ranks */}
      </select>
      <select onChange={(e) => onFilterChange("status", e.target.value)}>
        <option value="">Filter by Status</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
      </select>
    </div>
  );
};

export default FilterBar;
