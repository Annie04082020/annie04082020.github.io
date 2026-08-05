`timescale 1ns / 1ps

module mode_selector(
    input wire clk_25M,
    input wire clk_74M,
    input wire sw_res,
    input wire sw_dir,
    input wire [10:0]pos_x,
    input wire [10:0]pos_y,

    output wire sel_pixel_clk,

    output wire [10:0]x_pixel,
    output wire [10:0]x_blank_st,
    output wire [10:0]x_blank_ed,
    output wire [10:0]x_total,

    output wire [10:0]y_pixel,
    output wire [10:0]y_blank_st,
    output wire [10:0]y_blank_ed,
    output wire [10:0]y_total,

    output wire [10:0]barwidth,
    output wire [10:0]pos
);

// 640*480
    parameter x_640 = 640;
    parameter x_640_front = 16;
    parameter x_640_sync = 96;
    parameter x_640_back = 48;

    parameter y_480 = 480;
    parameter y_480_front = 10;
    parameter y_480_sync = 2;
    parameter y_480_back = 33;

    // 1280*720
    parameter x_1280 = 1280;
    parameter x_1280_front = 110;
    parameter x_1280_sync = 40;
    parameter x_1280_back = 220;

    parameter y_720 = 720;
    parameter y_720_front = 5;
    parameter y_720_sync = 5;
    parameter y_720_back = 20;

// 00:vertical bar 720*480 
// 01:horizontal bar 720*480 
// 10:vertical bar 1280*720
// 11:horizontal bar 1280*720

assign sel_pixel_clk = sw_res ? clk_74M : clk_25M;

assign x_pixel = sw_res ? x_1280 : x_640;
assign x_blank_st= sw_res ? x_1280 + x_1280_front : x_640 + x_640_front;
assign x_blank_ed = sw_res ? x_1280 + x_1280_front + x_1280_sync : x_640 + x_640_front + x_640_sync;
assign x_total = sw_res ? x_1280 + x_1280_front + x_1280_sync + x_1280_back : x_640+x_640_front + x_640_sync + x_640_back;

assign y_pixel = sw_res ? y_720:y_480;
assign y_blank_st= sw_res ? y_720 + y_720_front : y_480 + y_480_front;
assign y_blank_ed = sw_res ? y_720 + y_720_front + y_720_sync : y_480 + y_480_front + y_480_sync;
assign y_total = sw_res ? y_720 + y_720_front + y_720_sync + y_720_back : y_480 + y_480_front + y_480_sync + y_480_back;

assign barwidth = sw_dir ? y_pixel/8 : x_pixel/8;
assign pos = sw_dir ? pos_y : pos_x;


endmodule
