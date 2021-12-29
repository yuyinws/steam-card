wget https://zlib.net/fossils/zlib-1.2.9.tar.gz
tar -xf zlib-1.2.9.tar.gz
cd zlib-1.2.9
sh configure
make
ls -l libz*
cp libz.so.1 ../node_modules/canvas/build/Release/
