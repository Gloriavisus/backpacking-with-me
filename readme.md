## BACKPACKING WITH ME!

# Description

This is an App for travel lovers who wants to find other people, and travel together. You can make a trip for two or more people.

# User stories

404 : As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
500 : As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
Homepage : As a user I want to be able to access the homepage to see the login and signup
Sign up: As a user I want to sign up on the webpage so that I can see all the groups that I could join
Login: As a user I want to be able to log in on the webpage so that I can get back to my account
Logout: As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
City list: As a user I want to see all the cities so that I can choose where I want to travel.
People list: As a user I want to see all people so that I can find persons with the same preferences.
User card: As a user I want to show my preferences so that other people can see the information.
Group create: As a user I want to create group to travel together.

# Backlog

List of the other outside of the MVPs scope:

Geo location:
To see your and other's people location.
To see where is the city

List cities:
To create more cities to visit

# MVP

User profile:
See my profile
Upload my profile picture
See other users information
List of groups created by the user
List of trips the user is attending

# Routes

AUTH:

GET / Renders the homepage
GET/ auth/ signup
    redirects to /if user logged in
    renders the signup form
POST/ auth / signup
    redirects to /if user logged in
    body : username, password
GET/ auth/ login
    redirects to /if user logged in
    renders the login form
POST/ auth / login
    redirects to /if user logged in
    body : username, password
POST/ auth / logout
    body 
GET/ auth / me
    findById, if current user = user redirect  to /

CITY:

GET / city / :id
    render city "list" (possible list)
    findById
POST / city / :id / favourite
    findByIdAndUpdate, choose city and create group

TRIP:

GET / trip / create
    render the trip
POST / trip/ / create
    redirect to / if user is anonymous
    body : API

USER:

GET / user
    render the user account
POST / user
    redirect 
    body: image, name, surname, city, (location?), hobbies, preferences, description
POST / user / :id / delete
POST / user / edit


# Models

User Model:
    username: String
    password: String
    hobbies: String
    preference: String
    description : String and number
    image: url

Country Model: 
    name: String
    image: url
    description: String and number
    users: array

Trip Model: 
    tripCreator: {}
    tripSharer: {}
    country: {}
    //api information to be done in backlog


# Cards
Homepage:
    h1
    buttons
    background-image
    animations

Search-page:
    navbar : buttons ( home and my account)
    maybe list or one city alone
    link city

City-page:
    navbar: buttons ( home and my account)
    section : image and information
    button -link
    section: button, name, image

Trip-page:
    navbar: buttons ( home and my account)
    h1
    list with information (API)

User / Traveler-info
    image
    information


# Link

GIT
 https://gloriavisus.github.io/backpacking-with-me/











