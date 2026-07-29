`timescale 1ns / 1ns
module top;

reg clk;
reg rstb;


input i_lsel;
input i_lwrite;
input [3:0]i_laddr;
input [31:0]i_lwdata;

output q_lready;
output [31:0]q_lrdata;

wire s_start;
wire s_clr;
wire t_start;
wire t_clr;
wire settime;
wire [13:0]set_data;

output o_beep;
output [3:0]o_a;
output [3:0]o_b;
output [3:0]o_c;
output [3:0]o_d;
output [3:0]o_e;
output [3:0]o_f;
output [3:0]o_g;

always #50 clk = ~clk;

reg_if reg_if(
    .i_lsel(i_lsel),
    .i_lwrite(i_lwrite),
    .i_laddr(i_laddr),
    .i_lwdata(i_lwdata)    
);
stopwatch stopwatch(
    .s_start(s_start),
    .s_clr(s_clr)    
);
k_timer k_timer(
    .t_start(t_start),
    .t_clr(t_clr),
    .settime(settime),
    .set_data(set_data)    
);
lseg_mon lseg_mon(
    .o_beep(o_beep)
    
);


endmodule