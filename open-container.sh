docker run -it --rm \
    -p 3125:3000 \
    -v $PWD:/xorkaton \
    -w /xorkaton \
    node:17-stretch-slim bash

