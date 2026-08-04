`timescale 1ns / 1ps
module colorbar #(
    parameter h_active = 640,
    parameter v_active = 480
)(
    input wire active_video,
    input wire [9:0]pos_x,
    input wire [8:0]pos_y,
    output wire [23:0]rgb
);
reg [7:0]r;
reg [7:0]g;
reg [7:0]b;

assign rgb = {r,g,b};
localparam barwidth = h_active/8;
always @(*)
begin
    if (active_video)
    begin
        if(pos_x<barwidth)
        begin
            r = 8'hFF;
            g = 8'hFF;
            b = 8'hFF;
        end
        else if(pos_x<barwidth*2)
        begin
            r = 8'hFF;
            g = 8'hFF;
            b = 8'h00;
        end
        else if(pos_x<barwidth*3)
        begin
            r = 8'h00;
            g = 8'hFF;
            b = 8'hFF;
        end
        else if(pos_x<barwidth*4)
        begin
            r = 8'h00;
            g = 8'hFF;
            b = 8'h00;
        end
        else if(pos_x<barwidth*5)
        begin
            r = 8'hFF;
            g = 8'h00;
            b = 8'hFF;
        end
        else if(pos_x<barwidth*6)
        begin
            r = 8'hFF;
            g = 8'h00;
            b = 8'h00;
        end
        else if(pos_x<barwidth*7)
        begin
            r = 8'h00;
            g = 8'h00;
            b = 8'hFF;
        end
        else 
        begin
            r = 8'h00;
            g = 8'h00;
            b = 8'h00;
        end
    end
    else
    begin
        r = 8'h00;
        g = 8'h00;
        b = 8'h00;
    end
end
endmodule