# JhostifyScript

A FE framework for Jhub.center

This framework has multiple objectives:
- Learn. The biggest reason I had to create this was to learn all I can.
- Light-weight:
    - It is common and known, most javascript libraries and specially frameworks import a lof of dependencies, that import more dependencies, making working/using the framework import a LOT of dependencies, that are not always completely checked and safe, and heavy.
- Javascript/Typescript focued:
    - I hate HTML. I hate CSS. I'm a backend developer, so that is no surprise, and so decided to create something that ONLY needs javascript/typescript. In theory it should be possible. This is the proof.
- Multi-plataform (NOT YET IMPLEMENTED):
    - One of the main objectives is to create a protocol so that one view in the browser can be used in another plataform
    - No new framework or library or external tool, just this framework alone.
        - Maybe using another method od language, and use this framework as a base/import, but no external input.
- Backend configuration (NOT YET IMPLEMENTED):
    - One of the main ideas for this is, as I said before - I'm a backend developer - be able to build a fully working webpage from just configuration from the BE. For that it needed to be done fully in javascript, and this allows the multi-plataform idea to be viable.


# NPM

Page:
https://www.npmjs.com/package/@jhub-center/jhostify-script

Install:
npm i @jhub-center/jhostify-script


# Instructions
1. Install using npm (see abouve)
2. Create a src folder, inside a index.html and index.ts
    - index.ts
        - create a "render" function that takes no args
3. Create a tsconfig.json and tsconfig.json on the room folder
    - tsconfig.json
        - (TBD)
    - tsconfig.json
        - Add an appName and on the html create an HTML tag with the same name
4. Explore the framework :)