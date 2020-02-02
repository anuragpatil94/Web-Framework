# Web-Framework

A Typescript Web Framework

## Table Of Contents

- [Web-Framework](#web-framework)
  - [Table Of Contents](#table-of-contents)
  - [Functionality](#functionality)
    - [Class User](#class-user)
    - [on(eventName,callback)](#oneventnamecallback)
    - [trigger(eventName)](#triggereventname)
  - [Key](#key)
  - [Commands](#commands)
  - [Packages](#packages)

## Functionality

- A User Class to represent User
- Store, Retrieve or Change User Data
- Changes should appear on the screen
- User should be able to save or get data

### Class User

- has information for one user

### on(eventName,callback)

- registers events and stores them until we need to trigger

### trigger(eventName)

- Takes all the events for the given event and trigger them one by one

## Key

- Since this is a framework, Anticipate what others who will use the framework wants.

## Commands

- Start Application `parcel index.html`
- Start JSON Server `json-server -w db.json`

## Packages

- parcel - A ts file bundler
