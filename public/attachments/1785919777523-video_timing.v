`timescale 1ns / 1ps

module video_timing(
    input wire clk,
    input wire rst,
    input wire [10:0]x_pixel,
    input wire [10:0]x_blank_st,
    input wire [10:0]x_blank_ed,
    input wire [10:0]x_total,
    input wire [10:0]y_pixel,
    input wire [10:0]y_blank_st,
    input wire [10:0]y_blank_ed,
    input wire [10:0]y_total,

    output wire hsync,
    output wire vsync,
    output wire active_video,
    output wire led1,
    output wire led2,
    output wire led3,
    output wire led4,
    // 2^10=1024, 2^9=512
    output wire [10:0]pos_x,
    output wire [10:0]pos_y
);
   
    reg [10:0] hor_cnt;
    reg [10:0] ver_cnt;
    
    assign pos_x = hor_cnt;
    assign pos_y = ver_cnt;
    assign led1 = hsync;
    assign led2 = vsync;
    assign led3 = active_video;
    assign led4 = rst;
    assign hsync = ~((hor_cnt<x_blank_ed)&&(hor_cnt>=x_blank_st));
    assign vsync = ~((ver_cnt<y_blank_ed)&&(ver_cnt>=y_blank_st));
    assign active_video = (hor_cnt<x_pixel)&&(ver_cnt<y_pixel);
    
    always @(posedge clk)
    begin
        if(rst)
        begin
            hor_cnt <= 0;
            ver_cnt <= 0;
        end
        else
        begin
            if (hor_cnt == x_total-1)
            begin
            hor_cnt <= 0;
            if (ver_cnt == y_total-1)
                ver_cnt <= 0;
            else
                ver_cnt <= ver_cnt + 1;
            end
            else
                hor_cnt <= hor_cnt + 1;
        end
    end

endmodule