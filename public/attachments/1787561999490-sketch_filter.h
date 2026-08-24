#ifndef SKETCH_FILTER_H
#define SKETCH_FILTER_H

#include <ap_int.h>
#include <ap_axi_sdata.h>
#include <hls_stream.h>

#define MAX_WIDTH  1920
#define MAX_HEIGHT 1080

// AXI4-Stream pixel type: 8-bit per channel data, TLAST/TUSER for SOF/EOL
typedef ap_axiu<8,1,1,1> AXI_STREAM;

void sketch_filter(hls::stream<AXI_STREAM> &src,
                    hls::stream<AXI_STREAM> &dst,
                    int rows, int cols);

#endif
