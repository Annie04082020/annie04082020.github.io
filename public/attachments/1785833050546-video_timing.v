`timescale 1ns / 1ps

module video_timing(
    input wire clk,
    input wire rst,
    output wire hsync,
    output wire vsync,
    output wire active_video,
    output wire led1,
    output wire led2,
    output wire led3,
    output wire led4,
    output wire [9:0]pos_x,
    output wire [8:0]pos_y
);
    parameter x_pixels = 640;
    parameter x_front = 16;
    parameter x_sync = 96;
    parameter x_back = 48;

    parameter y_pixels = 480;
    parameter y_front = 10;
    parameter y_sync = 2;
    parameter y_back = 33;

    parameter y_total = y_pixels+y_front+y_sync+y_back;
    parameter x_total = x_pixels+x_front+x_sync+x_back;
    
    reg [9:0] hor_counter;
    reg [8:0] ver_counter;
    
    assign pos_x = hor_counter;
    assign pos_y = ver_counter;
    assign led1 = hsync;
    assign led2 = vsync;
    assign led3 = active_video;
    assign led4 = rst;
    assign hsync = ~((hor_counter<x_total-x_back)&&(hor_counter>=x_pixels+x_front));
    assign vsync = ~((ver_counter<y_total-y_back)&&(ver_counter>=y_pixels+y_front));
    assign active_video = (hor_counter<x_pixels)&&(ver_counter<y_pixels);
    
    always @(posedge clk)
    begin
        // if(rst)
        // begin
        //     hor_counter <= 0;
        //     ver_counter <= 0;
        // end
        // else
        // begin
            if (hor_counter == x_total-1)
            begin
            hor_counter <= 0;
            if (ver_counter == y_total-1)
                ver_counter <= 0;
            else
                ver_counter <= ver_counter + 1;
            end
            else
                hor_counter <= hor_counter + 1;
        // end
    end

endmodule