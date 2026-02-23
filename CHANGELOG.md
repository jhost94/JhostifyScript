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