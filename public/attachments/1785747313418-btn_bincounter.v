`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 2026/08/03 11:43:36
// Design Name: 
// Module Name: bincounter
// Project Name: 
// Target Devices: 
// Tool Versions: 
// Description: 
// 
// Dependencies: 
// 
// Revision:
// Revision 0.01 - File Created
// Additional Comments:
// 
//////////////////////////////////////////////////////////////////////////////////


module btn_bincounter(
    input wire clk,
    input wire rst,
    input wire btn,
    output wire led1,
    output wire led2,
    output wire led3,
    output wire led4
    );
    reg [19:0] debounce_counter;
    reg [3:0] counter;
    reg btn_ff1, btn_ff2, btn_state, btn_state_d;
    wire btn_pulse;

    assign btn_pulse = btn_state & ~btn_state_d;
    always @(posedge clk)
    begin
        if (rst)
        begin
            btn_ff1 <= 0;
            btn_ff2 <= 0;
            btn_state <= 0;
            btn_state_d <= 0;
            debounce_counter <= 0;
        end
        else
        begin
            btn_state_d <= btn_state;
            btn_ff1 <= btn;
            btn_ff2 <= btn_ff1;

            if (btn_ff2 != btn_state)
                begin
                    if (debounce_counter >= 1000000)
                        begin
                            btn_state <= btn_ff2;
                            debounce_counter <= 0;
                        end 
                    else
                    debounce_counter <= debounce_counter + 1;
                end
            else 
                debounce_counter <= 0;    
        end
    end
    always @(posedge clk)
    begin
        if (rst)
            counter <= 0; 
        else if (btn_pulse)
            counter <= counter + 1;
    end
    assign led4 = counter[0];
    assign led3 = counter[1];
    assign led2 = counter[2];
    assign led1 = counter[3];
endmodule
