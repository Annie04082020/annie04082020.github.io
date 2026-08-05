`timescale 1ns / 1ps
module colorbar (
    input wire active_video,
    input wire barwidth,
    input wire [10:0]direction,
    input wire [10:0]pos_x,
    input wire [10:0]pos_y,
    output wire [23:0]rgb
);
reg [7:0]r;
reg [7:0]g;
reg [7:0]b;
wire [10:0]pos;
assign pos = direction ? pos_y : pos_x;
assign rgb = {r,g,b};

always @(*)
begin
    if (active_video)
    begin
        if(pos<barwidth)
        begin
            r = 8'hFF;
            g = 8'hFF;
            b = 8'hFF;
        end
        else if(pos<barwidth*2)
        begin
            r = 8'hFF;
            g = 8'hFF;
            b = 8'h00;
        end
        else if(pos<barwidth*3)
        begin
            r = 8'h00;
            g = 8'hFF;
            b = 8'hFF;
        end
        else if(pos<barwidth*4)
        begin
            r = 8'h00;
            g = 8'hFF;
            b = 8'h00;
        end
        else if(pos<barwidth*5)
        begin
            r = 8'hFF;
            g = 8'h00;
            b = 8'hFF;
        end
        else if(pos<barwidth*6)
        begin
            r = 8'hFF;
            g = 8'h00;
            b = 8'h00;
        end
        else if(pos<barwidth*7)
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