#!/usr/bin/env bash
# Cleaning
echo "- Cleaning"
rm -rf ./src/dashboard/lib
rm -rf ./src/dashboard/@types
rm -rf ./src/dashboard/dist
# [BUILDING]
echo "- Building project"
NODE_ENV=production  vue-cli-service build --target lib --name generator ./src/dashboard/src/index.ts --dest ./src/dashboard/dist
cd ./src/dashboard || exit
tsc
mv lib/src/* lib/
rm -rdf lib/src
rm -f lib/tsconfig*
mv @types/src/* @types/
rm -rdf @types/src
mkdir ./dist/umd
mv ./dist/generator.umd.* ./dist/umd
cd ../../
# [CSS BUILDING]
echo "- Building css"
cd ./src/dashboard || exit
rm -rdf css/generator.min.css
NODE_ENV=production node_modules/.bin/postcss assets/tailwind.css -o assets/main.css
node minifyCss.js
echo "Build finished ! Ready to push"
