#include <iostream>
#include <vector>
#include "sketch_filter.h"

int main() {
    int rows = 1080;
    int cols = 1920;
    int total_pixels = rows * cols;

    std::vector<unsigned char> src_img(total_pixels);
    std::vector<unsigned char> dst_img(total_pixels);

    // 產生一個簡單的測試圖：中間有一個深色的正方形，背景是淺色
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (r > rows/4 && r < 3*rows/4 && c > cols/4 && c < 3*cols/4) {
                src_img[r * cols + c] = 50;  // 深灰
            } else {
                src_img[r * cols + c] = 200; // 淺灰
            }
        }
    }

    std::cout << "Starting Final HLS IP Simulation (AXI4-Stream)..." << std::endl;

    // 1. 把 src_img 灌進輸入 stream，模擬 AXI4-Stream 的 TLAST/TUSER (SOF)
    hls::stream<AXI_STREAM> src_stream;
    hls::stream<AXI_STREAM> dst_stream;

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            AXI_STREAM px;
            px.data = src_img[r * cols + c];
            px.keep = -1;
            px.strb = -1;
            px.user = (r == 0 && c == 0) ? 1 : 0;      // SOF
            px.last = (c == cols - 1) ? 1 : 0;         // EOL
            src_stream.write(px);
        }
    }

    // 2. 呼叫 AXI4-Stream 版 sketch_filter
    sketch_filter(src_stream, dst_stream, rows, cols);

    // 3. 從輸出 stream 讀回 dst_img
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            AXI_STREAM px = dst_stream.read();
            dst_img[r * cols + c] = px.data;
        }
    }

    std::cout << "Simulation Completed." << std::endl;

    // 簡單驗證計算結果是否合理
    // 預期：平均中心 (背景深正方形內部) 出來應該是全白 (255)
    // 預期：正方形邊緣交界處應該出現黑色線條 (< 255)
    bool center_is_white = (dst_img[(rows/2) * cols + (cols/2)] == 255);
    bool border_is_dark = (dst_img[(rows/4) * cols + (cols/2)] < 255) ||
                          (dst_img[(rows/4 + 1) * cols + (cols/2)] < 255);

    if (center_is_white && border_is_dark) {
        std::cout << "---------------------------------" << std::endl;
        std::cout << "Test Passed! Pencil Sketch Effect Logic is correct." << std::endl;
        std::cout << "---------------------------------" << std::endl;
        return 0;
    } else {
        std::cout << "---------------------------------" << std::endl;
        std::cout << "Test Failed or output is unexpected." << std::endl;
        std::cout << "---------------------------------" << std::endl;
        return 1;
    }
}
