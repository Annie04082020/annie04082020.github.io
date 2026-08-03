`timescale 1ns / 1ps

module video_timing(
    input wire clk,
    output wire hsync,
    output wire vsync,
    output wire active_video,
    output wire [9:0]pos_x,
    output wire [8:0]pos_y
);
    reg [9:0] hor_counter;
    reg [8:0] ver_counter;
    assign pos_x = hor_counter;
    assign pos_y = ver_counter;
    assign hsync = (hor_counter<640)&&(hor_counter>);
    assign vsync = (ver_counter<480)&&;
    assign active_video = (hor_counter<640)&&(ver_counter<480);
    always @(posedge clk)
    begin
        if (hor_counter <= 640)
            hor_counter <= hor_counter + 1;
        else
        begin
            hor_counter <= 0;
            ver_counter <= ver_counter + 1;
        end        
    end

endmodule