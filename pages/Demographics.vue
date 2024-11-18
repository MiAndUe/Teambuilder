<template>
  <div class="sidebar">
    <!-- Close Button -->
    <button class="close-button" @click="toggleSidebar">&#x2715;</button>
    
    
    <!-- Form to Capture Filters -->
    <form @submit.prevent="submitForm">
      <!-- Time Period Tile -->
      <div class="field">
        <button 
          @click="toggleDropdown('timePeriod')" 
          class="field-button"
          type="button"
        >
          {{ getTimePeriodDisplayText() }}
        </button>

        <div v-if="isDropdownOpen('timePeriod')" class="dropdown-options">
          <!-- Time Period Options -->
          <div class="time-period-options">
            <label>
              <input 
                type="radio" 
                value="Continuous" 
                v-model="timePeriodOption"
              />
              Continuous
            </label>
            <label>
              <input 
                type="radio" 
                value="Semester-based" 
                v-model="timePeriodOption"
              />
              Semester-based
            </label>
          </div>

          <!-- Continuous Option -->
          <div v-if="timePeriodOption === 'Continuous'" class="time-period-inputs">
            <label>Start Year:</label>
            <input type="text" v-model="startYear" placeholder="Start Year" class="custom-input" />

            <label>End Year:</label>
            <input type="text" v-model="endYear" placeholder="End Year" class="custom-input" />

            <label>Start Semester:</label>
            <select v-model="startSemester" class="custom-dropdown">
              <option disabled value="">Select Semester</option>
              <option>Spring</option>
              <option>Summer</option>
              <option>Fall</option>
            </select>

            <label>End Semester:</label>
            <select v-model="endSemester" class="custom-dropdown">
              <option disabled value="">Select Semester</option>
              <option>Spring</option>
              <option>Summer</option>
              <option>Fall</option>
            </select>
          </div>

          <!-- Semester-based Option -->
          <div v-if="timePeriodOption === 'Semester-based'" class="time-period-inputs">
            <label>Start Year:</label>
            <input type="text" v-model="startYear" placeholder="Start Year" class="custom-input" />

            <label>End Year:</label>
            <input type="text" v-model="endYear" placeholder="End Year" class="custom-input" />

            <label>Choose Semesters:</label>
            <div class="semester-options">
              <div 
                v-for="semester in semesters" 
                :key="semester" 
                :class="{'dropdown-item': true, 'selected': selectedSemesters.includes(semester)}"
                @click="toggleSemester(semester)"
              >
                {{ semester }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Other Filters -->
      <div v-for="filter in filters" :key="filter.name" class="field">
      <button 
        @click="toggleDropdown(filter.name)" 
        class="field-button"
      >
        {{ getFilterDisplayText(filter) }}
      </button>

        <div v-if="isDropdownOpen(filter.name)" class="dropdown-options">
          <div 
            v-for="option in filter.options" 
            :key="option" 
            :class="{'dropdown-item': true, 'selected': filter.selectedOptions.includes(option)}"
            @click="toggleFilterOption(filter, option)"
          >
            {{ option }}
          </div>
        </div>
      </div>

      <!-- File Import Button -->
      <div class="import-file">
        <button type="button" class="import-button">
          <span>📂</span> Import file
        </button>
      </div>

      <!-- Generate Graph Button -->
      <div class="generate-graph">
        <button type="submit" class="generate-button">
          Generate Graph
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: [
        { name: "Course", options: ["EPCS 2100", "EPCS 2200", "EPCS 3100", "EPCS 3200"], selectedOptions: [] },
        { name: "Ethnicity", options: ["African-American", "Asian", "Hispanic", "International", "Other", "White"], selectedOptions: [] },
        { name: "Gender", options: ["Female", "Male", "Prefer not to say", "Other"], selectedOptions: [] },
        { name: "Type of chart", options: ["Bar", "Pie", "Line", "Combined bar and line"], selectedOptions: [] }
      ],
      semesters: ["Fall", "Spring", "Summer"],
      openDropdown: {}, // Object to track open dropdowns
      timePeriodOption: "", // Continuous or Semester-based
      startYear: "",
      endYear: "",
      startSemester: "",
      endSemester: "",
      selectedSemesters: [] // For Semester-based option
    };
  },
  methods: {
    toggleDropdown(filterName) {
      this.openDropdown = this.openDropdown === filterName ? null : filterName;
    },
    isDropdownOpen(filterName) {
      return this.openDropdown === filterName;
    },
    toggleSemester(semester) {
      const index = this.selectedSemesters.indexOf(semester);
      if (index === -1) {
        this.selectedSemesters.push(semester);
      } else {
        this.selectedSemesters.splice(index, 1);
      }
    },
    toggleFilterOption(filter, option) {
      const index = filter.selectedOptions.indexOf(option);
      if (index === -1) {
        filter.selectedOptions.push(option);
      } else {
        filter.selectedOptions.splice(index, 1);
      }
    },
    getFilterDisplayText(filter) {
      if (filter.name === "Year" && this.customFilterYearStart && this.customFilterYearEnd) {
        return `Year: ${this.customFilterYearStart} - ${this.customFilterYearEnd}`;
      }
      if (filter.selectedOptions.length > 0) {
        return `${filter.name}: ${filter.selectedOptions.join(', ')}`;
      }
      return filter.name;
    },
    getTimePeriodDisplayText() {
      if (this.timePeriodOption === "Continuous") {
        return `Continuous: ${this.startYear}-${this.endYear}, ${this.startSemester} to ${this.endSemester}`;
      }
      if (this.timePeriodOption === "Semester-based") {
        const semesters = this.selectedSemesters.length ? `(${this.selectedSemesters.join(", ")})` : "";
        return `Semester-based: ${this.startYear}-${this.endYear} ${semesters}`;
      }
      return "Time Period";
    },
    toggleSidebar() {
      // Functionality to close the sidebar if needed
    },
    submitForm() {
      const formData = {
        timePeriod: {
          option: this.timePeriodOption,
          startYear: this.startYear,
          endYear: this.endYear,
          startSemester: this.startSemester,
          endSemester: this.endSemester,
          selectedSemesters: this.selectedSemesters,
        },
        filters: this.filters.reduce((acc, filter) => {
          acc[filter.name] = filter.selectedOptions;
          return acc;
        }, {}),
      };
      console.log("Submitting form data:", formData);
      // Add graph generation logic here
    }
  }
};
</script>

