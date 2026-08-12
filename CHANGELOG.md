### 0.4.0
- An initial realease, not really ready for usage!
- Implemented the concept of routes.

### 0.5.0
- An early release, implmented the concept of components.
- Each component can be created as an object and added to another component or page.
- These components are basically a javascript representation of the HTML Elements in the framework.
- Only div was added as a proof of comcept, remaining ones will be added in the future.

### 0.6.0
- Added all (hopefully) component/HTML tags
- Added all (hopefully) attributes, except on... events. Those need to be re-thinked and re-done.

### 0.6.1
- Added some missing Components:
    - Header
    - Footer
    - Nav
    - Sections

### 0.6.2
- Added a bare-bones integration for css. Temporary but current solution will be kept in the future for it's simplicity.
    - Simply create a new Css instance, giving the css as plain text, and add it to a page.
    - For the time being no SASS/SCSS will be suported.
        - To be implemented in the future
        - The reason is, there is an official implementation, but that requires a dependency to that package.
        - Options will be evaluated in the future.

### 0.7.0
- Added on... events
- Added 'Aside' Component

### 0.9.0
This is a big one.
I should advance a major version, but since it's not entirely done yet I don't want to make it 1.0.0

- Updated Typescript version to 6.0.2 from 4.4.2
- Updated @types/node to 26.2.0 from 16.7.13
- Removed RequireJS dependency
    - No longer relies on RequireJS to build the application.
- Completely rewrites building process, no longer supports AMD as it is deprecated, and was a pain
- Now uses bundler module resolution instead
- No longer creates a massive javascript script to load the entire application, is now completely fragmented
    - This will allow in the future to cache components so you won't need to download the entire website for a single change
    - Also no longer downloads every single component, even if none was in use.
- FINALLY fixes the issue where the user couldn't auto import, had to manually import each class in order to be useable
    - This is not an improvement, it was unusable as it was before.
- Implements relative imports:
    - Translates each import into the expected, ie: "@jhub-center/jhostify-script/framework/components/external/Component"
    - For the user this has no effect, but it was annoying having to do one or the other, now supports both
- Now expects user to have tsc configuration like so:
    {
        ...
        "compilerOptions": {
            ....
            "moduleResolution": "bundler",
            "target": "ES2017",
            "module": "esnext",
            "rootDir": "./src",
            "outDir": "./dist",
            ...
        },
        ...
    }
    - This is the biggest reason why I wanted to bum major version instead, but once again, not ready for 1.0.0
- Changes how it manipulates entry html.
    - Before, due to using requirejs it would require the entry point js and run render() to initiate the whole thing
    - Now just imports the entry js and you do the honors as you see fit
    - Aditionally adds a new script tag, to implement import mapping, this is for both the framework and the application
- There are still some residual files and configuration. It is by design, as I spent countless hours making them work, I will remove them later, for now, I want to enjoy my progress before I send it to the garbage.
