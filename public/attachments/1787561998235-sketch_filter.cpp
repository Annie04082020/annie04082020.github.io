#include "sketch_filter.h"

template<int ROWS, int COLS, typename T>
struct MyWindow {
    T val[ROWS][COLS];

    MyWindow() {
#pragma HLS array_partition variable=val complete dim=0
    }

    void shift_right() {
#pragma HLS inline
        for (int i = 0; i < ROWS; i++) {
#pragma HLS unroll
            for (int j = 0; j < COLS - 1; j++) {
#pragma HLS unroll
                val[i][j] = val[i][j + 1];
            }
        }
    }
    void insert(T pixel, int row, int col) {
#pragma HLS inline
        val[row][col] = pixel;
    }
    T getval(int row, int col) {
#pragma HLS inline
        return val[row][col];
    }
};

template<int ROWS, int COLS, typename T>
struct MyLineBuffer {
    T val[ROWS][COLS];

    MyLineBuffer() {
#pragma HLS array_partition variable=val complete dim=1
    }

    void shift_up(int col) {
#pragma HLS inline
        for (int i = 0; i < ROWS - 1; i++) {
#pragma HLS unroll
            val[i][col] = val[i+1][col];
        }
    }
    void insert_bottom(T pixel, int col) {
#pragma HLS inline
        val[ROWS-1][col] = pixel;
    }
    T getval(int row, int col) {
#pragma HLS inline
        return val[row][col];
    }
};

static int hls_abs(int x) { return x < 0 ? -x : x; }

void sketch_filter(hls::stream<AXI_STREAM> &src,
                    hls::stream<AXI_STREAM> &dst,
                    int rows, int cols) {
#pragma HLS INTERFACE axis port=src
#pragma HLS INTERFACE axis port=dst
#pragma HLS INTERFACE s_axilite port=rows bundle=CTRL
#pragma HLS INTERFACE s_axilite port=cols bundle=CTRL
#pragma HLS INTERFACE s_axilite port=return bundle=CTRL

    static MyLineBuffer<3, MAX_WIDTH, ap_uint<8>> line_buf;
    static MyWindow<3, 3, ap_uint<8>> win_buf;

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
#pragma HLS PIPELINE II=1
            AXI_STREAM in_pix = src.read();
            ap_uint<8> pixel = in_pix.data(7,0);

            line_buf.shift_up(c);
            line_buf.insert_bottom(pixel, c);

            win_buf.shift_right();
            win_buf.insert(line_buf.getval(0,c), 0, 2);
            win_buf.insert(line_buf.getval(1,c), 1, 2);
            win_buf.insert(line_buf.getval(2,c), 2, 2);

            ap_uint<8> out_pixel = pixel;
            if (r >= 2 && c >= 2) {
                int Gx = -win_buf.getval(0,0) + win_buf.getval(0,2)
                         -2*win_buf.getval(1,0) + 2*win_buf.getval(1,2)
                         -win_buf.getval(2,0) + win_buf.getval(2,2);
                int Gy = -win_buf.getval(0,0) - 2*win_buf.getval(0,1) - win_buf.getval(0,2)
                         +win_buf.getval(2,0) + 2*win_buf.getval(2,1) + win_buf.getval(2,2);
                int edge = hls_abs(Gx) + hls_abs(Gy);
                if (edge > 255) edge = 255;
                out_pixel = 255 - edge;
            }

            AXI_STREAM out_pix;
            out_pix.data = out_pixel;
            out_pix.keep = in_pix.keep;
            out_pix.strb = in_pix.strb;
            out_pix.user = (r == 0 && c == 0) ? 1 : 0;  // SOF
            out_pix.last = (c == cols - 1) ? 1 : 0;     // EOL
            dst.write(out_pix);
        }
    }
}
