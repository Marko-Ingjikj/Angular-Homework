# [Angular Framework] Hotel Management App

The main goal of this homework is to go thought all the steps of creating a new Angular project using Angular CLI and to get familiar with the Angular project structure.

## Models

### Hotel Model

```
    {
        "id": 1,
        "name": "Hotel Name",
        "address": "Hotel Address",
        "city": "Hotel City",
        "country": "Hotel Country",
        "stars": 5, // 1-5
        "image": "https://via.placeholder.com/150",
        "rooms": [{
            "id": 1,
            "name": "Room Name",
            "description": "Room Description",
            "image": "https://via.placeholder.com/150",
            "price": 100,
            "persons": 2,
            "children": 2,
            "amenities": ["TV", "Air Conditioning", "Mini Bar", "Bathtub", "Free WiFi"]
            "isAvailable": true
        }]
    }
```

## Task 1:

1. Create a new Angular project using Angular CLI.
2. Create a new component called `hotel-management` and add it to the `app.component.html` file.
3. Showcase a list of hotels in the `hotel-management` component. The list should contain the following information about each hotel: name, location (combination of address, city & country), stars, and image. The list should be displayed in a table or any elements you see fit (you are free to design this as you wish).

## Task 2:

1. Create a new component called `hotel-details`.
2. Add a link on the name of the hotel, in the list from the previous task, that will navigate to the `hotel-details` component and show info about the hotel.
3. On the details page showcase the list of rooms that the hotel has. The list should contain the following information about each room: name, description, image, price, persons, children, currency, amenities, and availability. The list should be displayed in a table or any elements you see fit (you are free to design this as you wish).
4. Create a directive to highlight the rooms that are available (in any way you want by changing some style property).

- the hotel details page can be created on a new route or on the same route as the list of hotels (routing is optional).

## Task 3:

1. Implement ability to add, update and delete hotels and rooms. Implement forms for the following actions: (use reactive forms, the structure and design is up to you)
   - add a new hotel
   - add a new room to a hotel
   - edit a hotel
   - edit a room
2. Add appropriate validation to all fields (each field should have a proper error message displayed when the validation fails):
   - Hotel
     - all fields are required
     - stars should be between 1 and 5
     - image must be an URL
   - Room
     - price must be a number greater than 0
     - persons must be a number greater than 0
     - children must be a number, can be 0
     - image must be an URL
3. Implement routing for the application. The application should have the following routes:
   - `/hotels` - the home page should display the list of hotels
   - `/hotels/:id` - the hotel details page should display the details of a hotel
   - route(s) for the forms
   - any other routes you see fit and default routes like `404` or `` should be handled as well

## Task 4:

- Use observables

## Task 5:

- (optional) Implement NGRX
- Use Firebase

## Task 6:

- Implement Authentication
- Users should be able to register and login to the app
- Add admin role. Admin users are the only ones who can add and edit hotels & hotel rooms

<hr>

# Homework1

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
