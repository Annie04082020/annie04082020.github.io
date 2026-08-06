`timescale 1ns / 1ps

module button_debounce(
    input wire rst,
    input wire pixel_clk,
    input wire btn,

    output wire btn_pulse
);

    reg [19:0] debounce_counter;
    reg btn_ff1, btn_ff2, btn_state, btn_state_d;

    assign btn_pulse = btn_state & ~btn_state_d;

    always @(posedge pixel_clk)
    // debouncer
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

endmodule