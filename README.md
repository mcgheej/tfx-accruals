# Accruals Application

A simple tool designed to help manage household budgets, specifically by managing savings to meet upcoming bills and other financial commitments that will arise at some future date, for example your annual Buildings & Contents insurance.

## Technologies

The application was developed using the Angular framework, together with Angular Material for UI components and Tailwind CSS for styling. Firebase provides the backend services, utilising Firebase Authentication for Email/Password based authentication service and Firestore for database service.

The application uses standalone components throughout.

The build system used is Nx by Nrwl.

## Installation

To install the application simply clone or download the project and run:

```bash
npm install.
```

To use the application you will need to create a Firebase project and configure it to provide Email/Password authentication and Firestore database services. Once configured you can replace the Firebase api config details in the codebase with your Firebase project's api config.

That done you should be ready to run the application by serving locally:

```bash
npx nx serve accruals -o
```

This will build, serve and open the application in a browser window.
