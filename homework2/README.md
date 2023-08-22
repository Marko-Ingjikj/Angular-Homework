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
