## Description

### React + TypeScript + Vite (Vercel)

This project uses a minimal template with Vite. 

## Setup

### Local dev 

This project uses vite, so running `dev`, `start` or `deploy` should work normally with vite.

To run in a container, simply run `npm run serve`. This will run the shell script `serve.sh`, which will create a docker network, if not present and then script `docker:start`, that will stop (`docker-compose down`) and then build and start the container (`docker-compose up --build -d`).

### Serving with docker

A simple docker configuration was also added to serve in in a container. Exposed in host at port `5173`. This container is also added to a network that can be used by a containerized nginx. 

## Styling

To check available google fonts installed: https://fonts.google.com/noto/specimen/Noto+Sans

## License

MIT License. Be sure to check the dependencies used. Remember, the MIT license applied to this project covers only the code written. It doesn't re-license the dependencies used. Each dependency retains its original license.

## Disclaimer

This project is still in an early stage, providing an MVP for presentation. There wasn't a specific concern in cleaning comments, unused code at this point. 

Anything you want to suggest or comment I am available at: pedrocaetano90@gmail.com
