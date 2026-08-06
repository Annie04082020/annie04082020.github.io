`timescale 1ns / 1ps

module speed_controller(
    input wire btn_spd_up,
    input wire btn_spd_down,
    input wire pixel_clk,

    output wire[5:0]step_speed
);

reg [2:0]spd = 3'd0;
reg [5:0]step = 6'd0;

assign step_speed = step;

always @(posedge pixel_clk)
begin 
    if(btn_spd_up && !btn_spd_down)
    begin
        if(spd<3'd7)
            spd <= spd +1;
    end
    else if(!btn_spd_up && btn_spd_down)
    begin 
        if(spd > 3'd0)
            spd<=spd-1;
    end
end

always @(*)
begin
    case(spd)
        3'd0: step = 6'd0;
        3'd1: step = 6'd1;
        3'd2: step = 6'd2;
        3'd3: step = 6'd4;
        3'd4: step = 6'd8;
        3'd5: step = 6'd16;
        3'd6: step = 6'd24;
        3'd7: step = 6'd32;
    endcase
end
endmodule