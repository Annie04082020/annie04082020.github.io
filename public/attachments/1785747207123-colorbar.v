`timescale 1ns / 1ps
module colorbar(
    input wire clk;
    input wire [9:0]pos_x;
    input wire [8:0]pos_y;
    output wire [23:0]rgb;
);
endmodule