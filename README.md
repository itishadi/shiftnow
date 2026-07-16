ShiftNow
🚧 Status: Active Development
ShiftNow is a modern workforce scheduling and planning platform designed for organizations that manage shift-based workforces.
The application focuses on speed, simplicity, and flexibility while providing planners, managers, and administrators with powerful tools for scheduling, staffing, and workforce management.

Overview
ShiftNow combines workforce planning, employee administration, shift management, and staffing calculations into a single application.
The platform is designed as a lightweight and fast alternative to traditional workforce management systems while maintaining an intuitive user experience.

Core Features
Employee Management

Create and manage employees
Employment period management
Employment percentage management
Address and contact information
Professional role and competence management
Employee import and administration


Planning Period Management

Create planning periods
Rolling planning periods
Period validation
Period overview
Planning approvals
Schedule publication workflow


Schedule Planning

Interactive scheduling interface
Weekly schedule overview
Expandable employee schedules
Automatic week generation
Planning period navigation
Fast keyboard-driven workflow


Shift Templates
Create reusable shift templates for faster planning.
Features:

Custom shift templates
Template duplication
Template editing
Template deletion
Start and end time management
Break handling
Overnight shift support


Shift Roles & Color Management
Create custom role categories with automatic visual representation.
Examples:

SSK
USK
ADM
NATT
TEAM
KÖK
REHAB

Features:

Custom role creation
User-defined short codes
12 selectable colors
Automatic color assignment
Color-coded schedule visualization


Manual Shift Entry
ShiftNow supports rapid keyboard-based shift creation.
Examples:
Plain Text1330 2200 30 sskVisa fler rader
Plain Text2100 0715 m uskVisa fler rader
Automatic processing:

Start time detection
End time detection
Overnight shift handling
Break calculations
Meal-break handling
Duration calculations
Role assignment
Color assignment


Workforce Calculations
Automatic workforce calculations include:

Scheduled hours
Worked hours
Planned hours
Underplanned hours
Overplanned hours
Shift duration calculations
Staffing summaries


Employee Schedule Management

Employee-based schedule planning
Individual schedules
Expand/collapse employee rows
Shift overview per employee
Schedule status monitoring


Staffing & Resource Planning

Staffing visibility across planning periods
Coverage monitoring
Planned staffing comparison
Resource balancing


User Interface
ShiftNow focuses on productivity and speed.
Features:

Interactive schedule grid
Modern planning views
Drag-and-drop scheduling
Keyboard-driven workflow
Responsive layouts
Color-coded shifts
Fast navigation between periods


Data Management
Current storage:

Local Storage persistence
Automatic data saving
Planning period persistence
Employee persistence
Shift persistence


Technologies
Frontend:

HTML5
CSS3
JavaScript (ES Modules)

Storage:

Local Storage

Architecture:

Modular ES Module Architecture
Services
Views
Templates
Helpers
Validation
Shared State Management


Project Structure
Plain Textsrc/├── core/│   ├── app.js│   └── router.js│├── modules/││   ├── employees/│   │   ├── views/│   │   ├── services/│   │   ├── helpers/│   │   └── validation/││   ├── periods/│   │   ├── views/│   │   ├── services/│   │   ├── templates/│   │   ├── modals/│   │   ├── rows/│   │   ├── helpers/│   │   └── validation/││   ├── planning/│   │   ├── views/│   │   ├── services/│   │   ├── rows/│   │   ├── toolbars/│   │   └── timeblocks/││   └── shifts/│├── shared/│   ├── components/│   └── state/│└── utils/Visa fler rader

Current Capabilities
✅ Employee Management
✅ Planning Period Management
✅ Schedule Planning
✅ Schedule Overview
✅ Shift Templates
✅ Shift Role Management
✅ Color-Based Scheduling
✅ Manual Shift Entry
✅ Drag & Drop Scheduling
✅ Staffing Calculations
✅ Employee Scheduling
✅ Local Storage Persistence
✅ Modular Application Architecture

Roadmap
Planned future development:
Workforce Management

Vacation management
Leave management
Absence management
On-call planning

Reporting

Statistics
Staffing reports
Workforce analysis
Planning KPIs

Integrations

PDF Export
Excel Export
Payroll Export
Heroma Integration
Firebase Integration

Cloud Features

Authentication
Cloud synchronization
Multi-user support
Role-based permissions

Mobile Experience

Responsive mobile design
Tablet optimization
Progressive Web App (PWA)

Notifications

Planning reminders
Approval reminders
Schedule publication notifications


Vision
ShiftNow aims to become a modern workforce management platform that combines:

Workforce Planning
Scheduling
Staffing Management
Employee Administration
Workforce Analytics

into a single fast, flexible, and user-friendly solution.
The vision is to provide organizations with a modern alternative to traditional workforce management systems while maintaining simplicity, speed, and full customization.

Author
Hadi Rasouli
.NET Developer • System Developer • Workforce Planning Enthusiast
Project: ShiftNow
Status: Active Development 🚀
