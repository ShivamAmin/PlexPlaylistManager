#!/bin/sh

# Start server
node server/dist/index.js &

# Start client
npx http-server client/dist/ &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?