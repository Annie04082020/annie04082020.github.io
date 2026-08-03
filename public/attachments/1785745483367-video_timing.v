`timescale 1ns / 1ps

module video_timing(
    input wire clk;
    output wire hsync;
    output wire vsync;
    output wire active_video;
    output wire pos_x;
    output wire pos_y;
);
    reg [9:0] hor_counter;
    reg [8:0] ver_counter;
    always @(posedge clk)
    begin
        for(i=0;i<640;i=i+1)
        begin
            for(j=0;j<480;j=j+1)
                ver_counter = ver_counter +1;
            hor_counter = hor_counter +1;
        end
    end

endmodule