docker run -it --rm \
    -p 3125:3000 \
    -v $PWD:/xwrkle \
    -w /xwrkle \
    node:17-stretch-slim bash

