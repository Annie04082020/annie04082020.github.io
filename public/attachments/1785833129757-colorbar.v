`timescale 1ns / 1ps

module colorbar(
    input  [10:0] x,
    input  [9:0]  y,
    input active_video,

    output reg [23:0] rgb
);

    wire [2:0] x_color;
    assign x_color = x / 80;

    always @(*) begin
        if (!active_video) begin
            rgb = 24'hFFFFFF;
        end
        else
        begin
            case(x_color)
                3'd0: rgb = 24'hFFFFFF; // White
                3'd1: rgb = 24'hFFFF00; // Yellow
                3'd2: rgb = 24'h00FFFF; // Cyan
                3'd3: rgb = 24'h00FF00; // Green
                3'd4: rgb = 24'hFF00FF; // Magenta
                3'd5: rgb = 24'hFF0000; // Red
                3'd6: rgb = 24'h0000FF; // Blue
                default: rgb = 24'h000000; // Black
            endcase
        end
    
    end

endmodule