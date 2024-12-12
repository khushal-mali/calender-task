# Event Management Application

## Overview

The Event Management Application is a modern web-based tool for scheduling events with robust validation to avoid time conflicts. Built using React, **Zod** for form validation, and **shadcn/ui** for customizable UI components and notifications, it provides an intuitive user experience. Event data persists across sessions using **localStorage**.

---

## Features

### **Add Events**

- Users can specify:
  - **Event Name**, **Start Time**, **End Time**, and **Description**.
- Modal-based interface for focused event creation.

### **Date-Specific Scheduling**

- Events are organized and displayed by selected dates.

### **No Overlaps**

- Prevents overlapping events on the same date with:
  - Time range validation.
  - Alerts for conflicts during scheduling.

### **Persistent Storage**

- Event data is stored in **localStorage**, ensuring persistence across page reloads and rerenders.

### **User-Friendly UI**

- Components from **shadcn/ui** include:
  - Inputs for event details.
  - Toast notifications for feedback.
  - Responsive and accessible design.

### **Error Handling**

- Inline validation ensures:
  - End time is after the start time.
  - No overlapping time slots.

---

## Workflow

1. **Select a Date**: Choose a date to schedule events.
2. **Add Event**: Open a modal to enter event details.
3. **Validate and Save**:
   - **Zod** validates inputs.
   - Conflicts trigger toast notifications; valid events are saved.
4. **View Events**: Browse scheduled events by date.

---

## Technical Details

### **Frontend**

- **React** for UI.
- Local state with hooks for managing events and modals.

### **Validation**

- **Zod** for schema-based form validation.
- Time parsing and conflict detection for event overlap prevention.

### **Storage**

- Events organized as `{ "DD-MM-YYYY": [{...eventDetails}] }`.
- Persisted using **localStorage** for session durability.

---

## Conclusion

This application offers an efficient, user-friendly way to manage events, ensuring time conflicts are avoided. With its use of **localStorage** for persistence and modular design, the app is tailored for reliable event scheduling.
