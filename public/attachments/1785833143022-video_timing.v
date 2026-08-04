`timescale 1ns / 1ps

module video_timing(

    input clk,
    input rst,

    output reg hsync,
    output reg vsync,
    output reg active_video,

    output [10:0] x,
    output [9:0] y

    );

    reg [10:0] h_cnt;

    always @(posedge clk)
    begin
        if(h_cnt==799)
            h_cnt<=0;
        else
            h_cnt<=h_cnt+1;
    end
    
    reg [9:0]  v_cnt;

    always @(posedge clk)
    begin
        if(h_cnt==799)
        begin
            if(v_cnt==524)
                v_cnt<=0;
            else
                v_cnt<=v_cnt+1;
        end
    end

    assign x = h_cnt;
    assign y = v_cnt;

    always @(*)
    begin
    active_video = (h_cnt<640)&&(v_cnt<480);
    end

    always @(*)
    begin
    if(h_cnt>=656 && h_cnt<752)
        hsync=0;
    else
        hsync=1;
    end

    always @(*)
    begin
    if(v_cnt>=490 && v_cnt<492)
        vsync=0;
    else
        vsync=1;
    end
endmodule

