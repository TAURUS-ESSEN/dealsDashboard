# Deals Dashboard CRM

A CRM/dashboard project built with React, TypeScript and Vite.

The app simulates a small sales pipeline system. Deals, clients, tasks and managers are loaded from MockAPI, normalized from dirty API data, and transformed into dashboard view models for filtering, sorting, pagination, details panels and CRUD actions.

## Screenshots

![Deals dashboard](./assets/dashboard.webp)

## Features

- Deals dashboard with table, summary cards and details panel
- Dirty API data normalization before usage
- Derived dashboard rows assembled from deals, clients, managers and tasks
- Deal create, edit and delete flows
- Client edit and missing-client creation flow
- Task create, edit and delete flows
- Manager create, edit and delete flow
- Filters, presets, sorting and pagination
- Probability bar with status-based colors
- Toast notifications for create, update and delete actions
- Reusable modal system
- React Router layout with separate app sections
- TypeScript-first data contracts

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Hook Form
- React Router
- Lucide React
- MockAPI

## Architecture

The project separates raw API data, normalized entities and UI view models.

```txt
MockAPI
  -> raw API loaders
  -> normalization layer
  -> normalized app state
  -> derived dashboard rows
  -> UI components
  -> action hooks
  -> API mappers
  -> MockAPI mutations
```

Important project boundaries:

- Raw API data is not stored in React state
- State stores normalized entities
- Forms do not call API directly
- Forms call callbacks provided by the app layer
- Action hooks handle mapping, API calls and data refresh
- `DashboardRow` is not an API entity, it is a view model assembled from several entities

## Project Structure

```txt
src/api                    API functions
src/service                Raw loading functions
src/normalized             Data normalization
src/types                  TypeScript entity types
src/utils                  API mappers and helpers
src/hooks                  Data loading, filters, actions, pagination
src/features/Dashboard     Dashboard row/details builders
src/components             UI components
src/components/modal       Modal components
src/styles                 Global component styles
```

## Main Data Model

The dashboard works with four main entities:

- `clients`
- `deals`
- `tasks`
- `users / managers`

The table rows are derived from these entities. A deal row may include client info, owner info, task info, probability, status and calculated issue flags.

## Current Status

Completed:

- Deals dashboard
- Summary cards