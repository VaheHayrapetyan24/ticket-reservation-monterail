# Ticket reservation test task API

## Run the API:

1. Run a local PostgreSQL server
2. Copy `.env.example` to a new file called `.env`
3. Replace the values in `.env` with actual values
4. Run `npm run tsc:build`
5. Run `npm run migration:run`
6. Run `npm run start`

## Description

I have not implemented the API for creating events since it was not in the requirement.
The tickets for the events should be created when the event is created. This can be done in batches to avoid DB overload.
Currently all this data is generated via the migrations (see `PopulateEvents`, `PopulateTickets`)

The only requirement that is not met is
```
avoid one - we can only buy tickets in a quantity that will not leave only 1 ticket
available. Reservation is valid for 15 minutes, after that it is released if payment was
not successful.
```
If the total amount of tickets is not even, and we also have the requirement that all the reservations need to
include even amount of tickets, then the last ticket is always going to be left.

Haven't had time to cover with unit tests, but I checked everything manually
