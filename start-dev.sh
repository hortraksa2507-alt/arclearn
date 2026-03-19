#!/bin/bash
export PATH="$HOME/.nvm/versions/node/v22.22.1/bin:$PATH"
cd "/Users/raksa/Projects/test code in cluade desktop/arclearn"
exec npx next dev -p "${PORT:-3000}"
