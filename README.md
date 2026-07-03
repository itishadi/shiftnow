# ShiftNow

🚧 **Project Status: Under Active Development**

ShiftNow is a modern workforce scheduling and staff planning system built for organizations that work with shifts, rotating schedules, and staffing management.

The goal of ShiftNow is to provide a fast, intuitive, and flexible alternative to traditional scheduling systems while keeping the user experience simple and efficient.

## Features

### Employee Management

- Create and manage employees
- Employment periods
- Employment percentage
- Personal information management

### Planning Periods

- Create planning periods
- Week-based schedule overview
- Expand and collapse employee schedules
- Automatic week generation

### Shift Templates

- Create custom shift templates
- Edit, duplicate, and delete templates
- Drag-and-drop scheduling
- Break and meal-break support
- Custom shift colors

### Color-Based Role System

- Create custom role categories
- User-defined short codes
- 12 selectable colors
- Automatic color assignment
- Color-coded scheduling

Examples:

- SSK
- USK
- ADM
- T
- NATT
- KÖK

### Manual Shift Entry

Create shifts directly from the keyboard:

```text
1330 2200 30 ssk
```

or

```text
2100 0715 m usk
```

The system automatically:

- Parses start and end times
- Handles overnight shifts
- Calculates break times
- Supports meal breaks
- Calculates shift duration
- Applies role-based colors

### Workforce Calculations

- Worked time calculations
- Planned time calculations
- Underplanned hours
- Overplanned hours
- Shift duration calculations

### User Interface

- Interactive schedule grid
- Expandable weekly schedules
- Color-coded shift visualization
- Drag-and-drop scheduling
- Keyboard-driven workflow
- Fast planning experience

## Technologies

- HTML5
- CSS3
- JavaScript (ES Modules)
- Local Storage

## Project Structure

```text
src/
├── core/
│   ├── app.js
│   └── router.js
│
├── modules/
│   ├── employees/
│   ├── periods/
│   ├── planning/
│   └── shifts/
│
├── shared/
│   ├── components/
│   └── state/
│
└── utils/
```

## Current Capabilities

✅ Employee management

✅ Period management

✅ Weekly schedule planning

✅ Custom shift templates

✅ Drag and drop scheduling

✅ Manual shift entry

✅ Color-based role management

✅ Break and meal-break handling

✅ Worked hours calculations

✅ Underplanned and overplanned calculations

✅ Expandable employee schedules

## Roadmap

Planned features include:

- Vacation management
- Absence management
- Statistics and reports
- PDF export
- Payroll export
- Firebase integration
- Cloud synchronization
- Multi-user support
- Role-based permissions
- Mobile-friendly interface
- Notifications and reminders
- Advanced workforce analytics

## Vision

ShiftNow aims to become a modern and flexible workforce management platform that simplifies scheduling, staffing, and workforce planning for organizations of all sizes.

By combining simplicity, speed, and customization, ShiftNow provides planners and managers with powerful tools while maintaining an intuitive user experience.

## Author

Developed by **Hadi Rasouli**

.NET Developer | System Developer | Workforce Planning Enthusiast
