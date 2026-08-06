`timescale 1ns / 1ps
module colorbar (
    input wire active_video,
    input wire [10:0]barwidth,
    input wire [10:0]pos,
    input wire sw_grad,
    output wire [23:0]rbg
);

parameter transition_width = 32;
reg [7:0]r;
reg [7:0]g;
reg [7:0]b;
reg [10:0]grad_start = 11'd0;  
wire [4:0]grad_pos;

assign rbg = {r,b,g};
assign grad_pos = (pos >= grad_start) ? pos-grad_start : 5'd0;
always @(*)
begin
    if (active_video)
    begin
        // White
        if(pos<barwidth)
        begin
        grad_start=barwidth-transition_width;
            if (sw_grad && pos >= grad_start)
            begin
                r = 8'hFF;
                b = 8'hff-(grad_pos<<3);
                g = 8'hFF;
            end
            else
            begin
                r = 8'hFF;
                b = 8'hFF;
                g = 8'hFF;
            end
        end
        // Yellow
        else if(pos<barwidth*2)
        begin
        grad_start=barwidth*2-transition_width;
            if (sw_grad && pos >= grad_start)
            begin
                r = 8'hff-(grad_pos<<3);
                b = grad_pos<<3;
                g = 8'hff;
            end
            else
            begin
                r = 8'hFF;
                b = 8'h00;
                g = 8'hFF;
            end
        end
        // 
        else if(pos<barwidth*3)
        begin
        grad_start=barwidth*3-transition_width;
            if (sw_grad && pos >= grad_start)
            begin
                r = 8'h00;
                b = 8'hff-(grad_pos<<3);
                g = 8'hff;
            end
            else
            begin
                r = 8'h00;
                b = 8'hFF;
                g = 8'hFF;
            end
        end
        // Green
        else if(pos<barwidth*4)
        begin
        grad_start=barwidth*4-transition_width;
            if (sw_grad && pos >= grad_start)
            begin
                r = (grad_pos<<3);
                b = (grad_pos<<3);
                g = 8'hff-(grad_pos<<3);
            end
            else
            begin
                r = 8'h00;
                b = 8'h00;
                g = 8'hFF;
            end
        end
        // 
        else if(pos<barwidth*5)
        begin
        grad_start=barwidth*5-transition_width;
            if (sw_grad && pos >= grad_start)
            begin
                r = 8'hFF;
                b = 8'hff-(grad_pos<<3);
                g = 8'h00;
            end
            else
            begin
                r = 8'hFF;
                b = 8'hFF;
                g = 8'h00;
            end
        end
        // Red
        else if(pos<barwidth*6)
        begin
        grad_start=barwidth*6-transition_width;
            if (sw_grad && pos >= grad_start)
            begin
                r = 8'hff-(grad_pos<<3);
                b = (grad_pos<<3);
                g = 8'h00;
            end
            else
            begin
                r = 8'hFF;
                b = 8'h00;
                g = 8'h00;
            end
        end
        // Blue
        else if(pos<barwidth*7)
        begin
        grad_start=barwidth*7-transition_width;
            if (sw_grad && pos >= grad_start)
            begin
                r = 8'h00;
                b = 8'hff-(grad_pos<<3);
                g = 8'h00;
            end
            else
            begin
                r = 8'h00;
                b = 8'hFF;
                g = 8'h00;
            end
        end
        else 
        // Black
        begin
            grad_start=barwidth*8-transition_width;
            if (sw_grad && pos >= grad_start)
            begin
                r = (grad_pos<<3);
                b = (grad_pos<<3);
                g = (grad_pos<<3);
            end
            else
            begin
                r = 8'h00;
                b = 8'h00;
                g = 8'h00;
            end
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