<style scoped>
.sidebar {
  background-color: #006d48;
  padding: 16px;
  display: flex;
  flex-direction: column;
  width: 250px;
  border-radius: 8px;
}

.close-button {
  color: white;
  font-size: 20px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 16px;
}

.field {
  margin-bottom: 12px;
}

.field-button {
  background-color: #ffffff;
  color: #006d48;
  border: none;
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.field-button:hover {
  background-color: #e8f5e9;
}

.dropdown-options {
  background-color: #ffffff;
  color: black;
  border-radius: 4px;
  margin-top: 4px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 200px; /* Added max-height for dropdown */
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 8px 0;
}

.dropdown-item {
  padding: 8px 12px;
  color: #006d48;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #e8f5e9;
}

.dropdown-item.selected {
  background-color: #e8f5e9;
  font-weight: bold;
}

.custom-range {
  margin: 8px 0;
}

.custom-input {
  width: 48%;
  padding: 6px;
  margin: 4px 1%;
  border: 1px solid #006d48;
  border-radius: 4px;
  font-size: 14px;
}

.custom-dropdown {
  width: 100%;
  padding: 6px;
  margin: 4px 0;
  border: 1px solid #006d48;
  border-radius: 4px;
  font-size: 14px;
}

.import-file {
  margin-top: 20px;
}

.import-button {
  background-color: #ffffff;
  color: #006d48;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.import-button:hover {
  background-color: #e8f5e9;
}

.generate-graph {
  margin-top: 20px;
}

.generate-button {
  background-color: #006d48;
  color: #ffffff;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.generate-button:hover {
  background-color: #004c36;
}
</style>