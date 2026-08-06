`timescale 1ns / 1ps

module move_offset(
    input wire pixel_clk,
    input wire [26:0]tick_max,
    input wire [10:0]pos_x,
    input wire [10:0]pos_y,
    input wire [10:0]active_size,
    input wire [5:0]speed,

    input wire sw_dir,
    output wire [10:0]offset_pos
);

reg move_tick;
reg [26:0]count;
reg [10:0]offset = 11'd0;
wire [10:0]pos;
wire [11:0]pos_sum;

assign pos = sw_dir ? pos_y : pos_x;
assign pos_sum = pos + offset;
assign offset_pos = (pos_sum>=active_size)? pos_sum - active_size: pos_sum[10:0];

always @(posedge pixel_clk)
begin
    if(count == tick_max-1)
    begin
        count <= 0;
        move_tick <= 1;
    end
    else
    begin
        count <= count + 1;
        move_tick <= 0;
    end
end

always @(posedge pixel_clk)
begin
    if(move_tick)
begin
    if(offset + speed >= active_size)
        offset <= offset + speed - active_size;
    else
        offset <= offset + speed;
end
end
endmodule